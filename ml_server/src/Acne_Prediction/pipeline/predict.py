import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import os
import numpy as np
import tensorflow as tf
from PIL import Image
import json
from ultralytics import YOLO
import cv2
from PIL import Image
from flask import request, jsonify
from src.Acne_Prediction.utils.common import upload_to_cloudinary,upload_numpy_image_to_cloudinary

ACNE_MODEL_PATH = "C:/web development/Cure-Catalyst/Project/ml_server/artifacts/training/disease_float_final.tflite"
TYPE_MODEL_PATH = 'C:/web development/Cure-Catalyst/Project/ml_server/artifacts/training/2_class_final_6feb.tflite'

def load_tflite_model(model_path):
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()
        return interpreter
    
def load_yolo_model():
        return YOLO("C:/Acne/runs/runs/detect/train4/weights/best.pt") 
    
def preprocess_image(image, target_size=(380, 380)):
        image = image.resize(target_size)
        image = np.array(image, dtype=np.float32)
        image = np.expand_dims(image, axis=0)
        return image

def run_tflite_model(interpreter, image):
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()
    interpreter.set_tensor(input_details[0]['index'], image)
    interpreter.invoke()
    return interpreter.get_tensor(output_details[0]['index'])

def predict_acne(path,acne_interpreter):
    image = Image.open(path).convert("RGB")
    image_array = preprocess_image(image,target_size=(380, 380))
    probability = run_tflite_model(acne_interpreter, image_array)[0][0]
    result = "Acne Detected" if probability <= 0.5 else "No Acne"
    probability = abs((0.5 - probability) * 200)
    return probability, result

def predict_type(path,type_interpreter):
    image = Image.open(path).convert("RGB")
    image_array = preprocess_image(image,target_size=(380, 380))
    type_probability = run_tflite_model(type_interpreter, image_array)[0][0]
    result = "Inflammatory Acne" if type_probability <= 0.5 else "Non-Inflammatory Acne"
    type_probability = abs((0.5 - type_probability) * 200)
    return type_probability, result

def detect_and_count_lesions(path,yolo_model):
    image = Image.open(path).convert("RGB")
    results = yolo_model(image, conf=0.15)
    boxes = results[0].boxes
    class_ids = boxes.cls.cpu().numpy().astype(int)
    xyxy = boxes.xyxy.cpu().numpy().astype(int)
    class_names = yolo_model.names

    count_dict = {}

    # Convert input image to NumPy BGR format (for OpenCV)
    if isinstance(image, np.ndarray):
        image_bgr = image.copy()
    else:
        image_bgr = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

    for cid, box in zip(class_ids, xyxy):
        label = class_names[cid]
        count_dict[label] = count_dict.get(label, 0) + 1

        x1, y1, x2, y2 = box
        cv2.rectangle(image_bgr, (x1, y1), (x2, y2), (0, 255, 0), 2)
        cv2.putText(image_bgr, label, (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    result_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
    return count_dict, result_rgb

def map_counts_to_severity_grade(counts):
    total_lesions = sum(counts.values())
    nodules = counts.get('nodules', 0)
    pustules = counts.get('pustules',0)
    papules = counts.get('papules',0)
    if nodules > 15 or total_lesions >= 50:
        return 4
    elif nodules >= 5 or total_lesions >= 30:
        return 3
    elif nodules>=1 or pustules >=1 or papules>=2 or total_lesions >= 10:
        return 2
    else:
        return 1

def load_questions():
    with open("questions.json", "r") as file:
        return json.load(file)["questions"]

def get_unique_questions(grades):
    all_questions = load_questions()
    selected_questions = {}
    for q in all_questions:
        for grade in grades:
            if grade in q["grades"]:
                selected_questions[q["question"]] = q
    return list(selected_questions.values())

def get_top_two_grades(severity_percentages,type_result):
    highest_grade = max(severity_percentages, key=severity_percentages.get)

    if highest_grade == 1:
        return [(1, severity_percentages.get(1, 0)), (2, severity_percentages.get(2, 0))]
    
    elif highest_grade == 2:
        if type_result=="Non-Inflammatory Acne":
            return [(1, severity_percentages.get(1, 0)), (2, severity_percentages.get(2, 0))]
        else:
            return [(2, severity_percentages.get(2, 0)), (3, severity_percentages.get(3, 0))]

    elif highest_grade == 3:
        if severity_percentages.get(2, 0) >= severity_percentages.get(4, 0):
            return [(2, severity_percentages.get(2, 0)), (3, severity_percentages.get(3, 0))]
        else:
            return [(3, severity_percentages.get(3, 0)), (4, severity_percentages.get(4, 0))]

    elif highest_grade == 4:
        return [(3, severity_percentages.get(3, 0)), (4, severity_percentages.get(4, 0))]
    

class PredictionPipeline:
    def __init__(self):
        self.acne_interpreter = load_tflite_model(ACNE_MODEL_PATH)
        self.type_interpreter = load_tflite_model(TYPE_MODEL_PATH)
        self.yolo_model = load_yolo_model()

    def predict(self, localPaths):
        images_to_predict = []
        detection_plot_paths = []
        detection_counts_arr = []
        acne_prob, non_acne_prob = 0, 0
        infla_prob, non_infla_prob = 0, 0
        severity_counts = {1: 0, 2: 0, 3: 0, 4: 0}
        results = []

        for path in localPaths:
            probability, acne_result = predict_acne(path, self.acne_interpreter)

            if acne_result == "Acne Detected":
                images_to_predict.append(path)
                acne_prob += probability
            else:
                non_acne_prob += probability

        total_images = max(1, len(localPaths))
        acne_prob /= total_images
        non_acne_prob /= total_images

        final_result = "Acne Detected" if acne_prob > non_acne_prob else "No Acne"
        final_prob = max(acne_prob, non_acne_prob)

        if final_result == "No Acne":
            return jsonify({
                "success": True,
                "message": "No Acne Detected"
            })

        print("### Acne Detected. Running further models...")

        for i, image in enumerate(images_to_predict):
            type_probability, type_result = predict_type(image, self.type_interpreter)
            detection_counts, detection_plot = detect_and_count_lesions(image, self.yolo_model)

            # Upload the detection plot
            cloudinary_url = upload_numpy_image_to_cloudinary(detection_plot,folder="MED_PROJECT")
            detection_plot_paths.append(cloudinary_url)
            detection_counts_arr.append(detection_counts)
            print(f"cloudinary url {cloudinary_url}")

            # Determine severity grade
            assigned_grade = map_counts_to_severity_grade(detection_counts)
            if assigned_grade > 2:
                type_result = "Inflammatory Acne"

            results.append({
                "index": i,
                "type_result": type_result,
                "type_probability": type_probability,
                "assigned_grade": assigned_grade,
                "image_url": cloudinary_url
            })

            if type_result == "Inflammatory Acne":
                infla_prob += type_probability
            else:
                non_infla_prob += type_probability

            severity_counts[assigned_grade] += 1

        severity_percentages = {
            grade: (count / len(images_to_predict)) * 100
            for grade, count in severity_counts.items()
        }

        top_two_grades = get_top_two_grades(severity_percentages, type_result)

        return jsonify({
            "success": True,
            "message": "Acne detected",
            "type": type_result,
            "type_probability": final_prob,
            "top_two_grades": top_two_grades,
            "severity_distribution": severity_percentages,
            "OD_images": detection_plot_paths,
            "detailed_results": results
        })
