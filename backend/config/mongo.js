const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

let client
let db

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGO_DB_NAME || 'baituljannah_db'

async function getDb() {
  if (db) return db
  if (!client) {
    client = new MongoClient(uri, {
      serverApi: ServerApiVersion.v1,
    })
  }
  await client.connect()
  db = client.db(dbName)
  return db
}

module.exports = { getDb }

