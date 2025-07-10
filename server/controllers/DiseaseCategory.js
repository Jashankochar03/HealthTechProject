const { Mongoose } = require("mongoose");
const DiseaseCategory = require("../models/DiseaseCategory");

exports.createCategory = async (req, res) => {
	try {
		const { name, description } = req.body;

		// Validate input
		if (!name || !description) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		// Check for duplicate category name
		const existingCategory = await DiseaseCategory.findOne({ name: name.trim() });
		if (existingCategory) {
			return res.status(409).json({
				success: false,
				message: "Category with this name already exists",
			});
		}

		// Create new category
		const categoryDetails = await Category.create({
			name: name,
			description: description,
		});

		console.log("Category Created:", categoryDetails);

		return res.status(201).json({
			success: true,
			message: "Disease Category Created Successfully",
			data: categoryDetails,
		});
	} catch (error) {
		console.error("Error creating category:", error);
		return res.status(500).json({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

exports.showAllCategories = async (req, res) => {
	try {
        console.log("INSIDE SHOW ALL CATEGORIES");
		const allCategorys = await DiseaseCategory.find({});
		res.status(200).json({
			success: true,
			data: allCategorys,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

