import express from 'express';
import { getAll, getLatest, getById, create, update, remove } from '../controllers/news.controller';
import { authenticate, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getAll);
router.get('/latest', getLatest);
router.get('/:id', getById);

// Protected routes
router.post(
  '/', 
  authenticate, 
  authorize('super_admin', 'admin_unit'), 
  upload.single('image'), 
  create
);

router.put(
  '/:id', 
  authenticate, 
  authorize('super_admin', 'admin_unit'), 
  upload.single('image'), 
  update
);

router.delete(
  '/:id', 
  authenticate, 
  authorize('super_admin', 'admin_unit'), 
  remove
);

export default router;
