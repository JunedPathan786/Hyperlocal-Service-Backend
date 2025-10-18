const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const Provider = require("../models/Provider.model");

exports.applyProvider = asyncHandler(async (req, res) => {
  if (!req.user)
    return res.status(401).json(new ApiResponse(401, null, "Unauthorized"));

  const existing = await Provider.findOne({ user: req.user._id });
  if (existing)
    return res
      .status(200)
      .json(new ApiResponse(200, existing, "Already a provider"));

  const { bio } = req.body;
  if (!bio)
    return res.status(400).json(new ApiResponse(400, null, "Bio is required"));

  const provider = await Provider.create({ user: req.user._id, bio });
  res
    .status(201)
    .json(new ApiResponse(201, provider, "Provider created successfully"));
});

exports.getProvider = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id)
    .populate("user", "name email")
    .populate("servicesOffered");
  if (!provider) throw new Error("Provider not found");
  res.json(new ApiResponse(200, provider));
});
