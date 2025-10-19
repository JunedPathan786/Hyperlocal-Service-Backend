const express = require('express');
const { createReview } = require('../controllers/review.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();
router.post('/', protect, createReview);

module.exports = router;