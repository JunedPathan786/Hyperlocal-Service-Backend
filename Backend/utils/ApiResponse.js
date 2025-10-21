class ApiResponse {
  constructor(status, data = null, message = " ") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

module.exports = { ApiResponse };
