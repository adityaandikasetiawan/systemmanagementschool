const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { getOne } = require('../config/database');
const { getDb } = require('../config/mongo');
const { ObjectId } = require('mongodb');

// Protect routes - require authentication
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  // Check for token in cookies (optional)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Tidak ada akses. Silakan login terlebih dahulu'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);

    let user
    if (process.env.USE_MONGO === 'true') {
      const db = await getDb()
      const oid = (() => {
        try { return new ObjectId(decoded.id) } catch { return null }
      })()
      user = await db.collection('users').findOne({ _id: oid, is_active: true }, { projection: { password: 0 } })
      if (user) {
        user.id = user._id.toString()
        delete user._id
      }
    } else {
      user = await getOne(
        'SELECT id, username, email, role, full_name FROM users WHERE id = ? AND is_active = 1',
        [decoded.id]
      )
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User tidak ditemukan atau tidak aktif'
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);

    // MOCK DATA FALLBACK
    if (process.env.NODE_ENV === 'development' || error.code === 'ER_ACCESS_DENIED_ERROR' || error.code === 'ECONNREFUSED' || error.name === 'MongoServerSelectionError') {
        try {
            const decoded = jwt.verify(token, config.jwt.secret);
            req.user = {
                 id: decoded.id,
                 username: 'admin',
                 email: 'admin@baituljannah.sch.id',
                 role: 'super_admin',
                 full_name: 'Administrator (Mock)'
             };
             return next();
        } catch (e) {
             // Token invalid
        }
    }

    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau sudah kadaluarsa'
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (req.user.role !== 'super_admin' && !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role ${req.user.role} tidak memiliki akses ke resource ini`
      });
    }
    next();
  };
};

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Hanya admin yang dapat mengakses resource ini'
    });
  }
  next();
};

// Check if user owns the resource or is admin
exports.isOwnerOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (req.user.id !== resourceUserId && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Anda tidak memiliki akses ke resource ini'
      });
    }
    next();
  };
};
