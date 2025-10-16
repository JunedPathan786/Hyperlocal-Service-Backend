const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

exports.protect = asyncHandler(async (req, res, next) => {
  // Read Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return next(new ApiError(401, "Not authorized: No token provided"));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'secret');
  } catch (err) {
    return next(new ApiError(401, "Invalid or expired token"));
  }

  // select the password only when needed elsewhere; here we don't need it
  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    return next(new ApiError(401, "User not found"));
  }

  req.user = user;
  next();
});

exports.authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) return next(new ApiError(401, "Not authenticated"));
    if (!allowedRoles.includes(req.user.role))
      return next(new ApiError(403, "Forbidden"));
    next();
  };
