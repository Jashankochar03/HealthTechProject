import React from 'react'
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import Doctor_Image from "../../../assets/Images/Doctor_Image.png";
import HighlightText from './HighlightText';

const DoctorSection = () => {
  return (
    <div>
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-[50%]">
            <img
              src={Doctor_Image}
              alt=""
              className="shadow-white shadow-[-15px_-15px_0_0] w-[450px] h-[500px]"
            />
          </div>
          <div className="lg:w-[50%] flex gap-10 flex-col">
            <h1 className="lg:w-[50%] text-4xl font-semibold ">
              Join as a
              <HighlightText text={"Certified Doctor"} />
            </h1>

            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
             Collaborate with us to transform digital healthcare. Help users access AI-powered
            diagnostics, share expert insights, and be a part of the future of accessible health.
            </p>

            <div className="w-fit">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Join Our Medical Network
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
    </div>
  )
}

export default DoctorSection