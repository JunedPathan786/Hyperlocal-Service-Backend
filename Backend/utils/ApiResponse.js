class ApiResponse {
  constructor(status, data = null, message = "Failded") {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

module.exports = { ApiResponse };