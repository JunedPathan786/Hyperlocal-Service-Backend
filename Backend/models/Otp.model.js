const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: true,
    },
    otpExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.Otp || mongoose.model("Otp", otpSchema);