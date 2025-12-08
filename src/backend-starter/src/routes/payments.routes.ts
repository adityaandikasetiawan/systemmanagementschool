import express from 'express';
import { authenticate, authorize, requireCsrf } from '../middleware/auth';
import { getStudentPayments, createPayment, processPayment, verifyPayment, sendMassReminders } from '../controllers/payments.controller';

const router = express.Router();

router.get('/student/:studentId', authenticate, authorize('super_admin', 'admin', 'finance', 'teacher', 'student'), getStudentPayments);
router.post('/', authenticate, authorize('super_admin', 'admin', 'finance'), requireCsrf, createPayment);
router.post('/:paymentId/pay', authenticate, authorize('super_admin', 'admin', 'finance'), requireCsrf, processPayment);
router.put('/transactions/:transactionId/verify', authenticate, authorize('super_admin', 'admin', 'finance'), requireCsrf, verifyPayment);
router.post('/reminders/send', authenticate, authorize('super_admin', 'admin', 'finance'), requireCsrf, sendMassReminders);

export default router;
