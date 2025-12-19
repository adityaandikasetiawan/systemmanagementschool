const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
const {
  getAllSlides,
  getSlideById,
  createSlide,
  updateSlide,
  deleteSlide
} = require('../controllers/heroSlidesController');
const { protect, authorize } = require('../middleware/auth');
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.upload.maxFileSize } });
router.get('/', getAllSlides);
router.get('/:id', getSlideById);
router.post('/', protect, authorize('super_admin', 'admin', 'admin_unit'), upload.single('image'), createSlide);
router.put('/:id', protect, authorize('super_admin', 'admin', 'admin_unit'), upload.single('image'), updateSlide);
router.delete('/:id', protect, authorize('super_admin', 'admin', 'admin_unit'), deleteSlide);

module.exports = router;
