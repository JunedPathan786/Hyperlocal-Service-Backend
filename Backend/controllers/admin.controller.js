const User = require("../models/User.model");
const Provider = require("../models/Provider.model");
const Booking = require("../models/Booking.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getStats = asyncHandler(async (req, res) => {
  const user = await User.countDocuments();
  const provider = await Provider.countDocuments();
  const booking = await Booking.countDocuments();
  res
    .status(200)
    .json(
      new ApiResponse(200, { user, provider, booking }, "Admin stats fetched")
    );
});

exports.approveProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id);
  if (!provider) throw new Error("Provider not found");
  provider.approved = true;
  await provider.save();
  res.status(200).json(new ApiResponse(200, provider, "Provider approved"));
});