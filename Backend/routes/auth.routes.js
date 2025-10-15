const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile, refreshAccessToken } = require("../controllers/auth.controller");


router.post('/api/v1/register', registerUser)
router.post('/api/v1/login', loginUser)
router.post('/api/v1/refresh-token', refreshAccessToken)
router.post('/api/v1/logout', logoutUser)


router.get("/profile", getUserProfile)

module.exports = router;