#!/bin/bash

TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzY3NjYxOTAxLCJleHAiOjE3NjgyNjY3MDF9.8iRrBe8x6BAy1kpCj0idc3StuPiyPoPXqGUOyofR52o"
API_URL="http://localhost:5050/api/v1"

echo "--- Testing GET /units ---"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/units" | head -c 200
echo -e "\n"

echo "--- Testing POST /units ---"
curl -s -X POST "$API_URL/units" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code": "SMA", "name": "SMA Islam Baitul Jannah", "level": "SMA", "accent_color": "#ff0000"}' | head -c 200
echo -e "\n"

echo "--- Testing GET /gallery ---"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/gallery" | head -c 200
echo -e "\n"

echo "--- Testing POST /gallery ---"
curl -s -X POST "$API_URL/gallery" \
  -H "Authorization: Bearer $TOKEN" \
  -F "title=Kegiatan Baru" \
  -F "description=Deskripsi kegiatan" \
  -F "category=Kegiatan" \
  -F "image=@/var/www/html/src/backend/sample.jpg" | head -c 200
echo -e "\n"

echo "--- Testing GET /news ---"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/news" | head -c 200
echo -e "\n"

echo "--- Testing POST /news ---"
curl -s -X POST "$API_URL/news" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Berita Baru", "content": "Konten berita baru yang cukup panjang untuk validasi minimal 50 karakter.", "category": "Lainnya"}' | head -c 200
echo -e "\n"
