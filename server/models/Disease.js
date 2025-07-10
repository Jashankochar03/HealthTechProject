const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  creator: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
  totalSeverityGrades: {
    type: Number,
    required: true,
  },
  subVariants: [
    {
      type: String, // e.g., "Type 1", "Type 2", "Papulopustular", etc.
      trim: true,
    }
  ],
  category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "DiseaseCategory",
  required: true,
  },
  patients: [
  {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
],
  commonSymptoms :[{
    type: String
  }],
  status: {
		type: String,
		enum: ["Draft", "Published"],
	},
  genderSpecific: {
    type: String,
    enum: ["Male Only", "Female Only", "Both"],
    default : "Both"
  },
  thumbnail: {
		type: String,
	}
});

module.exports = mongoose.model("Disease", diseaseSchema);
