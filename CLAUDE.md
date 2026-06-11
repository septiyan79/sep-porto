# sep-porto — Claude Code Context

## Project

Personal portfolio + catalog platform milik **Septiyan E.P.** (Fullstack Developer, Jakarta).

## Status Migrasi

| Aspek | Status | Catatan |
|-------|--------|---------|
| Framework | ✅ Next.js 15 App Router | Migrasi dari Vite selesai |
| Supabase (code) | ✅ Schema + seed + client | Perlu setup manual di Dashboard |
| Konten | ⏳ Masih hardcoded | Akan diganti fetch Supabase di Phase 4 |
| Halaman aktif | ⏳ `/` saja | `/catalog` + `/admin` masih placeholder |
| Admin & Auth | ⏳ Belum | Phase 6 |

## Dokumentasi Lengkap

| File | Kapan dibuka |
|------|--------------|
| [`docs/srs.md`](docs/srs.md) | **Baca ini dulu** — semua keputusan arsitektur & fitur target |
| [`docs/progress.md`](docs/progress.md) | Tracking progress implementasi per phase |
| [`docs/architecture.md`](docs/architecture.md) | Struktur folder, komponen, state (kondisi saat ini + target) |
| [`docs/components.md`](docs/components.md) | Props & fungsi setiap komponen |
| [`docs/design-system.md`](docs/design-system.md) | Warna, pola card, animasi |
| [`docs/content-guide.md`](docs/content-guide.md) | Cara update konten (hardcoded sekarang, via /admin setelah migrasi) |
| [`docs/tech-stack.md`](docs/tech-stack.md) | Dependensi saat ini + planned stack |
| [`docs/development-guide.md`](docs/development-guide.md) | Cara run, konvensi kode |
| [`docs/deployment.md`](docs/deployment.md) | Vercel config & deploy |

## Quick Reference — Kondisi Saat Ini

```
app/page.jsx                     ← halaman /, state modal ada di sini
app/catalog/page.jsx             ← placeholder /catalog
app/admin/page.jsx               ← placeholder /admin
app/admin/login/page.jsx         ← placeholder /admin/login
app/layout.jsx                   ← root layout (metadata, globals.css)
app/globals.css                  ← @import "tailwindcss"
components/Projects.jsx          ← data proyek hardcoded di sini
components/TechStack.jsx         ← data skill hardcoded di sini
components/Hero.jsx              ← bio, social links
components/ProfessionalProfile.jsx  ← about me (3 kartu)
components/ProjectModal.jsx      ← modal detail proyek
components/Sidebar.jsx           ← navigasi fixed desktop
components/Background.jsx        ← blob gradient dekoratif
components/Footer.jsx            ← footer
next.config.mjs                  ← Next.js config (pakai .mjs bukan .js)
postcss.config.mjs               ← Tailwind CSS 4 via postcss
supabase/schema.sql              ← DDL 5 tabel + RLS (jalankan di Supabase Dashboard)
supabase/seed.sql                ← data awal dari konten hardcoded
lib/supabase/client.js           ← browser client (createBrowserClient)
lib/supabase/server.js           ← server client (createServerClient + cookies)
.env.local                       ← isi NEXT_PUBLIC_SUPABASE_URL + ANON_KEY
```

## Aturan Penting (Saat Ini)

- **Konten masih hardcoded** — belum fetch dari Supabase (Phase 4 nanti)
- **Tidak ada TypeScript** — semua file `.jsx`, meskipun types sudah terpasang
- **Styling hanya Tailwind** — jangan tambah CSS manual
- **Animasi via Framer Motion** — komponen baru di grid wajib terima prop `itemVariants`
- **`"use client"`** — wajib di semua komponen yang pakai hooks atau Framer Motion
- **`react-icon` v1.0.0 jangan dipakai** — gunakan `react-icons` (plural)
- **`.env.local`** — isi dengan URL + anon key dari Supabase Dashboard sebelum Phase 4

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

> Tambahkan juga ke Vercel Dashboard → Project Settings → Environment Variables.
