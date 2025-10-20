const { ApiResponse } = require("../utils/ApiResponse");

exports.authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (
      !req.user ||
      !allowedRoles
        .map((data) => data.toLowerCase())
        .includes(req.user.role.toLowerCase())
    ) {
      return res
        .status(403)
        .json(new ApiResponse(403, null, "Access denied. Not authorized."));
    }
    next();
  };
