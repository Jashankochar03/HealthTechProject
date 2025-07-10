import React from "react";
import BlogPage from "../components/core/Blogs/BlogPage";

const Blog = () => {
  return (
    <div className="min-h-screen bg-richblack-800 text-richblack-5">
      {/* Header Section */}
      <div className="py-24 sm:py-32 text-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 px-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-caribbeangreen-400 mb-4">
          Insights & Updates
        </h2>
        <p className="text-richblack-300 text-lg max-w-2xl mx-auto">
          Stay informed with expert articles, guides, and updates from CureCatalyst’s medical intelligence team.
        </p>
      </div>

      {/* Blog List Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <BlogPage />
      </div>
    </div>
  );
};

export default Blog;
