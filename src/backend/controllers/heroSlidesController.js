const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');
const config = require('../config/config');
const sharp = require('sharp');

const uploadRoot = config.upload.uploadPath;
const heroDir = path.join(uploadRoot, 'hero');
try { fs.mkdirSync(heroDir, { recursive: true }); } catch {}

const ensureMySqlTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS hero_slides (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(255) NOT NULL,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      badge VARCHAR(50),
      \`order\` INT DEFAULT 0,
      status ENUM('draft','published') DEFAULT 'published',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_order (\`order\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;
  try { await executeQuery(sql); } catch {}
};

const saveBufferAsWebp = async (buffer) => {
  const name = `hero_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`;
  const filePath = path.join(heroDir, name);
  await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
  return `/uploads/hero/${name}`;
};

const saveBase64Image = async (base64) => {
  try {
    const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(base64 || '');
    if (!match) return null;
    const mime = match[1];
    const data = match[2];
    const allowed = ['image/png','image/jpeg','image/webp','image/jpg'];
    if (!allowed.includes(mime)) return null;
    const buffer = Buffer.from(data, 'base64');
    return await saveBufferAsWebp(buffer);
  } catch (e) {
    return null;
  }
};

exports.getAllSlides = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const useMongo = process.env.USE_MONGO === 'true';

    if (useMongo) {
      const db = await getDb();
      const q = {};
      if (status) q.status = status;
      if (search) q.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { badge: { $regex: search, $options: 'i' } }
      ];
      const total = await db.collection('hero_slides').countDocuments(q);
      const items = await db.collection('hero_slides')
        .find(q)
        .sort({ order: 1, created_at: -1 })
        .skip(offset)
        .limit(parseInt(limit))
        .toArray();
      items.forEach(s => { s.id = s._id.toString(); delete s._id; });
      return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: items });
    }

    await ensureMySqlTable();
    let where = [];
    let params = [];
    if (status) { where.push('status = ?'); params.push(status); }
    if (search) { where.push('(title LIKE ? OR description LIKE ? OR badge LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const countRow = await getOne(`SELECT COUNT(*) AS total FROM hero_slides ${whereClause}`, params);
    const total = countRow ? countRow.total : 0;
    const items = await executeQuery(`SELECT * FROM hero_slides ${whereClause} ORDER BY \`order\` ASC, created_at DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
    return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: items });
  } catch (error) {
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
      const mockSlides = [
        { id: 1, image: '/uploads/hero/sample1.jpg', title: 'Selamat Datang', description: 'Sekolah Islam Baitul Jannah', badge: 'Informasi', order: 0, status: 'published' },
        { id: 2, image: '/uploads/hero/sample2.jpg', title: 'Penerimaan Siswa Baru', description: 'PPDB Tahun Ajaran Baru', badge: 'PPDB', order: 1, status: 'published' }
      ];
      return res.status(200).json({ success: true, total: mockSlides.length, totalPages: 1, currentPage: 1, data: mockSlides });
    }
    res.status(500).json({ success: false, message: 'Gagal mengambil hero slides', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.getSlideById = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = await db.collection('hero_slides').findOne({ _id: new ObjectId(id) });
      if (!doc) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, data: doc });
    }
    await ensureMySqlTable();
    const slide = await getOne('SELECT * FROM hero_slides WHERE id = ?', [id]);
    if (!slide) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
    return res.status(200).json({ success: true, data: slide });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengambil slide', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.createSlide = async (req, res) => {
  try {
    let { image, title, description, badge, order = 0, status = 'published', image_base64 } = req.body;
    if (req.file && req.file.buffer) {
      try { image = await saveBufferAsWebp(req.file.buffer); } catch {}
    }
    if ((!image || !title) && image_base64 && title) {
      const saved = await saveBase64Image(image_base64);
      if (!saved) return res.status(400).json({ success: false, message: 'Gagal menyimpan gambar base64' });
      image = saved;
    }
    if (!image || !title) {
      return res.status(400).json({ success: false, message: 'image dan title diperlukan' });
    }

    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = {
        image,
        title,
        description: description || null,
        badge: badge || null,
        order: typeof order === 'number' ? order : parseInt(order) || 0,
        status,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await db.collection('hero_slides').insertOne(doc);
      doc.id = result.insertedId.toString();
      return res.status(201).json({ success: true, message: 'Slide berhasil dibuat', data: doc });
    }

    await ensureMySqlTable();
    const newId = await insert(
      `INSERT INTO hero_slides (image, title, description, badge, \`order\`, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [image, title, description || null, badge || null, Number(order) || 0, status]
    );
    const slide = await getOne('SELECT * FROM hero_slides WHERE id = ?', [newId]);
    return res.status(201).json({ success: true, message: 'Slide berhasil dibuat', data: slide });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal membuat slide', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [ 'image', 'title', 'description', 'badge', 'order', 'status' ];
    const body = req.body || {};

    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('hero_slides').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
      const updates = {};
      for (const f of fields) { if (body[f] !== undefined) updates[f] = f === 'order' ? Number(body[f]) : body[f]; }
      if (!updates.image && req.file && req.file.buffer) {
        const saved = await saveBufferAsWebp(req.file.buffer);
        updates.image = saved;
        const old = existing && existing.image;
        if (old && String(old).startsWith('/uploads/hero/')) {
          const rel = String(old).replace(/^\/uploads\//, '');
          try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
        }
      } else if (!updates.image && body.image_base64) {
        const saved = await saveBase64Image(body.image_base64);
        if (!saved) return res.status(400).json({ success: false, message: 'Gagal menyimpan gambar base64' });
        updates.image = saved;
        const old = existing && existing.image;
        if (old && String(old).startsWith('/uploads/hero/')) {
          const rel = String(old).replace(/^\/uploads\//, '');
          try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
        }
      }
      if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'Tidak ada perubahan' });
      await db.collection('hero_slides').updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updated_at: new Date() } });
      const doc = await db.collection('hero_slides').findOne({ _id: new ObjectId(id) });
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, message: 'Slide berhasil diupdate', data: doc });
    }

    await ensureMySqlTable();
    const existing = await getOne('SELECT id, image FROM hero_slides WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
    const updateFields = [];
    const values = [];
    for (const f of fields) {
      if (body[f] !== undefined) {
        const col = f === 'order' ? '\`order\`' : f;
        updateFields.push(`${col} = ?`);
        values.push(f === 'order' ? Number(body[f]) : body[f]);
      }
    }
    if (!updateFields.find(f => f.startsWith('image'))) {
      if (req.file && req.file.buffer) {
        const saved = await saveBufferAsWebp(req.file.buffer);
        updateFields.push('image = ?');
        values.push(saved);
        const old = existing && existing.image;
        if (old && String(old).startsWith('/uploads/hero/')) {
          const rel = String(old).replace(/^\/uploads\//, '');
          try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
        }
      } else if (body.image_base64) {
        const saved = await saveBase64Image(body.image_base64);
        if (!saved) return res.status(400).json({ success: false, message: 'Gagal menyimpan gambar base64' });
        updateFields.push('image = ?');
        values.push(saved);
        const old = existing && existing.image;
        if (old && String(old).startsWith('/uploads/hero/')) {
          const rel = String(old).replace(/^\/uploads\//, '');
          try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
        }
      }
    }
    if (!updateFields.length) return res.status(400).json({ success: false, message: 'Tidak ada perubahan' });
    values.push(id);
    await update(`UPDATE hero_slides SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`, values);
    const slide = await getOne('SELECT * FROM hero_slides WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Slide berhasil diupdate', data: slide });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengupdate slide', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('hero_slides').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
      await db.collection('hero_slides').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Slide berhasil dihapus', data: {} });
    }
    await ensureMySqlTable();
    const existing = await getOne('SELECT id FROM hero_slides WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Slide tidak ditemukan' });
    await deleteRow('DELETE FROM hero_slides WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Slide berhasil dihapus', data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghapus slide', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};
