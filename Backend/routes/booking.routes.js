const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/booking.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();
router.post('/', protect, createBooking);
router.get('/me', protect, getUserBookings);

module.exports = router;