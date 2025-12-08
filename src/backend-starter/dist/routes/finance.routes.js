"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const finance_controller_1 = require("../controllers/finance.controller");
const router = express_1.default.Router();
router.get('/report', auth_1.authenticate, finance_controller_1.getReport);
exports.default = router;
//# sourceMappingURL=finance.routes.js.map