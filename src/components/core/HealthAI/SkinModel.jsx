import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { uploadSkinImages, predictSkin } from "../../../services/operations/healthAI_API";
import acneQuestions from "../../../data/questions.json";

import ImageUploader from "../../../components/core/HealthAI/ImageUploader";
import AcneQuestionnaire from"../../../components/core/HealthAI/AcneQuestionairre";
import PredictionResult from "../../../components/core/HealthAI/PredictionResult";

export default function SkinModel() {
  const { token } = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);
  const [formAnswers, setFormAnswers] = useState({});
  const [finalGrade, setFinalGrade] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 6) {
      return toast.error("You can upload a maximum of 6 images.");
    }

    const validImages = files.filter((file) => file.type.startsWith("image/"));
    const previews = validImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...validImages]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previewUrls];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImages(updatedImages);
    setPreviewUrls(updatedPreviews);
  };

  const handleSubmit = async () => {
    if (images.length < 1) {
      return toast.error("Please upload at least 1 image.");
    }

    setLoading(true);
    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const image_urls = await uploadSkinImages(token, formData);
      const res = await predictSkin(image_urls);

      if (res?.message === "no acne detected") {
        toast("No acne detected");
        setPredictionData(null);
        return;
      }

      setPredictionData(res);
    } catch (err) {
      console.error(err);
      toast.error("Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  const getQuestionsForGrades = (grades) => {
    return acneQuestions.questions.filter((q) =>
      q.grades.some((g) => grades.includes(g))
    );
  };

  const handleAnswer = (qIdx, answer) => {
    setFormAnswers((prev) => ({ ...prev, [qIdx]: answer }));
  };

  const getCurrentHeading = () => {
  if (!predictionData) return {
    title: "AI-Powered Skin Diagnosis",
    subtitle: "Upload images and answer questions to help our AI give you the most accurate result."
  };

  if (predictionData && !finalGrade) return {
    title: "Answer a Few Questions",
    subtitle: "Our model detected acne. Answer some quick questions to refine the grade."
  };

  return {
    title: "Diagnosis Complete",
    subtitle: "Here is your final acne grade based on image and form analysis."
  };
};


  const calculateFinalGrade = () => {
    const gradeScores = {};
    const grades = predictionData.top_two_grades.map(([g]) => g);
    const filteredQuestions = getQuestionsForGrades(grades);

    filteredQuestions.forEach((q, idx) => {
      const selected = formAnswers[idx];
      if (!selected) return;

      const match = Object.entries(q.answers).find(([, ans]) => ans === selected);
      if (match) {
        const [grade] = match;
        gradeScores[grade] = (gradeScores[grade] || 0) + q.weight;
      }
    });

    const finalFormScore = Object.entries(gradeScores).map(([grade, formScore]) => {
      const modelProb = predictionData.top_two_grades.find(([g]) => g.toString() === grade)?.[1] || 0;
      const average = (modelProb + formScore * 100) / 2;
      return { grade: parseInt(grade), average };
    });

    finalFormScore.sort((a, b) => b.average - a.average);
    setFinalGrade(finalFormScore.length ? finalFormScore[0].grade : null);
  };

  const grades = predictionData ? predictionData.top_two_grades.map(([g]) => g) : [];
  const filteredQuestions = predictionData ? getQuestionsForGrades(grades) : [];
  const { title, subtitle } = getCurrentHeading();

  return (
    <div className="min-h-screen bg-gradient-to-br from-richblue-900 via-richblack-900 to-richblue-800 text-richblack-5 px-4 sm:px-6 py-10 rounded-md">
     <h2 className="text-3xl sm:text-4xl mb-2 font-bold tracking-tight text-caribbeangreen-300">
    {title}
    </h2>
    <p className="mb-6 text-richblack-300 text-lg">
  {subtitle}
    </p>


      {!predictionData && (
        <ImageUploader
          images={images}
          previewUrls={previewUrls}
          handleImageChange={handleImageChange}
          handleRemoveImage={handleRemoveImage}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      )}

      {predictionData && !finalGrade && (
        <AcneQuestionnaire
          questions={filteredQuestions}
          formAnswers={formAnswers}
          handleAnswer={handleAnswer}
          onSubmit={calculateFinalGrade}
        />
      )}

      {finalGrade && (
        <PredictionResult
  grade={finalGrade}
  imageUrls={predictionData.OD_images}
  detailedResults={predictionData.detailed_results}
  acneType={predictionData.type}
  typeProbability={predictionData.type_probability}
  gradeProbability={
    predictionData.top_two_grades.find(([g]) => g === finalGrade)?.[1] || 0
  }
/>

      )}
    </div>
  
  );
}
