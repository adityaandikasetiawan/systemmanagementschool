# API DOCUMENTATION - YAYASAN BAITULJANNAH
**Backend API Documentation for School Management System**

---

## 📋 TABLE OF CONTENTS

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Response Format](#response-format)
5. [Error Codes](#error-codes)
6. [Environment Setup](#environment-setup)

---

## 🎯 OVERVIEW

### Base URL
```
Development: http://localhost:3001/api
Production: https://api.baituljannah.sch.id/api
```

### Authentication
All protected endpoints require JWT Bearer Token in Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Request Headers
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>"
}
```

---

## 🔐 AUTHENTICATION

### 1. Register
**POST** `/auth/register`

Request:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123!",
  "role": "siswa",
  "full_name": "John Doe",
  "phone": "081234567890"
}
```

Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "role": "siswa"
    }
  }
}
```

### 2. Login
**POST** `/auth/login`

Request:
```json
{
  "email": "admin@baituljannah.sch.id",
  "password": "Admin123!"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "superadmin",
      "email": "admin@baituljannah.sch.id",
      "role": "super_admin",
      "full_name": "Administrator Yayasan"
    }
  }
}
```

### 3. Logout
**POST** `/auth/logout`

Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

### 4. Refresh Token
**POST** `/auth/refresh`

Request:
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "token": "new_access_token",
    "refresh_token": "new_refresh_token"
  }
}
```

### 5. Get Current User
**GET** `/auth/me`

Headers: `Authorization: Bearer <token>`

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "username": "superadmin",
      "email": "admin@baituljannah.sch.id",
      "role": "super_admin",
      "profile": {
        "full_name": "Administrator Yayasan",
        "phone": "081234567890",
        "photo_url": null
      }
    }
  }
}
```

---

## 🏫 SCHOOL UNITS

### 1. Get All Units
**GET** `/units`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "code": "TKIT",
      "name": "TKIT Baituljannah",
      "level": "TK Islam Terpadu",
      "accent_color": "#10B981",
      "total_students": 120,
      "total_teachers": 12
    }
  ]
}
```

### 2. Get Unit by ID
**GET** `/units/:id`

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "code": "TKIT",
    "name": "TKIT Baituljannah",
    "description": "...",
    "stats": {
      "total_students": 120,
      "total_teachers": 12,
      "total_classes": 4
    }
  }
}
```

### 3. Create Unit (Super Admin)
**POST** `/units`

Request:
```json
{
  "code": "SMKIT",
  "name": "SMKIT Baituljannah",
  "level": "SMK Islam Terpadu",
  "description": "...",
  "accent_color": "#FF5733",
  "address": "Jl. Pendidikan No. 6",
  "phone": "021-1234572",
  "email": "smkit@baituljannah.sch.id"
}
```

### 4. Update Unit (Super Admin)
**PUT** `/units/:id`

### 5. Delete Unit (Super Admin)
**DELETE** `/units/:id`

---

## 👥 USERS

### 1. Get All Users (Admin)
**GET** `/users?role=siswa&status=active&page=1&limit=20`

Query Parameters:
- `role`: super_admin, admin_unit, guru, siswa, orang_tua
- `status`: active, inactive, suspended
- `school_unit_id`: Filter by unit
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

Response:
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

### 2. Get User by ID
**GET** `/users/:id`

### 3. Create User (Admin)
**POST** `/users`

### 4. Update User (Admin)
**PUT** `/users/:id`

### 5. Delete User (Admin)
**DELETE** `/users/:id`

---

## 👨‍🎓 STUDENTS

### 1. Get All Students
**GET** `/students?class_id=1&status=active&page=1`

Response:
```json
{
  "success": true,
  "data": {
    "students": [
      {
        "id": 1,
        "nis": "2024001",
        "user": {
          "full_name": "Muhammad Rizki",
          "email": "rizki@student.baituljannah.sch.id"
        },
        "class": {
          "name": "XII IPA 1",
          "level": 12
        },
        "gpa": 3.85,
        "attendance_rate": 95.5
      }
    ],
    "pagination": {...}
  }
}
```

### 2. Get Student by ID
**GET** `/students/:id`

### 3. Get Student Academic Performance
**GET** `/students/:id/academic`

Response:
```json
{
  "success": true,
  "data": {
    "gpa": 3.85,
    "grades": [
      {
        "subject": "Matematika",
        "uts": 85,
        "uas": 88,
        "final": 87.5
      }
    ],
    "attendance": {
      "rate": 95.5,
      "total_present": 85,
      "total_sick": 3,
      "total_absent": 2
    }
  }
}
```

### 4. Create Student
**POST** `/students`

### 5. Update Student
**PUT** `/students/:id`

### 6. Delete Student
**DELETE** `/students/:id`

---

## 👨‍🏫 TEACHERS

### 1. Get All Teachers
**GET** `/teachers?school_unit_id=2&page=1`

### 2. Get Teacher by ID
**GET** `/teachers/:id`

### 3. Get Teacher Classes
**GET** `/teachers/:id/classes`

Response:
```json
{
  "success": true,
  "data": [
    {
      "class_id": 1,
      "class_name": "XII IPA 1",
      "subject": "Matematika",
      "schedule": [
        {
          "day": "senin",
          "start_time": "07:00",
          "end_time": "08:30"
        }
      ],
      "total_students": 30
    }
  ]
}
```

### 4. Create Teacher
**POST** `/teachers`

### 5. Update Teacher
**PUT** `/teachers/:id`

### 6. Delete Teacher
**DELETE** `/teachers/:id`

---

## 📚 ACADEMIC

### Classes

#### 1. Get All Classes
**GET** `/classes?school_unit_id=2&academic_year_id=1`

#### 2. Get Class by ID
**GET** `/classes/:id`

#### 3. Get Class Students
**GET** `/classes/:id/students`

#### 4. Create Class
**POST** `/classes`

### Subjects

#### 1. Get All Subjects
**GET** `/subjects?school_unit_id=2`

#### 2. Get Subject by ID
**GET** `/subjects/:id`

#### 3. Create Subject
**POST** `/subjects`

### Materials

#### 1. Get Materials
**GET** `/materials?class_subject_id=1`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Materi Perkalian dan Pembagian",
      "description": "Materi lengkap tentang perkalian",
      "material_type": "document",
      "file_url": "https://storage.com/materials/file.pdf",
      "teacher": "Ustadz Ahmad",
      "views": 28,
      "published_at": "2024-11-28"
    }
  ]
}
```

#### 2. Upload Material
**POST** `/materials`

Request (multipart/form-data):
```
title: "Materi Perkalian"
description: "..."
class_subject_id: 1
material_type: "document"
file: [file upload]
```

### Assignments

#### 1. Get Assignments
**GET** `/assignments?class_subject_id=1&status=published`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Latihan Soal Perkalian",
      "deadline": "2024-12-05T23:59:59Z",
      "max_score": 100,
      "submitted": 45,
      "total_students": 60,
      "status": "published"
    }
  ]
}
```

#### 2. Create Assignment
**POST** `/assignments`

#### 3. Submit Assignment (Student)
**POST** `/assignments/:id/submit`

Request (multipart/form-data):
```
submission_content: "Jawaban saya..."
file: [file upload]
```

#### 4. Grade Assignment (Teacher)
**PUT** `/assignments/submissions/:id/grade`

Request:
```json
{
  "score": 85,
  "feedback": "Bagus, tingkatkan lagi!"
}
```

### Grades

#### 1. Get Student Grades
**GET** `/grades/student/:student_id?academic_year_id=1`

#### 2. Get Class Grades
**GET** `/grades/class/:class_id/subject/:subject_id`

#### 3. Input Grade (Teacher)
**POST** `/grades`

Request:
```json
{
  "student_id": 1,
  "class_subject_id": 1,
  "academic_year_id": 1,
  "grade_type": "uts",
  "score": 85,
  "max_score": 100
}
```

---

## 📅 ATTENDANCE

### 1. Get Attendance
**GET** `/attendance?student_id=1&date=2024-12-01`

### 2. Record Attendance (Teacher)
**POST** `/attendance`

Request:
```json
{
  "student_id": 1,
  "class_subject_id": 1,
  "date": "2024-12-01",
  "status": "hadir",
  "time_in": "07:00:00"
}
```

### 3. Bulk Record Attendance
**POST** `/attendance/bulk`

Request:
```json
{
  "class_id": 1,
  "date": "2024-12-01",
  "attendances": [
    { "student_id": 1, "status": "hadir" },
    { "student_id": 2, "status": "sakit" }
  ]
}
```

### 4. Get Attendance Summary
**GET** `/attendance/summary?student_id=1&month=12&year=2024`

Response:
```json
{
  "success": true,
  "data": {
    "total_days": 20,
    "present": 18,
    "sick": 1,
    "permission": 1,
    "absent": 0,
    "attendance_rate": 95.0
  }
}
```

---

## 💰 FINANCE

### 1. Get Student Payments
**GET** `/payments/student/:student_id?status=pending`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category": "SPP Bulanan",
      "amount": 500000,
      "due_date": "2024-12-10",
      "paid_amount": 0,
      "status": "pending"
    }
  ]
}
```

### 2. Create Payment
**POST** `/payments`

### 3. Process Payment
**POST** `/payments/:id/pay`

Request:
```json
{
  "amount": 500000,
  "payment_method": "transfer",
  "transaction_id": "TRX123456",
  "payment_proof": "proof_url"
}
```

### 4. Verify Payment (Admin)
**PUT** `/payments/transactions/:id/verify`

Request:
```json
{
  "status": "verified",
  "notes": "Pembayaran valid"
}
```

### 5. Get Financial Report
**GET** `/finance/report?school_unit_id=2&month=12&year=2024`

---

## 📖 LIBRARY

### 1. Get Books
**GET** `/library/books?category=Agama&status=available`

### 2. Get Book by ID
**GET** `/library/books/:id`

### 3. Borrow Book (Student)
**POST** `/library/borrow`

Request:
```json
{
  "book_id": 1,
  "student_id": 1,
  "borrowed_date": "2024-12-01",
  "due_date": "2024-12-15"
}
```

### 4. Return Book
**PUT** `/library/borrow/:id/return`

Request:
```json
{
  "returned_date": "2024-12-14",
  "condition": "good"
}
```

### 5. Get Borrowing History
**GET** `/library/borrow/student/:student_id?status=borrowed`

---

## 📝 PPDB (ADMISSION)

### 1. Submit PPDB Registration
**POST** `/ppdb/register`

Request (multipart/form-data):
```
school_unit_id: 2
academic_year_id: 1
full_name: "Muhammad Rizki"
birth_date: "2015-05-15"
gender: "L"
... (other fields)
photo: [file]
birth_certificate: [file]
family_card: [file]
```

### 2. Get PPDB Registrations (Admin)
**GET** `/ppdb?school_unit_id=2&status=pending`

### 3. Verify Registration (Admin)
**PUT** `/ppdb/:id/verify`

Request:
```json
{
  "status": "accepted",
  "notes": "Diterima"
}
```

### 4. Get Registration by Number
**GET** `/ppdb/registration/:registration_number`

---

## 💼 CAREER (RECRUITMENT)

### 1. Get Job Positions
**GET** `/career/jobs?status=open`

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Guru Matematika",
      "department": "Akademik",
      "employment_type": "full_time",
      "deadline": "2024-12-31",
      "positions_available": 2
    }
  ]
}
```

### 2. Apply for Job
**POST** `/career/apply`

Request (multipart/form-data):
```
job_position_id: 1
full_name: "Ahmad Fauzi"
email: "ahmad@email.com"
phone: "081234567890"
cv: [file]
cover_letter: "..."
```

### 3. Get Applications (Admin)
**GET** `/career/applications?job_position_id=1&status=pending`

### 4. Update Application Status (Admin)
**PUT** `/career/applications/:id`

Request:
```json
{
  "status": "interview",
  "notes": "Panggilan interview tanggal 15 Desember"
}
```

---

## 📰 CONTENT MANAGEMENT

### News

#### 1. Get All News
**GET** `/news?category=Event&status=published&page=1`

#### 2. Get News by Slug
**GET** `/news/slug/:slug`

#### 3. Create News (Admin)
**POST** `/news`

Request (multipart/form-data):
```
title: "Judul Berita"
content: "Isi berita..."
category: "Event"
school_unit_id: 2
featured_image: [file]
```

#### 4. Update News
**PUT** `/news/:id`

#### 5. Delete News
**DELETE** `/news/:id`

### Gallery

#### 1. Get Gallery
**GET** `/gallery?category=Event&school_unit_id=2`

#### 2. Upload Image (Admin)
**POST** `/gallery`

### Achievements

#### 1. Get Achievements
**GET** `/achievements?level=nasional&school_unit_id=2`

#### 2. Create Achievement (Admin)
**POST** `/achievements`

### Programs

#### 1. Get Programs
**GET** `/programs?school_unit_id=2`

#### 2. Create Program (Admin)
**POST** `/programs`

---

## 🔔 NOTIFICATIONS

### 1. Get User Notifications
**GET** `/notifications?is_read=false&page=1`

### 2. Mark as Read
**PUT** `/notifications/:id/read`

### 3. Mark All as Read
**PUT** `/notifications/read-all`

### 4. Delete Notification
**DELETE** `/notifications/:id`

---

## 💬 MESSAGES

### 1. Get Messages
**GET** `/messages?type=inbox`

Query Parameters:
- `type`: inbox, sent
- `is_read`: true, false

### 2. Send Message
**POST** `/messages`

Request:
```json
{
  "receiver_id": 2,
  "subject": "Perihal Nilai",
  "message": "Assalamualaikum..."
}
```

### 3. Reply Message
**POST** `/messages/:id/reply`

### 4. Mark as Read
**PUT** `/messages/:id/read`

---

## 📊 RESPONSE FORMAT

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    ...
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

### Pagination Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

---

## ⚠️ ERROR CODES

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Authentication required |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 422 | Unprocessable Entity | Validation error |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

---

## 🔧 ENVIRONMENT SETUP

### Environment Variables (.env)

```env
# Server
NODE_ENV=development
PORT=3001
API_URL=http://localhost:3001

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baituljannah_school
DB_USER=root
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_EXPIRES_IN=30d

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,doc,docx

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@baituljannah.sch.id
SMTP_PASSWORD=your_email_password
SMTP_FROM=Yayasan Baituljannah <noreply@baituljannah.sch.id>

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Storage (Optional - for cloud storage)
AWS_S3_BUCKET=baituljannah-storage
AWS_ACCESS_KEY=your_aws_key
AWS_SECRET_KEY=your_aws_secret
AWS_REGION=ap-southeast-1
```

---

## 📦 RATE LIMITING

- Anonymous: 100 requests/15 minutes
- Authenticated: 1000 requests/15 minutes
- Upload endpoints: 50 requests/hour

---

## 🔒 SECURITY

### Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
- At least 1 special character

### File Upload Security
- Max file size: 10MB
- Allowed types: jpg, jpeg, png, pdf, doc, docx
- Virus scanning enabled
- Filename sanitization

---

## 📝 NOTES

1. All timestamps are in UTC
2. Date format: YYYY-MM-DD
3. DateTime format: YYYY-MM-DDTHH:mm:ssZ
4. Currency: Indonesian Rupiah (IDR)
5. File URLs are CDN-enabled in production

---

**Last Updated**: December 1, 2024  
**API Version**: 1.0.0  
**Support**: dev@baituljannah.sch.id
