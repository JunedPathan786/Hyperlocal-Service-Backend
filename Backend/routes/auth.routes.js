const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp, loginUser, logoutUser } = require("../controllers/auth.controller");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get('/profile', protect, getProfile);
router.patch('/profile', protect, updateProfile);
router.delete('/profile', protect, deleteProfile);

module.exports = router;