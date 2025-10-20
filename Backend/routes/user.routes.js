const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/me", protect, getProfile);
router.patch("/me", protect, updateProfile);
router.delete('/me', deleteProfile)

module.exports = router;