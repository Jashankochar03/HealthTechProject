const express = require("express")
const router = express.Router()
const { auth, isDoctor } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getHealthRecords,
  DoctorDashboard
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)

router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/getHealthRecords",auth, getHealthRecords)
router.get('/doctorDashboard',auth,isDoctor,DoctorDashboard)


module.exports = router