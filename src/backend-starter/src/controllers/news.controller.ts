import { Request, Response } from 'express';
import { query } from '../config/database';
import { RowDataPacket } from 'mysql2';

const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    const page = parseInt(String(req.query.page || '1'), 10);
    const limit = parseInt(String(req.query.limit || '10'), 10);
    const offset = (page - 1) * limit;

    try {
      const news = await query<RowDataPacket[]>('SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?', [limit, offset]);
      const countResult = await query<RowDataPacket[]>('SELECT COUNT(*) as total FROM news');
      const total = countResult[0]?.total || 0;

      return res.json({ 
        success: true, 
        data: news,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
    } catch (dbError) {
      // Fallback to mock data if DB fails or table doesn't exist
      if (isDev) {
        const items = [
          { id: 1, title: 'Siswa SDIT Juara Olimpiade', category: 'Prestasi', unit_sekolah: 'SDIT', status: 'published', slug: 'siswa-sdit-juara-olimpiade', created_at: new Date().toISOString() },
          { id: 2, title: 'Kegiatan Pesantren Kilat', category: 'Kegiatan', unit_sekolah: 'SMPIT', status: 'published', slug: 'kegiatan-pesantren-kilat', created_at: new Date().toISOString() }
        ];
        return res.json({ success: true, data: items });
      }
      return res.status(500).json({ success: false, message: 'Failed to get news from database' });
    }
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get news' });
  }
};

export const getLatest = async (req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    const limit = parseInt(String(req.query.limit || '5'), 10);

    try {
      const news = await query<RowDataPacket[]>('SELECT * FROM news WHERE status = "published" ORDER BY created_at DESC LIMIT ?', [limit]);
      return res.json({ success: true, data: news });
    } catch (dbError) {
      if (isDev) {
        const items = Array.from({ length: Math.max(1, limit) }).map((_, i) => ({
          id: i + 1,
          title: `Berita Terbaru ${i + 1}`,
          category: i % 2 === 0 ? 'Prestasi' : 'Kegiatan',
          unit_sekolah: ['SDIT', 'SMPIT', 'SMAIT'][i % 3],
          status: 'published',
          slug: `berita-terbaru-${i + 1}`,
          created_at: new Date().toISOString()
        }));
        return res.json({ success: true, data: items });
      }
      return res.status(500).json({ success: false, message: 'Failed to get latest news' });
    }
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get latest news' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    const id = parseInt(String(req.params.id), 10);

    try {
      const rows = await query<RowDataPacket[]>('SELECT * FROM news WHERE id = ?', [id]);
      if (rows.length > 0) {
        return res.json({ success: true, data: rows[0] });
      }
      // If not found in DB, check dev mock
      throw new Error('Not found in DB');
    } catch (dbError) {
      if (isDev) {
        return res.json({ success: true, data: {
          id,
          title: `Detail Berita ${id}`,
          content: 'Konten berita contoh untuk kebutuhan pengujian.',
          category: 'Prestasi',
          unit_sekolah: 'SDIT',
          status: 'published',
          slug: `detail-berita-${id}`,
          created_at: new Date().toISOString()
        } });
      }
      return res.status(404).json({ success: false, message: 'News not found' });
    }
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get news detail' });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { title, content, category, unit_sekolah, status, publish_date } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '');
    const slug = slugify(title) + '-' + Date.now();
    
    await query(
      'INSERT INTO news (title, slug, content, category, unit_sekolah, image_url, status, publish_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, slug, content, category, unit_sekolah, image_url, status || 'draft', publish_date || null]
    );
    
    return res.json({ success: true, message: 'News created successfully' });
  } catch (error: any) {
    console.error('Create news error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to create news' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, category, unit_sekolah, status, publish_date } = req.body;
    
    let image_url = req.body.image_url;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }
    
    const slug = slugify(title) + '-' + id;
    
    await query(
      'UPDATE news SET title=?, slug=?, content=?, category=?, unit_sekolah=?, image_url=?, status=?, publish_date=? WHERE id=?',
      [title, slug, content, category, unit_sekolah, image_url, status, publish_date, id]
    );
    
    return res.json({ success: true, message: 'News updated successfully' });
  } catch (error: any) {
    console.error('Update news error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to update news' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM news WHERE id=?', [id]);
    return res.json({ success: true, message: 'News deleted successfully' });
  } catch (error: any) {
    console.error('Delete news error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete news' });
  }
};
