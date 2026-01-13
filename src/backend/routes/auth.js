const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginRules, registerRules, validate } = require('../middleware/validation');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: require('../config/config').upload.maxFileSize } });

// Public routes
router.post('/register', registerRules, validate, register);
router.post('/login', loginRules, validate, login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.put('/updateavatar', protect, upload.single('avatar'), require('../controllers/authController').updateAvatar);
router.post('/logout', protect, logout);

module.exports = router;
