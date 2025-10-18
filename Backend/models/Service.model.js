const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
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
      default: null,
    },
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
