const express = require('express');
const router = express.Router();
const { createReview } = require('../controllers/review.controller');
const  {protect}  = require('../middlewares/auth.middleware');

router.post('/', protect, createReview);

module.exports = router;