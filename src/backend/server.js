const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const config = require('./config/config');
const { testConnection } = require('./config/database');
const { getDb } = require('./config/mongo');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const fs = require('fs');

// Initialize express app
const app = express();

// ======================
// MIDDLEWARE
// ======================

// Security headers
app.use(helmet());

// Enable CORS
if (config.nodeEnv === 'development') {
  app.use(cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
  }));
} else {
  app.use(cors({
    origin: config.frontendUrl,
    credentials: true
  }));
}

// Private Network Access preflight allowance
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Private-Network', 'true');
  }
  next();
});

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression
app.use(compression());

// Logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Static uploads
try {
  const uploadRoot = require('./config/config').upload.uploadPath;
  fs.mkdirSync(uploadRoot, { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'hero'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'gallery'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'gallery', 'thumbs'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'news'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'achievements'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'units'), { recursive: true });
  fs.mkdirSync(path.join(uploadRoot, 'avatars'), { recursive: true });
  app.use('/uploads', express.static(uploadRoot));
} catch (e) {
  console.warn('⚠️ Unable to initialize uploads directory:', e.message);
}

// Rate limiting (enable in production only)
if (config.nodeEnv === 'production') {
  const limiter = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
      success: false,
      message: 'Terlalu banyak request dari IP ini, silakan coba lagi nanti'
    }
  });
  app.use('/api/', limiter);
}

// ======================
// ROUTES
// ======================

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// API health under versioned path
app.get(`/api/${config.apiVersion}/health`, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is healthy',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});

// API Routes
const authRoutes = require('./routes/auth');
const newsRoutes = require('./routes/news');
const ppdbRoutes = require('./routes/ppdb');
const contactRoutes = require('./routes/contact');
const unitsRoutes = require('./routes/units');
const heroSlidesRoutes = require('./routes/heroSlides');
const dashboardRoutes = require('./routes/dashboard');
const galleryRoutes = require('./routes/gallery');
const achievementsRoutes = require('./routes/achievements');

app.use(`/api/${config.apiVersion}/auth`, authRoutes);
app.use(`/api/${config.apiVersion}/news`, newsRoutes);
app.use(`/api/${config.apiVersion}/ppdb`, ppdbRoutes);
app.use(`/api/${config.apiVersion}/contact`, contactRoutes);
app.use(`/api/${config.apiVersion}/units`, unitsRoutes);
app.use(`/api/${config.apiVersion}/hero-slides`, heroSlidesRoutes);
app.use(`/api/${config.apiVersion}/dashboard`, dashboardRoutes);
app.use(`/api/${config.apiVersion}/gallery`, galleryRoutes);
app.use(`/api/${config.apiVersion}/achievements`, achievementsRoutes);

// Welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Baituljannah School Management System API',
    version: config.apiVersion,
    documentation: '/api/docs',
    endpoints: {
      auth: `/api/${config.apiVersion}/auth`,
      news: `/api/${config.apiVersion}/news`,
      ppdb: `/api/${config.apiVersion}/ppdb`,
      contact: `/api/${config.apiVersion}/contact`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler middleware
app.use(errorHandler);

// ======================
// START SERVER
// ======================

const PORT = config.port || 5000;

const startServer = async () => {
  try {
    let ok = true;
    if (process.env.USE_MONGO === 'true') {
      try {
        const db = await getDb();
        await db.command({ ping: 1 });
        console.log('✅ MongoDB Connected Successfully');

        if (process.env.NODE_ENV !== 'production') {
          const bcrypt = require('bcryptjs');
          const saltRounds = require('./config/config').bcryptSaltRounds;
          const pass123 = await bcrypt.hash('123', saltRounds);

          const devUsers = [
            { username: 'superadmin', email: 'admin@baituljannah.sch.id', full_name: 'Administrator Yayasan', role: 'super_admin', phone: '081234567890' },
            { username: 'admin.sdit', email: 'admin.sdit@baituljannah.sch.id', full_name: 'Admin SDIT', role: 'admin_unit', phone: '081234567802' },
            { username: 'ustadz.ahmad', email: 'ahmad@baituljannah.sch.id', full_name: 'Ustadz Ahmad Fauzi', role: 'guru', phone: '081234560001' },
            { username: 'siswa.rizki', email: 'rizki@student.baituljannah.sch.id', full_name: 'Muhammad Rizki Pratama', role: 'siswa', phone: '081234561001' },
            { username: 'ortu.ahmad', email: 'ahmad.fauzi@parent.baituljannah.sch.id', full_name: 'Bapak Ahmad Fauzi', role: 'orang_tua', phone: '081234562001' },
          ];
          for (const u of devUsers) {
            await db.collection('users').updateOne(
              { email: u.email.toLowerCase() },
              {
                $setOnInsert: { username: u.username, full_name: u.full_name, role: u.role, phone: u.phone, is_active: true, created_at: new Date(), last_login: null },
                $set: { password: pass123 }
              },
              { upsert: true }
            );
          }
          console.log('🌱 Ensured dev users exist and passwords set to 123');
        }
      } catch (e) {
        console.error('❌ MongoDB Connection Failed:', e.message);
        ok = false;
      }
    } else {
      const dbConnected = await testConnection();
      ok = dbConnected;
      if (dbConnected) {
        console.log('✅ MySQL Connected Successfully');
        if (process.env.NODE_ENV !== 'production') {
          const bcrypt = require('bcryptjs');
          const saltRounds = require('./config/config').bcryptSaltRounds;
          const hashAll = await bcrypt.hash('123', saltRounds);
          const { executeQuery } = require('./config/database');
          try {
            await executeQuery('UPDATE users SET password = ? WHERE 1=1', [hashAll]);
            console.log('🔒 All MySQL user passwords set to 123 (development)');
          } catch (e) {
            console.warn('⚠️ Could not update MySQL user passwords:', e.message);
          }
        }
      }
    }

    if (!ok) {
      console.warn('⚠️ Failed to connect to database. Starting server in Offline/Mock mode.');
      // process.exit(1); // Don't exit in dev mode
    }

    // Start server
    const server = app.listen(PORT, '127.0.0.1', () => {
      console.log('');
      console.log('='.repeat(60));
      console.log('🚀 BAITULJANNAH SCHOOL MANAGEMENT SYSTEM API');
      console.log('='.repeat(60));
      console.log(`📍 Server running on port: ${PORT}`);
      console.log(`🌍 Environment: ${config.nodeEnv}`);
      console.log(`📡 API Version: ${config.apiVersion}`);
      console.log(`🔗 URL: http://localhost:${PORT}`);
      console.log(`💚 Health Check: http://localhost:${PORT}/health`);
      console.log('='.repeat(60));
      console.log('');
      console.log('📋 Available Endpoints:');
      console.log(`   🔐 Auth:    /api/${config.apiVersion}/auth`);
      console.log(`   📰 News:    /api/${config.apiVersion}/news`);
      console.log(`   📝 PPDB:    /api/${config.apiVersion}/ppdb`);
      console.log(`   📧 Contact: /api/${config.apiVersion}/contact`);
      console.log(`   🏫 Units:   /api/${config.apiVersion}/units`);
      console.log(`   🎞️ Hero:    /api/${config.apiVersion}/hero-slides`);
      console.log('='.repeat(60));
      console.log('');
    });
    server.on('error', (err) => {
      console.error('❌ Server listen error:', err.message);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// Start the server
startServer();

module.exports = app;
