import React, { useEffect, useState, useRef } from "react";
import BlogCards from "./BlogCards";
import { getAllBlogs,getAllBlogCategories } from "../../../services/operations/blogAPI";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs,setFilteredBlogs] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;
  const [categories, setCategories] = useState([]);
  const [activeCategory,setActiveCategory] = useState('All')
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBlogs();
        const categoryRes = await getAllBlogCategories();
          setBlogs(res);
          setFilteredBlogs(res);
          setCategories(categoryRes);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
    if (categoryName === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) => blog.category?.name === categoryName
      );
      setFilteredBlogs(filtered);
    }
  };

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    // Scroll category slider
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-richblack-900 text-richblack-5 px-4 sm:px-10 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-caribbeangreen-400">
          Explore Health & Wellness Blogs
        </h1>
        <p className="text-richblack-300 mt-2">
          Read our curated health tips, nutrition advice, and lifestyle insights.
        </p>
      </div>

      {/* Category Slider with Arrows */}
      <div className="relative flex justify-center mb-10">
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 p-2 bg-richblack-800 rounded-full hover:bg-richblack-700"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-3 px-10 py-2 scrollbar-hide"
        >
          <button
            onClick={() => handleCategoryClick("All")}
            className={`whitespace-nowrap px-4 py-2 rounded-full border font-medium transition shrink-0 ${
              activeCategory === "All"
                ? "bg-caribbeangreen-600 text-white"
                : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleCategoryClick(cat.name)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border font-medium transition shrink-0 ${
                activeCategory === cat.name
                  ? "bg-caribbeangreen-600 text-white"
                  : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 p-2 bg-richblack-800 rounded-full hover:bg-richblack-700"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Conditional Message */}
      {currentBlogs.length === 0 ? (
        <div className="text-center mt-20 text-pink-300 text-lg font-semibold animate-pulse">
          Blogs in this category are coming soon!
        </div>
      ) : (
        <>
          {/* Blog Cards */}
          <BlogCards blogs={currentBlogs} />

          {/* Pagination Dots */}
          {totalPages > 0 && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-3 h-3 rounded-full transition ${
                    currentPage === i + 1
                      ? "bg-caribbeangreen-500 scale-125"
                      : "bg-richblack-600 hover:bg-richblack-400"
                  }`}
                ></button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}