class ApiResponse {
  constructor(status, data = null, message = 'Sucess') {
    this.status = status;
    this.data = data;
    this.message = message;
    this.success = status < 400;
  }
}

export { ApiResponse }