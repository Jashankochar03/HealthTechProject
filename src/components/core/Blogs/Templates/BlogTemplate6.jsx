// components/core/Blogs/templates/BlogTemplate6.jsx
import React from "react";

export default function BlogTemplate6({
  title,
  content,
  images,
  creator,
  createdAt,
  category,
}) {
  return (
    <div className="max-w-6xl mx-auto py-16 px-6 text-richblack-100 space-y-10">
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

      {/* Grid Layout for 6 Images */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {images.slice(0, 6).map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`blog-img-${idx + 1}`}
            className="w-full h-60 object-cover rounded-md shadow-lg"
          />
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none text-richblack-200 leading-relaxed mt-6">
        {content
          .replace(/\\n/g, "\n")
          .split("\n")
          .filter(Boolean)
          .map((para, idx) => (
            <p key={idx} className="mb-4">
              {para}
            </p>
          ))}
      </div>
    </div>
  );
}
