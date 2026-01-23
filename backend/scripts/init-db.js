const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const schemaPath = path.join(__dirname, '../../frontend/src/database/schema.sql');
const seedPath = path.join(__dirname, '../../frontend/src/database/seed.sql');

async function initDb() {
  console.log('🔄 Initializing Database...');
  
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });

    console.log('🔌 Connected to MySQL server');

    // Read and execute schema
    if (fs.existsSync(schemaPath)) {
      console.log('📄 Reading schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      // Execute schema
      await connection.query(schemaSql);
      console.log('✅ Schema applied successfully');
    } else {
      console.error('❌ Schema file not found at:', schemaPath);
      return;
    }

    // Read and execute seed
    if (fs.existsSync(seedPath)) {
        console.log('🌱 Reading seed.sql...');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        // Execute seed
        await connection.query(seedSql);
        console.log('✅ Seed data applied successfully');
    } else {
        console.error('❌ Seed file not found at:', seedPath);
    }

    console.log('🎉 Database initialization complete!');

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    if (error.code === 'ECONNREFUSED') {
        console.error('⚠️  Make sure your MySQL server (XAMPP/WAMP/Laragon) is running!');
    }
  } finally {
    if (connection) await connection.end();
  }
}

initDb();
