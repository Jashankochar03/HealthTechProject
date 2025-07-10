const mongoose = require("mongoose");

const diseaseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: { 
    type: String 
  },
  diseases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
    },
  ],
});

module.exports = mongoose.model("DiseaseCategory", diseaseCategorySchema);
