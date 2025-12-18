import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { listUnits, getUnit, createUnit, updateUnit, deleteUnit } from '../controllers/units.controller';

const router = express.Router();

// List units (Admin/Super Admin)
router.get('/', authenticate, authorize('super_admin', 'admin'), listUnits);

// Get unit by id (Admin/Super Admin)
router.get('/:id', authenticate, authorize('super_admin', 'admin'), getUnit);

// Create unit (Super Admin)
router.post('/', authenticate, authorize('super_admin'), createUnit);

// Update unit (Admin/Super Admin)
router.put('/:id', authenticate, authorize('super_admin', 'admin'), updateUnit);

// Delete unit (Super Admin)
router.delete('/:id', authenticate, authorize('super_admin'), deleteUnit);

export default router;

