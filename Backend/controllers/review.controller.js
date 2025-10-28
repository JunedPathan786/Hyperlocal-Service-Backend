const Review = require("../models/Review.model");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, comment, providerId } = req.body;
  if (!rating || !providerId) throw new Error("rating & providerId required");

  const review = await Review.create({
    booking: bookingId,
    provider: providerId,
    user: req.user._id,
    rating,
    comment,
  });

  await review.save();
  res.status(201).json(new ApiResponse(201, review, "Review added"));
});

