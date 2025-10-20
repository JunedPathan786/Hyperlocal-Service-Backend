const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
