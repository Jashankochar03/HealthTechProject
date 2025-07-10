const Profile = require("../models/Profile")
const HealthRecords = require("../models/HealthRecords")

const Disease = require("../models/Disease")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")
// Method for updating a profile
exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body
    const id = req.user.id

    // Find the profile by id
    const userDetails = await User.findById(id)
    const profile = await Profile.findById(userDetails.additionalDetails)

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    })
    await user.save()

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth
    profile.about = about
    profile.contactNumber = contactNumber
    profile.gender = gender

    // Save the updated profile
    await profile.save()

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()

    return res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
    console.log(id)
    const user = await User.findById({ _id: id })
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })
    for (const diseaseId of user.diseases) {
      await Disease.findByIdAndUpdate(
        diseaseId,
        { $pull: { patients: id } },
        { new: true }
      )
    }
    // Now Delete User
    await User.findByIdAndDelete({ _id: id })
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
    await HealthRecords.deleteMany({ userId: id })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec()
    console.log(userDetails)
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getHealthRecords = async(req,res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "healthRecords",
        populate: {
          path: "disease doctor",
        },
      })
      .exec()
    

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    userDetails = userDetails.toObject()

    for (let i = 0; i < userDetails.healthRecords.length; i++) {
  const record = userDetails.healthRecords[i];
  const { initialGrade, currentGrade } = record;

  let progress = 0;

  if (initialGrade && initialGrade > 0) {
    progress = ((initialGrade - currentGrade) / initialGrade) * 100;
    // Clamp between 0 and 100
    progress = Math.max(0, Math.min(100, progress));
  } else if (currentGrade === 0) {
    progress = 100; // Fully recovered
  }

  // Round to 2 decimal places
  userDetails.healthRecords[i].progressPercentage = Math.round(progress * 100) / 100;
  }


    return res.status(200).json({
      success: true,
      data: userDetails.healthRecords,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.DoctorDashboard = async (req, res) => {
  try {
    const diseaseDetails = await Disease.find({ creator: req.user.id })

    const diseaseData = diseaseDetails.map((disease) => {
      const totalPatients = disease.patients.length


      const diseaseDataWithStats = {
        _id: disease._id,
        name: disease.name,
        diseaseDescription: disease.description,
        totalPatients
      }

      return diseaseDataWithStats
    })
    res.status(200).json({ diseases: diseaseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
  }
}