const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
const { protect, authorize } = require('../middleware/auth');
const units = require('../controllers/unitsController');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.upload.maxFileSize } });

router.get('/', units.getAllUnits);
router.get('/:id', units.getUnitById);
router.post('/', protect, authorize('super_admin', 'admin_unit'), upload.single('icon'), units.createUnit);
router.put('/:id', protect, authorize('super_admin', 'admin_unit'), upload.single('icon'), units.updateUnit);
router.delete('/:id', protect, authorize('super_admin', 'admin_unit'), units.deleteUnit);

module.exports = router;
