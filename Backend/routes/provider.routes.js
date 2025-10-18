const express = require("express");
const {
  applyProvider,
  getProvider,
} = require("../controllers/provider.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();
router.post("/apply", protect, applyProvider);
router.get("/:id", getProvider);

module.exports = router;