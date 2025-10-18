const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const Service = require("../models/Service.model");

exports.createService = asyncHandler(async (req, res) => {
  const { title, description, category, basePrice, durationMin } = req.body;
  const image = req.file ? req.file.path : null;

  if (!title || !basePrice)
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Title and Base Price are required"));

  const service = await Service.create({
    title,
    description,
    category,
    basePrice,
    durationMin,
    image,
  });

  res
    .status(201)
    .json(new ApiResponse(201, service, "Service created successfully"));
});

exports.listServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, services, "All services fetched"));
});
