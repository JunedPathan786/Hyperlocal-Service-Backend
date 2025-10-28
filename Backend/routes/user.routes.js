const express = require("express");
const router = express.Router();
const {
  getUserDetails,
  updateProfile,
  dashboard,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/dashboard", protect, dashboard);
router.get("/me", protect, getUserDetails);
router.patch("/me", protect, updateProfile);

module.exports = router;
