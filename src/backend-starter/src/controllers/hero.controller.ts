import { Request, Response } from 'express';

export const getSlides = async (_req: Request, res: Response) => {
  try {
    const isDev = process.env.NODE_ENV === 'development' && process.env.ALLOW_DEV_LOGIN === 'true';
    if (isDev) {
      const slides = [
        { id: 1, title: 'Selamat Datang di Baituljannah', image_url: '/uploads/hero/slide1.jpg', order: 1, status: 'published' },
        { id: 2, title: 'Prestasi Siswa Gemilang', image_url: '/uploads/hero/slide2.jpg', order: 2, status: 'published' },
        { id: 3, title: 'Kegiatan Islami Terpadu', image_url: '/uploads/hero/slide3.jpg', order: 3, status: 'published' }
      ];
      return res.json({ success: true, data: slides });
    }
    return res.json({ success: true, data: [] });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: 'Failed to get hero slides' });
  }
};

