# 🔌 Frontend Integration Guide - Baituljannah School Management System

Panduan lengkap untuk mengintegrasikan React Frontend dengan Backend API yang baru dibuat.

---

## ✅ **What's Been Updated**

### 1. **API Service (/services/api.ts)**
- ✅ Base URL updated ke `http://localhost:5000/api/v1`
- ✅ Auth endpoints aligned dengan backend
- ✅ News endpoints updated (added `getLatest()`)
- ✅ PPDB endpoints updated (added `checkByNumber()`, `getStatistics()`)
- ✅ **NEW:** Contact endpoints added
- ✅ All endpoints tested dan siap pakai

---

## 🚀 **Quick Integration Steps**

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend running at: `http://localhost:5000`

### Step 2: Environment Setup (Frontend)

Create `.env` file di root project:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### Step 3: Test API Connection

Buka browser console dan test:

```javascript
import api from './services/api';

// Test health check
fetch('http://localhost:5000/health')
  .then(res => res.json())
  .then(data => console.log(data));

// Test login
api.auth.login('admin@baituljannah.sch.id', 'Admin123!')
  .then(res => console.log('Login success:', res))
  .catch(err => console.error('Login error:', err));
```

---

## 📋 **Integration Checklist**

### ✅ **Phase 1: Authentication Pages**

#### 1. Login Page (`/pages/Login.tsx`)

**Current State:** Using mock authentication  
**Action Needed:** Connect to real API

**Example Integration:**

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.login(email, password);
      
      if (response.success) {
        toast.success('Login berhasil!');
        
        // Redirect based on role
        const user = response.data.user;
        if (user.role === 'admin') {
          navigate('/admin');
        } else if (user.role === 'guru') {
          navigate('/teacher');
        } else if (user.role === 'siswa') {
          navigate('/student');
        } else if (user.role === 'ortu') {
          navigate('/parent');
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Your form fields */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### ✅ **Phase 2: News & Content Pages**

#### 2. News Page (`/pages/News.tsx`)

**Action Needed:** Fetch real news from API

**Example Integration:**

```typescript
import { useState, useEffect } from 'react';
import api from '../services/api';
import { NewsCard } from '../components/NewsCard';
import { Pagination } from '../components/Pagination';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');
  const [unitSekolah, setUnitSekolah] = useState('');

  useEffect(() => {
    fetchNews();
  }, [page, category, unitSekolah]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await api.news.getAll({
        page,
        limit: 9,
        category,
        unit_sekolah: unitSekolah,
      });

      if (response.success) {
        setNews(response.data);
        setTotalPages(response.totalPages);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Filters */}
      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Semua Kategori</option>
          <option value="Akademik">Akademik</option>
          <option value="Kegiatan">Kegiatan</option>
          <option value="Prestasi">Prestasi</option>
          <option value="Pengumuman">Pengumuman</option>
        </select>

        <select value={unitSekolah} onChange={(e) => setUnitSekolah(e.target.value)}>
          <option value="">Semua Unit</option>
          <option value="TKIT">TKIT</option>
          <option value="SDIT">SDIT</option>
          <option value="SMPIT">SMPIT</option>
          <option value="SMAIT">SMAIT</option>
          <option value="SLBIT">SLBIT</option>
        </select>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item: any) => (
          <NewsCard key={item.id} news={item} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
```

#### 3. Latest News Component (MainPortal)

```typescript
import { useState, useEffect } from 'react';
import api from '../services/api';

function LatestNewsSection() {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    try {
      const response = await api.news.getLatest({ limit: 5 });
      if (response.success) {
        setLatestNews(response.data);
      }
    } catch (error) {
      console.error('Error fetching latest news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Berita Terbaru</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-4">
          {latestNews.map((news: any) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </section>
  );
}
```

---

### ✅ **Phase 3: PPDB/Admission Pages**

#### 4. PPDB Registration (`/pages/Admission.tsx`)

**Action Needed:** Submit registration to API

```typescript
import { useState } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export default function Admission() {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    jenjang: '',
    jenis_kelamin: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    alamat: '',
    nama_ayah: '',
    nama_ibu: '',
    no_telp: '',
    email: '',
    // ... other fields
  });
  const [loading, setLoading] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.ppdb.register(formData);

      if (response.success) {
        setRegistrationNumber(response.data.no_pendaftaran);
        toast.success('Pendaftaran berhasil!');
        toast.info(`Nomor Pendaftaran: ${response.data.no_pendaftaran}`);
        
        // Show success modal with registration number
        // Or redirect to check status page
      }
    } catch (error: any) {
      toast.error(error.message || 'Pendaftaran gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <input
        type="text"
        value={formData.nama_lengkap}
        onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
        required
      />
      {/* ... other fields ... */}
      <button type="submit" disabled={loading}>
        {loading ? 'Memproses...' : 'Daftar Sekarang'}
      </button>
    </form>
  );
}
```

#### 5. Check Registration Status

```typescript
import { useState } from 'react';
import api from '../services/api';

function CheckRegistrationStatus() {
  const [regNumber, setRegNumber] = useState('');
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    try {
      const response = await api.ppdb.checkByNumber(regNumber);
      if (response.success) {
        setRegistration(response.data);
      }
    } catch (error: any) {
      toast.error('Nomor pendaftaran tidak ditemukan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Masukkan No. Pendaftaran"
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
      />
      <button onClick={handleCheck} disabled={loading}>
        Cek Status
      </button>

      {registration && (
        <div className="registration-info">
          <h3>Informasi Pendaftaran</h3>
          <p>Nama: {registration.nama_lengkap}</p>
          <p>Status: {registration.status}</p>
          <p>Tanggal Daftar: {registration.created_at}</p>
        </div>
      )}
    </div>
  );
}
```

---

### ✅ **Phase 4: Contact Page**

#### 6. Contact Form (`/pages/Contact.tsx`)

**Action Needed:** Submit contact form to API

```typescript
import { useState } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    unit_sekolah: 'Umum'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.contact.submit(formData);

      if (response.success) {
        toast.success('Pesan berhasil terkirim!');
        toast.info('Kami akan menghubungi Anda segera');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          unit_sekolah: 'Umum'
        });
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengirim pesan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nama Lengkap"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Nomor Telepon"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Subjek"
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        required
      />
      <textarea
        placeholder="Pesan Anda"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  );
}
```

---

### ✅ **Phase 5: Admin Panel Integration**

#### 7. Admin Dashboard - News Management

```typescript
import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export default function AdminNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.news.getAll({ page: 1, limit: 100 });
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newsData: any) => {
    try {
      const response = await api.news.create(newsData);
      if (response.success) {
        toast.success('Berita berhasil dibuat');
        fetchNews();
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal membuat berita');
    }
  };

  const handleUpdate = async (id: number, newsData: any) => {
    try {
      const response = await api.news.update(id, newsData);
      if (response.success) {
        toast.success('Berita berhasil diupdate');
        fetchNews();
        setShowModal(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengupdate berita');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;

    try {
      const response = await api.news.delete(id);
      if (response.success) {
        toast.success('Berita berhasil dihapus');
        fetchNews();
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal menghapus berita');
    }
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Tambah Berita Baru
      </button>

      {/* News Table */}
      <table>
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map((item: any) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.status}</td>
              <td>{new Date(item.created_at).toLocaleDateString()}</td>
              <td>
                <button onClick={() => {
                  setEditingNews(item);
                  setShowModal(true);
                }}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Create/Edit Modal */}
      {showModal && (
        <NewsFormModal
          news={editingNews}
          onSave={editingNews ? (data) => handleUpdate(editingNews.id, data) : handleCreate}
          onClose={() => {
            setShowModal(false);
            setEditingNews(null);
          }}
        />
      )}
    </div>
  );
}
```

#### 8. Admin Dashboard - PPDB Management

```typescript
import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'sonner';

export default function AdminPPDB() {
  const [registrations, setRegistrations] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
    fetchStatistics();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await api.ppdb.getRegistrations({ page: 1, limit: 50 });
      if (response.success) {
        setRegistrations(response.data);
      }
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await api.ppdb.getStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch statistics');
    }
  };

  const handleUpdateStatus = async (id: number, status: string, catatan?: string) => {
    try {
      const response = await api.ppdb.updateStatus(id, { status, catatan });
      if (response.success) {
        toast.success('Status berhasil diupdate');
        fetchRegistrations();
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal mengupdate status');
    }
  };

  return (
    <div>
      {/* Statistics Cards */}
      {statistics && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="stat-card">
            <h3>Total Pendaftar</h3>
            <p className="text-3xl">{statistics.total}</p>
          </div>
          {statistics.byJenjang.map((item: any) => (
            <div key={item.jenjang} className="stat-card">
              <h3>{item.jenjang}</h3>
              <p className="text-3xl">{item.count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Registrations Table */}
      <table>
        <thead>
          <tr>
            <th>No. Pendaftaran</th>
            <th>Nama</th>
            <th>Jenjang</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((reg: any) => (
            <tr key={reg.id}>
              <td>{reg.no_pendaftaran}</td>
              <td>{reg.nama_lengkap}</td>
              <td>{reg.jenjang}</td>
              <td>
                <span className={`badge badge-${reg.status}`}>
                  {reg.status}
                </span>
              </td>
              <td>{new Date(reg.created_at).toLocaleDateString()}</td>
              <td>
                <select
                  value={reg.status}
                  onChange={(e) => handleUpdateStatus(reg.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="registered">Registered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🔒 **Authentication Context/Hook**

Create custom hook untuk manage authentication state:

```typescript
// /hooks/useAuth.ts
import { createContext, useContext, useState, useEffect } from 'react';
import api, { apiHelpers } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(apiHelpers.getStoredUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in on mount
    if (apiHelpers.getToken()) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.auth.getCurrentUser();
      if (response.success) {
        setUser(response.data);
        apiHelpers.setStoredUser(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch user');
      apiHelpers.clearTokens();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);
    if (response.success) {
      setUser(response.data.user);
      return response;
    }
    throw new Error(response.message || 'Login failed');
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Usage in App.tsx:**

```typescript
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Your routes */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

**Protected Route:**

```typescript
import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute({ children, allowedRoles }: any) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}

// Usage
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminPanel />
  </ProtectedRoute>
} />
```

---

## 🎯 **Next Steps After Integration**

1. ✅ **Test all endpoints** dengan Postman atau browser console
2. ✅ **Handle loading states** di semua components
3. ✅ **Handle error states** dengan user-friendly messages
4. ✅ **Add form validation** sebelum submit ke API
5. ✅ **Implement toast notifications** untuk user feedback
6. ✅ **Add loading skeletons** untuk better UX
7. ✅ **Test authentication flow** end-to-end
8. ✅ **Test CRUD operations** di admin panel

---

## 🐛 **Common Issues & Solutions**

### Issue 1: CORS Error
**Error:** "Access to fetch blocked by CORS policy"

**Solution:**
- Backend sudah configured CORS
- Check `FRONTEND_URL` di backend `.env`
- Pastikan frontend running di port yang sesuai

### Issue 2: 401 Unauthorized
**Error:** "Unauthorized" or "Token invalid"

**Solution:**
- Check token di localStorage
- Login ulang untuk get new token
- Check token expiration (default 7 hari)

### Issue 3: Network Error
**Error:** "Failed to fetch" or "Network Error"

**Solution:**
- Pastikan backend server running
- Check backend URL di `.env`
- Check firewall/antivirus settings

---

## 📝 **Testing Checklist**

### Authentication
- [ ] Login with correct credentials
- [ ] Login with wrong credentials (should show error)
- [ ] Logout functionality
- [ ] Protected routes redirect to login
- [ ] Role-based access control

### News
- [ ] Fetch all news with pagination
- [ ] Filter news by category
- [ ] Filter news by unit sekolah
- [ ] Create new news (admin)
- [ ] Update news (admin)
- [ ] Delete news (admin)

### PPDB
- [ ] Submit registration form
- [ ] Check registration status
- [ ] Admin can view all registrations
- [ ] Admin can update status
- [ ] Statistics showing correctly

### Contact
- [ ] Submit contact form
- [ ] Form validation working
- [ ] Success message shown
- [ ] Admin can view messages

---

**🎉 Integration Complete! Ready for production testing.**
