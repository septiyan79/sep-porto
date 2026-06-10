# sep-porto — Dokumentasi Project

Dokumentasi ini berfungsi sebagai panduan referensi untuk Claude Code di setiap sesi baru. Baca file ini terlebih dahulu sebelum mulai bekerja pada project ini.

## Daftar Dokumentasi

| File | Isi |
|------|-----|
| [**srs.md**](srs.md) | **SRS — semua keputusan arsitektur & fitur target (baca ini dulu)** |
| [**progress.md**](progress.md) | **Tracking progress implementasi per phase** |
| [project-overview.md](project-overview.md) | Gambaran umum, tujuan, fitur, dan sejarah project |
| [architecture.md](architecture.md) | Struktur folder, komponen, state (kondisi saat ini + target) |
| [tech-stack.md](tech-stack.md) | Dependensi saat ini + planned stack Supabase/Next.js |
| [components.md](components.md) | Katalog lengkap setiap komponen (lokasi, props, fungsi) |
| [design-system.md](design-system.md) | Palet warna, pola styling, animasi, responsivitas |
| [development-guide.md](development-guide.md) | Cara menjalankan project, perintah, konvensi kode |
| [deployment.md](deployment.md) | Konfigurasi Vercel, cara deploy, histori hosting |
| [content-guide.md](content-guide.md) | Cara update konten (hardcoded sekarang, via /admin setelah migrasi) |

## Quick Reference

- **Owner:** Septiyan E.P. — Fullstack Developer, Jakarta
- **Deploy:** Vercel (auto dari branch `main`)

### Kondisi Saat Ini (Codebase)
- **Framework:** React 19 + Vite 7
- **Halaman:** `/` (single page)
- **Konten:** Hardcoded di komponen `.jsx`
- **Entry point:** `src/main.jsx` → `src/App.jsx` → `src/pages/Dashboard.jsx`

### Target Setelah Migrasi (lihat [srs.md](srs.md))
- **Framework:** Next.js App Router
- **Halaman:** `/`, `/catalog`, `/admin`, `/admin/login`
- **Konten:** Supabase (PostgreSQL)
- **Admin:** Halaman `/admin` dengan Supabase Auth
