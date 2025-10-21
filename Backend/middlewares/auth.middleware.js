const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const { ApiError } = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token = null;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(401, "Not authorized: No token provided");
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    } catch (err) {
      throw new ApiError(401, "Token invalid or expired");
    }

    console.log("Decoded JWT:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new ApiError(401, `User not found for ID: ${decoded.id}`);
    }

    req.user = user;
    next();
  } catch (error) {
    next(new ApiError(401, "Not authorized or token invalid"));
  }
});

module.exports = {
  protect,
};
