import React from 'react'
import { Link } from 'react-router-dom'
import errorGif from "../assets/Images/error_page.gif" // replace with your actual gif path

const Error = () => {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-richblack-900 text-white px-4 text-center">
      <img
        src={errorGif}
        alt="Under Development"
        className="w-[300px] h-[300px] object-contain mb-6"
      />
      <h1 className="text-4xl font-bold text-healthgreen-300 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-richblack-300 text-lg mb-6 max-w-[500px]">
        Sorry for the inconvenience. This page is currently under development and will be available soon. Thank you for your patience.
      </p>
      <Link to="/">
        <button className="px-6 py-2 rounded-md bg-healthgreen-600 hover:bg-healthgreen-500 text-white font-semibold shadow-md">
          Go back to Home
        </button>
      </Link>
    </div>
  )
}

export default Error
