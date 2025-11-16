const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect } = require('../middlewares/auth.middleware');
const { authorize } = require('../middlewares/role.middleware');
const { ROLES } = require('../utils/constants');

// All endpoints are admin-only
router.get('/', protect, authorize(ROLES.ADMIN), adminController.listUsers);
router.get('/:id', protect, authorize(ROLES.ADMIN), adminController.getUser);
router.post('/', protect, authorize(ROLES.ADMIN), adminController.createUser);
router.put('/:id', protect, authorize(ROLES.ADMIN), adminController.updateUser);
router.delete('/:id', protect, authorize(ROLES.ADMIN), adminController.deleteUser);

module.exports = router;
