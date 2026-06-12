# Progress Implementasi

Tracking status pengerjaan berdasarkan [srs.md](srs.md).

**Last updated:** Juni 2026 — Semua phase selesai ✅

---

## Status Keseluruhan

| Phase | Status |
|-------|--------|
| Dokumentasi & SRS | ✅ Selesai |
| Migrasi ke Next.js | ✅ Selesai |
| Setup Supabase | ✅ Selesai |
| Halaman `/` (portfolio dinamis) | ✅ Selesai |
| Halaman `/catalog` | ✅ Selesai |
| Halaman `/admin` + `/admin/login` | ✅ Selesai |

---

## Detail Per Phase

### Phase 1 — Dokumentasi & SRS ✅
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

### Phase 3 — Setup Supabase ✅
**Code:**
- [x] Install `@supabase/supabase-js` + `@supabase/ssr`
- [x] `supabase/schema.sql` — 5 tabel + RLS policies
- [x] `supabase/seed.sql` — 8 projects, 36 skills, profile_content, social_links
- [x] `lib/supabase/client.js` — browser client (`createBrowserClient`)
- [x] `lib/supabase/server.js` — server client (`createServerClient` + cookies)
- [x] `.env.local` — URL + anon key sudah diisi

**Manual (Supabase Dashboard):**
- [x] Buat project Supabase
- [x] Jalankan `supabase/schema.sql` + `supabase/seed.sql`
- [x] Buat bucket Storage `catalog-previews` (Public) + storage RLS policies
- [x] Buat user admin di Authentication
- [ ] Tambahkan env vars ke Vercel Dashboard — lakukan sebelum deploy produksi

### Phase 4 — Halaman `/` (Portfolio Dinamis) ✅
- [x] `app/page.jsx` diubah menjadi Server Component
- [x] Buat `components/DashboardClient.jsx` (extract interactive parts)
- [x] Fetch `projects`, `skills`, `profile_content`, `social_links` dari Supabase
- [x] Semua komponen terima data via props (tidak ada lagi data hardcoded)

### Phase 5 — Halaman `/catalog` ✅
- [x] `app/catalog/page.jsx` jadi Server Component, fetch `catalog_themes` + `social_links`
- [x] Buat `components/CatalogClient.jsx` (layout, filter category, empty state)
- [x] Buat `components/CatalogCard.jsx` (preview image, features, tombol Demo + WA)
- [x] Sidebar diupdate: tambah link `/catalog`, scroll links hanya muncul di halaman `/`

### Phase 6 — Halaman `/admin` ✅
- [x] `middleware.js` — proteksi semua route `/admin/*`, redirect ke `/admin/login` jika tidak ada sesi
- [x] `app/admin/login/page.jsx` + `components/admin/LoginForm.jsx` — form login Supabase Auth
- [x] `app/admin/layout.jsx` — root layout admin
- [x] `app/admin/page.jsx` + `components/admin/AdminDashboard.jsx` — shell dashboard + tab navigation + logout
- [x] `components/admin/AdminModal.jsx` — modal popup reusable untuk semua form edit/tambah
- [x] `components/admin/CatalogManager.jsx` — CRUD catalog_themes + upload gambar ke Storage
- [x] `components/admin/ProjectsManager.jsx` — CRUD projects
- [x] `components/admin/SkillsManager.jsx` — CRUD skills (grouped by category)
- [x] `components/admin/ProfileManager.jsx` — edit semua key-value profile_content
- [x] `components/admin/SocialLinksManager.jsx` — CRUD social_links
- [x] Storage RLS policies — authenticated upload/update/delete, public read

---

## Catatan Teknis

- `next.config.mjs` (bukan `.js`) — ESM syntax tidak bisa di-require oleh Node CJS. `.mjs` memaksa ESM treatment.
- `supabase/schema.sql` memakai kolom `description` bukan `desc` — `desc` adalah reserved keyword PostgreSQL.
- `eslint.config.js` — ditambah `globals.node` (untuk `process.env`) dan `varsIgnorePattern` untuk `motion` (ESLint tidak mengenali `<motion.div>` sebagai usage tanpa plugin React).
- Storage bucket `catalog-previews` butuh 4 RLS policies terpisah (INSERT, UPDATE, DELETE untuk authenticated; SELECT untuk public).
