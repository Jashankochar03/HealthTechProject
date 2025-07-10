const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { uploadSkinImages } = require("../controllers/SkinImage");


router.post("/upload", auth, uploadSkinImages);

module.exports = router;
