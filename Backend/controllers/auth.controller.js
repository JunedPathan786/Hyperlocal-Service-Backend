const User = require("../models/User.model");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiResponse } = require("../utils/ApiResponse");
const { ApiError } = require("../utils/ApiError");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, fullname: user.fullname },
    process.env.JWT_TOKEN_SECRET || "yourSecretKey",
    { expiresIn: "7d" }
  );
};

exports.register = asyncHandler(async (req, res) => {
  const { fullname, email, phone, password } = req.body;

  let user = await User.findOne({ email });
  if (user) throw new ApiError(400, "User already exists");

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
 user = new User({ fullname, email, phone, password, otp, otpExpiry });
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is: ${otp}`,
  });

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        null,
        "User registered. Please verify OTP sent to email."
      )
    );
});

exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  let user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "User not found");
  if (user.isVerified) throw new ApiError(400, "User already verified");

  if (user.otp !== otp || user.otpExpiry < new Date()) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = generateToken(user);

  res.json(
    new ApiResponse(
      200,
      { token },
      "Email verified successfully. You can now log in."
    )
  );
});

exports.resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  let user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "User not found");
  if (user.isVerified) throw new ApiError(400, "User already verified");

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Resend OTP Verification",
    text: `Your new OTP is: ${otp}`,
  });

  res.json(new ApiResponse(200, null, "OTP resent successfully."));
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(400, "User not found");

  const isMatch = await user.comparePassword(password);

  if (!isMatch) throw new ApiError(400, "Incorrect password");

  if (!user.isVerified)
    throw new ApiError(400, "Email not verified. Please verify OTP.");

  const token = generateToken(user);

  res.json(new ApiResponse(200, { token }, "Login successful."));
});

exports.logout = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, null, "Logged out successfully."));
});
