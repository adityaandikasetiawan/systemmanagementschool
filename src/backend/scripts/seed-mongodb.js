const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGO_DB_NAME || 'baituljannah_db'
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10)

async function run() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db(dbName)

    const users = db.collection('users')
    await users.createIndex({ email: 1 }, { unique: true })
    await users.createIndex({ username: 1 }, { unique: true })

    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', saltRounds)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@baituljannah.sch.id'
    const admin = {
      username: 'superadmin',
      email: adminEmail,
      password: adminPassword,
      full_name: 'Administrator Yayasan',
      role: 'admin',
      phone: '081234567890',
      is_active: true,
      created_at: new Date(),
      last_login: null
    }
    await users.updateOne({ email: adminEmail }, { $setOnInsert: admin }, { upsert: true })

    const news = db.collection('news')
    await news.createIndex({ created_at: -1 })
    const sampleNews = [
      {
        title: 'Selamat Datang di Portal Yayasan Baituljannah',
        content: 'Portal resmi untuk informasi yayasan dan unit sekolah.',
        category: 'Pengumuman',
        unit_sekolah: 'Semua',
        author_id: null,
        created_at: new Date()
      }
    ]
    const existingNews = await news.countDocuments()
    if (existingNews === 0) {
      await news.insertMany(sampleNews)
    }

    console.log('MongoDB seed completed')
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  } finally {
    await client.close()
  }
}

run()

