const { ApiResponse } = require("../utils/ApiResponse");

module.exports = (err, req, res, next) => {
  console.error("Error: ", err.message);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;
  res.status(status).json(new ApiResponse(status, data, message));
};
