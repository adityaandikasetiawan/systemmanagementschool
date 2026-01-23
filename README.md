# Sistem Manajemen Sekolah Islam Baitul Jannah

Proyek ini adalah sistem manajemen sekolah yang komprehensif untuk Yayasan Baituljannah, mencakup berbagai unit pendidikan (TKIT, SDIT, SMPIT, SMAIT, SLBIT) dan fitur manajemen (PPDB, Keuangan, Akademik, dll).

## Struktur Proyek

Proyek ini menggunakan struktur Monorepo dengan NPM Workspaces:

- **root**: Konfigurasi workspace dan skrip global.
- **frontend/**: Aplikasi React dengan Vite, Tailwind CSS, dan Shadcn UI.
- **backend/**: API Server menggunakan Express.js dan MySQL/MongoDB.

## Prasyarat

- Node.js (v18+)
- MySQL (untuk database utama)
- NPM (v9+)

## Cara Menjalankan

1. **Install Dependensi**
   Jalankan perintah ini di root folder untuk menginstall dependensi frontend dan backend sekaligus:
   ```bash
   npm install
   ```

2. **Setup Database**
   Pastikan XAMPP/MySQL sudah berjalan, kemudian inisialisasi database dan data awal:
   ```bash
   npm run db:init -w backend
   ```
   *Perintah ini akan membuat database `baituljannah_school` dan mengisi data dummy.*

3. **Jalankan Aplikasi (Development)**
   Anda dapat menjalankan frontend dan backend secara bersamaan (jika menggunakan concurrently, belum dikonfigurasi) atau terpisah:

   **Terminal 1 (Backend):**
   ```bash
   npm run dev:backend
   ```
   Backend akan berjalan di: `http://localhost:5000`

   **Terminal 2 (Frontend):**
   ```bash
   npm run dev:frontend
   ```
   Frontend akan berjalan di: `http://localhost:3001`

## Konfigurasi Environment

Pastikan file `.env` di folder `backend/` dan `frontend/` sudah dikonfigurasi dengan benar.

- **Backend**: Port 5000, Database credentials.
- **Frontend**: VITE_API_URL mengarah ke backend (default: `http://localhost:5000/api/v1`).

## Fitur Utama

- **Multi-Unit Support**: Mengelola data untuk berbagai jenjang pendidikan.
- **PPDB Online**: Pendaftaran siswa baru terintegrasi.
- **Keuangan**: Manajemen pembayaran SPP dan tagihan lainnya.
- **Akademik**: Jadwal, Nilai, dan Absensi.
- **CMS Berita & Galeri**: Publikasi konten sekolah.

## Catatan

Folder `_archive_backend_starter` berisi kode referensi lama dan dapat diabaikan.
