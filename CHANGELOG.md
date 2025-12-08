# Changelog

All notable changes to this project are documented in this file.

## 2025-12-08 - feature/architecture-update

- Backend: Update database credentials in `src/backend-starter/.env` to use `DB_USER=baituljannah-sch-id` and `DB_PASSWORD=Admin123`.
- Backend: Point `DB_HOST` to `baituljannah.sch.id` to target remote MySQL server.
- Backend: Rotate `JWT_SECRET` and `JWT_REFRESH_SECRET` to strong values.
- Frontend: Continue i18n migration for admin pages using centralized `src/i18n/texts.json`.
- Deployment: Add auto-deploy checklist updates in `src/DEPLOYMENT_CHECKLIST.md` (Nginx, PM2/Node, environment variables, build steps).
- Verification: Frontend build validated; backend health endpoint verified running. Remote DB connection requires grants for `b112@103.3.221.216` (see deployment checklist notes).

