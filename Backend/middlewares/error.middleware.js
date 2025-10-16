const { ApiError } = require('../utils/ApiError');

function errorHandler(err, req, res, next) {
  // Mongoose validation error
  if (err && err.name === 'ValidationError') {
    const fieldErrors = Object.keys(err.errors || {}).map((field) => ({
      field,
      message: err.errors[field].message,
    }));

    return res.status(400).json({
      success: false,
      status: 400,
      message: err._message || 'Validation failed',
      errors: fieldErrors,
      data: null,
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode || err.status || 500).json({
      success: false,
      status: err.statusCode || err.status || 500,
      message: err.message || 'Something went wrong',
      errors: err.errors || [],
      data: err.data || null,
    });
  }

  // Generic error fallback
  console.error(err);
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message || 'Internal Server Error',
  });
}

module.exports = errorHandler;
