const express = require('express');
const router = express.Router();
const multer = require('multer');
const { list, create, remove, update } = require('../controllers/galleryController');

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: require('../config/config').upload.maxFileSize } });

router.get('/', list);
router.post('/', upload.single('image'), create);
router.put('/:id', upload.single('image'), update);
router.delete('/:id', remove);

module.exports = router;
