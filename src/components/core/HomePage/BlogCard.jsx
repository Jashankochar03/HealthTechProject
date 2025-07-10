import React from "react";

// Icons
import { HiUser } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";

const BlogCard = ({ blogData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`w-[360px] lg:w-[30%] ${
        currentCard === blogData?.title
          ? "bg-white shadow-[12px_12px_0_0] shadow-healthgreen-100"
          : "bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900"
      } text-richblack-25 h-[300px] box-border cursor-pointer transition-all duration-300`}
      onClick={() => setCurrentCard(blogData?.title)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={`${
            currentCard === blogData?.title && "text-richblack-800"
          } font-semibold text-[20px]`}
        >
          {blogData?.title}
        </div>

        <div className="text-richblack-400 text-sm line-clamp-4">
          {blogData?.summary}
        </div>
      </div>

      <div
        className={`flex justify-between items-center ${
          currentCard === blogData?.title ? "text-blue-300" : "text-richblack-300"
        } px-6 py-3 font-medium text-[14px]`}
      >
        {/* Author */}
        <div className="flex items-center gap-2">
          <HiUser />
          <p>{blogData?.author}</p>
        </div>

        {/* Upload Date */}
        <div className="flex items-center gap-2">
          <BsCalendarDate />
          <p>{blogData?.uploadDate}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
