const { ApiResponse } = require('../utils/ApiResponse');
const { asyncHandler } = require('../utils/asyncHandler');

// GET /auth/profile or /users/profile
exports.getProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json(new ApiResponse(401, null, 'Not authenticated'));

  return res.status(200).json(
    new ApiResponse(200, {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    }, 'Profile fetched')
  );
});

// PATCH /auth/profile - update current user's profile
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json(new ApiResponse(401, null, 'Not authenticated'));

  const { name, email, phone, password } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (phone) user.phone = phone;
  // Assign plain password and let User pre-save hook hash it
  if (password) user.password = password;

  await user.save();

  return res.status(200).json(
    new ApiResponse(200, {
      id: user._id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      role: user.role,
    }, 'Profile updated')
  );
});

// DELETE /auth/profile - delete current user's account
exports.deleteProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json(new ApiResponse(401, null, 'Not authenticated'));

  await user.remove();

  return res.status(200).json(new ApiResponse(200, {}, 'User account deleted'));
});
