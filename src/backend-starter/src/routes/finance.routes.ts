import express from 'express';
import { authenticate } from '../middleware/auth';
import { getReport } from '../controllers/finance.controller';

const router = express.Router();

router.get('/report', authenticate, getReport);

export default router;
