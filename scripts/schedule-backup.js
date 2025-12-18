const { spawn } = require('child_process');
const cronExpr = process.env.BACKUP_CRON || '0 2 * * *';
const cron = require('node-cron');

function runBackup() {
  const child = spawn(process.execPath, ['scripts/backup-db.js'], { stdio: 'inherit' });
  child.on('exit', () => {});
}

runBackup();
cron.schedule(cronExpr, runBackup);
setInterval(() => {}, 1 << 30);

