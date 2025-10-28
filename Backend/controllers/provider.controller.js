const Provider = require("../models/Provider.model");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");

exports.applyProvider = asyncHandler(async (req, res) => {
  if (!req.user)
    throw new ApiError(401, "Unauthorized request. Please login first.");

  const userId = req.user.id;

  const existing = await Provider.findOne({ user: userId });
  if (existing) {
    return res
      .status(200)
      .json(new ApiResponse(200, existing, "Already a provider"));
  }

  const { bio, coordinates } = req.body;
  if (!bio) throw new ApiError(400, "Bio is required");

  const provider = await Provider.create({
    user: userId,
    bio,
    location: {
      type: "Point",
      coordinates: coordinates || [0, 0],
    },
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: "PROVIDER" },
    { new: true }
  );

  const token = jwt.sign(
    { id: updatedUser._id, role: updatedUser.role.toUpperCase() },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY || "15m" }
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { provider, token },
        "Provider created successfully. Use this token for provider actions."
      )
    );
});

exports.getProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id)
    .populate("user", "name email")
    .populate("servicesOffered");
  if (!provider) throw new ApiError(404, "Provider not found");
  res
    .status(200)
    .json(new ApiResponse(200, provider, "Provider details fetched"));
});