<div align="center">

# 🕌 YAYASAN BAITULJANNAH
### School Management System - Complete Full-Stack Solution

![Status](https://img.shields.io/badge/status-production%20ready-success?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Sistem Manajemen Sekolah Islam Terpadu dengan 5 Unit Pendidikan**

[📚 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack)

---

</div>

## 📖 OVERVIEW

Sistem manajemen sekolah lengkap untuk **Yayasan Baituljannah** yang mengelola:

<table>
<tr>
<td align="center">🎨<br><b>TKIT</b><br>TK Islam Terpadu</td>
<td align="center">📚<br><b>SDIT</b><br>SD Islam Terpadu</td>
<td align="center">🎓<br><b>SMPIT</b><br>SMP Islam Terpadu</td>
<td align="center">🏆<br><b>SMAIT</b><br>SMA Islam Terpadu</td>
<td align="center">❤️<br><b>SLBIT</b><br>SLB Islam Terpadu</td>
</tr>
</table>

### 🎯 What's Included

```
✅ 36 Responsive Pages          ✅ 90+ API Endpoints
✅ 43 Database Tables            ✅ 4 User Roles  
✅ 21 React Components           ✅ Complete Documentation
✅ Authentication & Security     ✅ Production Ready
```

---

## 🚀 QUICK START

### One-Command Setup (Recommended)

```bash
# 1️⃣ Setup Database (2 minutes)
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql

# 2️⃣ Setup Backend (2 minutes)
cd baituljannah-backend && npm install
cp .env.example .env  # Edit DB credentials
npm run dev

# 3️⃣ Setup Frontend (1 minute)
cd ../baituljannah-frontend
echo "VITE_API_URL=http://localhost:3001/api" > .env
npm run dev
```

### ✅ Test Login

| Role | Email | Password |
|------|-------|----------|
| 🔑 **Super Admin** | admin@baituljannah.sch.id | `Admin123!` |
| 👨‍💼 **Admin SDIT** | admin.sdit@baituljannah.sch.id | `Admin123!` |
| 👨‍🏫 **Teacher** | ahmad@baituljannah.sch.id | `Guru123!` |
| 👨‍🎓 **Student** | rizki@student.baituljannah.sch.id | `Siswa123!` |

📚 **Detailed Guide:** [QUICK_START.md](QUICK_START.md)

---

## ✨ FEATURES

<details>
<summary><b>📱 Public Website (13 Pages)</b></summary>

- ✅ Landing Page with Hero Carousel
- ✅ 5 School Unit Pages (TKIT - SLBIT)
- ✅ About & Vision/Mission
- ✅ News & Articles
- ✅ Photo Gallery
- ✅ Achievements Showcase
- ✅ Programs & Events
- ✅ PPDB (Online Registration)
- ✅ Career Portal
- ✅ Contact Form

</details>

<details>
<summary><b>👨‍💼 Admin Panel (15 Pages)</b></summary>

**Super Admin:**
- ✅ Dashboard Overview
- ✅ User Management (All Roles)
- ✅ School Unit Management
- ✅ System Settings

**Admin Unit:**
- ✅ Student Management
- ✅ Teacher Management
- ✅ Academic Management
- ✅ Finance & Payments
- ✅ PPDB Management
- ✅ Library Management

**Teacher:**
- ✅ Class Management
- ✅ Materials Upload
- ✅ Assignments & Grading
- ✅ Attendance Tracking

**Student:**
- ✅ Dashboard & Schedule
- ✅ View Materials
- ✅ Submit Assignments
- ✅ Check Grades
- ✅ Finance Tracking

</details>

<details>
<summary><b>🔧 Technical Features</b></summary>

- ✅ JWT Authentication
- ✅ Role-Based Access Control
- ✅ RESTful API (90+ endpoints)
- ✅ File Upload Support
- ✅ Email Integration Ready
- ✅ Payment Gateway Ready
- ✅ Real-time Updates Ready
- ✅ Responsive Design
- ✅ Security Best Practices

</details>

---

## 🛠️ TECH STACK

<table>
<tr>
<td>

**Frontend**
- ⚛️ React 18 + TypeScript
- 🎨 Tailwind CSS 4.0
- ⚡ Vite
- 🎯 Lucide Icons

</td>
<td>

**Backend**
- 🟢 Node.js 18+
- 🚀 Express.js
- 🔷 TypeScript
- 🔐 JWT + bcrypt

</td>
<td>

**Database**
- 🐬 MySQL 8.0
- 📊 43 Tables
- 🔍 Optimized Indexes
- 🔗 Relationships

</td>
</tr>
</table>

---

## 📚 DOCUMENTATION

<table>
<tr>
<td width="50%">

### 🚀 Getting Started
- **[QUICK_START.md](QUICK_START.md)**  
  *5-minute setup guide*
  
- **[NEXT_STEPS.md](NEXT_STEPS.md)**  
  *Action plan & roadmap*

- **[INDEX.md](INDEX.md)**  
  *Navigation guide*

</td>
<td width="50%">

### 🔧 Technical Docs
- **[BACKEND_SETUP.md](BACKEND_SETUP.md)**  
  *Complete backend guide*
  
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)**  
  *90+ API endpoints*

- **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)**  
  *Frontend-Backend integration*

</td>
</tr>
<tr>
<td width="50%">

### 📊 Reference
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)**  
  *Complete overview*
  
- **[SYSTEM_CHECK_REPORT.md](SYSTEM_CHECK_REPORT.md)**  
  *Verification report*

</td>
<td width="50%">

### 🚀 Deployment
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)**  
  *Production deployment guide*

</td>
</tr>
</table>

---

## 📊 PROJECT STATISTICS

<div align="center">

| Metric | Count | Metric | Count |
|--------|-------|--------|-------|
| 📄 Pages | **36** | 🗄️ DB Tables | **43** |
| 🧩 Components | **21** | 🔌 API Endpoints | **90+** |
| 👥 User Roles | **4** | 📖 Docs | **10** |
| 🎨 School Units | **5** | 📝 Lines of Code | **10K+** |

</div>

---

## 🎨 DESIGN SYSTEM

### Color Palette

```css
🔵 Primary    #1E4AB8   │  🟡 Secondary  #FFD166
───────────────────────────────────────────────
🟢 TKIT      #10B981   │  🔵 SDIT      #3B82F6
🟠 SMPIT     #F97316   │  🟣 SMAIT     #8B5CF6
🔷 SLBIT     #14B8A6   │  
```

### Typography
```
Headings → Poppins (600, 700)
Body     → Inter (400, 500)
```

---

## 🔐 SECURITY FEATURES

<table>
<tr>
<td>

**Authentication**
- ✅ JWT Tokens
- ✅ Refresh Tokens
- ✅ bcrypt Hashing
- ✅ Session Management

</td>
<td>

**Authorization**
- ✅ 4 User Roles
- ✅ Protected Routes
- ✅ API Guards
- ✅ Permission Checks

</td>
<td>

**Protection**
- ✅ Helmet.js
- ✅ CORS
- ✅ Rate Limiting
- ✅ SQL Injection Prevention

</td>
</tr>
</table>

---

## 📱 RESPONSIVE DESIGN

<div align="center">

| Device | Breakpoint | Status |
|--------|------------|--------|
| 📱 Mobile | 320px - 768px | ✅ Optimized |
| 💻 Tablet | 768px - 1024px | ✅ Optimized |
| 🖥️ Desktop | 1024px+ | ✅ Optimized |
| 📺 Wide | 1440px+ | ✅ Optimized |

</div>

---

## 🎯 ROADMAP

### ✅ Phase 1: Core System (COMPLETED)
- ✅ Database Design
- ✅ Frontend Development
- ✅ Basic API
- ✅ Authentication

### 📋 Phase 2: Enhancement (Optional)
- [ ] Real-time Notifications
- [ ] Email Integration
- [ ] Payment Gateway
- [ ] Advanced Reports
- [ ] Mobile App

### 🔮 Phase 3: Scale (Future)
- [ ] Multi-language
- [ ] Advanced Analytics
- [ ] AI Integration
- [ ] LMS Integration

---

## 🚀 DEPLOYMENT

### Quick Deploy Options

<table>
<tr>
<td align="center">

**Vercel**  
Frontend  
```bash
vercel deploy
```

</td>
<td align="center">

**VPS/Cloud**  
Full Stack  
```bash
pm2 start
```

</td>
<td align="center">

**Docker**  
Containerized  
```bash
docker-compose up
```

</td>
</tr>
</table>

📚 **Full Guide:** [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)

---

## 🤝 SUPPORT

<div align="center">

### Need Help?

| Channel | Contact |
|---------|---------|
| 📧 Email | dev@baituljannah.sch.id |
| 💬 Documentation | [INDEX.md](INDEX.md) |
| 🐛 Issues | GitHub Issues |
| 📚 API Docs | http://localhost:3001/api-docs |

</div>

---

## 📄 LICENSE

```
MIT License - Copyright (c) 2024 Yayasan Baituljannah

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction.
```

---

## 🏆 ACKNOWLEDGMENTS

Special thanks to:
- ⚛️ React Team
- 🎨 Tailwind CSS
- 🟢 Express.js Community
- 🐬 MySQL Developers
- 💚 All Open Source Contributors

---

<div align="center">

### 🎉 Ready to Get Started?

**Choose Your Path:**

[🏃 Quick Start (5 min)](QUICK_START.md) • [📚 Full Docs](INDEX.md) • [🔧 Backend Setup](BACKEND_SETUP.md)

---

**Made with ❤️ for Education**

**Yayasan Baituljannah © 2024**

⭐ **Star this repo if you find it helpful!**

</div>