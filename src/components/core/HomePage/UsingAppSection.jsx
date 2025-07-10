import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button";
import Know_your_progress from "../../../assets/Images/KnowaboutDisease.png";
import Compare_with_others from "../../../assets/Images/MakePersonalizedPlans.png";
import Plan_your_lessons from "../../../assets/Images/KnowYourProgress.png";

const UsingAppSection = () => {
  return (
    <div>
        <div className="text-4xl font-semibold text-center my-10">
            Your all-in-one solution for
            <HighlightText text={"smarter health decisions"} />
            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Track vitals, predict diseases early, monitor your health journey, follow personalized recommendations, and connect with doctors — all in one place.
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 mt-10">
              <img
                src={Know_your_progress}
                alt="Know about disease"
                className="object-contain w-[300px] h-[300px]"
              />
              <img
                src={Compare_with_others}
                alt="Make personalized plans"
                className="object-contain w-[300px] h-[300px]"
              />
              <img
                src={Plan_your_lessons}
                alt="Track your progress"
                className="object-contain w-[300px] h-[300px]"
              />
            </div>

          </div>

          <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>
    </div>
  )
}

export default UsingAppSection