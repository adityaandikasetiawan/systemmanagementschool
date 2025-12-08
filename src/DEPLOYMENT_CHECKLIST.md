# 🚀 DEPLOYMENT CHECKLIST
**Production Deployment Guide untuk Yayasan Baituljannah**

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### ✅ Code Quality
- [ ] All TypeScript errors resolved
- [ ] No console.log in production code
- [ ] All TODO comments addressed
- [ ] Code reviewed and tested
- [ ] Git repository clean (no uncommitted changes)

### ✅ Security
- [ ] All API keys moved to environment variables
- [ ] Strong JWT secrets generated
- [ ] Database credentials secured
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Helmet.js configured
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled

### ✅ Database
- [ ] Production database created
- [ ] Schema applied successfully
- [ ] Indexes created
- [ ] Backup strategy implemented
- [ ] Database user with limited permissions
- [ ] Connection pooling configured

### ✅ Environment Variables
- [ ] Production .env files created
- [ ] All secrets rotated for production
- [ ] Frontend API URL updated
- [ ] Backend CORS origin updated
- [ ] Email credentials configured
- [ ] Storage configuration set

### ✅ Testing
- [ ] All API endpoints tested
- [ ] Authentication flow verified
- [ ] User roles and permissions tested
- [ ] File upload tested
- [ ] Database queries optimized
- [ ] Load testing performed (optional)

---

## 🌐 FRONTEND DEPLOYMENT

### Option 1: Vercel (Recommended for React)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Build production
npm run build

# 3. Deploy
vercel

# 4. Set environment variables in Vercel dashboard
VITE_API_URL=https://api.baituljannah.sch.id/api
```

**Vercel Dashboard:**
1. Go to Settings → Environment Variables
2. Add `VITE_API_URL`
3. Redeploy

### Option 2: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build production
npm run build

# 3. Deploy
netlify deploy --prod

# 4. Set environment variables
netlify env:set VITE_API_URL https://api.baituljannah.sch.id/api
```

### Option 3: VPS/Own Server

```bash
# 1. Build production
npm run build

# 2. Upload dist/ folder to server
scp -r dist/* user@server:/var/www/baituljannah

# 3. Configure Nginx
server {
    listen 80;
    server_name baituljannah.sch.id;
    root /var/www/baituljannah;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}

# 4. Enable site and restart Nginx
sudo ln -s /etc/nginx/sites-available/baituljannah /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 5. Setup SSL with Let's Encrypt
sudo certbot --nginx -d baituljannah.sch.id
```

---

## 🖥️ BACKEND DEPLOYMENT

### VPS/Cloud Server Setup (Ubuntu)

#### 1. Server Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version

# Install MySQL
sudo apt install mysql-server -y
sudo mysql_secure_installation

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y
```

#### 2. Setup Database

```bash
# Login to MySQL
sudo mysql -u root -p

# Create production database
CREATE DATABASE baituljannah_school CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create database user
CREATE USER 'baituljannah_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD_HERE';
GRANT ALL PRIVILEGES ON baituljannah_school.* TO 'baituljannah_user'@'localhost';
FLUSH PRIVILEGES;
exit;

# Load schema
mysql -u baituljannah_user -p baituljannah_school < database/schema.sql

# Load initial data (if needed)
mysql -u baituljannah_user -p baituljannah_school < database/seed.sql
```

#### 3. Deploy Backend

```bash
# Clone repository
cd /var/www
sudo git clone https://github.com/your-repo/baituljannah-backend.git
cd baituljannah-backend

# Install dependencies
npm ci --only=production

# Create production .env
sudo nano .env
```

**Production .env:**
```env
NODE_ENV=production
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_NAME=baituljannah_school
DB_USER=baituljannah_user
DB_PASSWORD=YOUR_STRONG_PASSWORD

JWT_SECRET=YOUR_PRODUCTION_JWT_SECRET_CHANGE_THIS
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=YOUR_PRODUCTION_REFRESH_SECRET_CHANGE_THIS
JWT_REFRESH_EXPIRES_IN=30d

CORS_ORIGIN=https://baituljannah.sch.id
FRONTEND_URL=https://baituljannah.sch.id

# Email (configure with real SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@baituljannah.sch.id
SMTP_PASSWORD=YOUR_EMAIL_PASSWORD
```

```bash
# Build TypeScript
npm run build

# Start with PM2
pm2 start dist/app.js --name baituljannah-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Copy and run the command it outputs

# Check status
pm2 status
pm2 logs baituljannah-api
```

#### 4. Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/baituljannah-api
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name api.baituljannah.sch.id;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/baituljannah-api /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### 5. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d api.baituljannah.sch.id

# Auto-renewal test
sudo certbot renew --dry-run

# Restart Nginx
sudo systemctl restart nginx
```

---

## 🐳 DOCKER DEPLOYMENT (Optional)

### Frontend Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Backend Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/app.js"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_URL=http://api.baituljannah.sch.id/api
    restart: unless-stopped

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
      MYSQL_DATABASE: baituljannah_school
      MYSQL_USER: baituljannah_user
      MYSQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
      - ./database/schema.sql:/docker-entrypoint-initdb.d/1-schema.sql
      - ./database/seed.sql:/docker-entrypoint-initdb.d/2-seed.sql
    restart: unless-stopped

volumes:
  mysql_data:
```

**Run with Docker:**
```bash
docker-compose up -d
```

---

## 🔐 SECURITY HARDENING

### Backend Security

```typescript
// app.ts - Additional security

import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Helmet for security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);

// Auth rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts'
});

app.use('/api/auth/login', authLimiter);
```

### Database Security

```sql
-- Create read-only user for reports
CREATE USER 'baituljannah_readonly'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON baituljannah_school.* TO 'baituljannah_readonly'@'localhost';

-- Remove unnecessary permissions
REVOKE ALL PRIVILEGES ON *.* FROM 'baituljannah_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE ON baituljannah_school.* TO 'baituljannah_user'@'localhost';
FLUSH PRIVILEGES;
```

### Firewall Setup

```bash
# UFW firewall
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw status
```

---

## 📊 MONITORING & LOGGING

### Setup PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs baituljannah-api

# Setup log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Setup MySQL Slow Query Log

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow-query.log';
```

### Health Check Endpoint

Already implemented at `/api/health`

**Monitor with cron:**
```bash
# Add to crontab
*/5 * * * * curl https://api.baituljannah.sch.id/api/health || echo "API Down" | mail -s "Alert" admin@baituljannah.sch.id
```

---

## 💾 BACKUP STRATEGY

### Database Backup

```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

**Backup Script:**
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="baituljannah_school"

mkdir -p $BACKUP_DIR

mysqldump -u baituljannah_user -p'PASSWORD' $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress
gzip $BACKUP_DIR/backup_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

```bash
# Make executable
sudo chmod +x /usr/local/bin/backup-db.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
0 2 * * * /usr/local/bin/backup-db.sh
```

### File Backup

```bash
# Backup uploaded files
rsync -avz /var/www/baituljannah-backend/uploads/ /var/backups/uploads/
```

---

## 🧪 POST-DEPLOYMENT TESTING

### Checklist

- [ ] Homepage loads correctly
- [ ] API health check responds
- [ ] Login works with test credentials
- [ ] All pages accessible
- [ ] API endpoints working
- [ ] Database queries executing
- [ ] File uploads working
- [ ] Email sending working
- [ ] HTTPS enabled and working
- [ ] Mobile responsive design
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Monitoring active

### Test Commands

```bash
# Test API health
curl https://api.baituljannah.sch.id/api/health

# Test login
curl -X POST https://api.baituljannah.sch.id/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@baituljannah.sch.id","password":"Admin123!"}'

# Check SSL
curl -I https://baituljannah.sch.id

# Check response time
time curl https://api.baituljannah.sch.id/api/health
```

---

## 🎯 DOMAIN & DNS CONFIGURATION

### DNS Records

```
Type    Name                Value                   TTL
A       baituljannah.sch.id    YOUR_SERVER_IP          3600
A       api                    YOUR_SERVER_IP          3600
CNAME   www                    baituljannah.sch.id     3600
```

---

## 📝 POST-DEPLOYMENT MAINTENANCE

### Weekly Tasks
- [ ] Check server logs
- [ ] Monitor disk space
- [ ] Check error rates
- [ ] Review slow queries

### Monthly Tasks
- [ ] Update dependencies
- [ ] Review security patches
- [ ] Check backup integrity
- [ ] Performance review

### Quarterly Tasks
- [ ] Security audit
- [ ] Database optimization
- [ ] Load testing
- [ ] Disaster recovery drill

---

## 🆘 ROLLBACK PLAN

### If Deployment Fails

```bash
# 1. Stop current deployment
pm2 stop baituljannah-api

# 2. Restore previous version
git checkout <previous-commit>
npm ci
npm run build

# 3. Restart
pm2 restart baituljannah-api

# 4. Restore database (if needed)
mysql -u root -p baituljannah_school < /var/backups/mysql/backup_LATEST.sql
```

---

## ✅ FINAL DEPLOYMENT CHECKLIST

### Environment
- [ ] Production server setup complete
- [ ] Node.js installed (v18+)
- [ ] MySQL installed and configured
- [ ] Nginx installed and configured
- [ ] PM2 installed
- [ ] SSL certificates installed

### Code
- [ ] Frontend built and deployed
- [ ] Backend built and running
- [ ] Database schema applied
- [ ] Environment variables set
- [ ] API endpoints tested

### Security
- [ ] Firewall configured
- [ ] SSL/HTTPS enabled
- [ ] Strong passwords set
- [ ] CORS configured
- [ ] Rate limiting enabled
- [ ] Helmet.js configured

### Monitoring
- [ ] PM2 monitoring active
- [ ] Log rotation configured
- [ ] Health checks setup
- [ ] Backup automation configured
- [ ] Alert system ready

### Documentation
- [ ] Deployment documented
- [ ] Access credentials secured
- [ ] Team trained
- [ ] Support contacts updated

## ⚙️ AUTO-DEPLOY CHECKLIST (CI/CD Ready)

### Nginx
- [ ] Reverse proxy configured for `api.baituljannah.sch.id` (HTTP → upstream `localhost:3001`)
- [ ] SSL via Let's Encrypt configured and auto-renew enabled
- [ ] Security headers (CSP, X-Frame-Options, X-Content-Type-Options) enabled

### PM2 / Node
- [ ] `pm2 start dist/app.js --name baituljannah-api` used for process management
- [ ] `pm2 save` and `pm2 startup` configured for boot persistence
- [ ] Log rotation and monitoring (`pm2 logs`, `pm2 status`) established

### Environment Variables
- [ ] Backend `.env` contains `NODE_ENV`, `PORT`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- [ ] Auth secrets rotated: `JWT_SECRET`, `JWT_REFRESH_SECRET`, with appropriate expiry variables
- [ ] CORS / frontend URLs set: `CORS_ORIGIN`, `FRONTEND_URL`

### Build & Deploy Steps
- [ ] Install dependencies with `npm ci`
- [ ] Build backend with `npm run build` (TypeScript → `dist/`)
- [ ] Start backend with PM2
- [ ] Frontend built with `vite build` and served via Nginx `root /var/www/baituljannah`
- [ ] Health checks validated: `GET /api/health`

### Database Access (Remote)
- [ ] MySQL grants for app user from backend host IP or `%`
- [ ] Connection pooling configured; credentials stored in `.env`
- [ ] Backups and restore tests documented

---

## 🎉 CONGRATULATIONS!

**Your system is now live in production!** 🚀

**Support Contacts:**
- Technical: dev@baituljannah.sch.id
- Infrastructure: admin@baituljannah.sch.id
- Emergency: +62-xxx-xxx-xxxx

---

**Last Updated:** December 1, 2024  
**Version:** 1.0.0  
**Status:** Production Ready
