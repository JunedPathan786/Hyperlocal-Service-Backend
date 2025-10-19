const {asyncHandler} = require('../utils/asyncHandler');
const {ApiResponse} = require('../utils/ApiResponse');
const Booking = require('../models/Booking.model');
const Service = require('../models/Service.model');

exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceId, scheduledAt } = req.body;
  const service = await Service.findById(serviceId);
  if (!service) throw new Error('The requested Service could not be found. Please check the service ID.');

  const booking = new Booking({
    user: req.user._id,
    service: service._id,
    scheduledAt: new Date(scheduledAt),
    price: service.basePrice
  });
  await booking.save();
  res.status(201).json(new ApiResponse(201, booking, 'Booking created'));
});

exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('service provider');
  res.json(new ApiResponse(200, bookings));
});