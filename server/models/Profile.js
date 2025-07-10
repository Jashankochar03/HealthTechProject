const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: Number,
		trim: true,
	},
	currentDiseases: [
		{
			type: String,
			enum: [
				// Diabetes and related
				"Diabetes",
				"Neuropathy",
				"Nephropathy",
				"Retinopathy",

				// Hypertension and related
				"Hypertension",
				"Heart Disease",
				"Stroke",
				"Chronic Kidney Disease",

				// Acne and related
				"Acne",
				"Hormonal Imbalance",
				"Polycystic Ovary Syndrome (PCOS)",

				// Rosacea and related
				"Rosacea",
				"Blepharitis",
				"Rhinophyma",
				"Seborrheic Dermatitis",

				// General
				"None"
			],
		}
	],
});

module.exports = mongoose.model("Profile", profileSchema);
