import os
import requests
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS, cross_origin
from src.Acne_Prediction.pipeline.predict import PredictionPipeline
from src.Acne_Prediction.utils.common import downloadImageFromURL  # you may not need this now
import uuid
from dotenv import load_dotenv

load_dotenv()

front_end = os.getenv("FRONT_END_BASE_URL")
base_url = os.getenv("BASE_URL")
port_no = int(os.getenv("PORT"))

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": front_end}}, supports_credentials=True)

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/train', methods=['GET', 'POST'])
def train_route():
    os.system("python main.py")
    return "Training completed successfully"

@app.route('/predict-skin', methods=['POST'])
@cross_origin(origins=front_end, supports_credentials=True)
def predict_route():
    image_urls = request.json['image_urls']

    # Download images from Cloudinary
    local_paths = []
    for idx, url in enumerate(image_urls):
        filename = f"inputImage_{idx+1}.jpg"
        if downloadImageFromURL(url, filename):
            local_paths.append(filename)

    # Call the prediction pipeline
    pipeline = PredictionPipeline()
    predictions = pipeline.predict(local_paths)

    return predictions



if __name__ == '__main__':
    app.run(host=base_url, port=port_no, debug=True)
