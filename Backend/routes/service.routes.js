const express = require("express");
const { body, validationResult } = require("express-validator");
const {
  createService,
  listServices,
} = require("../controllers/service.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { ROLES } = require("../utils/constants");

const router = express.Router();

router.post(
  "/",
  protect,
  //  authorize('USER', 'PROVIDER', 'ADMIN'),  // allow all for testing
  authorize(ROLES.ADMIN, ROLES.PROVIDER),
  [
    body("title").notEmpty().withMessage("Title required"),
    body("basePrice").isNumeric().withMessage("Base price must be a number"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });
    next();
  },
  createService
);

router.get("/", listServices);

module.exports = router;
