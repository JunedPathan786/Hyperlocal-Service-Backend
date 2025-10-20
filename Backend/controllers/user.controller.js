const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/User.model");

exports.getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  res.status(200).json(
    new ApiResponse(
      200,
      {
        id: req.user._id,
        name: req.user.name,
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
  const user = await User.findById(req.user._id).select("+pass");
  if (!user)
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  const { name, email, phone, password } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  if (password) user.password = password;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, user, "Profile updated successfully"));
});

exports.deleteProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user)
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  await user.deleteOne();

  res.status(200).json(new ApiResponse(200, {}, "User account deleted"));
});
