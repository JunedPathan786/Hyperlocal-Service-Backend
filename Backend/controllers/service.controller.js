const Service = require("../models/Service.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createService = asyncHandler(async (req, res) => {
  const { title, basePrice, durationMin, coordinates } = req.body;

  if (!title || !basePrice) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Title and Base Price are required"));
  }

  if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, null, "Coordinates must be [longitude, latitude]")
      );
  }

  const service = await Service.create({
    title,
    basePrice,
    durationMin: durationMin || 60, // default 1 hour
    provider: req.user._id,
    location: {
      type: "Point",
      coordinates,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully"));
});

exports.listServices = asyncHandler(async (req, res) => {
  const services = await Service.find().populate("provider", "name email");
  return res
    .status(200)
    .json(new ApiResponse(200, services, "Services fetched successfully"));
});

exports.nearby = asyncHandler(async (req, res) => {
  const { lng, lat } = req.query;

  if (!lng || !lat) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Longitude and latitude required"));
  }

  const services = await Service.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        $maxDistance: 5000, // within 5km
      },
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, services, "Nearby services fetched successfully")
    );
});

