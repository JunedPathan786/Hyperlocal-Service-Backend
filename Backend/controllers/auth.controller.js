const User = require("../models/User.model");
const Otp = require("../models/Otp.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateOTP, isOTPExpired } = require("../utils/OTP");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) throw new ApiError(400, "Phone number is required");

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  let otpDoc = await Otp.findOne({ phone });
  if (!otpDoc) {
    otpDoc = await Otp.create({ phone, otp, otpExpiry });
  } else {
    otpDoc.otp = otp;
    otpDoc.otpExpiry = otpExpiry;
    await otpDoc.save();
  }

  console.log(`OTP for ${phone}: ${otp}`);
  return res
    .status(200)
    .json(new ApiResponse(200, { phone, otp }, "OTP sent (mock)"));
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
    if (password) newUserData.password = await bcrypt.hash(password, 10);
    user = await User.create(newUserData);
  } else {
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    await user.save();
  }

  user.isVerified = true;
  await user.save();

  await Otp.deleteOne({ phone });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET || "secret",
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
          },
          token,
        },
        "OTP verified"
      )
    );
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password)
    throw new ApiError(400, "Phone and password are required");

  const user = await User.findOne({ phone });
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(password, user.password || "");
  if (!isMatch) throw new ApiError(401, "Invalid credentials");
  if (!user.isVerified) throw new ApiError(403, "User not verified");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_SECRET || "secret",
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            phone: user.phone,
            name: user.name,
            email: user.email,
          },
          token,
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
