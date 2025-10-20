const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    servicesOffered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

providerSchema.index({ location: "2dsphere" });

const Provider = mongoose.model("Provider", providerSchema);
module.exports = Provider;
