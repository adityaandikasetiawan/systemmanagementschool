import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/database';
import { AuthRequest } from '../middleware/auth';

const resolveExpires = (value?: string, fallbackSeconds?: number): number => {
  if (!value) return fallbackSeconds || 0;
  const m = /^([0-9]+)([smhd])?$/.exec(value);
  if (!m) return fallbackSeconds || 0;
  const qty = parseInt(m[1], 10);
  const unit = m[2];
  if (unit === 's') return qty;
  if (unit === 'm') return qty * 60;
  if (unit === 'h') return qty * 3600;
  if (unit === 'd') return qty * 86400;
  return qty;
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req: Request, res: Response) => {
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
        const token = jwt.sign(
          { id: 1, email: 'admin@baituljannah.sch.id', role: 'super_admin' },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: accessExp }
        );
        const refreshToken = jwt.sign(
          { id: 1 },
          process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
          { expiresIn: refreshExp }
        );
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
        const token = jwt.sign(
          { id: 101, email: 'student@baituljannah.sch.id', role: 'student' },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: accessExp }
        );
        const refreshToken = jwt.sign(
          { id: 101 },
          process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
          { expiresIn: refreshExp }
        );
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
        const token = jwt.sign(
          { id: 201, email: 'guru@baituljannah.sch.id', role: 'teacher' },
          process.env.JWT_SECRET || 'your_jwt_secret',
          { expiresIn: accessExp }
        );
        const refreshToken = jwt.sign(
          { id: 201 },
          process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
          { expiresIn: refreshExp }
        );
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
    const users: any[] = await query(
      `SELECT u.*, up.full_name, up.phone, up.photo_url 
       FROM users u 
       LEFT JOIN user_profiles up ON u.id = up.user_id 
       WHERE u.email = ? AND u.status = 'active'
       LIMIT 1`,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const user = users[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const accessExp = resolveExpires(process.env.JWT_EXPIRES_IN, 7 * 24 * 3600);
    const refreshExp = resolveExpires(process.env.JWT_REFRESH_EXPIRES_IN, 30 * 24 * 3600);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: accessExp }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: refreshExp }
    );

    // Update last login
    await query('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

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
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Register new user
 * POST /api/auth/register
 */
export const register = async (req: Request, res: Response) => {
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
    const existingUsers: any[] = await query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Hash password
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const result: any = await query(
      `INSERT INTO users (username, email, password_hash, role, status, email_verified)
       VALUES (?, ?, ?, ?, 'active', FALSE)`,
      [username, email, passwordHash, role]
    );

    const userId = result.insertId;

    // Insert user profile
    await query(
      `INSERT INTO user_profiles (user_id, full_name, phone)
       VALUES (?, ?, ?)`,
      [userId, full_name, phone || null]
    );

    // Get created user
    const newUsers: any[] = await query(
      `SELECT u.id, u.username, u.email, u.role, up.full_name, up.phone
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [userId]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: newUsers[0]
      }
    });
  } catch (error: any) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get current user
 * GET /api/auth/me
 */
export const getCurrentUser = async (req: AuthRequest, res: Response) => {
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

    const users: any[] = await query(
      `SELECT u.id, u.username, u.email, u.role, u.status,
              up.full_name, up.phone, up.address, up.city, up.province,
              up.birth_date, up.birth_place, up.gender, up.photo_url
       FROM users u
       LEFT JOIN user_profiles up ON u.id = up.user_id
       WHERE u.id = ?`,
      [req.user.id]
    );

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
  } catch (error: any) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user information',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get student profile (joined info)
 * GET /api/auth/student/profile
 */
export const getStudentProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    if (isDev && req.user.id === 101) {
      return res.json({
        success: true,
        data: {
          profile: {
            user_id: 101,
            full_name: 'Siswa Dev Mode',
            email: 'student@baituljannah.sch.id',
            nis: '2024001',
            nisn: '0083456789',
            class: 'XII IPA 1',
            unit: 'SMAIT',
            academic_year: '2024/2025 Genap',
            gpa: 3.85,
            attendance: 95,
            photo_url: null,
            phone: '081234567801',
            gender: 'L',
            birth_date: null,
            birth_place: null,
            address: null,
            city: null,
            province: null
          }
        }
      });
    }

    const rows: any[] = await query(
      `SELECT 
         u.id AS user_id,
         u.email,
         up.full_name,
         up.phone,
         up.photo_url,
         up.gender,
         up.birth_date,
         up.birth_place,
         up.address,
         up.city,
         up.province,
         s.nis,
         s.nisn,
         c.name AS class,
         su.code AS unit,
         ay.name AS academic_year
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       LEFT JOIN students s ON s.user_id = u.id
       LEFT JOIN classes c ON c.id = s.class_id
       LEFT JOIN school_units su ON su.id = s.school_unit_id
       LEFT JOIN academic_years ay ON ay.id = c.academic_year_id
       WHERE u.id = ?
       LIMIT 1`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Student profile not found' });
    }

    return res.json({ success: true, data: { profile: rows[0] } });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to get student profile' });
  }
};

/**
 * Logout user
 * POST /api/auth/logout
 */
export const logout = async (_req: AuthRequest, res: Response) => {
  try {
    // In a stateless JWT setup, logout is handled client-side by removing token
    // Optionally, you can blacklist the token in Redis or database

    return res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error: any) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: 'Logout failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh
 */
export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret'
    ) as any;

    // Get user
    const users: any[] = await query(
      'SELECT id, email, role FROM users WHERE id = ? AND status = "active"',
      [decoded.id]
    );

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
    const newToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: accessExp }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET || 'your_refresh_secret',
      { expiresIn: refreshExp }
    );

    return res.json({
      success: true,
      data: {
        token: newToken,
        refresh_token: newRefreshToken
      }
    });
  } catch (error: any) {
    console.error('Refresh token error:', error);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired refresh token',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
