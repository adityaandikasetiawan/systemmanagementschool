import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { listUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller';

const router = express.Router();

// List users (Admin/Super Admin)
router.get('/', authenticate, authorize('super_admin', 'admin'), listUsers);

// Get user by id (Admin/Super Admin)
router.get('/:id', authenticate, authorize('super_admin', 'admin'), getUser);

// Create user (Admin/Super Admin)
router.post('/', authenticate, authorize('super_admin', 'admin'), createUser);

// Update user (Admin/Super Admin)
router.put('/:id', authenticate, authorize('super_admin', 'admin'), updateUser);

// Delete user (Admin/Super Admin)
router.delete('/:id', authenticate, authorize('super_admin', 'admin'), deleteUser);

export default router;

