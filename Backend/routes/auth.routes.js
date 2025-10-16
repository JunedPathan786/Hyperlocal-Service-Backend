const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, loginUser, logoutUser } = require("../controllers/auth.controller");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;