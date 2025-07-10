// Icons Import
import { FaArrowRight } from "react-icons/fa"
import { Link } from "react-router-dom"

// Image and Video Import
import Banner from "../assets/Images/banner.mp4"
// Component Imports
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import ExploreBlogs from "../components/core/HomePage/ExploreMore"
import HighlightText from "../components/core/HomePage/HighlightText"
import DoctorSection from "../components/core/HomePage/DoctorSection"
import UsingAppSection from "../components/core/HomePage/UsingAppSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-white p-1 font-bold text-healthgreen-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-healthgreen-100">
              <p>Track your Health Now</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Well-being through
          <HighlightText text={"AI-driven Insights"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-pure-greys-25">
          Take charge of your well-being through our AI-powered diagnostic system and intelligent health trackers — all in one easy-to-access platform.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1  */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Know More About Your Health —
                <HighlightText text={"Instantly, Accurately, Intelligently."} />
              </div>
            }
            subheading={
              "Our AI system helps you understand your health conditions better through smart diagnostics, early warning alerts, and personalized recommendations — all at your fingertips"
            }
            ctabtn1={{
              btnText: "Check Your Health",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-caribbeangreen-100"}
            codeblock={`const user = {\n  age: 32,\n  symptoms: ["headache", "sensitivity to light"],\n  medicalHistory: ["migraines", "hypertension"],\n assessment: "Symptoms persistent for 3+ days",\n  modelResults: { confidence: 92.4 },\n  predictedDisease: "hypertension",\n  predictedSeverity: "Moderate",\n  predictedType: "Neurological",\n  timestamp: "2025-06-12T09:45:00Z"\n};`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[70%]">
                Start
                <HighlightText text={"tracking your health instantly"} />
              </div>
            }
            subheading={
              "With our AI-powered system, get personalized health assessments and insights as soon as you log in — no waiting, just real-time analysis and tracking."
            }
            ctabtn1={{
              btnText: "Continue Assessment",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`const acneReport = {\n  patientId: "ACNE049",\n  age: 21,\n  skinType: "Oily",\n  symptoms: ["pimples", "blackheads"],\n  triggers: ["stress", "sugar"],\n  aiDiagnosis: "Moderate Acne Vulgaris",\n  severityGrade: 2,\n  suggestedTreatment: ["Salicylic Acid", "Benzoyl Peroxide"],\n  followUp: "2025-07-20"};`}

            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* Explore Section */}
        <ExploreBlogs />
      </div>

      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAButton active={true} linkto={"/diseases"}>
                <div className="flex items-center gap-2">
                  Browse Diseases
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/login"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Join our mission to{" "}
              <HighlightText text={"redefine digital healthcare."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                Are you a healthcare professional passionate about AI and remote care?
                Partner with us to provide smarter care, improve outcomes, and reach
                patients wherever they are.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Send Your Resume</div>
              </CTAButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <UsingAppSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900
 text-white">
        {/* Become a Doctor section */}
        <DoctorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          What Our Users Are Saying
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Home