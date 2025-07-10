import React from "react";
import HighlightText from "../../../components/core/HomePage/HighlightText";
import CTAButton from "../../../components/core/HomePage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "Smart Healthcare Solutions for",
    highlightText: "Everyone, Everywhere",
    description:
      "We bring accessible, intelligent, and personalized healthcare to individuals and institutions by leveraging AI-powered diagnostics, real-time data, and expert-driven insights.",
    BtnText: "Explore Platform",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "AI-Powered Diagnoses",
    description:
      "Receive early, accurate insights into your health conditions through our machine learning models trained on diverse medical datasets.",
  },
  {
    order: 2,
    heading: "Patient-Centric Design",
    description:
      "Our tools are built around simplicity and empathy—helping patients easily understand, track, and act on their health data.",
  },
  {
    order: 3,
    heading: "Secure Health Records",
    description:
      "All your health data is stored securely and is easily accessible across devices, ensuring continuity of care and data privacy.",
  },
  {
    order: 4,
    heading: "Real-Time Monitoring",
    description:
      "Stay proactive with live health tracking features, alerts for anomalies, and seamless integrations with wearables and IoT devices.",
  },
  {
    order: 5,
    heading: "Doctor & Institution Collaboration",
    description:
      "Our system supports smooth collaboration between patients, doctors, and institutions for better diagnostics, follow-ups, and outcomes.",
  },
];


const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-gradient-to-r from-richblack-900 to-blue-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;