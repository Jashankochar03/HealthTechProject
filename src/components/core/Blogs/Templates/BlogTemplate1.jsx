// components/core/Blogs/templates/BlogTemplate1.jsx
import React from "react";

export default function BlogTemplate1({
  title,
  content,
  images,
  creator,
  createdAt,
  category,
}) {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6 text-richblack-100 space-y-10">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-caribbeangreen-400">
        {title}
      </h1>

      {/* Meta Info */}
      <div className="text-richblack-300 text-sm">
        By{" "}
        <span className="text-yellow-300 font-medium">
          {creator?.firstName} {creator?.lastName}
        </span>{" "}
        • {new Date(createdAt).toLocaleDateString()} • {category.name}
      </div>

      {/* Hero Image */}
      <img
        src={images[0]}
        alt="blog"
        className="w-full max-h-[500px] object-cover rounded-md shadow-lg"
      />

      {/* Content */}
 <div className="prose prose-invert prose-lg max-w-none text-richblack-200 leading-relaxed mt-6">
  {content
    .replace(/\\n/g, '\n')
    .split('\n')
    .map((para, idx) => (
      <p key={idx} className="mb-4">
        {para}
      </p>
    ))}
</div>

    </div>
  );
}
