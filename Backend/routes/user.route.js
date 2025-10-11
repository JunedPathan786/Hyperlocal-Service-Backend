const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, refreshAccessToken } = require("../controllers/authcontroller.js");


router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', refreshAccessToken)
router.post('/logout', logoutUser)


router.get("/profile", getUserProfile)

module.exports = router;