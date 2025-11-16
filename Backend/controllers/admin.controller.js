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

// --- User management for admins ---
exports.listUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json(new ApiResponse(200, users, 'Users fetched'));
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  res.status(200).json(new ApiResponse(200, user, 'User fetched'));
});

exports.createUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, phone, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json(new ApiResponse(400, null, 'User already exists'));
  const user = new User({ fullname, email, password, phone, role });
  await user.save();
  res.status(201).json(new ApiResponse(201, user, 'User created'));
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const user = await User.findById(id);
  if (!user) return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  Object.assign(user, updates);
  await user.save();
  const sanitized = user.toObject(); delete sanitized.password;
  res.status(200).json(new ApiResponse(200, sanitized, 'User updated'));
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json(new ApiResponse(404, null, 'User not found'));
  await user.remove();
  res.status(200).json(new ApiResponse(200, null, 'User deleted'));
});