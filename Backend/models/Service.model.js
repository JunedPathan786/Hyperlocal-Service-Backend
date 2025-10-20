const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      index: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    durationMin: {
      type: Number,
      default: 60,
    },
    image: {
      type: String,
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Provider",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
  },
  { timestamps: true }
);

serviceSchema.index({ location: "2dsphere" });

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
