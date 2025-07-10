import React, { useState } from "react";
import { HomePageBlogs } from "../../../data/homepage-blogs";
import BlogCard from "./BlogCard";  // assumed updated component
import HighlightText from "./HighlightText";

const tabsName = HomePageBlogs.map((category) => category.tag);

const ExploreBlogs = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [blogs, setBlogs] = useState(HomePageBlogs[0].blogs);
  const [currentCard, setCurrentCard] = useState(HomePageBlogs[0].blogs[0].title);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageBlogs.find((category) => category.tag === value);
    setBlogs(result.blogs);
    setCurrentCard(result.blogs[0].title);
  };

  return (
    <div>
      {/* Explore Blogs Section */}
      <div>
        <div className="text-4xl font-semibold text-center my-10">
          Unlock the
          <HighlightText text={"Power of Insights"} />
          <p className="text-center text-richblack-300 text-lg font-semibold mt-1">
            Explore our latest medical blogs and expert advice.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="hidden lg:flex gap-5 -mt-5 mx-auto w-max bg-white text-richblack-700 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
        {tabsName.map((ele, index) => (
          <div
            key={index}
            onClick={() => setMyCards(ele)}
            className={`text-[16px] flex flex-row items-center gap-2 ${
              currentTab === ele
                ? "bg-healthgreen-100 text-healthgreen-700 font-medium"
                : "text-richblack-700"
            } px-7 py-[7px] rounded-full transition-all duration-200 cursor-pointer hover:bg-healthgreen-100 hover:text-healthgreen-700`}
          >
            {ele}
          </div>
        ))}
      </div>

      <div className="hidden lg:block lg:h-[200px]"></div>

      {/* Blog Cards Group */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {blogs.map((ele, index) => (
          <BlogCard
            key={index}
            blogData={ele}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreBlogs;
