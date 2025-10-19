const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { createOrder, verifyPayment } = require('../controllers/payment.controller');

const router = express.Router();

router.post('/order', protect, createOrder);
router.post('/verify', protect, verifyPayment);

module.exports = router;