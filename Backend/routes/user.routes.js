const express = require("express");
const { getProfile, updateProfile } = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();
router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

module.exports = router;
