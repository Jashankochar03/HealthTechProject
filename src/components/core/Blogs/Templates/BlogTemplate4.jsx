// components/core/Blogs/templates/BlogTemplate4.jsx
import React from "react";

export default function BlogTemplate4({
  title,
  content,
  images,
  creator,
  createdAt,
  category,
}) {
  const paragraphs = content
    .replace(/\\n/g, "\n")
    .split("\n")
    .filter(Boolean);

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
      {images[0] && (
        <img
          src={images[0]}
          alt="blog-img-1"
          className="w-full max-h-[500px] object-cover rounded-md shadow-lg"
        />
      )}

      {/* Content with Floating Images */}
      <div className="prose prose-invert prose-lg max-w-none text-richblack-200 leading-relaxed mt-6 space-y-6">
        {paragraphs.map((para, idx) => {
          // Insert image[1] after paragraph 2 with float-left
          if (idx === 2 && images[1]) {
            return (
              <p key={idx} className="relative">
                <img
                  src={images[1]}
                  alt="blog-img-2"
                  className="float-left mr-6 mb-2 w-full sm:w-1/3 h-60 object-cover rounded-md shadow-lg"
                />
                {para}
              </p>
            );
          }

          // Insert image[2] after paragraph 4 with float-right
          else if (idx === 4 && images[2]) {
            return (
              <p key={idx} className="relative">
                <img
                  src={images[2]}
                  alt="blog-img-3"
                  className="float-right ml-6 mb-2 w-full sm:w-1/3 h-60 object-cover rounded-md shadow-lg"
                />
                {para}
              </p>
            );
          }

          // Regular paragraph
          else {
            return <p key={idx}>{para}</p>;
          }
        })}
      </div>

      {/* Final Centered Image */}
      {images[3] && (
        <img
          src={images[3]}
          alt="blog-img-4"
          className="w-full max-h-[400px] object-cover rounded-md shadow-lg mt-10"
        />
      )}
    </div>
  );
}
