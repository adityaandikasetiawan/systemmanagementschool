import { Request, Response } from 'express';
import { query } from '../config/database';

type UnitRow = {
  id: number;
  code: string;
  name: string;
  level: string;
  description?: string | null;
  accent_color: string;
  icon?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  principal_name?: string | null;
  status: string;
  established_year?: number | null;
};

export const listUnits = async (req: Request, res: Response) => {
  try {
    const { status, code, website, page = '1', limit = '20' } = req.query as Record<string, string>;
    const pageNum = Math.max(parseInt(page || '1', 10) || 1, 1);
    const limitNum = Math.max(parseInt(limit || '20', 10) || 20, 1);
    const offset = (pageNum - 1) * limitNum;

    const filters: string[] = [];
    const params: Array<string | number> = [];
    if (status) { filters.push('su.status = ?'); params.push(status); }
    if (code) { filters.push('su.code = ?'); params.push(code); }
    if (website) { filters.push('su.website LIKE ?'); params.push(`%${website}%`); }
    const where = filters.length ? `WHERE ${filters.join(' AND ')}` : '';

    const rows = await query<UnitRow[]>(
      `SELECT su.* FROM school_units su ${where} ORDER BY su.id DESC LIMIT ${limitNum} OFFSET ${offset}`,
      params
    );

    const countRows = await query<Array<{ total: number }>>(
      `SELECT COUNT(*) AS total FROM school_units su ${where}`,
      params
    );

    return res.json({
      success: true,
      data: {
        units: rows,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: countRows[0]?.total || 0,
          total_pages: Math.ceil((countRows[0]?.total || 0) / limitNum)
        }
      }
    });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to list units' });
  }
};

export const getUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await query<UnitRow[]>(
      `SELECT su.* FROM school_units su WHERE su.id = ? LIMIT 1`,
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    return res.json({ success: true, data: rows[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get unit' });
  }
};

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { code, name, level, description, accent_color, icon, address, phone, email, website, principal_name, status = 'active', established_year } = req.body || {};

    if (!code || !name || !level || !accent_color) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const exists = await query<Array<{ id: number }>>('SELECT id FROM school_units WHERE code = ? LIMIT 1', [code]);
    if (exists.length) {
      return res.status(409).json({ success: false, message: 'Unit code already exists' });
    }

    const result = await query<{ insertId: number }>(
      `INSERT INTO school_units (code, name, level, description, accent_color, icon, address, phone, email, website, principal_name, status, established_year, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [code, name, level, description || null, accent_color, icon || null, address || null, phone || null, email || null, website || null, principal_name || null, status, established_year || null]
    );
    const unitId = result.insertId;
    const rows = await query<UnitRow[]>(`SELECT su.* FROM school_units su WHERE su.id = ?`, [unitId]);
    return res.status(201).json({ success: true, data: rows[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to create unit' });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, name, level, description, accent_color, icon, address, phone, email, website, principal_name, status, established_year } = req.body || {};

    const rows = await query<Array<{ id: number }>>('SELECT id FROM school_units WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }

    const fields: string[] = [];
    const params: Array<string | number | null> = [];
    if (code) { fields.push('code = ?'); params.push(code); }
    if (name) { fields.push('name = ?'); params.push(name); }
    if (level) { fields.push('level = ?'); params.push(level); }
    if (description !== undefined) { fields.push('description = ?'); params.push(description ?? null); }
    if (accent_color) { fields.push('accent_color = ?'); params.push(accent_color); }
    if (icon !== undefined) { fields.push('icon = ?'); params.push(icon ?? null); }
    if (address !== undefined) { fields.push('address = ?'); params.push(address ?? null); }
    if (phone !== undefined) { fields.push('phone = ?'); params.push(phone ?? null); }
    if (email !== undefined) { fields.push('email = ?'); params.push(email ?? null); }
    if (website !== undefined) { fields.push('website = ?'); params.push(website ?? null); }
    if (principal_name !== undefined) { fields.push('principal_name = ?'); params.push(principal_name ?? null); }
    if (status) { fields.push('status = ?'); params.push(status); }
    if (established_year !== undefined) { fields.push('established_year = ?'); params.push(established_year ?? null); }

    if (fields.length) {
      await query('UPDATE school_units SET ' + fields.join(', ') + ' WHERE id = ?', [...params, id]);
    }

    const updated = await query<UnitRow[]>(`SELECT su.* FROM school_units su WHERE su.id = ?`, [id]);
    return res.json({ success: true, data: updated[0] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to update unit' });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await query<Array<{ id: number }>>('SELECT id FROM school_units WHERE id = ? LIMIT 1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Unit not found' });
    }
    await query('DELETE FROM school_units WHERE id = ?', [id]);
    return res.json({ success: true, message: 'Unit deleted' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to delete unit' });
  }
};

