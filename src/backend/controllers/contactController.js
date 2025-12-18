const { executeQuery, getOne, insert, update } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');

// @desc    Submit contact form
// @route   POST /api/v1/contact
// @access  Public
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, unit_sekolah } = req.body;

    let contact
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const doc = {
        name, email, phone, subject, message,
        unit_sekolah: unit_sekolah || 'Umum',
        status: 'unread',
        created_at: new Date(),
        read_at: null,
        replied_at: null,
        reply: null,
      };
      const result = await db.collection('contact_messages').insertOne(doc);
      doc.id = result.insertedId.toString();
      contact = doc;
    } else {
      const contactId = await insert(
        `INSERT INTO contact_messages 
          (name, email, phone, subject, message, unit_sekolah, status, created_at) 
         VALUES (?, ?, ?, ?, ?, ?, 'unread', NOW())`,
        [name, email, phone, subject, message, unit_sekolah || 'Umum']
      );
      contact = await getOne('SELECT * FROM contact_messages WHERE id = ?', [contactId]);
    }

    // TODO: Send notification email to admin
    // TODO: Send auto-reply to user

    res.status(201).json({
      success: true,
      message: 'Pesan Anda berhasil terkirim. Kami akan segera menghubungi Anda',
      data: contact
    });
  } catch (error) {
    console.error('Submit Contact Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengirim pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get all contact messages
// @route   GET /api/v1/contact
// @access  Private (Admin)
exports.getAllMessages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      unit_sekolah,
      search,
      sort = 'created_at',
      order = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;
    const useMongo = process.env.USE_MONGO === 'true';

    if (useMongo) {
      const db = await getDb();
      const q = {};
      if (status) q.status = status;
      if (unit_sekolah) q.unit_sekolah = unit_sekolah;
      if (search) q.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
      const allowedSortFields = ['created_at', 'name', 'status'];
      const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
      const sortOrder = order.toUpperCase() === 'ASC' ? 1 : -1;
      const total = await db.collection('contact_messages').countDocuments(q);
      const messages = await db.collection('contact_messages')
        .find(q)
        .sort({ [sortField]: sortOrder })
        .skip(offset)
        .limit(parseInt(limit))
        .toArray();
      messages.forEach(m => { m.id = m._id.toString(); delete m._id; });
      return res.status(200).json({ success: true, count: messages.length, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: messages });
    } else {
      let whereConditions = [];
      let params = [];
      if (status) { whereConditions.push('status = ?'); params.push(status); }
      if (unit_sekolah) { whereConditions.push('unit_sekolah = ?'); params.push(unit_sekolah); }
      if (search) { whereConditions.push('(name LIKE ? OR email LIKE ? OR subject LIKE ? OR message LIKE ?)'); params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`); }
      const whereClause = whereConditions.length > 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
      const countQuery = `SELECT COUNT(*) as total FROM contact_messages ${whereClause}`;
      const countResult = await getOne(countQuery, params);
      const total = countResult.total;
      const allowedSortFields = ['created_at', 'name', 'status'];
      const sortField = allowedSortFields.includes(sort) ? sort : 'created_at';
      const sortOrder = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      const query = `
        SELECT * FROM contact_messages
        ${whereClause}
        ORDER BY ${sortField} ${sortOrder}
        LIMIT ? OFFSET ?
      `;
      const messages = await executeQuery(query, [...params, parseInt(limit), offset]);
      return res.status(200).json({ success: true, count: messages.length, total, totalPages: Math.ceil(total / limit), currentPage: parseInt(page), data: messages });
    }

    res.status(200).json({
      success: true,
      count: messages.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: messages
    });
  } catch (error) {
    console.error('Get All Messages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single message
// @route   GET /api/v1/contact/:id
// @access  Private (Admin)
exports.getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const message = await db.collection('contact_messages').findOne({ _id: new ObjectId(id) });
      if (!message) {
        return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
      }
      if (message.status === 'unread') {
        await db.collection('contact_messages').updateOne({ _id: new ObjectId(id) }, { $set: { status: 'read', read_at: new Date() } });
        message.status = 'read';
        message.read_at = new Date();
      }
      message.id = message._id.toString(); delete message._id;
      return res.status(200).json({ success: true, data: message });
    } else {
      const message = await getOne('SELECT * FROM contact_messages WHERE id = ?', [id]);
      if (!message) {
        return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' });
      }
      if (message.status === 'unread') {
        await update('UPDATE contact_messages SET status = "read", read_at = NOW() WHERE id = ?', [id]);
        message.status = 'read';
        message.read_at = new Date();
      }
      return res.status(200).json({ success: true, data: message });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Get Message By ID Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update message status
// @route   PUT /api/v1/contact/:id/status
// @access  Private (Admin)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reply } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status wajib diisi'
      });
    }

    // Validate status
    const validStatuses = ['unread', 'read', 'replied', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status tidak valid'
      });
    }

    let message
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      message = await db.collection('contact_messages').findOne({ _id: new ObjectId(id) });
    } else {
      message = await getOne('SELECT * FROM contact_messages WHERE id = ?', [id]);
    }

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Pesan tidak ditemukan'
      });
    }

    let updatedMessage
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const set = { status };
      if (reply) { set.reply = reply; set.replied_at = new Date(); }
      if (status === 'read' && !message.read_at) { set.read_at = new Date(); }
      await db.collection('contact_messages').updateOne({ _id: new ObjectId(id) }, { $set: set });
      updatedMessage = await db.collection('contact_messages').findOne({ _id: new ObjectId(id) });
      updatedMessage.id = updatedMessage._id.toString(); delete updatedMessage._id;
    } else {
      let updateQuery = 'UPDATE contact_messages SET status = ?';
      let params = [status];
      if (reply) { updateQuery += ', reply = ?, replied_at = NOW()'; params.push(reply); }
      if (status === 'read' && !message.read_at) { updateQuery += ', read_at = NOW()'; }
      updateQuery += ' WHERE id = ?';
      params.push(id);
      await update(updateQuery, params);
      updatedMessage = await getOne('SELECT * FROM contact_messages WHERE id = ?', [id]);
    }

    // TODO: If replied, send reply email to user

    res.status(200).json({
      success: true,
      message: 'Status pesan berhasil diupdate',
      data: updatedMessage
    });
  } catch (error) {
    console.error('Update Message Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengupdate status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/v1/contact/:id
// @access  Private (Admin)
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const message = await db.collection('contact_messages').findOne({ _id: new ObjectId(id) });
      if (!message) { return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' }); }
      await db.collection('contact_messages').deleteOne({ _id: new ObjectId(id) });
    } else {
      const message = await getOne('SELECT * FROM contact_messages WHERE id = ?', [id]);
      if (!message) { return res.status(404).json({ success: false, message: 'Pesan tidak ditemukan' }); }
      await executeQuery('DELETE FROM contact_messages WHERE id = ?', [id]);
    }

    res.status(200).json({
      success: true,
      message: 'Pesan berhasil dihapus',
      data: {}
    });
  } catch (error) {
    console.error('Delete Message Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus pesan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get contact statistics
// @route   GET /api/v1/contact/statistics
// @access  Private (Admin)
exports.getStatistics = async (req, res) => {
  try {
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb();
      const total = await db.collection('contact_messages').estimatedDocumentCount();
      const byStatusAgg = await db.collection('contact_messages').aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]).toArray();
      const byUnitAgg = await db.collection('contact_messages').aggregate([
        { $group: { _id: '$unit_sekolah', count: { $sum: 1 } } }
      ]).toArray();
      const unread = await db.collection('contact_messages').countDocuments({ status: 'unread' });
      const since = new Date(Date.now() - 7*24*60*60*1000);
      const recent = await db.collection('contact_messages').countDocuments({ created_at: { $gte: since } });
      const byStatus = byStatusAgg.map(x => ({ status: x._id, count: x.count }));
      const byUnit = byUnitAgg.map(x => ({ unit_sekolah: x._id, count: x.count }));
      return res.status(200).json({ success: true, data: { total, unread, byStatus, byUnit, recentMessages: recent } });
    } else {
      const totalResult = await getOne('SELECT COUNT(*) as total FROM contact_messages');
      const byStatus = await executeQuery('SELECT status, COUNT(*) as count FROM contact_messages GROUP BY status');
      const byUnit = await executeQuery('SELECT unit_sekolah, COUNT(*) as count FROM contact_messages GROUP BY unit_sekolah');
      const unreadResult = await getOne('SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"');
      const recentResult = await getOne('SELECT COUNT(*) as count FROM contact_messages WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)');
      return res.status(200).json({ success: true, data: { total: totalResult.total, unread: unreadResult.count, byStatus, byUnit, recentMessages: recentResult.count } });
    }

    res.status(200).json({
      success: true,
      data: {
        total: totalResult.total,
        unread: unreadResult.count,
        byStatus,
        byUnit,
        recentMessages: recentResult.count
      }
    });
  } catch (error) {
    console.error('Get Statistics Error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil statistik',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
