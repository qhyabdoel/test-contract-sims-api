const userModel = require("../models/userModel");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/jwt");

// User login controller
async function login(req, res) {
  // Validate requset
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  // Find user by email
  const user = await userModel.getUserByEmail(email);

  if (!user)
    return res.status(401).json({ message: "Username atau password salah" });

  // Compare passwords
  if (password !== user.password)
    return res.status(401).json({ message: "Username atau password salah" });

  // Generate token
  const token = generateToken(user);

  res.json({ status: 0, message: "Login sukses", data: { token } });
}

module.exports = { login };
