// components/core/Blogs/templates/BlogTemplate0.jsx
import React from "react";

export default function BlogTemplate5({
  title,
  content,
  creator,
  createdAt,
  readingTime,
}) {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6 text-richblack-100">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-caribbeangreen-400 mb-4">
        {title}
      </h1>

      {/* Meta Info */}
      <div className="text-richblack-300 text-sm mb-8">
        By{" "}
        <span className="text-yellow-300 font-medium">
          {creator?.firstName} {creator?.lastName}
        </span>{" "}
        • {new Date(createdAt).toLocaleDateString()} • {readingTime}
      </div>

      {/* Blog Content */}
      <div
        className="prose prose-invert prose-lg max-w-none text-richblack-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
