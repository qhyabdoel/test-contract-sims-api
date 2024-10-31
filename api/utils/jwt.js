const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET; // Change this to a strong secret key

// Function to generate a token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Function to verify a token
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = {
  generateToken,
  verifyToken,
};
