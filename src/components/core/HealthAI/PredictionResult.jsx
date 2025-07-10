export default function PredictionResult({
  grade,
  imageUrls = [],
  detailedResults = [],
  acneType,
  typeProbability,
  gradeProbability,
}) {
  return (
    <div className="mt-10 p-6 rounded shadow bg-richblack-900 border border-richblack-700 space-y-8">
      <h2 className="text-2xl font-bold text-caribbeangreen-400">
        Analysis Summary
      </h2>

      {/* Image Grid with Analysis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageUrls.map((url, idx) => {
          const result = detailedResults[idx] || {};
          const {
            assigned_grade,
            type_result,
            type_probability,
            image_url,
            index,
            ...lesionCounts // Only lesion type counts
          } = result;

          return (
            <div
              key={idx}
              className="bg-richblack-800 p-4 rounded-md shadow-md text-richblack-100"
            >
              <img
                src={url}
                alt={`Analyzed Image ${idx + 1}`}
                className="w-full h-32 object-cover rounded mb-3 shadow"
              />

              <h4 className="font-semibold text-richblack-25 mb-1">Image {idx + 1}</h4>
              <div className="text-sm space-y-1 mb-3 text-richblack-300">
                <p>
                  <span className="text-caribbeangreen-400">Assigned Grade:</span>{" "}
                  {assigned_grade}
                </p>
                <p>
                  <span className="text-caribbeangreen-400">Acne Type:</span>{" "}
                  {type_result}
                </p>
                <p>
                  <span className="text-caribbeangreen-400">Type Probability:</span>{" "}
                  {type_probability?.toFixed(2)}%
                </p>
              </div>

              {/* Lesion type counts */}
              {Object.keys(lesionCounts).length > 0 && (
                <>
                  <h5 className="font-medium text-richblack-50 mb-1">Lesion Counts</h5>
                  <ul className="list-disc list-inside text-sm text-richblack-300">
                    {Object.entries(lesionCounts).map(([type, count]) => (
                      <li key={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}: {count}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Summary */}
      <div className="bg-richblack-800 p-5 rounded-md shadow-md space-y-3 text-richblack-100">
        <p>
          <span className="font-semibold text-caribbeangreen-400">Final Acne Type:</span>{" "}
          {acneType}{" "}
          <span className="text-richblack-100">({typeProbability?.toFixed(1)}%)</span>
        </p>
        <p>
          <span className="font-semibold text-caribbeangreen-400">Final Acne Grade:</span>{" "}
          {grade}{" "}
          <span className="text-richblack-100">({gradeProbability?.toFixed(1)}%)</span>
        </p>
      </div>
    </div>
  );
}
