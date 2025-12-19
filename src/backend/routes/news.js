const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = require('../config/config');
const {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getLatestNews
} = require('../controllers/newsController');
const { protect, authorize } = require('../middleware/auth');
const { newsRules, validate } = require('../middleware/validation');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: config.upload.maxFileSize } });

// Public routes
router.get('/', getAllNews);
router.get('/latest', getLatestNews);
router.get('/:id', getNewsById);

// Protected routes (Admin, Guru)
router.post('/', protect, authorize('admin', 'guru'), upload.single('image'), newsRules, validate, createNews);
router.put('/:id', protect, authorize('admin', 'guru'), upload.single('image'), updateNews);
router.delete('/:id', protect, authorize('admin'), deleteNews);

module.exports = router;
