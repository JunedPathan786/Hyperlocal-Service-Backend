const express = require("express");
const router = express.Router();
const {
  createBooking,
  getUserBookings,
} = require("../controllers/booking.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/", protect, createBooking);
router.get("/me", protect, getUserBookings);

module.exports = router;
