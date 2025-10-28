const express = require("express");
const router = express.Router();
const {
  applyProvider,
  getProvider,
} = require("../controllers/provider.controller");
const {protect}  = require("../middlewares/auth.middleware");

router.post("/apply", protect, applyProvider);
router.get("/:id", getProvider);

module.exports = router;