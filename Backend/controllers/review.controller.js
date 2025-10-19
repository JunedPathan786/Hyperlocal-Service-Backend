const {asyncHandler} = require('../utils/asyncHandler');
const {ApiResponse} = require('../utils/ApiResponse');
const Review = require('../models/Review.model');

exports.createReview = asyncHandler(async (req, res) => {
  const { bookingId, rating, comment, providerId } = req.body;
  const review = new Review({
    booking: bookingId,
    user: req.user._id,
    provider: providerId,
    rating,
    comment
  });
  await review.save();
  res.status(201).json(new ApiResponse(201, review, 'Review added'));
});