# Progress Implementasi

Tracking status pengerjaan berdasarkan [srs.md](srs.md).

**Last updated:** Juni 2026 — Phase 2 selesai

---

## Status Keseluruhan

| Phase | Status |
|-------|--------|
| Dokumentasi & SRS | ✅ Selesai |
| Migrasi ke Next.js | ✅ Selesai |
| Setup Supabase | ⬜ Belum dimulai |
| Halaman `/` (portfolio dinamis) | ⬜ Belum dimulai |
| Halaman `/catalog` | ⬜ Belum dimulai |
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
- [ ] Buat project di Supabase
- [ ] Buat 5 tabel: `projects`, `skills`, `profile_content`, `social_links`, `catalog_themes`
- [ ] Aktifkan RLS + buat policy (public READ, authenticated CRUD)
- [ ] Buat bucket Storage `catalog-previews` (public read)
- [ ] Buat user admin di Supabase Auth
- [ ] Seed data awal dari konten hardcoded yang ada sekarang
- [ ] Tambahkan env vars ke `.env.local` dan Vercel Dashboard

### Phase 4 — Halaman `/` (Portfolio Dinamis)
- [ ] Fetch `projects` dari Supabase (SSG)
- [ ] Fetch `skills` dari Supabase (SSG)
- [ ] Fetch `profile_content` dari Supabase (SSG)
- [ ] Fetch `social_links` dari Supabase (SSG)
- [ ] Pastikan tampilan visual tidak berubah dari versi sekarang

### Phase 5 — Halaman `/catalog`
- [ ] Fetch `catalog_themes` dari Supabase (SSG)
- [ ] Layout kartu tema (preview image, nama, fitur, tombol demo + WA)
- [ ] Responsive design (konsisten dengan design system)

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
