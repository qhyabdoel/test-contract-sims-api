const express = require("express");
const router = express.Router();
const { createUser } = require("../controllers/userController");
const { login } = require("../controllers/authController");
const {
  registerValidationRules,
  loginValidationRules,
} = require("../middlewares/validations");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Hello World! I'm Kiki Abdulloh.");
});

/* user registration route */
router.post("/register", registerValidationRules, createUser);

/* login route */
router.post("/login", loginValidationRules, login);

module.exports = router;
