const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const config = require('../config/config');

const uploadRoot = config.upload.uploadPath;
const newsDir = path.join(uploadRoot, 'news');
try { fs.mkdirSync(newsDir, { recursive: true }); } catch {}

const saveBufferAsWebp = async (buffer) => {
  const name = `news_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`;
  const filePath = path.join(newsDir, name);
  await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
  return `/uploads/news/${name}`;
};

const saveBase64AsWebp = async (base64) => {
  const m = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(base64 || '');
  if (!m) return null;
  const mime = m[1];
  const allowed = ['image/png','image/jpeg','image/webp','image/jpg'];
  if (!allowed.includes(mime)) return null;
  const data = m[2];
  const buffer = Buffer.from(data, 'base64');
  return await saveBufferAsWebp(buffer);
};

// @desc    Get all news
// @route   GET /api/v1/news
// @access  Public
exports.getAllNews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      unit_sekolah,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const useMongo = process.env.USE_MONGO === 'true';

    if (useMongo) {
      const db = await getDb();
      const q = { status: 'published' };
      if (category) q.category = category;
      if (unit_sekolah) q.$or = [{ unit_sekolah }, { unit_sekolah: 'Semua' }];
      if (search) q.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];

      const allowedSortFields = ['created_at', 'title', 'views', 'publish_date'];
      const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
      const sortOrder = order.toUpperCase() === 'ASC' ? 1 : -1;

      const total = await db.collection('news').countDocuments(q);
      const items = await db.collection('news')
        .find(q)
        .sort({ [sortField]: sortOrder })
        .skip(offset)
        .limit(parseInt(limit))
        .toArray();
      items.forEach(n => { n.id = n._id.toString(); delete n._id; })

      return res.status(200).json({
        success: true,
        count: items.length,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        data: items
      });
    }

    let whereConditions = ['status = "published"'];
    let params = [];

    // Filter by category
    if (category) {
      whereConditions.push('category = ?');
      params.push(category);
    }

    // Filter by unit sekolah
    if (unit_sekolah) {
      whereConditions.push('(unit_sekolah = ? OR unit_sekolah = "Semua")');
      params.push(unit_sekolah);
    }

    // Search
    if (search) {
      whereConditions.push('(title LIKE ? OR content LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

  const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM news ${whereClause}`;
    const countResult = await getOne(countQuery, params);
    const total = countResult.total;

    // Get news
    const allowedSortFields = ['created_at', 'title', 'views', 'publish_date'];
    const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
    const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const query = `
      SELECT 
        n.*,
        u.full_name as author_name
      FROM news n
      LEFT JOIN users u ON n.author_id = u.id
      ${whereClause}
      ORDER BY ${sortField} ${sortOrder}
      LIMIT ? OFFSET ?
    `;

    const news = await executeQuery(query, [...params, parseInt(limit), offset]);

    res.status(200).json({
      success: true,
      count: news.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: news
    });
  } catch (error) {
    console.error('Get All News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single news by ID
// @route   GET /api/v1/news/:id
// @access  Public
exports.getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = await db.collection('news').findOne({ _id: new ObjectId(id) });
      if (!doc) {
        return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      }
      await db.collection('news').updateOne({ _id: new ObjectId(id) }, { $inc: { views: 1 } });
      doc.views = (doc.views || 0) + 1;
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, data: doc });
    } else {
      const news = await getOne(
        `SELECT 
          n.*,
          u.full_name as author_name,
          u.email as author_email
        FROM news n
        LEFT JOIN users u ON n.author_id = u.id
        WHERE n.id = ?`,
        [id]
      );
      if (!news) {
        return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      }
      await update('UPDATE news SET views = views + 1 WHERE id = ?', [id]);
      news.views += 1;
      return res.status(200).json({ success: true, data: news });
    }
  } catch (error) {
    console.error('Get News By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Create news
// @route   POST /api/v1/news
// @access  Private (Admin, Guru)
exports.createNews = async (req, res) => {
  try {
    const {
      title,
      content,
      category,
      unit_sekolah = 'Semua',
      image_url,
      status = 'draft',
      publish_date
    } = req.body;

    let resolvedImageUrl = image_url || null;
    if (req.file && req.file.buffer) {
      try { resolvedImageUrl = await saveBufferAsWebp(req.file.buffer); } catch {}
    } else if (!resolvedImageUrl && req.body.image_base64) {
      try { const saved = await saveBase64AsWebp(req.body.image_base64); if (saved) resolvedImageUrl = saved; } catch {}
    }

    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = {
        title,
        content,
        category,
        unit_sekolah,
        image_url: resolvedImageUrl,
        author_id: req.user.id,
        status,
        publish_date: publish_date ? new Date(publish_date) : null,
        views: 0,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await db.collection('news').insertOne(doc);
      doc.id = result.insertedId.toString();
      return res.status(201).json({ success: true, message: 'Berita berhasil dibuat', data: doc });
    } else {
      const newsId = await insert(
        `INSERT INTO news 
          (title, content, category, unit_sekolah, image_url, author_id, status, publish_date, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          title,
          content,
          category,
          unit_sekolah,
          resolvedImageUrl,
          req.user.id,
          status,
          publish_date || null
        ]
      );
      const news = await getOne('SELECT * FROM news WHERE id = ?', [newsId]);
      return res.status(201).json({ success: true, message: 'Berita berhasil dibuat', data: news });
    }
  } catch (error) {
    console.error('Create News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat membuat berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update news
// @route   PUT /api/v1/news/:id
// @access  Private (Admin, Author)
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      category,
      unit_sekolah,
      image_url,
      status,
      publish_date
    } = req.body;

    let existingNews
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      existingNews = await db.collection('news').findOne({ _id: new ObjectId(id) });
      if (existingNews) { existingNews.id = existingNews._id.toString(); delete existingNews._id }
    } else {
      existingNews = await getOne('SELECT * FROM news WHERE id = ?', [id]);
    }

    if (!existingNews) {
      return res.status(404).json({
        success: false,
        message: 'Berita tidak ditemukan'
      });
    }

    // Check authorization (only author or admin can update)
    if (req.user.role !== 'admin' && existingNews.author_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses untuk mengupdate berita ini'
      });
    }

    const fieldsToUpdate = {};
    if (title) fieldsToUpdate.title = title;
    if (content) fieldsToUpdate.content = content;
    if (category) fieldsToUpdate.category = category;
    if (unit_sekolah) fieldsToUpdate.unit_sekolah = unit_sekolah;
    if (image_url !== undefined) fieldsToUpdate.image_url = image_url;
    if (status) fieldsToUpdate.status = status;
    if (publish_date !== undefined) fieldsToUpdate.publish_date = publish_date;

    if (!fieldsToUpdate.image_url) {
      if (req.file && req.file.buffer) {
        try {
          const saved = await saveBufferAsWebp(req.file.buffer);
          fieldsToUpdate.image_url = saved;
          const old = existingNews && existingNews.image_url;
          if (old && (String(old).startsWith('/uploads/news/') || String(old).startsWith('news/'))) {
            const rel = String(old).replace(/^\/uploads\//, '');
            try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
          }
        } catch {}
      } else if (req.body.image_base64) {
        try {
          const saved = await saveBase64AsWebp(req.body.image_base64);
          if (saved) {
            fieldsToUpdate.image_url = saved;
            const old = existingNews && existingNews.image_url;
            if (old && (String(old).startsWith('/uploads/news/') || String(old).startsWith('news/'))) {
              const rel = String(old).replace(/^\/uploads\//, '');
              try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
            }
          }
        } catch {}
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tidak ada data yang diupdate'
      });
    }

    let updatedNews
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      await db.collection('news').updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...fieldsToUpdate, updated_at: new Date() } }
      );
      const doc = await db.collection('news').findOne({ _id: new ObjectId(id) });
      doc.id = doc._id.toString(); delete doc._id;
      updatedNews = doc;
    } else {
      const updateFields = Object.keys(fieldsToUpdate)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = [...Object.values(fieldsToUpdate), id];
      await update(`UPDATE news SET ${updateFields}, updated_at = NOW() WHERE id = ?`, values);
      updatedNews = await getOne('SELECT * FROM news WHERE id = ?', [id]);
    }

    res.status(200).json({
      success: true,
      message: 'Berita berhasil diupdate',
      data: updatedNews
    });
  } catch (error) {
    console.error('Update News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete news
// @route   DELETE /api/v1/news/:id
// @access  Private (Admin)
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('news').findOne({ _id: new ObjectId(id) });
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      }
      await db.collection('news').deleteOne({ _id: new ObjectId(id) });
    } else {
      const news = await getOne('SELECT * FROM news WHERE id = ?', [id]);
      if (!news) {
        return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      }
      await deleteRow('DELETE FROM news WHERE id = ?', [id]);
    }

    res.status(200).json({
      success: true,
      message: 'Berita berhasil dihapus',
      data: {}
    });
  } catch (error) {
    console.error('Delete News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus berita',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get latest news
// @route   GET /api/v1/news/latest
// @access  Public
exports.getLatestNews = async (req, res) => {
  try {
    const { limit = 5, unit_sekolah } = req.query;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const q = { status: 'published' };
      if (unit_sekolah) q.$or = [{ unit_sekolah }, { unit_sekolah: 'Semua' }];
      const items = await db.collection('news')
        .find(q)
        .sort({ created_at: -1 })
        .limit(parseInt(limit))
        .toArray();
      items.forEach(n => { n.id = n._id.toString(); delete n._id; });
      return res.status(200).json({ success: true, count: items.length, data: items });
    } else {
      let whereClause = 'WHERE status = "published"';
      let params = [];
      if (unit_sekolah) { whereClause += ' AND (unit_sekolah = ? OR unit_sekolah = "Semua")'; params.push(unit_sekolah); }
      const news = await executeQuery(
        `SELECT 
          n.*,
          u.full_name as author_name
        FROM news n
        LEFT JOIN users u ON n.author_id = u.id
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ?`,
        [...params, parseInt(limit)]
      );
      return res.status(200).json({ success: true, count: news.length, data: news });
    }
  } catch (error) {
    console.error('Get Latest News Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil berita terbaru',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
