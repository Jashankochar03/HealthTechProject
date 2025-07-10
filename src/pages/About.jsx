import React from "react"

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
// import Footer from "../components/common/Footer"
import ContactFormSection from "../components/core/AboutPage/ContactFormSection"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import Quote from "../components/core/AboutPage/Quote"
import StatsComponenet from "../components/core/AboutPage/Stats"
import HighlightText from "../components/core/HomePage/HighlightText"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div>
      <section className="bg-gradient-to-r from-richblack-900 via-blue-900 to-sky-500 ">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto py-20 text-4xl font-semibold lg:w-[70%]">
            Empowering Health Through
            <HighlightText text={"Technology and Compassion"} />
            <p className="mx-auto mt-3 text-center text-base font-medium text-pure-greys-100 lg:w-[95%]">
              We are building smarter, accessible healthcare solutions through AI-driven diagnostics, data-powered platforms, and community-centered care.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={BannerImage1} alt="" />
            <img src={BannerImage2} alt="" />
            <img src={BannerImage3} alt="" />
          </div>
        </div>
      </section>

      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="text-white text-4xl font-semibold lg:w-[70%] border-b-4 border-healthgreen-200 inline-block ">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-pure-greys-100 lg:w-[95%]">
                 Our journey began with a mission to solve critical healthcare challenges using technology. From delays in diagnosis to fragmented records, we knew technology could bridge gaps and save lives..
              </p>
              <p className="text-base font-medium text-pure-greys-100 lg:w-[95%]">
                With a deep sense of purpose, we envisioned a future where AI and data-driven tools empower timely, accurate, and inclusive healthcare for all. Through intelligent platforms, real-time insights, and community-focused innovation, we're transforming the way healthcare is delivered.
              </p>
            </div>

            <div>
              <img
                src={FoundingStory}
                alt=""
                className="shadow-[0_0_20px_0] shadow-[#FC6767]"
              />
            </div>
          </div>
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="text-white text-4xl font-semibold lg:w-[70%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                Our Vision
              </h1>
              <p className="text-base font-medium text-pure-greys-100 lg:w-[95%]">
                  With this vision in mind, we embarked on a mission to redefine healthcare through intelligent, technology-driven solutions. Our passionate team of engineers, clinicians, and designers worked tirelessly to develop a powerful yet intuitive platform—blending data science, AI, and user-centered design. We envisioned a system that not only simplifies diagnosis and record management but also empowers individuals with actionable insights into their health. By combining cutting-edge innovation with a deep understanding of human needs, we strive to make healthcare more connected, accessible, and proactive for everyone.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-pure-greys-100 lg:w-[95%]">
                Our mission is to transform healthcare into a system that is intelligent, proactive, and deeply patient-centric. We harness the power of machine learning, real-time health data, and intuitive digital experiences to equip patients with personalized insights and equip healthcare professionals with smarter decision-making tools. Beyond just treating symptoms, we aim to anticipate health risks, reduce delays in care, and foster trust through transparent, accessible technology. By bridging the gap between advanced AI and human empathy, we envision a future where every individual receives the right care at the right time—seamlessly and meaningfully.

              </p>
            </div>
          </div>
        </div>
      </section>

      <StatsComponenet />
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white">
        <LearningGrid />
        <ContactFormSection />
      </section>

      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
        <ReviewSlider />
      </div>
      {/* <Footer /> */}
      <Footer />
    </div>
  )
}

export default About