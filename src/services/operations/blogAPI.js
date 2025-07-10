import toast from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { blogEndpoints } from "../apis";
const {
    GET_ALL_BLOGS_API ,
    SHOW_ALL_CATEGORIES,
    GET_BLOG_DETAILS
} = blogEndpoints;

export const getAllBlogs = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_ALL_BLOGS_API)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch blogs from backend")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_BLOGS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const getAllBlogCategories = async () => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", SHOW_ALL_CATEGORIES)
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch blogs from backend")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_BLOGS API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const fetchBlogDetails = async (blogId) => {
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST",GET_BLOG_DETAILS, {
      blogId,
    })
    console.log("GET_BLOG_DETAILS API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}