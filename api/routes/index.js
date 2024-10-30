const express = require("express");
const router = express.Router();
const {
  createUser,
  getUserBalance,
  topup,
} = require("../controllers/userController");
const { login } = require("../controllers/authController");
const { getBanners } = require("../controllers/bannerController");
const { getServices } = require("../controllers/serviceController");
const authenticateToken = require("../middlewares/auth");
const {
  registerValidationRules,
  loginValidationRules,
  topupValidationRules,
} = require("../middlewares/validations");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send(`
    <div style="padding:16px;">
      <p>You can see the documention of API here:</p>
      <p>
        <a href="test">Api Doc</a>
      </p>
    </div>
  `);
});

/* user registration route */
router.post("/register", registerValidationRules, createUser);

/* login route */
router.post("/login", loginValidationRules, login);

/* get banners */
router.get("/banner", authenticateToken, getBanners);

/* get services */
router.get("/service", authenticateToken, getServices);

/* get user balance */
router.get("/balance", authenticateToken, getUserBalance);

/* topup user balance */
router.post("/topup", authenticateToken, topupValidationRules, topup);

module.exports = router;
