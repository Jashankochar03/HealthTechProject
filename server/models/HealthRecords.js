const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  disease: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disease",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  diseaseSubVariant: {
    type: String,
    trim: true,
    required: true, // or make optional if you want flexibility
  },
  initialGrade: {
    type: Number,
    required: true,
  },
  currentGrade: {
    type: Number,
    required: true,
  },
prescribedMedicine: [
  {
    name: { type: String, required: true },
    dosage: { type: String },         // e.g. "500mg"
    frequency: { type: String },      // e.g. "Twice a day"
  }
],
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("HealthRecords", healthRecordSchema);