const User = require("../models/User.model");
const { generateOTP, isOTPExpired } = require("../utils/OTP");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const Otp = require("../models/Otp.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateAccessToken(user) {
  const payload = { id: user._id, role: user.role };
  const secret =
    process.env.ACCESS_TOKEN_SECRET ||
    process.env.ACCESS_TOKEN_SECRET ||
    "secret";
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || "1d";
  return jwt.sign(payload, secret, { expiresIn });
}

function generateRefreshToken(user) {
  const payload = { id: user._id, role: user.role };
  const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRY || "10d";
  return jwt.sign(payload, secret, { expiresIn });
}

exports.sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) throw new ApiError(400, "Phone number is required");

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  console.log(`OTP for ${phone}: ${otp}`);
  return res
    .status(200)
    .json(new ApiResponse(200, { phone, otp }, "OTP sent successfully"));
});

exports.verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp, name, email, password } = req.body;
  if (!phone || !otp) throw new ApiError(400, "Phone and OTP are required");

  const otpDoc = await Otp.findOne({ phone });
  if (!otpDoc) throw new ApiError(400, "No OTP generated for this phone");
  if (isOTPExpired(otpDoc.otpExpiry)) throw new ApiError(400, "OTP expired");
  if (otpDoc.otp !== otp) throw new ApiError(400, "Invalid OTP");

  let user = await User.findOne({ phone });
  if (!user) {
    const newUserData = {
      phone,
      name: name || undefined,
      email: email || undefined,
    };

    if (password) newUserData.password = password;
    user = await User.create(newUserData);
  } else {
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
  }

  user.isVerified = true;
  await user.save();

  await Otp.deleteOne({ phone });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1d";
  const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY || "10d";
  const accessMs =
    (accessExpiry.endsWith("d")
      ? parseInt(accessExpiry, 10) * 24 * 60 * 60 * 1000
      : null) || 24 * 60 * 60 * 1000;
  const refreshMs =
    (refreshExpiry.endsWith("d")
      ? parseInt(refreshExpiry, 10) * 24 * 60 * 60 * 1000
      : null) || 10 * 24 * 60 * 60 * 1000;
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.cookie("accessToken", accessToken, { ...cookieOpts, maxAge: accessMs });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOpts,
    maxAge: refreshMs,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          phone: user.phone,
          name: user.name,
          email: user.email,
        },
        token: accessToken,
      },
      "OTP verified"
    )
  );
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    throw new ApiError(400, "Phone and password are required");

  const user = await User.findOne({ phone }).select("+password");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(password, user.password || "");
  if (!isMatch) throw new ApiError(401, "Invalid credentials");
  if (!user.isVerified) throw new ApiError(403, "User not verified");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const accessExpiry = process.env.ACCESS_TOKEN_EXPIRY || "1d";
  const refreshExpiry = process.env.REFRESH_TOKEN_EXPIRY || "10d";
  const accessMs =
    (accessExpiry.endsWith("d")
      ? parseInt(accessExpiry, 10) * 24 * 60 * 60 * 1000
      : null) || 24 * 60 * 60 * 1000;
  const refreshMs =
    (refreshExpiry.endsWith("d")
      ? parseInt(refreshExpiry, 10) * 24 * 60 * 60 * 1000
      : null) || 10 * 24 * 60 * 60 * 1000;
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.cookie("accessToken", accessToken, { ...cookieOpts, maxAge: accessMs });
  res.cookie("refreshToken", refreshToken, {
    ...cookieOpts,
    maxAge: refreshMs,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: {
          id: user._id,
          phone: user.phone,
          name: user.name,
          email: user.email,
        },
        token: accessToken,
      },
      "Login successful"
    )
  );
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Logged out successfully"));
});
