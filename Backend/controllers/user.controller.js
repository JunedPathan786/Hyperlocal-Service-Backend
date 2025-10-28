const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/User.model");

exports.dashboard = asyncHandler(async (req, res) => {
  res.json(
    new ApiResponse(
      200,
      { user: req.user },
      `Welcome to the dashboard, ${req.user.fullname}`
    )
  );
});

exports.getUserDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  res.status(200).json(
    new ApiResponse(
      200,
      {
        id: req.user._id,
        name: req.user.fullname,
        phone: req.user.phone,
        email: req.user.email,
        role: req.user.role,
        isVerified: req.user.isVerified,
      },
      "Profile fetched successfully"
    )
  );
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user)
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  const { name, email, phone } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});
