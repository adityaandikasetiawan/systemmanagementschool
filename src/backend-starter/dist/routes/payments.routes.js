"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const payments_controller_1 = require("../controllers/payments.controller");
const router = express_1.default.Router();
router.get('/student/:studentId', auth_1.authenticate, (0, auth_1.authorize)('super_admin', 'admin', 'finance', 'teacher', 'student'), payments_controller_1.getStudentPayments);
router.post('/', auth_1.authenticate, (0, auth_1.authorize)('super_admin', 'admin', 'finance'), payments_controller_1.createPayment);
router.post('/:paymentId/pay', auth_1.authenticate, (0, auth_1.authorize)('super_admin', 'admin', 'finance'), payments_controller_1.processPayment);
router.put('/transactions/:transactionId/verify', auth_1.authenticate, (0, auth_1.authorize)('super_admin', 'admin', 'finance'), payments_controller_1.verifyPayment);
router.post('/reminders/send', auth_1.authenticate, (0, auth_1.authorize)('super_admin', 'admin', 'finance'), payments_controller_1.sendMassReminders);
exports.default = router;
//# sourceMappingURL=payments.routes.js.map