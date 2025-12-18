# Panduan Deployment Server & Domain

Project ini telah disiapkan untuk deployment ke server production dengan dukungan domain.

## Opsi 1: Deployment dengan Docker (Direkomendasikan)

Metode ini paling mudah dan konsisten karena menggunakan container.

1.  **Persyaratan**: Pastikan Docker dan Docker Compose terinstall di server.
2.  **Konfigurasi**:
    *   Edit `docker-compose.yml` jika perlu mengubah port atau variabel environment.
    *   Pastikan `VITE_API_URL` di set ke `/api/v1` (sudah default) agar request dari frontend melalui Nginx proxy.
3.  **Jalankan**:
    ```bash
    docker-compose up -d --build
    ```
4.  **Akses**: Website akan berjalan di Port 80 (HTTP).
    *   Frontend: `http://domain-anda.com`
    *   API: `http://domain-anda.com/api`

## Opsi 2: Deployment Manual dengan PM2 & Nginx

Jika Anda ingin menjalankan langsung di server (VPS) tanpa Docker.

### 1. Backend & Frontend (Node.js)
Gunakan PM2 untuk menjalankan service.

1.  Install dependencies:
    ```bash
    npm install
    cd src/backend && npm install
    cd ../..
    ```
2.  Build frontend:
    ```bash
    # Pastikan .env.production ada dan VITE_API_URL=/api/v1
    npm run build
    ```
3.  Jalankan dengan PM2:
    ```bash
    pm2 start ecosystem.config.js
    ```

### 2. Konfigurasi Nginx
Gunakan file `nginx.conf.example` sebagai referensi konfigurasi Nginx Anda.

1.  Copy konfigurasi ke `/etc/nginx/sites-available/baituljannah`.
2.  Sesuaikan `server_name` dengan domain Anda.
3.  Aktifkan site dan restart Nginx.

## Konfigurasi Domain

1.  **Arahkan DNS**: Point A record domain (misal `baituljannah.sch.id`) ke IP public server Anda.
2.  **SSL (HTTPS)**: Gunakan Certbot untuk mengaktifkan HTTPS gratis.
    ```bash
    sudo certbot --nginx -d baituljannah.sch.id -d www.baituljannah.sch.id
    ```

## Struktur File Deployment
*   `docker-compose.yml`: Orkestrasi seluruh service (Frontend, Backend, DB, Nginx).
*   `ecosystem.config.js`: Konfigurasi untuk PM2.
*   `.env.production`: Environment variables untuk build production.
*   `nginx.conf.example`: Contoh config Nginx untuk manual setup.
*   `docker/nginx/nginx.conf`: Config Nginx khusus Docker.
