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

// Create a TTL index on otpExpiry so documents are removed automatically when expired
// TTL index: expire documents when `otpExpiry` is reached.
otpSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.models.Otp || mongoose.model("Otp", otpSchema);