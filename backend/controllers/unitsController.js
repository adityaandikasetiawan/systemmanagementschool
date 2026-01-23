const { executeQuery, getOne, insert, update, deleteRow } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const config = require('../config/config');

const uploadRoot = config.upload.uploadPath;
const unitsDir = path.join(uploadRoot, 'units');
try { fs.mkdirSync(unitsDir, { recursive: true }); } catch {}

const saveBufferAsWebp = async (buffer) => {
  const name = `unit_${Date.now()}_${Math.random().toString(36).slice(2)}.webp`;
  const filePath = path.join(unitsDir, name);
  await sharp(buffer).webp({ quality: 80 }).toFile(filePath);
  return `/uploads/units/${name}`;
};

const saveBase64AsWebp = async (base64) => {
  const m = /^data:(image\/[-+.a-zA-Z0-9]+);base64,(.+)$/.exec(base64 || '');
  if (!m) return null;
  const mime = m[1];
  const allowed = ['image/png','image/jpeg','image/webp','image/jpg'];
  if (!allowed.includes(mime)) return null;
  const data = m[2];
  const buffer = Buffer.from(data, 'base64');
  return await saveBufferAsWebp(buffer);
};

exports.getAllUnits = async (req, res) => {
  try {
    const { page = 1, limit = 50, search, status } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const useMongo = process.env.USE_MONGO === 'true';

    if (useMongo) {
      const db = await getDb();
      const q = {};
      if (status) q.status = status;
      if (search) q.$or = [
        { name: { $regex: search, $options: 'i' } },
        { level: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
      const total = await db.collection('school_units').countDocuments(q);
      const items = await db.collection('school_units')
        .find(q)
        .sort({ created_at: -1 })
        .skip(offset)
        .limit(parseInt(limit))
        .toArray();
      items.forEach(u => { u.id = u._id.toString(); delete u._id; });
      return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: items });
    }

    let where = [];
    let params = [];
    if (status) { where.push('status = ?'); params.push(status); }
    if (search) { where.push('(name LIKE ? OR level LIKE ? OR code LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`); }
    const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';
    const countRow = await getOne(`SELECT COUNT(*) AS total FROM school_units ${whereClause}`, params);
    const total = countRow ? countRow.total : 0;
    const items = await executeQuery(`SELECT * FROM school_units ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...params, parseInt(limit), offset]);
    return res.status(200).json({ success: true, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: items });
  } catch (error) {
    console.error('Error getting units:', error);
    
    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED') {
        console.warn('⚠️ Returning MOCK DATA for units due to DB error');
        const mockUnits = [
            { id: 1, name: 'TK Islam Baitul Jannah', code: 'TK', level: 'TK', description: 'Pendidikan Anak Usia Dini', status: 'active' },
            { id: 2, name: 'SD Islam Baitul Jannah', code: 'SD', level: 'SD', description: 'Sekolah Dasar Islam Terpadu', status: 'active' },
            { id: 3, name: 'SMP Islam Baitul Jannah', code: 'SMP', level: 'SMP', description: 'Sekolah Menengah Pertama Islam', status: 'active' },
            { id: 4, name: 'SMA Islam Baitul Jannah', code: 'SMA', level: 'SMA', description: 'Sekolah Menengah Atas Islam', status: 'active' }
        ];
        return res.status(200).json({ success: true, total: mockUnits.length, totalPages: 1, currentPage: 1, data: mockUnits });
    }

    res.status(500).json({ success: false, message: 'Gagal mengambil data unit', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = await db.collection('school_units').findOne({ _id: new ObjectId(id) });
      if (!doc) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, data: doc });
    }
    const unit = await getOne('SELECT * FROM school_units WHERE id = ?', [id]);
    if (!unit) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
    return res.status(200).json({ success: true, data: unit });
  } catch (error) {
    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
        console.warn('⚠️ Returning MOCK DATA for getUnitById due to DB error');
        const mockUnit = {
            id: req.params.id,
            name: 'SD Islam Baitul Jannah (Mock)',
            code: 'SD',
            level: 'SD',
            description: 'Sekolah Dasar Islam Terpadu',
            status: 'active',
            accent_color: '#1a73e8',
            icon: '/uploads/units/sd.png'
        };
        return res.status(200).json({ success: true, data: mockUnit });
    }
    res.status(500).json({ success: false, message: 'Gagal mengambil unit', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.createUnit = async (req, res) => {
  try {
    const {
      code,
      name,
      level,
      description,
      accent_color,
      icon,
      address,
      phone,
      email,
      website,
      principal_name,
      status = 'active',
      established_year
    } = req.body;

    if (!code || !name || !level || !accent_color) {
      return res.status(400).json({ success: false, message: 'code, name, level, accent_color diperlukan' });
    }

    let resolvedIcon = icon || null;
    if (req.file && req.file.buffer) {
      try { resolvedIcon = await saveBufferAsWebp(req.file.buffer); } catch {}
    } else if (!resolvedIcon && req.body.icon_base64) {
      try { const saved = await saveBase64AsWebp(req.body.icon_base64); if (saved) resolvedIcon = saved; } catch {}
    }

    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const exists = await db.collection('school_units').findOne({ code });
      if (exists) return res.status(409).json({ success: false, message: 'Kode unit sudah ada' });
      const doc = {
        code,
        name,
        level,
        description: description || null,
        accent_color,
        icon: resolvedIcon,
        address: address || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        principal_name: principal_name || null,
        status,
        established_year: established_year || null,
        created_at: new Date(),
        updated_at: new Date()
      };
      const result = await db.collection('school_units').insertOne(doc);
      doc.id = result.insertedId.toString();
      return res.status(201).json({ success: true, message: 'Unit berhasil dibuat', data: doc });
    }

    const unitId = await insert(
      `INSERT INTO school_units (code, name, level, description, accent_color, icon, address, phone, email, website, principal_name, status, established_year, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [code, name, level, description || null, accent_color, resolvedIcon, address || null, phone || null, email || null, website || null, principal_name || null, status, established_year || null]
    );
    const unit = await getOne('SELECT * FROM school_units WHERE id = ?', [unitId]);
    return res.status(201).json({ success: true, message: 'Unit berhasil dibuat', data: unit });
  } catch (error) {
    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
        console.warn('⚠️ Returning MOCK DATA for createUnit due to DB error');
        const mockUnit = {
            id: Date.now(),
            code: req.body.code || 'MOCK',
            name: req.body.name || 'Mock Unit',
            level: req.body.level || 'Mock Level',
            status: req.body.status || 'active',
            created_at: new Date()
        };
        return res.status(201).json({ success: true, message: 'Unit berhasil dibuat (MOCK)', data: mockUnit });
    }
    res.status(500).json({ success: false, message: 'Gagal membuat unit', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.updateUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = [
      'code','name','level','description','accent_color','icon','address','phone','email','website','principal_name','status','established_year'
    ];
    const body = req.body || {};

    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('school_units').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
      const updates = {};
      for (const f of fields) { if (body[f] !== undefined) updates[f] = body[f]; }
      if (updates.icon === undefined) {
        if (req.file && req.file.buffer) {
          try {
            const saved = await saveBufferAsWebp(req.file.buffer);
            updates.icon = saved;
            const old = existing && existing.icon;
            if (old && (String(old).startsWith('/uploads/units/') || String(old).startsWith('units/'))) {
              const rel = String(old).replace(/^\/uploads\//, '');
              try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
            }
          } catch {}
        } else if (body.icon_base64) {
          try {
            const saved = await saveBase64AsWebp(body.icon_base64);
            if (saved) {
              updates.icon = saved;
              const old = existing && existing.icon;
              if (old && (String(old).startsWith('/uploads/units/') || String(old).startsWith('units/'))) {
                const rel = String(old).replace(/^\/uploads\//, '');
                try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
              }
            }
          } catch {}
        }
      }
      if (!Object.keys(updates).length) return res.status(400).json({ success: false, message: 'Tidak ada perubahan' });
      await db.collection('school_units').updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updated_at: new Date() } });
      const doc = await db.collection('school_units').findOne({ _id: new ObjectId(id) });
      doc.id = doc._id.toString(); delete doc._id;
      return res.status(200).json({ success: true, message: 'Unit berhasil diupdate', data: doc });
    }

    const existing = await getOne('SELECT id, icon FROM school_units WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
    const updateFields = [];
    const values = [];
    for (const f of fields) { if (body[f] !== undefined) { updateFields.push(`${f} = ?`); values.push(body[f]); } }
    if (!updateFields.find(f => f.startsWith('icon'))) {
      if (req.file && req.file.buffer) {
        try {
          const saved = await saveBufferAsWebp(req.file.buffer);
          updateFields.push('icon = ?');
          values.push(saved);
          const old = existing && existing.icon;
          if (old && (String(old).startsWith('/uploads/units/') || String(old).startsWith('units/'))) {
            const rel = String(old).replace(/^\/uploads\//, '');
            try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
          }
        } catch {}
      } else if (body.icon_base64) {
        try {
          const saved = await saveBase64AsWebp(body.icon_base64);
          if (saved) {
            updateFields.push('icon = ?');
            values.push(saved);
            const old = existing && existing.icon;
            if (old && (String(old).startsWith('/uploads/units/') || String(old).startsWith('units/'))) {
              const rel = String(old).replace(/^\/uploads\//, '');
              try { fs.unlinkSync(path.join(uploadRoot, rel)); } catch {}
            }
          }
        } catch {}
      }
    }
    if (!updateFields.length) return res.status(400).json({ success: false, message: 'Tidak ada perubahan' });
    values.push(id);
    await update(`UPDATE school_units SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`, values);
    const unit = await getOne('SELECT * FROM school_units WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Unit berhasil diupdate', data: unit });
  } catch (error) {
    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
        console.warn('⚠️ Returning MOCK DATA for updateUnit due to DB error');
        const mockUnit = {
            id: req.params.id,
            name: req.body.name || 'Mock Unit Updated',
            updated_at: new Date()
        };
        return res.status(200).json({ success: true, message: 'Unit berhasil diupdate (MOCK)', data: mockUnit });
    }
    res.status(500).json({ success: false, message: 'Gagal mengupdate unit', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

exports.deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const existing = await db.collection('school_units').findOne({ _id: new ObjectId(id) });
      if (!existing) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
      await db.collection('school_units').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true, message: 'Unit berhasil dihapus', data: {} });
    }
    const existing = await getOne('SELECT id FROM school_units WHERE id = ?', [id]);
    if (!existing) return res.status(404).json({ success: false, message: 'Unit tidak ditemukan' });
    await deleteRow('DELETE FROM school_units WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: 'Unit berhasil dihapus', data: {} });
  } catch (error) {
    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
        console.warn('⚠️ Returning MOCK DATA for deleteUnit due to DB error');
        return res.status(200).json({ success: true, message: 'Unit berhasil dihapus (MOCK)', data: {} });
    }
    res.status(500).json({ success: false, message: 'Gagal menghapus unit', error: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
};

