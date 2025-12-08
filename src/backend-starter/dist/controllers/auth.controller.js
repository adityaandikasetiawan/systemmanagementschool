"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logout = exports.getCurrentUser = exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const resolveExpires = (value, fallbackSeconds) => {
    if (!value)
        return fallbackSeconds || 0;
    const m = /^([0-9]+)([smhd])?$/.exec(value);
    if (!m)
        return fallbackSeconds || 0;
    const qty = parseInt(m[1], 10);
    const unit = m[2];
    if (unit === 's')
        return qty;
    if (unit === 'm')
        return qty * 60;
    if (unit === 'h')
        return qty * 3600;
    if (unit === 'd')
        return qty * 86400;
    return qty;
};
/**
 * Login user
 * POST /api/auth/login
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }
        if (process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true') {
            if (email === 'admin@baituljannah.sch.id' && password === 'Admin123!') {
                const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
                const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
                const token = jsonwebtoken_1.default.sign({ id: 1, email: 'admin@baituljannah.sch.id', role: 'super_admin' }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: accessExp });
                const refreshToken = jsonwebtoken_1.default.sign({ id: 1 }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', { expiresIn: refreshExp });
                return res.json({
                    success: true,
                    message: 'Login successful',
                    data: {
                        token,
                        refresh_token: refreshToken,
                        user: {
                            id: 1,
                            username: 'superadmin',
                            email: 'admin@baituljannah.sch.id',
                            role: 'super_admin',
                            full_name: 'Administrator Yayasan',
                            phone: '081234567890',
                            photo_url: null
                        }
                    }
                });
            }
            if (email === 'student@baituljannah.sch.id' && password === 'Student123!') {
                const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
                const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
                const token = jsonwebtoken_1.default.sign({ id: 101, email: 'student@baituljannah.sch.id', role: 'student' }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: accessExp });
                const refreshToken = jsonwebtoken_1.default.sign({ id: 101 }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', { expiresIn: refreshExp });
                return res.json({
                    success: true,
                    message: 'Login successful',
                    data: {
                        token,
                        refresh_token: refreshToken,
                        user: {
                            id: 101,
                            username: 'studentdev',
                            email: 'student@baituljannah.sch.id',
                            role: 'student',
                            full_name: 'Siswa Dev Mode',
                            phone: '081234567801',
                            photo_url: null
                        }
                    }
                });
            }
            if (email === 'guru@baituljannah.sch.id' && password === 'Guru123!') {
                const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
                const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
                const token = jsonwebtoken_1.default.sign({ id: 201, email: 'guru@baituljannah.sch.id', role: 'teacher' }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: accessExp });
                const refreshToken = jsonwebtoken_1.default.sign({ id: 201 }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', { expiresIn: refreshExp });
                return res.json({
                    success: true,
                    message: 'Login successful',
                    data: {
                        token,
                        refresh_token: refreshToken,
                        user: {
                            id: 201,
                            username: 'gurudev',
                            email: 'guru@baituljannah.sch.id',
                            role: 'teacher',
                            full_name: 'Guru Dev Mode',
                            phone: '081234567802',
                            photo_url: null
                        }
                    }
                });
            }
        }
        // Find user by email
        const users = await (0, database_1.query)(`SELECT u.*, up.full_name, up.phone, up.photo_url 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.email = ? AND u.status = 'active'
       LIMIT 1`, [email]);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const user = users[0];
        // Verify password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        // Generate JWT token
        const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
        const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: accessExp });
        // Generate refresh token
        const refreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', { expiresIn: refreshExp });
        // Update last login
        await (0, database_1.query)('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);
        // Remove sensitive data
        delete user.password_hash;
        // Return response
        return res.json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                refresh_token: refreshToken,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    full_name: user.full_name,
                    phone: user.phone,
                    photo_url: user.photo_url
                }
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: 'Login failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.login = login;
/**
 * Register new user
 * POST /api/auth/register
 */
const register = async (req, res) => {
    try {
        const { username, email, password, role, full_name, phone } = req.body;
        // Validate input
        if (!username || !email || !password || !role || !full_name) {
            return res.status(400).json({
                success: false,
                message: 'All required fields must be provided'
            });
        }
        // Check if user already exists
        const existingUsers = await (0, database_1.query)('SELECT id FROM users WHERE email = ? OR username = ?', [email, username]);
        if (existingUsers.length > 0) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }
        // Hash password
        const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
        const passwordHash = await bcryptjs_1.default.hash(password, saltRounds);
        // Insert user
        const result = await (0, database_1.query)(`INSERT INTO users (username, email, password_hash, role, status, email_verified)
       VALUES (?, ?, ?, ?, 'active', FALSE)`, [username, email, passwordHash, role]);
        const userId = result.insertId;
        // Insert user profile
        await (0, database_1.query)(`INSERT INTO user_profiles (user_id, full_name, phone)
       VALUES (?, ?, ?)`, [userId, full_name, phone || null]);
        // Get created user
        const newUsers = await (0, database_1.query)(`SELECT u.id, u.username, u.email, u.role, up.full_name, up.phone
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`, [userId]);
        return res.status(201).json({
            success: true,
            message: 'Registration successful',
            data: {
                user: newUsers[0]
            }
        });
    }
    catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.register = register;
/**
 * Get current user
 * GET /api/auth/me
 */
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated'
            });
        }
        if (process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true') {
            return res.json({
                success: true,
                data: {
                    user: {
                        id: req.user.id,
                        username: 'superadmin',
                        email: req.user.email,
                        role: req.user.role,
                        status: 'active',
                        full_name: 'Administrator Yayasan',
                        phone: '081234567890',
                        address: null,
                        city: null,
                        province: null,
                        birth_date: null,
                        birth_place: null,
                        gender: null,
                        photo_url: null
                    }
                }
            });
        }
        const users = await (0, database_1.query)(`SELECT u.id, u.username, u.email, u.role, u.status,
              up.full_name, up.phone, up.address, up.city, up.province,
              up.birth_date, up.birth_place, up.gender, up.photo_url
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`, [req.user.id]);
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.json({
            success: true,
            data: {
                user: users[0]
            }
        });
    }
    catch (error) {
        console.error('Get current user error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to get user information',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.getCurrentUser = getCurrentUser;
/**
 * Logout user
 * POST /api/auth/logout
 */
const logout = async (_req, res) => {
    try {
        // In a stateless JWT setup, logout is handled client-side by removing token
        // Optionally, you can blacklist the token in Redis or database
        return res.json({
            success: true,
            message: 'Logout successful'
        });
    }
    catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            message: 'Logout failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.logout = logout;
/**
 * Refresh access token
 * POST /api/auth/refresh
 */
const refreshToken = async (req, res) => {
    try {
        const { refresh_token } = req.body;
        if (!refresh_token) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required'
            });
        }
        // Verify refresh token
        const decoded = jsonwebtoken_1.default.verify(refresh_token, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret');
        // Get user
        const users = await (0, database_1.query)('SELECT id, email, role FROM users WHERE id = ? AND status = "active"', [decoded.id]);
        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }
        const user = users[0];
        // Generate new access token
        const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
        const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
        const newToken = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: accessExp });
        // Generate new refresh token
        const newRefreshToken = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET || 'your_refresh_secret', { expiresIn: refreshExp });
        return res.json({
            success: true,
            data: {
                token: newToken,
                refresh_token: newRefreshToken
            }
        });
    }
    catch (error) {
        console.error('Refresh token error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired refresh token',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
exports.refreshToken = refreshToken;
//# sourceMappingURL=auth.controller.js.map