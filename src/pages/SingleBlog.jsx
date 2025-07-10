import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetails } from "../services/operations/blogAPI";
import BlogTemplate0 from "../components/core/Blogs/Templates/BlogTemplate0";
import BlogTemplate1 from "../components/core/Blogs/Templates/BlogTemplate1";
import BlogTemplate2 from "../components/core/Blogs/Templates/BlogTemplate2";
import BlogTemplate3 from "../components/core/Blogs/Templates/BlogTemplate3";
import BlogTemplate4 from "../components/core/Blogs/Templates/BlogTemplate4";
import BlogTemplate5 from "../components/core/Blogs/Templates/BlogTemplate5";
import BlogTemplate6 from "../components/core/Blogs/Templates/BlogTemplate6";

export default function SingleBlog() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetchBlogDetails(blogId);
        setBlog(res.blogDetails);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (loading) return <div className="text-center py-20 text-richblack-200">Loading blog...</div>;
  if (!blog) return <div className="text-center py-20 text-pink-300">Blog not found</div>;

  const count = blog.images?.length || 0;

  const templateProps = {
    title: blog.blogName,
    content: blog.blogData,
    images: blog.images,
    creator: blog.creator,
    createdAt: blog.createdAt,
    category: blog.category
  };

  switch (count) {
    case 0:
      return <BlogTemplate0 {...templateProps} />;
    case 1:
      return <BlogTemplate1 {...templateProps} />;
    case 2:
      return <BlogTemplate2 {...templateProps} />;
    case 3:
      return <BlogTemplate3 {...templateProps} />;
    case 4:
      return <BlogTemplate4 {...templateProps} />;
    case 5:
      return <BlogTemplate5 {...templateProps} />;
    case 6:
      return <BlogTemplate6 {...templateProps} />;
    default:
      return <BlogTemplate6 {...templateProps} />;
  }
}
