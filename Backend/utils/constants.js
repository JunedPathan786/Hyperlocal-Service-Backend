const ROLES = {
  USER: 'user',
  PROVIDER: 'provider',
  ADMIN: 'admin'
};

const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

exports.OTP_EXPIRY_MINUTES = 5;
exports.TOKEN_EXPIRY_DAYS = 7;

module.exports = { ROLES, BOOKING_STATUS };