import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

export default function BlogCards({ blogs }) {
  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {blogs.map((blog) => (
        <Link
          key={blog._id}
          to={`/blogs/${blog._id}`}
          className="bg-richblack-800 hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden shadow-md group"
        >
          {/* Image */}
          <img
            src={blog.thumbnail}
            alt={blog.blogName}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="text-white text-lg font-semibold line-clamp-2 group-hover:text-caribbeangreen-200">
              {blog.blogName}
            </h3>
            {/* Description preview */}
                <p className="text-richblack-300 text-sm line-clamp-3 mb-3">
                    {blog.blogDescription}
                </p>
            <div className="text-sm text-richblack-300 flex items-center gap-2">
              <FaUser className="text-caribbeangreen-400" />
              <span>{`${blog.creator.firstName} ${blog.creator.lastName}`}</span>
            </div>

            <p className="text-sm text-richblack-400">
              Category: <span className="text-caribbeangreen-300">{blog.category.name}</span>
            </p>
            <p className="text-xs text-richblack-400 mt-1">
            Posted on: {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
            })}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
