const User = require("../models/User.model");
const Otp = require("../models/Otp.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { generateOTP, isOTPExpired } = require("../utils/OTP");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

exports.sendOtp = asyncHandler(async (req, res) => {
  const { phone } = req.body;
  if (!phone) throw new ApiError(400, "Phone number is required");

  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // Use upsert to avoid duplicate key errors and race conditions.
  // This will create the doc if it doesn't exist, or update otp and expiry if it does.
  const update = { otp, otpExpiry };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  let otpDoc;
  try {
    otpDoc = await Otp.findOneAndUpdate({ phone }, update, options).lean();
  } catch (err) {
    // Surface DB write errors (e.g. index/validation) so they aren't silent.
    console.error('Otp upsert error', err);
    throw new ApiError(500, 'Failed to create OTP');
  }

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
    // Let User pre-save hook hash the password if provided
    if (password) newUserData.password = password;
    user = await User.create(newUserData);
  } else {
    if (name) user.name = name;
    if (email) user.email = email;
    // Assign plain password and rely on pre-save hook
    if (password) user.password = password;
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

  // include password explicitly because the schema sets `select: false`
  const user = await User.findOne({ phone }).select('+password');
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
