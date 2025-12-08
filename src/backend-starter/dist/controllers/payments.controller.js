"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMassReminders = exports.verifyPayment = exports.processPayment = exports.createPayment = exports.getStudentPayments = void 0;
const getStudentPayments = async (req, res) => {
    try {
        const studentIdParam = parseInt(String(req.params.studentId), 10);
        if (req.user && req.user.role === 'student') {
            if (Number.isFinite(studentIdParam) && req.user.id !== studentIdParam) {
                return res.status(403).json({ success: false, message: 'Forbidden' });
            }
        }
        const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
        if (isDev) {
            const payments = [
                { id: 1, studentId: 1, month: 'Juli', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-07-10', paidDate: '2024-07-07' },
                { id: 2, studentId: 1, month: 'Agustus', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-08-10', paidDate: '2024-08-08' },
                { id: 3, studentId: 1, month: 'September', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-09-10', paidDate: '2024-09-06' },
                { id: 4, studentId: 1, month: 'Oktober', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-10-10', paidDate: '2024-10-09' },
                { id: 5, studentId: 1, month: 'November', year: 2024, amount: 1500000, status: 'paid', dueDate: '2024-11-10', paidDate: '2024-11-07' },
                { id: 6, studentId: 1, month: 'Desember', year: 2024, amount: 1500000, status: 'pending', dueDate: '2024-12-10', paidDate: null },
                { id: 7, studentId: 1, month: 'Januari', year: 2025, amount: 1500000, status: 'pending', dueDate: '2025-01-10', paidDate: null }
            ];
            return res.json({ success: true, data: { payments } });
        }
        return res.json({ success: true, data: { payments: [] } });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to get payments' });
    }
};
exports.getStudentPayments = getStudentPayments;
const createPayment = async (req, res) => {
    try {
        const payment = { id: Date.now(), ...req.body };
        return res.status(201).json({ success: true, data: { payment } });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to create payment' });
    }
};
exports.createPayment = createPayment;
const processPayment = async (req, res) => {
    try {
        const paymentId = parseInt(req.params.paymentId);
        const transaction = { id: Date.now(), paymentId, status: 'processed', method: req.body?.method || 'transfer' };
        return res.json({ success: true, data: { transaction } });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to process payment' });
    }
};
exports.processPayment = processPayment;
const verifyPayment = async (req, res) => {
    try {
        const transactionId = parseInt(req.params.transactionId);
        const verification = { id: transactionId, status: req.body?.status || 'verified' };
        return res.json({ success: true, data: { verification } });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to verify payment' });
    }
};
exports.verifyPayment = verifyPayment;
const sendMassReminders = async (req, res) => {
    try {
        const count = Array.isArray(req.body?.students) ? req.body.students.length : 0;
        return res.json({ success: true, message: 'Reminders sent', data: { count } });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send reminders' });
    }
};
exports.sendMassReminders = sendMassReminders;
//# sourceMappingURL=payments.controller.js.map