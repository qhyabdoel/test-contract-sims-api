// middlewares/userValidation.js
const { body } = require("express-validator");

const loginValidationRules = [
  body("email").isEmail().withMessage("Parameter email tidak sesuai format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Parameter password minimal 8 karakter"),
];

const registerValidationRules = [
  ...loginValidationRules,
  body("first_name").notEmpty().withMessage("Parameter first_name harus diisi"),
  body("last_name").notEmpty().withMessage("Parameter last_name harus diisi"),
];

module.exports = { registerValidationRules, loginValidationRules };
