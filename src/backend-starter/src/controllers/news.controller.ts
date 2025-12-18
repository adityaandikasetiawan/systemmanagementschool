import { Request, Response } from 'express';

export const getAll = async (_req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    if (isDev) {
      const items = [
        { id: 1, title: 'Siswa SDIT Juara Olimpiade', category: 'Prestasi', unit_sekolah: 'SDIT', status: 'published', slug: 'siswa-sdit-juara-olimpiade', created_at: new Date().toISOString() },
        { id: 2, title: 'Kegiatan Pesantren Kilat', category: 'Kegiatan', unit_sekolah: 'SMPIT', status: 'published', slug: 'kegiatan-pesantren-kilat', created_at: new Date().toISOString() }
      ];
      return res.json({ success: true, data: items });
    }
    return res.json({ success: true, data: [] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get news' });
  }
};

export const getLatest = async (req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    const limit = parseInt(String(req.query.limit || '5'), 10);
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
    return res.json({ success: true, data: [] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get latest news' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    const id = parseInt(String(req.params.id), 10);
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
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get news detail' });
  }
};

