// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {
  createDisease,
  getAllDiseases,
  getDiseaseDetails,
  createHealthRecord,
  getCreatorAddedDisease,
  deleteDisease,
  editDisease
} = require("../controllers/Disease")


// Categories Controllers Import
const {
  showAllCategories,
  createCategory,
} = require("../controllers/DiseaseCategory")



// Rating Controllers Import
const {
  createRating,
  getAllRating,
} = require("../controllers/RatingAndReviews")


// Importing Middlewares
const { auth, isDoctor, isPatient, isAdmin } = require("../middlewares/auth")

// ********************************************************************************************************
//                                      Disease routes
// ********************************************************************************************************

// Diseases can only be registered by admin
router.post("/createDisease", auth, isDoctor, createDisease)

// Get all Registered Diseases
router.get("/getAllDiseases", getAllDiseases)
// Get Details for a Specific One
router.post("/getDiseaseDetails", getDiseaseDetails)
// create health record
router.post("/createHealthRecord",auth,createHealthRecord)
//edit disease
router.put("/editDisease",auth,isDoctor,editDisease)
//get creator added diseases
router.get('/getDoctorAddedDisease',auth,getCreatorAddedDisease)
//delete the added disease
router.post('/deleteDisease',auth,isDoctor,deleteDisease)



// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
// TODO: Put IsAdmin Middleware here
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isPatient, createRating)
router.get("/getReviews", getAllRating)

module.exports = router