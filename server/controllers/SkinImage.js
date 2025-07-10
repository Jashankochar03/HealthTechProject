const SkinImage = require("../models/SkinImages");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.uploadSkinImages = async (req, res) => {
  try {
    const userId = req.user.id;
    let files = req.files?.images;
    console.log("Files Received:", req.files);
    if (!files) {
      return res.status(400).json({ success: false, message: "No images uploaded" });
    }

    // If only one image is uploaded, wrap it in an array
    if (!Array.isArray(files)) {
      files = [files];
    }

    if (files.length < 1 || files.length > 6) {
      return res.status(400).json({
        success: false,
        message: "Upload minimum 1 and maximum 6 images",
      });
    }

    const imageUrls = [];

    for (const file of files) {
      const uploadedImage = await uploadImageToCloudinary(file, "skin-diagnosis");
      imageUrls.push(uploadedImage.secure_url);
    }

    const record = await SkinImage.create({
      user: userId,
      imageUrls: imageUrls,
    });

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      imageUrls: record.imageUrls,
      recordId: record._id,
    });
  } catch (err) {
    console.error("Image upload error:", err);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: err.message,
    });
  }
};
