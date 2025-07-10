import { useState } from "react";
import SkinModel from "../components/core/HealthAI/SkinModel";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const DiabeticModel = () => (
  <div className="bg-richblack-700 p-6 rounded-md shadow text-richblack-5">
    <h2 className="text-2xl font-bold mb-2 text-caribbeangreen-300">🧬 Metabolic Disease Screening</h2>
    <p className="text-richblack-200">Please proceed with diabetes or hypertension-related analysis.</p>
  </div>
);

const questions = [
  {
    id: 1,
    question: "Do you have any visible skin issues (acne, redness, rashes)?",
    type: "yesno",
    onYes: ["acne", "rosacea"],
    onNo: [],
  },
  {
    id: 2,
    question: "Do you experience excessive thirst or frequent urination?",
    type: "yesno",
    onYes: ["diabetes"],
    onNo: [],
  },
  {
    id: 3,
    question: "Do you often feel dizzy or have high blood pressure?",
    type: "yesno",
    onYes: ["hypertension"],
    onNo: [],
  },
  {
    id: 4,
    question: "Is your skin condition mostly around your cheeks and nose?",
    dependsOn: "acne",
    type: "yesno",
    onYes: ["rosacea"],
    onNo: [],
  },
  {
    id: 5,
    question: "Do you have sudden vision problems or blurred vision?",
    type: "yesno",
    onYes: ["diabetes", "hypertension"],
    onNo: [],
  },
  {
    id: 6,
    question: "Do you experience frequent headaches or chest pain?",
    type: "yesno",
    onYes: ["hypertension"],
    onNo: [],
  },
  {
    id: 7,
    question: "Do you experience tingling in your hands or feet?",
    type: "yesno",
    onYes: ["diabetes"],
    onNo: [],
  },
  {
    id: 8,
    question: "Do you notice frequent flushing or warmth on your face?",
    type: "yesno",
    onYes: ["rosacea"],
    onNo: [],
  },
];

export default function PreConsultationForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDiseases, setSelectedDiseases] = useState(new Set());
  const [formCompleted, setFormCompleted] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleAnswer = (answer) => {
    const question = questions[currentIndex];
    const newDiseases = new Set(selectedDiseases);

    if (answer === "yes" && question.onYes) {
      question.onYes.forEach((disease) => newDiseases.add(disease));
    }

    setSelectedDiseases(newDiseases);

    let nextIndex = currentIndex + 1;
    while (
      nextIndex < questions.length &&
      questions[nextIndex].dependsOn &&
      !newDiseases.has(questions[nextIndex].dependsOn)
    ) {
      nextIndex++;
    }

    if (nextIndex >= questions.length) {
      setTransitioning(true); // Start transition
      setTimeout(() => {
        setFormCompleted(true);
        setTransitioning(false); // End transition after delay
      }, 1000); // 1 second delay
    } 
 else {
      setCurrentIndex(nextIndex);
    }
  };

  const renderFinalForm = () => {
    const diseases = Array.from(selectedDiseases);
    const hasSkinDisease = diseases.includes("acne") || diseases.includes("rosacea");
    const hasMetabolicDisease = diseases.includes("diabetes") || diseases.includes("hypertension");

    if (!hasSkinDisease && !hasMetabolicDisease) {
      return (
        <div className="text-pink-200 text-lg bg-richblack-900 border-richblack-600 rounded-lg shadow-lg p-8 transition-all duration-300 p-4 rounded-md shadow mt-6">
          ⚠️ No matching condition found. Please consult a doctor for further guidance.
        </div>
      );
    }

    return (
      <div className="space-y-8 mt-8">
        {hasSkinDisease && <SkinModel />}
        {hasMetabolicDisease && <DiabeticModel />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-richblack-900 via-blue-900 to-sky-500  text-richblack-900">
      <div className="max-w-4xl mx-auto">
        {/* Dynamic Heading with Subtitle */}
<div className="mb-10">
  <h1 className="text-4xl font-bold text-white mt-10">
    {formCompleted
      ? selectedDiseases.has("acne") || selectedDiseases.has("rosacea")
        ? selectedDiseases.has("diabetes") || selectedDiseases.has("hypertension")
          ? "🩺 Skin & Metabolic Screening"
          : "🧴 Acne Screening"
        : "🧬 Metabolic Screening"
      : "🩺 Pre-Consultation Form"}
  </h1>

  <p className="text-richblack-300 mt-2 text-lg">
    {formCompleted
      ? selectedDiseases.has("acne") || selectedDiseases.has("rosacea")
        ? selectedDiseases.has("diabetes") || selectedDiseases.has("hypertension")
          ? "Based on your inputs, both skin and metabolic conditions will be analyzed."
          : "We'll now proceed to analyze your skin condition using AI."
        : "We'll now proceed with metabolic screening for diabetes or hypertension."
      : "Please answer a few questions to help us understand your symptoms."}
  </p>
  </div>

        {!formCompleted && !transitioning ? (
          <div className="space-y-6 bg-richblack-900 border-richblack-600 rounded-lg shadow-lg p-8 transition-all duration-300">
            <div className="text-xl font-medium text-white">
              {questions[currentIndex].question}
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <button
                className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 bg-caribbeangreen-600 hover:bg-caribbeangreen-700 text-white rounded-md font-semibold transition"
                onClick={() => handleAnswer("yes")}
              >
                <FaCheckCircle /> Yes
              </button>
              <button
                className="w-full sm:w-auto flex items-center gap-2 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-semibold transition"
                onClick={() => handleAnswer("no")}
              >
                <FaTimesCircle /> No
              </button>
            </div>

            <div className="w-full bg-richblack-700 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-caribbeangreen-400 transition-all duration-500"
                style={{
                  width: `${((currentIndex) / questions.length) * 100}%`,
                }}
              />
            </div>
            <p className="text-sm text-richblack-300 text-right">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        ) :transitioning ? (
      <div className="text-center mt-8 animate-fade-in text-richblack-100 text-lg">
      Preparing your personalized diagnosis...
    </div>
    ) : (
  <div className="mt-8">{renderFinalForm()}</div>
  )}
      </div>
    </div>
  );
}
