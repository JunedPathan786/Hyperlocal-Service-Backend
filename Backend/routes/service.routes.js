const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const {
  createService,
  listServices,
  nearby,
} = require("../controllers/service.controller");
const {protect}  = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { ROLES } = require("../utils/constants");

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
router.get("/nearby", nearby);

module.exports = router;
