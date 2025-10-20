const express = require("express");
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect);
router.patch("/profile", protect);
router.delete("/profile", protect);

module.exports = router;