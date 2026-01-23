const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const cfg = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baituljannah_db',
    multipleStatements: true
  };

  let conn;
  try {
    conn = await mysql.createConnection(cfg);
    console.log('Connected to MySQL:', cfg.host, cfg.database);

    const ddl = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        role ENUM('super_admin','admin','admin_unit','guru','siswa','orang_tua') NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL DEFAULT NULL,
        UNIQUE KEY uk_email (email)
      );

      CREATE TABLE IF NOT EXISTS school_units (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(10) NOT NULL,
        name VARCHAR(100) NOT NULL,
        level VARCHAR(20) NOT NULL,
        description TEXT,
        accent_color VARCHAR(20),
        icon VARCHAR(255),
        address VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(100),
        website VARCHAR(100),
        principal_name VARCHAR(100),
        status ENUM('active','inactive') DEFAULT 'active',
        established_year INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY uk_code (code)
      );

      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        unit_sekolah VARCHAR(50) DEFAULT 'Semua',
        image_url VARCHAR(255),
        author_id INT NOT NULL,
        status ENUM('draft','published') DEFAULT 'draft',
        publish_date TIMESTAMP NULL DEFAULT NULL,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_status (status),
        CONSTRAINT fk_news_author FOREIGN KEY (author_id) REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        school_unit_id INT,
        title VARCHAR(200),
        description TEXT,
        image_url VARCHAR(255),
        thumbnail_url VARCHAR(255),
        category VARCHAR(50),
        tags VARCHAR(255),
        uploaded_by INT,
        event_date TIMESTAMP NULL DEFAULT NULL,
        views INT DEFAULT 0,
        status ENUM('draft','published') DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category)
      );

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
        INDEX idx_order (\`order\`)
      );
    `;

    await conn.query(ddl);
    console.log('DDL ensured.');

    const [existsAdmin] = await conn.query('SELECT id FROM users WHERE email = ?', ['admin@baituljannah.sch.id']);
    if (existsAdmin.length === 0) {
      const bcrypt = require('bcryptjs');
      const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
      const pass123 = await bcrypt.hash('123', saltRounds);
      await conn.query(
        'INSERT INTO users (username, email, full_name, role, password, is_active) VALUES (?,?,?,?,?,1)',
        ['superadmin','admin@baituljannah.sch.id','Administrator Yayasan','super_admin',pass123]
      );
      console.log('Seeded admin user (password: 123).');
    }

    const [unitCount] = await conn.query('SELECT COUNT(*) AS c FROM school_units');
    if ((unitCount[0]?.c || 0) === 0) {
      await conn.query(
        'INSERT INTO school_units (code,name,level,description,accent_color,status) VALUES '+
        "('TK','TK Islam Baitul Jannah','TK','Pendidikan Anak Usia Dini','#ff6b6b','active'),"+
        "('SD','SD Islam Baitul Jannah','SD','Sekolah Dasar Islam Terpadu','#4dabf7','active'),"+
        "('SMP','SMP Islam Baitul Jannah','SMP','Sekolah Menengah Pertama Islam','#82c91e','active'),"+
        "('SMA','SMA Islam Baitul Jannah','SMA','Sekolah Menengah Atas Islam','#fab005','active')"
      );
      console.log('Seeded school_units.');
    }

    const [newsCount] = await conn.query('SELECT COUNT(*) AS c FROM news');
    if ((newsCount[0]?.c || 0) === 0) {
      const [[admin]] = await conn.query('SELECT id FROM users WHERE email = ?', ['admin@baituljannah.sch.id']);
      const authorId = admin?.id || 1;
      await conn.query(
        'INSERT INTO news (title,content,category,unit_sekolah,image_url,author_id,status,views) VALUES (?,?,?,?,?,?,"published",0), (?,?,?,?,?,?,"published",0)',
        [
          'Selamat Datang di Baitul Jannah','Website baru sekolah Baitul Jannah hadir dengan fitur lengkap.','Berita','Semua','/uploads/news/sample.jpg',authorId,
          'Penerimaan Peserta Didik Baru','PPDB Tahun Ajaran berjalan.','Pengumuman','Semua','/uploads/news/ppdb.jpg',authorId
        ]
      );
      console.log('Seeded news.');
    }

    const [heroCount] = await conn.query('SELECT COUNT(*) AS c FROM hero_slides');
    if ((heroCount[0]?.c || 0) === 0) {
      await conn.query(
        'INSERT INTO hero_slides (image,title,description,badge,`order`,status) VALUES (?,?,?,?,?,"published"), (?,?,?,?,?,"published")',
        [
          '/uploads/hero/sample1.jpg','Selamat Datang','Sekolah Islam Baitul Jannah','Informasi',0,
          '/uploads/hero/sample2.jpg','PPDB Dibuka','Ayo daftar sekarang','PPDB',1
        ]
      );
      console.log('Seeded hero_slides.');
    }

    console.log('MySQL seed completed.');
  } catch (e) {
    console.error('Seed MySQL failed:', e.message);
    console.error('Update .env DB_HOST/DB_USER/DB_PASSWORD/DB_NAME to valid MySQL.');
    process.exitCode = 1;
  } finally {
    try { await conn?.end(); } catch {}
  }
}

main();
