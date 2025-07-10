import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiconnector"
import { endpoints } from "../ml_apis"
import { healthEndpoints } from "../apis"
const {
    PREDICT_API
} = endpoints

const {
UPLOAD_SKIN_IMAGES
} = healthEndpoints

export async function predictSkin(image_urls) {
  const toastId = toast.loading("Model running, Please Wait...");
  try {
    const response = await apiConnector(
      "POST",
      PREDICT_API,
      {image_urls:image_urls}, // body
      {
        "Content-Type": "application/json",
      }
    );

    console.log("PREDICT API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Model Run Successful");
    toast.dismiss(toastId);
    return response.data;
  } catch (error) {
    console.log("PREDICT API ERROR............", error);
    toast.dismiss(toastId);
    toast.error("Model run Failed");
  }
}




export async function uploadSkinImages(token, formData) {
  const toastId = toast.loading("Uploading images...");
  try {
    const response = await apiConnector(
      "POST",
      UPLOAD_SKIN_IMAGES,
      formData,
      {
        Authorization: `Bearer ${token}`,
        // ✅ Don't set Content-Type manually when using FormData
      }
    );

    console.log("UPLOAD SKIN IMAGES API RESPONSE............", response.data.imageUrls);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Images Uploaded Successfully");

    // ✅ fixed: access imageUrls inside response.data
    return response.data.imageUrls;
  } catch (error) {
    console.log("UPLOAD SKIN IMAGES API ERROR............", error);
    toast.error("Could Not Upload Images");
  } finally {
    toast.dismiss(toastId);
  }
}
