// components/core/Blogs/AddBlog.jsx
import RenderSteps from "./RenderSteps"

export default function AddBlog() {
  return (
    <div className="flex w-full items-start gap-x-6">
      {/* Main Form Area */}
      <div className="flex flex-1 flex-col">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          Add Blog
        </h1>
        <div className="flex-1">
          <RenderSteps />
        </div>
      </div>

      {/* Blog Writing Tips */}
      <div className="sticky top-10 hidden max-w-[400px] flex-1 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
        <p className="mb-8 text-lg text-richblack-5">📝 Blog Writing Tips</p>
        <ul className="ml-5 list-disc space-y-4 text-xs text-richblack-5">
          <li>Use a catchy title that summarizes your topic well.</li>
          <li>Use 1024x576 or square images for thumbnails.</li>
          <li>Separate your blog into readable paragraphs.</li>
          <li>
            Upload up to 6 high-quality images to match different templates.
          </li>
          <li>
            Use the blog builder section to write your main blog content.
          </li>
          <li>Add proper category and reading time to improve SEO.</li>
          <li>Keep blog drafts saved to avoid accidental loss.</li>
          <li>Preview the blog before publishing.</li>
        </ul>
      </div>
    </div>
  );
}
