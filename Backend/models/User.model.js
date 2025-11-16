const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpiry: {
      type: Date,
      default: Date.now,
      expires: 300,
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
    isActive: {
      type: Boolean,
      default: true,
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

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password || "");
};

const User = mongoose.model("User", userSchema);
module.exports = User;