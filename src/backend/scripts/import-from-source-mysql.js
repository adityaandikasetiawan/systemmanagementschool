const mysql = require('mysql2/promise');
require('dotenv').config();

async function getColumns(conn, table) {
  const [rows] = await conn.query(`SHOW COLUMNS FROM ${table}`);
  return rows.map(r => r.Field);
}

async function fetchAll(conn, table, cols) {
  const [rows] = await conn.query(`SELECT ${cols.join(',')} FROM ${table}`);
  return rows;
}

function intersect(a, b) {
  const s = new Set(b);
  return a.filter(x => s.has(x));
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function insertChunk(conn, table, cols, rows) {
  if (!rows.length) return;
  const placeholders = `(${cols.map(() => '?').join(',')})`;
  const sql = `INSERT IGNORE INTO ${table} (${cols.join(',')}) VALUES ${rows.map(() => placeholders).join(',')}`;
  const params = [];
  for (const r of rows) cols.forEach(c => params.push(r[c] ?? null));
  await conn.query(sql, params);
}

async function copyTable(src, dst, table) {
  const srcCols = await getColumns(src, table);
  const dstCols = await getColumns(dst, table);
  const cols = intersect(srcCols, dstCols);
  if (!cols.length) return { table, copied: 0 };
  const rows = await fetchAll(src, table, cols);
  if (!rows.length) return { table, copied: 0 };
  const batches = chunk(rows, 500);
  for (const b of batches) await insertChunk(dst, table, cols, b);
  return { table, copied: rows.length };
}

async function main() {
  const srcCfg = {
    host: process.env.SOURCE_DB_HOST,
    port: Number(process.env.SOURCE_DB_PORT || 3306),
    user: process.env.SOURCE_DB_USER,
    password: process.env.SOURCE_DB_PASSWORD,
    database: process.env.SOURCE_DB_NAME
  };
  const dstCfg = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baituljannah_db'
  };
  let src, dst;
  try {
    src = await mysql.createConnection(srcCfg);
    dst = await mysql.createConnection(dstCfg);
    const tables = ['users','school_units','news','gallery','hero_slides'];
    const results = [];
    for (const t of tables) results.push(await copyTable(src, dst, t));
    console.log(JSON.stringify(results));
  } catch (e) {
    console.error(e.message);
    process.exitCode = 1;
  } finally {
    try { await src?.end(); } catch {}
    try { await dst?.end(); } catch {}
  }
}

main();

