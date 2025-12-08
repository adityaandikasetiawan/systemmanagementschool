import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getReport } from '../controllers/finance.controller';

const router = express.Router();

router.get('/report', authenticate, authorize('super_admin', 'admin', 'finance'), getReport);

export default router;
