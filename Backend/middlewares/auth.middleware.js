const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "No token provided. Please log in first.");
  }

  const token = authHeader.split(" ")[1];
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired. Please log in again.");
    }
    throw new ApiError(401, "Invalid token. Please log in again.");
  }

  // Check if user exists
  const user = await User.findById(decoded.id || decoded.userId);
  if (!user) throw new ApiError(401, "User not found. Token invalid.");

  // Ensure user is verified
  if (!user.isVerified) {
    throw new ApiError(401, "Please verify your email before accessing this resource.");
  }

  // Attach user data to request for controller access
  req.user = user;
  next();
});

module.exports = {protect};
