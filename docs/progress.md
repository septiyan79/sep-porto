# Progress Implementasi

Tracking status pengerjaan berdasarkan [srs.md](srs.md).

**Last updated:** Juni 2026 — Phase 5 selesai

---

## Status Keseluruhan

| Phase | Status |
|-------|--------|
| Dokumentasi & SRS | ✅ Selesai |
| Migrasi ke Next.js | ✅ Selesai |
| Setup Supabase | 🔶 Sebagian (code selesai, perlu setup manual di Dashboard) |
| Halaman `/` (portfolio dinamis) | ✅ Selesai |
| Halaman `/catalog` | ✅ Selesai |
| Halaman `/admin` + `/admin/login` | ⬜ Belum dimulai |

---

## Detail Per Phase

### Phase 1 — Dokumentasi & SRS
- [x] Dokumentasi awal (`docs/`, `CLAUDE.md`)
- [x] Diskusi & finalisasi SRS
- [x] `docs/srs.md` dibuat

### Phase 2 — Migrasi ke Next.js ✅
- [x] Migrasi in-place: ganti Vite → Next.js 15
- [x] Pasang Tailwind CSS 4 via `@tailwindcss/postcss`
- [x] Framer Motion tetap terpasang
- [x] Semua komponen dipindah ke `components/` + tambah `"use client"`
- [x] Routing: `app/page.jsx`, `app/catalog/`, `app/admin/`, `app/admin/login/`
- [x] Hapus Vite-specific config (`vite.config.js`, `src/`, `index.html`, `vercel.json`)
- [x] Dev server berjalan di `http://localhost:3000`

### Phase 3 — Setup Supabase
**Code (selesai):**
- [x] Install `@supabase/supabase-js` + `@supabase/ssr`
- [x] `supabase/schema.sql` — 5 tabel + RLS policies
- [x] `supabase/seed.sql` — 8 projects, 36 skills, profile_content, social_links
- [x] `lib/supabase/client.js` — browser client (`createBrowserClient`)
- [x] `lib/supabase/server.js` — server client (`createServerClient` + cookies)
- [x] `.env.local` template dengan placeholder

**Manual (user di Supabase Dashboard):**
- [ ] Buat project di Supabase → catat URL + anon key
- [ ] SQL Editor → jalankan `supabase/schema.sql`
- [ ] SQL Editor → jalankan `supabase/seed.sql`
- [ ] Storage → buat bucket `catalog-previews` (Public)
- [ ] Authentication → buat user admin (email + password, Auto Confirm)
- [ ] Isi `.env.local` dengan URL + anon key yang sebenarnya
- [ ] Tambahkan env vars ke Vercel Dashboard

### Phase 4 — Halaman `/` (Portfolio Dinamis) ✅
- [x] `app/page.jsx` diubah menjadi Server Component
- [x] Buat `components/DashboardClient.jsx` (extract interactive parts)
- [x] Fetch `projects`, `skills`, `profile_content`, `social_links` dari Supabase
- [x] Semua komponen terima data via props (tidak ada lagi data hardcoded)
- [x] Tampilan visual tidak berubah, data muncul dari Supabase

### Phase 5 — Halaman `/catalog` ✅
- [x] `app/catalog/page.jsx` jadi Server Component, fetch `catalog_themes` + `social_links`
- [x] Buat `components/CatalogClient.jsx` (layout + motion, empty state)
- [x] Buat `components/CatalogCard.jsx` (preview image, features, tombol Demo + WA)
- [x] Sidebar diupdate: tambah link `/catalog`, scroll links hanya muncul di halaman `/`

### Phase 6 — Halaman `/admin`
- [ ] Halaman `/admin/login` (form Supabase Auth)
- [ ] Middleware proteksi route `/admin`
- [ ] Dashboard admin — CRUD Projects
- [ ] Dashboard admin — CRUD Skills
- [ ] Dashboard admin — Edit Profile Content
- [ ] Dashboard admin — Edit Social Links
- [ ] Dashboard admin — CRUD Catalog Themes + upload gambar ke Storage

---

## Catatan

- `next.config.js` dibuat sebagai `next.config.mjs` (bukan `.js`) karena Next.js meload config via Node CJS, sementara project menggunakan ESM syntax. `.mjs` memaksa file diperlakukan sebagai ES module.
