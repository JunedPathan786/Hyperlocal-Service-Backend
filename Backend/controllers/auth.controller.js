const User = require("../models/User.model");
const Otp = require("../models/Otp.model");
const { generateOTP, isOTPExpired } = require("../utils/OTP");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY || "15m" }
  );
}

const sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) throw new ApiError(400, "Phone number is required");

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await Otp.findOneAndUpdate({ phone }, { otp, otpExpiry });

  console.log(`OTP for ${phone}: ${otp}`);

  return res
    .status(200)
    .json(new ApiResponse(200, { phone, otp }, "OTP sent successfully"));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp, name, email, password } = req.body;
  if (!phone || !otp) throw new ApiError(400, "Phone and OTP are required");

  const otpDoc = await Otp.findOne({ phone });
  if (!otpDoc) throw new ApiError(400, "No OTP generated for this phone");
  if (isOTPExpired(otpDoc.otpExpiry)) throw new ApiError(400, "OTP expired");
  if (otpDoc.otp !== otp) throw new ApiError(400, "Invalid OTP");

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ name, email, phone, password });
  } else {
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
  }

  user.isVerified = true;
  await user.save();

  await Otp.deleteOne({ phone });

  const token = generateAccessToken(user);
  res.cookie("accessToken", token);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, token },
        "OTP verified and user authenticated"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    throw new ApiError(400, "Phone and password are required");

  const user = await User.findOne({ phone }).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isvalid = await bcrypt.compare(password, user.password || "");
  if (!isvalid) throw new ApiError(401, "Invalid password");

  const token = generateAccessToken(user);
  res.cookie("accessToken", token);
  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Login successful"));
});

const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json(new ApiResponse(200, {}, "Logged out successfully"));
});

module.exports = {
  sendOtp,
  verifyOtp,
  loginUser,
  logoutUser,
};
