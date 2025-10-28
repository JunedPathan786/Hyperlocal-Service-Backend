const express = require("express");
const router = express.Router();
const {
  getStats,
  approveProvider,
} = require("../controllers/admin.controller");
const {protect} = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { ROLES } = require("../utils/constants");

router.get("/stats", protect, authorize(ROLES.ADMIN), getStats);
router.post(
  "/provider/:id/approve",
  protect,
  authorize(ROLES.ADMIN),
  approveProvider
);

module.exports = router;
