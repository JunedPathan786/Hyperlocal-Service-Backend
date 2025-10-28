const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking.model");
const Payment = require("../models/Payment.model.js");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = asyncHandler(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new Error("Booking not found");

  const options = {
    amount: booking.price * 100,
    currency: "INR",
    receipt: `rcpt_${bookingId}`,
  };

  const order = await razorpay.orders.create(options);

  // persist pending payment
  const payment = await Payment.create({
    booking: bookingId,
    amount: booking.price,
    razorpayOrderId: order.id,
    status: "pending",
  });

  res.json(new ApiResponse(200, { order, payment }, "Razorpay order created"));
});

exports.verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    bookingId,
    amount,
  } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generated_signature !== razorpay_signature) {
    return res.status(400).json({ success: false, msg: "Invalid signature" });
  }

  const payment = new Payment({ booking: bookingId, amount, status: "paid" });
  await payment.save();

  const booking = await Booking.findById(bookingId);
  booking.status = "accepted";
  await booking.save();

  res.json(new ApiResponse(200, payment, "Payment verified"));
});
