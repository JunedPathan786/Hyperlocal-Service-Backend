const express = require('express');
const { getStats } = require('../controllers/admin.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { ROLES } = require('../utils/constants');

const router = express.Router();
router.get('/stats', protect, authorize(ROLES.ADMIN), getStats);

module.exports = router;