import express from 'express';
import { authenticate } from '../middleware/auth';
import { getStudentPayments, createPayment, processPayment, verifyPayment, sendMassReminders } from '../controllers/payments.controller';

const router = express.Router();

router.get('/student/:studentId', authenticate, getStudentPayments);
router.post('/', authenticate, createPayment);
router.post('/:paymentId/pay', authenticate, processPayment);
router.put('/transactions/:transactionId/verify', authenticate, verifyPayment);
router.post('/reminders/send', authenticate, sendMassReminders);

export default router;
