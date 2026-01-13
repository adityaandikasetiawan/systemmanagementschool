const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const env = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'baituljannah_school',
  rounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10)
};

const createDatabase = async () => {
  const conn = await mysql.createConnection({ host: env.host, port: env.port, user: env.user, password: env.password });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${env.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.end();
};

const withDb = async () => mysql.createConnection({ host: env.host, port: env.port, user: env.user, password: env.password, database: env.database });

const createTables = async (conn) => {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      email VARCHAR(100) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('super_admin','admin_unit','teacher','student') NOT NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      last_login DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS user_profiles (
      user_id INT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      phone VARCHAR(30) NULL,
      photo_url VARCHAR(255) NULL,
      gender ENUM('L','P') NULL,
      birth_date DATE NULL,
      birth_place VARCHAR(100) NULL,
      address VARCHAR(255) NULL,
      city VARCHAR(100) NULL,
      province VARCHAR(100) NULL,
      CONSTRAINT fk_user_profiles_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS school_units (
      id INT AUTO_INCREMENT PRIMARY KEY,
      code VARCHAR(20) NOT NULL UNIQUE,
      name VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS academic_years (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      start_date DATE NULL,
      end_date DATE NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS classes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      academic_year_id INT NULL,
      CONSTRAINT fk_classes_ay FOREIGN KEY (academic_year_id) REFERENCES academic_years(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL UNIQUE,
      nis VARCHAR(20) NULL,
      nisn VARCHAR(20) NULL,
      school_unit_id INT NULL,
      class_id INT NULL,
      CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      CONSTRAINT fk_students_unit FOREIGN KEY (school_unit_id) REFERENCES school_units(id) ON DELETE SET NULL,
      CONSTRAINT fk_students_class FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      category VARCHAR(50) NOT NULL,
      unit_sekolah VARCHAR(50) NOT NULL,
      content TEXT NULL,
      excerpt TEXT NULL,
      image_url VARCHAR(255) NULL,
      status ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
      publish_date DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
};

const seedData = async (conn) => {
  await conn.query(`INSERT IGNORE INTO school_units (code, name) VALUES 
    ('SMAIT','SMAIT Baituljannah'),
    ('SMPIT','SMPIT Baituljannah'),
    ('SDIT','SDIT Baituljannah'),
    ('TKIT','TKIT Baituljannah'),
    ('SLBIT','SLBIT Baituljannah')`);

  const [ayRows] = await conn.query(`SELECT id FROM academic_years WHERE name = ?`, ['2024/2025 Genap']);
  let ayId = ayRows.length ? ayRows[0].id : null;
  if (!ayId) {
    const [res] = await conn.query(`INSERT INTO academic_years (name) VALUES (?)`, ['2024/2025 Genap']);
    ayId = res.insertId;
  }

  const [classRows] = await conn.query(`SELECT id FROM classes WHERE name = ?`, ['XII IPA 1']);
  let classId = classRows.length ? classRows[0].id : null;
  if (!classId) {
    const [res] = await conn.query(`INSERT INTO classes (name, academic_year_id) VALUES (?, ?)`, ['XII IPA 1', ayId]);
    classId = res.insertId;
  }

  const adminHash = await bcrypt.hash('Admin123!', env.rounds);
  const studentHash = await bcrypt.hash('Student123!', env.rounds);
  const teacherHash = await bcrypt.hash('Guru123!', env.rounds);

  const upsertUser = async (username, email, hash, role, fullName, phone) => {
    const [rows] = await conn.query(`SELECT id FROM users WHERE email = ?`, [email]);
    let userId = rows.length ? rows[0].id : null;
    if (!userId) {
      const [res] = await conn.query(
        `INSERT INTO users (username, email, password_hash, role, status, email_verified) VALUES (?, ?, ?, ?, 'active', TRUE)`,
        [username, email, hash, role]
      );
      userId = res.insertId;
      await conn.query(
        `INSERT INTO user_profiles (user_id, full_name, phone) VALUES (?, ?, ?)`,
        [userId, fullName, phone]
      );
    }
    return userId;
  };

  const adminId = await upsertUser('superadmin', 'admin@baituljannah.sch.id', adminHash, 'super_admin', 'Administrator Yayasan', '081234567890');
  const studentId = await upsertUser('studentdev', 'student@baituljannah.sch.id', studentHash, 'student', 'Siswa Dev Mode', '081234567801');
  const teacherId = await upsertUser('gurudev', 'guru@baituljannah.sch.id', teacherHash, 'teacher', 'Guru Dev Mode', '081234567802');

  const [smaitRows] = await conn.query(`SELECT id FROM school_units WHERE code = 'SMAIT' LIMIT 1`);
  const smaitId = smaitRows.length ? smaitRows[0].id : null;

  const [stuRows] = await conn.query(`SELECT id FROM students WHERE user_id = ?`, [studentId]);
  if (!stuRows.length) {
    await conn.query(
      `INSERT INTO students (user_id, nis, nisn, school_unit_id, class_id) VALUES (?, ?, ?, ?, ?)`,
      [studentId, '2024001', '0083456789', smaitId, classId]
    );
  }
};

const run = async () => {
  try {
    await createDatabase();
    const conn = await withDb();
    await createTables(conn);
    await seedData(conn);
    await conn.end();
    console.log('Migration completed');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
};

run();
