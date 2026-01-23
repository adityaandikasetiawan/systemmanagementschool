<div align="center">

# ⚡ QUICK START GUIDE

**Get Your System Running in 5 Minutes**

![Setup Time](https://img.shields.io/badge/setup%20time-5%20minutes-brightgreen?style=for-the-badge)
![Difficulty](https://img.shields.io/badge/difficulty-easy-blue?style=for-the-badge)

</div>

---

## 🎯 What You'll Have

After completing this guide:

```
✅ Database with 43 tables & test data
✅ Backend API running on port 3001
✅ Frontend running on port 5173
✅ Working login with 5 test accounts
✅ Ready for development
```

**Time Required:** ⏱️ **5 minutes**

---

## 📋 Prerequisites

<table>
<tr>
<td width="33%">

### 🟢 Node.js
```bash
node --version
# v18.0.0 or higher
```
[Download](https://nodejs.org/)

</td>
<td width="33%">

### 🐬 MySQL
```bash
mysql --version
# 8.0 or higher
```
[Download](https://dev.mysql.com/downloads/)

</td>
<td width="33%">

### 📦 npm/yarn
```bash
npm --version
# 9.0.0 or higher
```
Included with Node.js

</td>
</tr>
</table>

---

## 🚀 5-MINUTE SETUP

### Step 1️⃣: Database Setup (2 minutes)

<details open>
<summary><b>Click to expand</b></summary>

#### Option A: Command Line (Recommended)

```bash
# Login to MySQL
mysql -u root -p

# If no password (XAMPP default):
mysql -u root
```

```sql
-- Load schema & seed data
source /path/to/database/schema.sql;
source /path/to/database/seed.sql;

-- Verify
SHOW DATABASES;
USE baituljannah_school;
SHOW TABLES;
SELECT COUNT(*) FROM users;  -- Should show 17 users

-- Exit
exit;
```

#### Option B: MySQL Workbench (GUI)

1. Open MySQL Workbench
2. Connect to your server
3. File → Open SQL Script → Select `schema.sql`
4. Click Execute (⚡ icon)
5. Repeat for `seed.sql`

#### ✅ Success Indicators:
```
✓ Database 'baituljannah_school' created
✓ 43 tables created
✓ 50+ records inserted
```

</details>

---

### Step 2️⃣: Backend Setup (2 minutes)

<details open>
<summary><b>Click to expand</b></summary>

```bash
# Navigate to parent directory
cd ..

# Create backend folder
mkdir baituljannah-backend
cd baituljannah-backend

# Copy files from backend-starter
# (Copy all files from /backend-starter folder)

# Install dependencies
npm install

# Setup environment
cp .env.example .env
```

#### Edit `.env` file:

```env
# Minimal configuration needed
NODE_ENV=development
PORT=3001

# Database (IMPORTANT - Edit these!)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baituljannah_school
DB_USER=root
DB_PASSWORD=              # Leave empty if no password (XAMPP)
# DB_PASSWORD=yourpass    # Or set your MySQL password

# JWT Secret
JWT_SECRET=baituljannah_secret_2024

# CORS
CORS_ORIGIN=http://localhost:5173
```

#### Start Backend:

```bash
npm run dev
```

#### ✅ Success Output:
```
========================================
🚀 YAYASAN BAITULJANNAH API SERVER
========================================
✅ MySQL Database connected successfully
   Database: baituljannah_school
   Host: localhost:3306
🌐 Server URL: http://localhost:3001
💚 Health Check: http://localhost:3001/api/health
========================================
```

</details>

---

### Step 3️⃣: Frontend Setup (1 minute)

<details open>
<summary><b>Click to expand</b></summary>

```bash
# Navigate to your React project
cd ../your-react-project

# Create .env file
echo "VITE_API_URL=http://localhost:3001/api" > .env

# Or create manually:
# VITE_API_URL=http://localhost:3001/api

# Start frontend
npm run dev
```

#### ✅ Success Output:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

</details>

---

## ✅ Test Your Setup

### 1. Health Check API

Open browser: **http://localhost:3001/api/health**

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "timestamp": "2024-12-01T...",
    "uptime": 1.234,
    "environment": "development",
    "version": "1.0.0"
  }
}
```

### 2. Test Login

Open: **http://localhost:5173**

<table>
<tr>
<th>Role</th>
<th>Email</th>
<th>Password</th>
</tr>
<tr>
<td>🔑 Super Admin</td>
<td><code>admin@baituljannah.sch.id</code></td>
<td><code>Admin123!</code></td>
</tr>
<tr>
<td>👨‍💼 Admin SDIT</td>
<td><code>admin.sdit@baituljannah.sch.id</code></td>
<td><code>Admin123!</code></td>
</tr>
<tr>
<td>👨‍🏫 Teacher</td>
<td><code>ahmad@baituljannah.sch.id</code></td>
<td><code>Guru123!</code></td>
</tr>
<tr>
<td>👨‍🎓 Student</td>
<td><code>rizki@student.baituljannah.sch.id</code></td>
<td><code>Siswa123!</code></td>
</tr>
<tr>
<td>👨‍👩‍👧 Parent</td>
<td><code>ahmad.fauzi@parent.baituljannah.sch.id</code></td>
<td><code>Parent123!</code></td>
</tr>
</table>

---

## 🎉 SUCCESS!

If you can login, **congratulations!** Your system is running perfectly.

### What's Next?

<table>
<tr>
<td width="33%" align="center">

**📚 Learn More**

[Read Documentation](INDEX.md)

Understand the system

</td>
<td width="33%" align="center">

**🔨 Start Developing**

[Backend Guide](BACKEND_SETUP.md)

Add new features

</td>
<td width="33%" align="center">

**🚀 Deploy**

[Deployment Guide](DEPLOYMENT_CHECKLIST.md)

Go to production

</td>
</tr>
</table>

---

## 🐛 Troubleshooting

### ❌ Problem: Database Connection Failed

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**
```bash
# Reset MySQL password
mysql -u root

# In MySQL prompt:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'newpassword';
FLUSH PRIVILEGES;
exit;

# Update .env
DB_PASSWORD=newpassword
```

---

### ❌ Problem: Port 3001 Already in Use

**Error:** `EADDRINUSE :::3001`

**Solution:**
```bash
# Find process using port 3001
# macOS/Linux:
lsof -i :3001
kill -9 <PID>

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Or change port in .env:
PORT=3002
```

---

### ❌ Problem: CORS Error

**Error:** `blocked by CORS policy`

**Solution:**
```typescript
// backend/src/app.ts
app.use(cors({
  origin: 'http://localhost:5173',  // Match your frontend URL
  credentials: true
}));
```

---

### ❌ Problem: Cannot Find Module

**Error:** `Cannot find module './services/api'`

**Solution:**
```bash
# Verify api.ts exists in /services/ folder
ls services/api.ts

# Restart dev server
npm run dev
```

---

### ❌ Problem: MySQL Not Running

**Solution:**
```bash
# XAMPP: Start MySQL in control panel

# macOS:
brew services start mysql

# Linux:
sudo systemctl start mysql

# Windows Service:
# Open Services → MySQL → Start
```

---

## 📊 Folder Structure

After setup, your workspace should look like:

```
workspace/
│
├── 📁 baituljannah-frontend/        ← Your React project
│   ├── src/
│   ├── services/
│   │   └── api.ts                   ← API client
│   ├── .env                         ← ✅ Created
│   └── package.json
│
├── 📁 baituljannah-backend/         ← ✅ Created
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── app.ts
│   ├── .env                         ← ✅ Configured
│   ├── package.json
│   └── node_modules/                ← ✅ Installed
│
└── 📁 database/
    ├── schema.sql                   ← ✅ Loaded to MySQL
    └── seed.sql                     ← ✅ Loaded to MySQL
```

---

## ✅ Verification Checklist

Before proceeding, ensure:

- [x] MySQL is running
- [x] Database `baituljannah_school` exists
- [x] 43 tables created
- [x] Seed data loaded
- [x] Backend running on port 3001
- [x] Frontend running on port 5173
- [x] Health check responds
- [x] Can login successfully
- [x] No errors in browser console
- [x] No errors in terminal

---

## 🎯 Quick Commands Reference

```bash
# Start Backend
cd baituljannah-backend
npm run dev

# Start Frontend
cd baituljannah-frontend
npm run dev

# Check MySQL
mysql -u root -p
SHOW DATABASES;
USE baituljannah_school;
SHOW TABLES;

# Test API
curl http://localhost:3001/api/health

# View Logs
# Backend: Check terminal where npm run dev is running
# Frontend: Check browser console (F12)
```

---

## 📚 Next Steps

<div align="center">

### Choose Your Path:

**🔍 Understand the System**  
→ [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

**🔨 Start Development**  
→ [BACKEND_SETUP.md](BACKEND_SETUP.md)

**🔗 Learn Integration**  
→ [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)

**🚀 Deploy to Production**  
→ [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

</div>

---

<div align="center">

## 💡 Pro Tips

**Tip 1:** Keep both terminals open (backend & frontend)  
**Tip 2:** Use different browsers for testing different roles  
**Tip 3:** Check browser console (F12) for frontend errors  
**Tip 4:** Check terminal for backend errors  
**Tip 5:** Read the error messages - they're helpful!

---

**🎊 Congratulations on completing the setup!**

You're now ready to explore and develop.

**Need Help?** Check [INDEX.md](INDEX.md) for navigation.

**Yayasan Baituljannah © 2024**

</div>
