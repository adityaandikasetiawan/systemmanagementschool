import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database';

type UserRow = {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  last_login?: Date | null;
  full_name?: string | null;
  phone?: string | null;
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const { role, status, page = '1', limit = '20' } = req.query as Record<string, string>;
    const pageNum = Math.max(parseInt(page || '1', 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit || '20', 10) || 20, 1);
    const offset = (pageNum - 1) * limitNum;

    const filters: string[] = [];
    const params: Array<string | number> = [];
    if (role) { filters.push('u.role = ?'); params.push(role); }
    if (status) { filters.push('u.status = ?'); params.push(status); }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const rows = await query<UserRow[]>(
      `SELECT u.id, u.username, u.email, u.role, u.status, u.last_login, up.full_name, up.phone
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       ${where}
       ORDER BY u.id DESC
       LIMIT ${limitNum} OFFSET ${offset}`,
      params
    );

    const countRows = await query<Array<{ total: number }>>(
      `SELECT COUNT(*) AS total FROM users u ${where}`,
      params
    );

    return res.json({
      success: true,
      data: {
        users: rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: countRows[0]?.total || 0,
          total_pages: Math.ceil((countRows[0]?.total || 0) / limitNum)
        }
      }
    });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to list users' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await query<UserRow[]>(
      `SELECT u.id, u.username, u.email, u.role, u.status, u.last_login, up.full_name, up.phone
       FROM users u
       LEFT JOIN user_profiles up ON up.user_id = u.id
       WHERE u.id = ?
       LIMIT 1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.json({ success: true, data: rows[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get user' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, full_name, phone } = req.body || {};
    if (!username || !email || !password || !role || !full_name) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const allowedRoles = ['super_admin', 'admin', 'teacher', 'student', 'finance', 'parent', 'operator', 'support'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const existing = await query<Array<{ id: number }>>(
      'SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1',
      [email, username]
    );
    if (existing.length) {
      return res.status(409).json({ success: false, message: 'Email or username already exists' });
    }

    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '10');
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await query<{ insertId: number }>(
      `INSERT INTO users (username, email, password_hash, role, status, email_verified)
       VALUES (?, ?, ?, ?, 'active', FALSE)`,
      [username, email, passwordHash, role]
    );
    const userId = result.insertId;
    await query('INSERT INTO user_profiles (user_id, full_name, phone) VALUES (?, ?, ?)', [userId, full_name, phone || null]);

    const rows = await query<UserRow[]>(
      `SELECT u.id, u.username, u.email, u.role, u.status, up.full_name, up.phone
       FROM users u LEFT JOIN user_profiles up ON up.user_id = u.id WHERE u.id = ?`,
      [userId]
    );

    return res.status(201).json({ success: true, data: rows[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, role, status, full_name, phone } = req.body || {};

    const rows = await query<Array<{ id: number }>>('SELECT id FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const fields: string[] = [];
    const params: Array<string | number> = [];
    if (email) { fields.push('email = ?'); params.push(email); }
    if (role) { fields.push('role = ?'); params.push(role); }
    if (status) { fields.push('status = ?'); params.push(status); }
    if (fields.length) {
      await query('UPDATE users SET ' + fields.join(', ') + ' WHERE id = ?', [...params, id]);
    }

    if (full_name !== undefined || phone !== undefined) {
      await query('UPDATE user_profiles SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone) WHERE user_id = ?', [full_name ?? null, phone ?? null, id]);
    }

    const updated = await query<UserRow[]>(
      `SELECT u.id, u.username, u.email, u.role, u.status, up.full_name, up.phone
       FROM users u LEFT JOIN user_profiles up ON up.user_id = u.id WHERE u.id = ?`,
      [id]
    );
    return res.json({ success: true, data: updated[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await query<Array<{ id: number }>>('SELECT id FROM users WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    await query('DELETE FROM users WHERE id = ?', [id]);
    return res.json({ success: true, message: 'User deleted' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

