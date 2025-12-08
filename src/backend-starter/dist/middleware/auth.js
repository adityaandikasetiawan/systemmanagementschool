"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireCsrf = exports.optionalAuth = exports.authorize = exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate JWT token
 */
const authenticate = (req, res, next) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided. Please login first.'
            });
        }
        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify token
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        if (typeof verified === 'string') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }
        const decoded = verified;
        // Attach user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };
        return next();
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired. Please login again.'
            });
        }
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Please login again.'
        });
    }
};
exports.authenticate = authenticate;
/**
 * Middleware to authorize based on roles
 * Usage: authorize('super_admin', 'admin_unit')
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized. Please login first.'
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden. You do not have permission to access this resource.'
            });
        }
        return next();
    };
};
exports.authorize = authorize;
/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = (req, _res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
            if (typeof verified !== 'string') {
                const decoded = verified;
                req.user = {
                    id: decoded.id,
                    email: decoded.email,
                    role: decoded.role
                };
            }
        }
        return next();
    }
    catch (error) {
        // Ignore errors, just proceed without user
        return next();
    }
};
exports.optionalAuth = optionalAuth;
const requireCsrf = (req, res, next) => {
    try {
        const headerToken = req.headers['x-csrf-token'] || '';
        const cookies = req.cookies || {};
        const cookieToken = cookies['csrf_token'] || '';
        if (!headerToken || !cookieToken || headerToken !== cookieToken) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden. CSRF token invalid or missing.'
            });
        }
        return next();
    }
    catch {
        return res.status(403).json({ success: false, message: 'Forbidden.' });
    }
};
exports.requireCsrf = requireCsrf;
//# sourceMappingURL=auth.js.map