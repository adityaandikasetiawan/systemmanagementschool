const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
const { protect, authorize } = require('../middleware/auth');
const {
  list,
  create,
  update,
  remove,
} = require('../controllers/achievementsController');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.upload.maxFileSize } });

router.get('/', list);
router.post('/', protect, authorize('super_admin', 'admin', 'admin_unit', 'guru'), upload.single('image'), create);
router.put('/:id', protect, authorize('super_admin', 'admin', 'admin_unit', 'guru'), upload.single('image'), update);
router.delete('/:id', protect, authorize('super_admin', 'admin', 'admin_unit'), remove);

module.exports = router;

