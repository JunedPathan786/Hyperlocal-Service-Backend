const express = require("express");
const {
  register,
  verifyOTP,
  resendOTP,
  login,
  logout,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
