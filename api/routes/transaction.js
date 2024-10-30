const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authenticateToken = require("../middlewares/auth");
const { upload } = require("../config/s3");

// Create transaction
router.post("/", authenticateToken, transactionController.createTransaction);

// Update profile
router.get(
  "/history",
  authenticateToken,
  transactionController.getTransactionHistory
);

module.exports = router;
