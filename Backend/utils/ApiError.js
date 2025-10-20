class ApiError extends Error {
  constructor(status = 500, message = "Something went wrong", data = null) {
    super(message);
    this.status = status;
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ApiError };
