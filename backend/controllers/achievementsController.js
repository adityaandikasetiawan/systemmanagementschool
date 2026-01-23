const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const config = require('../config/config');

const uploadRoot = config.upload.uploadPath;
const achievementsDir = path.join(uploadRoot, 'achievements');
try { fs.mkdirSync(achievementsDir, { recursive: true }); } catch {}

const ensureMySqlTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS achievements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_name VARCHAR(150) NOT NULL,
      image_url VARCHAR(255),
      achievement VARCHAR(200) NOT NULL,
      competition VARCHAR(200),
      rank VARCHAR(50),
      category VARCHAR(100),
      accent_color VARCHAR(20),
      year VARCHAR(10),
      status ENUM('draft','published') DEFAULT 'published',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_status (status),
      INDEX idx_category (category),
      INDEX idx_year (year)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`;
  try { await executeQuery(sql); } catch {}
};

const saveBufferAsWebp = async (buffer) => {
  const name = `achievement_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`;
  const filePath = path.join(achievementsDir, name);
  await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
  return `/uploads/achievements/${name}`;
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

exports.list = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, year, status, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const q = {};
      if (category) q.category = category;
      if (year) q.year = year;
      if (status) q.status = status;
      if (search) q.$or = [
        { student_name: { $regex: search, $options: 'i' } },
        { achievement: { $regex: search, $options: 'i' } },
        { competition: { $regex: search, $options: 'i' } }
      ];
      const total = await db.collection('achievements').countDocuments(q);
      const items = await db.collection('achievements')
        .find(q)
        .sort({ created_at: -1 })
        .skip(offset)
        .limit(parseInt(limit))
        .toArray();
      items.forEach(a => { a.id = a._id.toString(); delete a._id; });
      return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: items });
    }
    await ensureMySqlTable();
    const where = [];
    const params = [];
    if (category) { where.push('category = ?'); params.push(category); }
    if (year) { where.push('year = ?'); params.push(year); }
    if (status) { where.push('status = ?'); params.push(status); }
    if (search) { where.push('(student_name LIKE ? OR achievement LIKE ? OR competition LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const countRow = await getOne(`SELECT COUNT(*) AS total FROM achievements ${whereClause}`, params);
    const total = countRow ? countRow.total : 0;
    const rows = await executeQuery(`SELECT * FROM achievements ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
    return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: rows });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Gagal mengambil data prestasi', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
  }
};

exports.create = async (req, res) => {
  try {
    const { student_name, achievement, competition, rank, category, accent_color, year, status = 'published', image_url } = req.body;
    let resolvedImageUrl = image_url || null;
    if (req.file && req.file.buffer) {
      try { resolvedImageUrl = await saveBufferAsWebp(req.file.buffer); } catch {}
    } else if (!resolvedImageUrl && req.body.image_base64) {
      try { const saved = await saveBase64AsWebp(req.body.image_base64); if (saved) resolvedImageUrl = saved; } catch {}
    }
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = {
        student_name,
        image_url: resolvedImageUrl,
        achievement,
        competition: competition || null,
        rank: rank || null,
        category: category || null,
        accent_color: accent_color || null,
        year: year || null,
        status,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await db.collection('achievements').insertOne(doc);
      doc.id = result.insertedId.toString();
      return res.status(201).json({ success: true, message: 'Prestasi berhasil dibuat', data: doc });
    }
    await ensureMySqlTable();
    const newId = await insert(
      `INSERT INTO achievements (student_name, image_url, achievement, competition, rank, category, accent_color, year, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [student_name, resolvedImageUrl, achievement, competition || null, rank || null, category || null, accent_color || null, year || null, status]
    );
    const row = await getOne('SELECT * FROM achievements WHERE id = ?', [newId]);
    return res.status(201).json({ success: true, message: 'Prestasi berhasil dibuat', data: row });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Gagal membuat prestasi', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_name, achievement, competition, rank, category, accent_color, year, status, image_url } = req.body || {};
    let existing;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      existing = await db.collection('achievements').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });
    } else {
      existing = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
      if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });
    }
    const updates = {};
    if (student_name) updates.student_name = student_name;
    if (achievement) updates.achievement = achievement;
    if (competition !== undefined) updates.competition = competition;
    if (rank !== undefined) updates.rank = rank;
    if (category !== undefined) updates.category = category;
    if (accent_color !== undefined) updates.accent_color = accent_color;
    if (year !== undefined) updates.year = year;
    if (status) updates.status = status;
    if (image_url !== undefined) updates.image_url = image_url;
    if (!updates.image_url) {
      if (req.file && req.file.buffer) {
        try {
          const saved = await saveBufferAsWebp(req.file.buffer);
          updates.image_url = saved;
          const old = existing && existing.image_url;
          if (old && (String(old).startsWith('/uploads/achievements/') || String(old).startsWith('achievements/'))) {
            const rel = String(old).replace(/^\/uploads\//, '');
            try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
          }
        } catch {}
      } else if (req.body.image_base64) {
        try {
          const saved = await saveBase64AsWebp(req.body.image_base64);
          if (saved) {
            updates.image_url = saved;
            const old = existing && existing.image_url;
            if (old && (String(old).startsWith('/uploads/achievements/') || String(old).startsWith('achievements/'))) {
              const rel = String(old).replace(/^\/uploads\//, '');
              try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
            }
          }
        } catch {}
      }
    }
    if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'Tidak ada perubahan' });
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      await db.collection('achievements').updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updated_at: new Date() } });
      const doc = await db.collection('achievements').findOne({ _id: new ObjectId(id) });
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, message: 'Prestasi berhasil diupdate', data: doc });
    }
    const parts = Object.keys(updates).map(k => `${k} = ?`).join(', ');
    const values = [...Object.values(updates), id];
    await update(`UPDATE achievements SET ${parts}, updated_at = NOW() WHERE id = ?`, values);
    const row = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Prestasi berhasil diupdate', data: row });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Gagal mengupdate prestasi', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('achievements').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });
      await db.collection('achievements').deleteOne({ _id: new ObjectId(id) });
      const old = existing.image_url;
      if (old && (String(old).startsWith('/uploads/achievements/') || String(old).startsWith('achievements/'))) {
        const rel = String(old).replace(/^\/uploads\//, '');
        try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
      }
      return res.status(200).json({ success: true, message: 'Prestasi berhasil dihapus', data: {} });
    }
    const existing = await getOne('SELECT * FROM achievements WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' });
    await deleteRow('DELETE FROM achievements WHERE id = ?', [id]);
    const old = existing.image_url;
    if (old && (String(old).startsWith('/uploads/achievements/') || String(old).startsWith('achievements/'))) {
      const rel = String(old).replace(/^\/uploads\//, '');
      try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
    }
    return res.status(200).json({ success: true, message: 'Prestasi berhasil dihapus', data: {} });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Gagal menghapus prestasi', error: process.env.NODE_ENV === 'development' ? e.message : undefined });
  }
};

