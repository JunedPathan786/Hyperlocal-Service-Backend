const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "provider", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.generateAccessToken = function () {
  const payload = { id: this._id, role: this.role };
  const secret =
    process.env.ACCESS_TOKEN_SECRET ||
    process.env.JWT_ACCESS_SECRET ||
    "secret";
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || "1d";
  return jwt.sign(payload, secret, { expiresIn });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { id: this._id, role: this.role };
  const secret = process.env.REFRESH_TOKEN_SECRET || "refresh_secret";
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRY || "10d";
  return jwt.sign(payload, secret, { expiresIn });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
