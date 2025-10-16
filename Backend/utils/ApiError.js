class ApiError extends Error {
  constructor(status = 500, message = 'Something went wrong', errors = [], data = null, stack = '') {
    super(message);
    this.status = status;
    this.statusCode = status;
    this.data = data;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };