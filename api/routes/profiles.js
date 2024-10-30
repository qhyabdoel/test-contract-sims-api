const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middlewares/auth");
const { upload } = require("../config/s3");

// Get user profile
router.get("/", authenticateToken, userController.getUserProfile);

// Update profike image
router.put("/image", authenticateToken, userController.updateProfileImage);

module.exports = router;
