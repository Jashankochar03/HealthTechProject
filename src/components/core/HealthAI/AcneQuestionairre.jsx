import { useState, useEffect } from "react";

export default function AcneQuestionnaire({ questions, formAnswers, handleAnswer, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);

  const handleOptionSelect = (option) => {
    // Hide current question with transition
    setShowQuestion(false);

    setTimeout(() => {
      handleAnswer(currentQuestionIndex, option);
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setShowQuestion(true); // Reveal next question
      } else {
        onSubmit();
      }
    }, 300); // 300ms transition delay
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="mt-8 w-full max-w-2xl mx-auto space-y-6 transition-all duration-300">
      <h3 className="text-2xl font-bold text-center text-richblack-25">
        Help us understand your skin better
      </h3>

      {/* Transition Wrapper */}
      <div
        className={`bg-richblack-900 p-6 sm:p-8 rounded-lg shadow-lg transition-opacity transform duration-300 ${
          showQuestion ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <p className="text-lg sm:text-xl text-richblack-100 mb-6 font-medium text-center">
          {currentQuestion.question}
        </p>

        <div className="flex flex-col gap-4 items-start sm:px-4">
          {currentQuestion.options.map((option, i) => (
            <label
              key={i}
              className="flex items-center gap-3 p-3 w-full bg-richblack-800 rounded-md cursor-pointer transition hover:bg-caribbeangreen-700 hover:text-white text-richblack-300"
            >
              <input
                type="radio"
                name={`q-${currentQuestionIndex}`}
                value={option}
                checked={formAnswers[currentQuestionIndex] === option}
                onChange={() => handleOptionSelect(option)}
                className="w-4 h-4 accent-caribbeangreen-500"
              />
              <span className="text-sm sm:text-base">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
