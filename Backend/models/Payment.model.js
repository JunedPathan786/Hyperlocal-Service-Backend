const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
    amount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    providerPayout: Number,
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
