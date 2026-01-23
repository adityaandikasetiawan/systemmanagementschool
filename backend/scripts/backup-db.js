const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { config } = require('dotenv');
config();

async function run() {
  const mysqldump = require('mysqldump');
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const database = process.env.DB_NAME || 'baituljannah_school';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const retentionDays = parseInt(process.env.BACKUP_RETENTION_DAYS || '14', 10);

  const outDir = path.join(__dirname, '..', 'backups');
  fs.mkdirSync(outDir, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const file = path.join(outDir, `${database}_${ts}.sql`);
  const gzFile = `${file}.gz`;

  await mysqldump({
    connection: { host, port, user, password, database },
    dumpToFile: file,
  });

  await new Promise((resolve, reject) => {
    const input = fs.createReadStream(file);
    const output = fs.createWriteStream(gzFile);
    const gzip = zlib.createGzip();
    input.pipe(gzip).pipe(output);
    output.on('finish', resolve);
    output.on('error', reject);
  });

  try { fs.unlinkSync(file); } catch {}

  const now = Date.now();
  const cutoff = now - retentionDays * 24 * 60 * 60 * 1000;
  for (const name of fs.readdirSync(outDir)) {
    const p = path.join(outDir, name);
    try {
      const stat = fs.statSync(p);
      if (stat.isFile() && stat.mtimeMs < cutoff) {
        fs.unlinkSync(p);
      }
    } catch {}
  }

  console.log(`Backup created: ${gzFile}`);
}

run().catch((err) => {
  console.error('Backup failed:', err?.message || err);
  process.exit(1);
});
