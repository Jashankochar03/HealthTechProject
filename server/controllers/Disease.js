const Disease = require("../models/Disease")
const DiseaseCategory = require("../models/DiseaseCategory")
const User = require("../models/User")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const HealthRecords = require("../models/HealthRecords")

// Function to create a new disease
exports.createDisease = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id


    // Get all required fields from request body
    let {
      name,
      description,
      totalSeverityGrades,
      subVariants,
      commonSymptoms,
      genderSpecific,
      category,
      status
    } = req.body
    // Get thumbnail image from request files
    console.log(name)
    const thumbnail = req.files.thumbnail;

    // Check if any of the required fields are missing
    if (
      !name ||
      !description ||
      !totalSeverityGrades ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      })
    }

    // Check if the user is an instructor
    const DoctorDetails = await User.findOne({ _id: userId, accountType: "Doctor" })


    if (!DoctorDetails) {
      return res.status(404).json({
        success: false,
        message: "Doctor Details Not Found",
      })
    }

    if (!status || status === undefined) {
      status = "Draft"
    }
    if (!genderSpecific || genderSpecific === undefined) {
      genderSpecific = "Both"
    }
    // Check if the tag given is valid
    const categoryDetails = await DiseaseCategory.findOne({ name: category.trim() })
    // console.log(categoryDetails._id)
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      })
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    )
    console.log(thumbnailImage)
    // Create a new course with the given details
    const newDisease = await Disease.create({
      name,
      description,
      creator: DoctorDetails._id,
      totalSeverityGrades,
      subVariants,
      genderSpecific:genderSpecific,
      commonSymptoms:commonSymptoms,
      category: categoryDetails._id,
      status,
      thumbnail: thumbnailImage.secure_url,
    })

    // Add the new course to the Categories
    const categoryDetails2 = await DiseaseCategory.findByIdAndUpdate(
      { _id: categoryDetails._id },
      {
        $push: {
        diseases : newDisease._id,
        },
      },
      { new: true }
    )
      //Add disease to the doctor's id 
        const doctorDetails2 = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: {
        addedDisease : newDisease._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    // Return the added disease and a success message
    res.status(200).json({
      success: true,
      data: newDisease,
      message: "Disease added Successfully",
    })
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to add disease",
      error: error.message,
    })
  }
}

exports.editDisease = async (req, res) => {
  try {
    const { diseaseId } = req.body
    const updates = req.body
    const disease = await Disease.findById(diseaseId)

    if (!disease) {
      return res.status(404).json({ error: "Disease not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnail
      const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
      )
      disease.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    const allowedUpdates = [
      "name",
      "description",
      "totalSeverityGrades",
      "subVariants",
      "genderSpecific",
      "commonSymptoms",
      "status",
      "category"
    ]

    allowedUpdates.forEach((field) => {
      if (updates[field] !== undefined) {
        disease[field] = updates[field]
      }
    })

    await disease.save()

    const updatedDisease = await Disease.findOne({
      _id: diseaseId,
    })
      .populate({
        path: "creator",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .exec()

    res.json({
      success: true,
      message: "Disease updated successfully",
      data: updatedDisease,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}



exports.getAllDiseases = async (req, res) => {
  try {
    const allDiseases = await Disease.find(
      { status: "Published" },
      {
        name: true,
        description: true,
        totalSeverityGrades:true,
        subVariants:true,
        category:true,
        genderSpecific:true,
        commonSymptoms:true,
        thumbnail: true,
        creator: true,
        patients: true,
      }
    )
      .populate("category")
      .exec()

    return res.status(200).json({
      success: true,
      data: allDiseases,
    })
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Disease Data`,
      error: error.message,
    })
  }
}


exports.getDiseaseDetails = async (req, res) => {
  try {
    const { diseaseId } = req.body
    const diseaseDetails = await Disease.findOne({
      _id: diseaseId,
    })
      .populate({
        path: "creator",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "patients",
        populate: {
          path: "additionalDetails"
        },
      })
      .exec()

    if (!diseaseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find disease with id: ${diseaseId}`,
      })
    }


    return res.status(200).json({
      success: true,
      data: {
        diseaseDetails,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.createHealthRecord = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      disease,
      diseaseSubVariant,
      assignedDoctor,
      currentGrade,
    } = req.body;

    if (!disease || !diseaseSubVariant || !currentGrade) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }

    // Find disease by name
    const diseaseDetails = await Disease.findOne({ name: disease.trim() });
    if (!diseaseDetails) {
      return res.status(404).json({
        success: false,
        message: "Disease Not Found",
      });
    }

    // Validate currentGrade against max severity
    if (currentGrade > diseaseDetails.totalSeverityGrades) {
      return res.status(400).json({
        success: false,
        message: `Current grade (${currentGrade}) cannot exceed total severity grades (${diseaseDetails.totalSeverityGrades})`,
      });
    }

    // Find doctor by first name
    const doctorDetails = await User.findOne({ firstName: assignedDoctor.trim() });
    if (!doctorDetails) {
      return res.status(404).json({
        success: false,
        message: "Doctor Not Found",
      });
    }

    // Check if record already exists for this user and disease
    let existingRecord = await HealthRecords.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      disease: diseaseDetails._id,
    });

    if (existingRecord) {
      // If it exists, update it
      existingRecord.currentGrade = currentGrade;
      existingRecord.diseaseSubVariant = diseaseSubVariant;
      existingRecord.doctor = doctorDetails._id;
      await existingRecord.save();

      return res.status(200).json({
        success: true,
        data: existingRecord,
        message: "Health record updated successfully",
      });
    }

    // Otherwise, create new record
    const newRecord = await HealthRecords.create({
      userId: new mongoose.Types.ObjectId(userId),
      disease: diseaseDetails._id,
      doctor: doctorDetails._id,
      currentGrade,
      initialGrade: currentGrade,
      diseaseSubVariant,
    });

    // Add user to disease's patients array
    await Disease.findByIdAndUpdate(
      diseaseDetails._id,
      {
        $addToSet: { patients: new mongoose.Types.ObjectId(userId) },
      },
      { new: true }
    );

    //add disease to patients health record array 
    await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(userId),
      {
        
        $addToSet: { healthRecords: newRecord._id },
      },
      { new: true }
    )

    return res.status(200).json({
      success: true,
      data: newRecord,
      message: "Health record created successfully",
    });

  } catch (error) {
    console.error("Error in createHealthRecord:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


exports.getCreatorAddedDisease = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const creatorId = req.user.id

    // Find all courses belonging to the instructor
    const addedDiseases = await Disease.find({
      creator: creatorId,
    }).sort({ createdAt: -1 })

    // Return the creator's blogs
    res.status(200).json({
      success: true,
      data: addedDiseases,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve creator added diseases",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteDisease = async (req, res) => {
  try {
    const { diseaseId } = req.body

    // Find the course
    const disease = await Disease.findById(diseaseId)
    if (!disease) {
      return res.status(404).json({ message: "Disease not found" })
    }

    //deletion from BlogsCategory
    await DiseaseCategory.findByIdAndUpdate(disease.category, {
      $pull: { diseases: diseaseId },
    });

    await User.findByIdAndUpdate(disease.creator, {
      $pull: { addedDisease: diseaseId },
    });

    // Delete the disease
    await Disease.findByIdAndDelete(diseaseId)

    return res.status(200).json({
      success: true,
      message: "Disease deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}