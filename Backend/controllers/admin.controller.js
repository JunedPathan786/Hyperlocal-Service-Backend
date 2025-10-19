const {asyncHandler} = require('../utils/asyncHandler');
const {ApiResponse} = require('../utils/ApiResponse');
const User = require('../models/User.model');
const Provider = require('../models/Provider.model');
const Booking = require('../models/Booking.model');

exports.getStats = asyncHandler(async (req, res) => {
  const users = await User.countDocuments();
  const providers = await Provider.countDocuments();
  const bookings = await Booking.countDocuments();
  res.json(new ApiResponse(200, { users, providers, bookings }, 'Stats'));
});