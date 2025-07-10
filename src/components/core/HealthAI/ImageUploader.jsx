// components/skin/ImageUploader.jsx
export default function ImageUploader({
  images,
  previewUrls,
  handleImageChange,
  handleRemoveImage,
  handleSubmit,
  loading,
}) {
    
  return (
    <div className="space-y-6">
    <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="block w-full text-sm text-richblack-400
                     file:mr-4 file:py-2 file:px-5 file:rounded-md
                    file:border-0 file:font-semibold
                    file:bg-caribbeangreen-600 file:text-white
                    hover:file:bg-caribbeangreen-700
                    transition duration-200"
        />


      <div className="flex flex-wrap gap-4">
        {previewUrls.map((url, idx) => (
          <div key={idx} className="relative w-32 h-32 rounded overflow-hidden shadow">
            <img src={url} alt={`preview-${idx}`} className="object-cover w-full h-full rounded" />
            <button
              className="absolute top-1 right-1 bg-pink-600 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-pink-700"
              onClick={() => handleRemoveImage(idx)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-caribbeangreen-600 hover:bg-caribbeangreen-700 text-white py-2 px-6 rounded-md font-medium transition"
      >
        {loading ? "Uploading..." : "Submit for Analysis"}
      </button>
    </div>
  );
}
