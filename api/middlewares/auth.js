// middlewares/auth.js
const { verifyToken } = require("../utils/jwt");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({
        status: 108,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      }); // Unauthorized

  try {
    const user = verifyToken(token);
    req.user = user; // Store user data in request object
    next();
  } catch (err) {
    return res.sendStatus(403); // Forbidden
  }
};

module.exports = authenticateToken;
