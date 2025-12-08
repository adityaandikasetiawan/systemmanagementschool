# INTEGRATION GUIDE - FRONTEND & BACKEND
**Step-by-Step Guide untuk Menghubungkan Frontend React dengan Backend MySQL**

---

## 📋 TABLE OF CONTENTS

1. [Setup Backend](#setup-backend)
2. [Setup Frontend](#setup-frontend)
3. [Test API Connection](#test-api-connection)
4. [Implement Login](#implement-login)
5. [Protected Routes](#protected-routes)
6. [Real Data Integration](#real-data-integration)
7. [Common Issues](#common-issues)

---

## 🚀 STEP 1: SETUP BACKEND

### A. Install MySQL & Create Database

**Windows (XAMPP):**
```bash
# 1. Download & install XAMPP dari https://www.apachefriends.org/
# 2. Start MySQL di XAMPP Control Panel
# 3. Buka http://localhost/phpmyadmin
# 4. Atau gunakan MySQL CLI
```

**macOS (Homebrew):**
```bash
# Install MySQL
brew install mysql

# Start MySQL service
brew services start mysql

# Secure installation
mysql_secure_installation
```

**Linux (Ubuntu):**
```bash
# Install MySQL
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql

# Secure installation
sudo mysql_secure_installation
```

### B. Load Database Schema & Seed

```bash
# Login ke MySQL
mysql -u root -p

# Atau jika tidak ada password (XAMPP default)
mysql -u root

# Di MySQL prompt, jalankan:
source C:/path/to/database/schema.sql;    # Windows
source /path/to/database/schema.sql;      # macOS/Linux

source C:/path/to/database/seed.sql;      # Windows
source /path/to/database/seed.sql;        # macOS/Linux

# Verifikasi database
SHOW DATABASES;
USE baituljannah_school;
SHOW TABLES;
SELECT * FROM users LIMIT 5;
```

**Atau menggunakan MySQL Workbench:**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Pilih `schema.sql`
4. Execute (⚡️ icon)
5. Ulangi untuk `seed.sql`

### C. Setup Backend Project

```bash
# 1. Buat folder backend di luar project React
cd ..
mkdir baituljannah-backend
cd baituljannah-backend

# 2. Copy files dari backend-starter
# Copy semua file dari folder /backend-starter ke baituljannah-backend

# 3. Install dependencies
npm install

# 4. Setup environment
cp .env.example .env

# 5. Edit .env file
# Buka .env dan sesuaikan dengan konfigurasi MySQL Anda:
```

**Edit `.env`:**
```env
NODE_ENV=development
PORT=3001

# Database - SESUAIKAN DENGAN KONFIGURASI ANDA
DB_HOST=localhost
DB_PORT=3306
DB_NAME=baituljannah_school
DB_USER=root
DB_PASSWORD=           # Kosongkan jika tidak ada password (XAMPP)
# DB_PASSWORD=your_password   # Atau isi jika ada password

JWT_SECRET=baituljannah_secret_key_2024
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=baituljannah_refresh_secret_2024
JWT_REFRESH_EXPIRES_IN=30d

BCRYPT_ROUNDS=10

CORS_ORIGIN=http://localhost:5173

FRONTEND_URL=http://localhost:5173
```

### D. Start Backend Server

```bash
# Development mode (auto-reload)
npm run dev

# Jika berhasil, akan muncul:
# ========================================
# 🚀 YAYASAN BAITULJANNAH API SERVER
# ========================================
# ✅ MySQL Database connected successfully
# 📍 Environment: development
# 🌐 Server URL: http://localhost:3001
# 💚 Health Check: http://localhost:3001/api/health
# ========================================
```

### E. Test Backend

**Browser:**
```
Buka: http://localhost:3001/api/health
```

**cURL:**
```bash
curl http://localhost:3001/api/health
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "timestamp": "2024-12-01T10:00:00.000Z",
    "uptime": 1.234,
    "environment": "development",
    "version": "1.0.0"
  }
}
```

---

## ⚛️ STEP 2: SETUP FRONTEND

### A. Create Environment File

Di project React Anda, buat file `.env`:

```bash
# Di root folder project React
touch .env
```

**Edit `.env`:**
```env
# API Configuration
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Yayasan Baituljannah
VITE_APP_URL=http://localhost:5173
```

### B. Verify API Service

File `/services/api.ts` sudah dibuat sebelumnya. Pastikan ada di project Anda.

### C. Create Auth Context (Optional but Recommended)

Buat file `/contexts/AuthContext.tsx`:

```typescript
import React, { createContext, useState, useContext, useEffect } from 'react';
import { api, apiHelpers } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  full_name: string;
  phone?: string;
  photo_url?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = apiHelpers.getStoredUser();
      const token = apiHelpers.getToken();

      if (storedUser && token) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.auth.login(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### D. Wrap App with AuthProvider

Update `/App.tsx`:

```typescript
import { AuthProvider } from './contexts/AuthContext';

// Di dalam component
return (
  <AuthProvider>
    {/* Existing app content */}
  </AuthProvider>
);
```

---

## 🧪 STEP 3: TEST API CONNECTION

### A. Test Health Endpoint

Buat test component `/pages/TestAPI.tsx`:

```typescript
import React, { useState } from 'react';

export const TestAPI: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/health');
      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl mb-6">API Connection Test</h1>
        
        <button
          onClick={testConnection}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </button>

        {result && (
          <div className="mt-6">
            <h2 className="font-bold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
```

Add route in `App.tsx`:

```typescript
case 'test-api':
  return <TestAPI />;
```

Klik tombol "Test Connection" dan pastikan mendapat response sukses.

---

## 🔐 STEP 4: IMPLEMENT LOGIN

### A. Update Login Page

Update `/pages/Login.tsx`:

```typescript
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export const Login: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Login sukses, navigate ke dashboard
      onNavigate('admin-super');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🕌</span>
          </div>
          <h1 className="text-2xl">Yayasan Baituljannah</h1>
          <p className="text-gray-600">School Management System</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@baituljannah.sch.id"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 mb-2">Test Credentials:</p>
          <p className="text-xs text-blue-700">Email: admin@baituljannah.sch.id</p>
          <p className="text-xs text-blue-700">Password: Admin123!</p>
        </div>
      </div>
    </div>
  );
};
```

### B. Test Login

1. Start backend: `npm run dev`
2. Start frontend: `npm run dev`
3. Navigate ke halaman login
4. Gunakan credentials test
5. Jika sukses, akan redirect ke dashboard

---

## 🛡️ STEP 5: PROTECTED ROUTES

### A. Create ProtectedRoute Component

Buat `/components/ProtectedRoute.tsx`:

```typescript
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  fallback
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please login to continue</p>
          <button
            onClick={() => window.location.href = '/login'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-xl mb-4">Forbidden</h2>
          <p className="text-gray-600">You don't have permission to access this page</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
```

### B. Wrap Protected Pages

Update `App.tsx`:

```typescript
import { ProtectedRoute } from './components/ProtectedRoute';

// Di switch case untuk halaman yang butuh auth
case 'admin-super':
  return (
    <ProtectedRoute allowedRoles={['super_admin']}>
      <AdminPanel
        userRole="Super Admin"
        userName={user?.full_name || 'Admin'}
        accentColor="#1E4AB8"
        onNavigate={(page) => setCurrentPage(page as PageType)}
      />
    </ProtectedRoute>
  );
```

---

## 📊 STEP 6: REAL DATA INTEGRATION

### A. Fetch Students Example

Update `/pages/AdminStudents.tsx`:

```typescript
import { useEffect, useState } from 'react';
import { api } from '../services/api';

export const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await api.students.getAll({ page: 1, limit: 20 });
      if (response.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render students */}
      {students.map((student: any) => (
        <div key={student.id}>
          {student.user.full_name} - {student.nis}
        </div>
      ))}
    </div>
  );
};
```

### B. Create New Student Example

```typescript
const handleCreateStudent = async (studentData: any) => {
  try {
    const response = await api.students.create(studentData);
    if (response.success) {
      // Refresh list
      fetchStudents();
      // Show success message
      alert('Student created successfully!');
    }
  } catch (error: any) {
    alert('Failed to create student: ' + error.message);
  }
};
```

---

## ⚠️ STEP 7: COMMON ISSUES

### Issue 1: CORS Error

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution:**
```typescript
// backend/src/app.ts
app.use(cors({
  origin: 'http://localhost:5173',  // Frontend URL
  credentials: true
}));
```

### Issue 2: Database Connection Failed

**Error:**
```
❌ MySQL connection error: Access denied for user 'root'@'localhost'
```

**Solution:**
```bash
# Reset MySQL root password
mysql -u root

# Di MySQL prompt:
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;

# Update .env
DB_PASSWORD=new_password
```

### Issue 3: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE :::3001
```

**Solution:**
```bash
# Find process using port
lsof -i :3001         # macOS/Linux
netstat -ano | findstr :3001    # Windows

# Kill process
kill -9 <PID>         # macOS/Linux
taskkill /PID <PID> /F          # Windows

# Or change port in .env
PORT=3002
```

### Issue 4: JWT Token Invalid

**Error:**
```
Invalid or expired token
```

**Solution:**
1. Clear localStorage
2. Login again
3. Ensure JWT_SECRET matches in backend .env

### Issue 5: Cannot Find Module

**Error:**
```
Cannot find module './services/api'
```

**Solution:**
```bash
# Ensure api.ts exists in /services folder
# Restart dev server
npm run dev
```

---

## ✅ CHECKLIST

- [ ] MySQL installed and running
- [ ] Database schema loaded
- [ ] Seed data loaded
- [ ] Backend dependencies installed
- [ ] Backend .env configured
- [ ] Backend server running on port 3001
- [ ] Frontend .env configured
- [ ] api.ts service exists
- [ ] AuthContext created
- [ ] Login page updated
- [ ] Can login successfully
- [ ] Protected routes working
- [ ] Can fetch data from API

---

## 🎯 NEXT DEVELOPMENT STEPS

1. **Implement all controllers** (users, students, teachers, etc.)
2. **Create admin CRUD operations**
3. **Add file upload functionality**
4. **Implement real-time features** (notifications)
5. **Add email service**
6. **Setup payment gateway**
7. **Add comprehensive error handling**
8. **Write tests**
9. **Deploy to production**

---

**🎉 Selamat! Frontend dan Backend sudah terintegrasi!**

Sekarang Anda bisa mulai mengembangkan fitur-fitur lainnya dengan menggunakan real data dari MySQL database.
