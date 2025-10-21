const { ApiResponse } = require("../utils/ApiResponse");

exports.authorize =
  (...allowed) =>
  (req, res, next) => {
    if (
      !req.user ||
      !allowed
        .map((data) => data.toLowerCase())
        .includes(req.user.role.toLowerCase())
    ) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Access denied. Not authorized."));
    }
    next();
  };
