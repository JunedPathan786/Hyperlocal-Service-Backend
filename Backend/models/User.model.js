const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
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

// Hash password before save if modified
const bcrypt = require('bcrypt');
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Instance method to generate JWT auth token
const jwt = require('jsonwebtoken');
userSchema.methods.generateAuthToken = function () {
  const payload = { id: this._id, role: this.role };
  const secret = process.env.JWT_ACCESS_SECRET || 'secret';
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

const User = mongoose.model("User", userSchema);
module.exports = User;