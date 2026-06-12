# sep-porto — Claude Code Context

## Project

Personal portfolio + catalog platform milik **Septiyan E.P.** (Fullstack Developer, Jakarta).

## Status Migrasi

| Aspek | Status | Catatan |
|-------|--------|---------|
| Framework | ✅ Next.js 15 App Router | Migrasi dari Vite selesai |
| Supabase | ✅ Live | Schema, seed, client sudah jalan |
| Halaman `/` | ✅ Dinamis | Fetch dari Supabase, tidak ada hardcode |
| Halaman `/catalog` | ✅ Live | Fetch catalog_themes + filter category |
| Admin & Auth | ✅ Selesai | Login, middleware, CRUD dashboard lengkap |

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
app/page.jsx                     ← Server Component, fetch semua data dari Supabase
app/catalog/page.jsx             ← Server Component, fetch catalog_themes
app/admin/page.jsx               ← placeholder /admin (Phase 6)
app/admin/login/page.jsx         ← placeholder /admin/login (Phase 6)
app/layout.jsx                   ← root layout (metadata, globals.css)
app/globals.css                  ← @import "tailwindcss"
components/DashboardClient.jsx   ← "use client" — layout /, state modal, motion
components/CatalogClient.jsx     ← "use client" — layout /catalog, filter category
components/CatalogCard.jsx       ← "use client" — card tiap tema di /catalog
components/Hero.jsx              ← terima props: profile, socialLinks
components/TechStack.jsx         ← terima props: skills {frontend,backend,tools,practices}
components/Projects.jsx          ← terima props: projects (array dari Supabase)
components/ProfessionalProfile.jsx  ← terima props: profile
components/ProjectModal.jsx      ← modal detail proyek
components/Sidebar.jsx           ← navigasi fixed; scroll links hanya di /
components/Background.jsx        ← blob gradient dekoratif (Server Component)
components/Footer.jsx            ← footer
components/admin/LoginForm.jsx       ← form login Supabase Auth
components/admin/AdminDashboard.jsx  ← shell dashboard + tab nav + logout
components/admin/AdminModal.jsx      ← modal popup reusable untuk semua form
components/admin/CatalogManager.jsx  ← CRUD catalog_themes + upload Storage
components/admin/ProjectsManager.jsx ← CRUD projects
components/admin/SkillsManager.jsx   ← CRUD skills per category
components/admin/ProfileManager.jsx  ← edit profile_content key-value
components/admin/SocialLinksManager.jsx ← CRUD social_links
middleware.js                    ← proteksi route /admin/*, redirect ke /admin/login
lib/supabase/client.js           ← browser client (createBrowserClient)
lib/supabase/server.js           ← server client (createServerClient + cookies)
supabase/schema.sql              ← DDL 5 tabel + RLS (sudah dijalankan)
supabase/seed.sql                ← seed data awal (sudah dijalankan)
next.config.mjs                  ← Next.js config (pakai .mjs bukan .js)
postcss.config.mjs               ← Tailwind CSS 4 via postcss
.env.local                       ← NEXT_PUBLIC_SUPABASE_URL + ANON_KEY (sudah diisi)
```

## Aturan Penting (Saat Ini)

- **Tidak ada TypeScript** — semua file `.jsx`, meskipun types sudah terpasang
- **Styling hanya Tailwind** — jangan tambah CSS manual
- **Animasi via Framer Motion** — komponen baru di grid wajib terima prop `itemVariants`
- **`"use client"`** — wajib di semua komponen yang pakai hooks atau Framer Motion
- **`react-icon` v1.0.0 jangan dipakai** — gunakan `react-icons` (plural)
- **Data fetch di Server Component** — `app/page.jsx` dan `app/catalog/page.jsx` fetch data, lalu pass sebagai props ke Client Component
- **catalog_themes.category** — varchar bebas (misal: "Toko Sepatu", "Wedding Organizer", "Online Shop"). Filter muncul otomatis dari data yang ada
- **Semua phase selesai** — project siap deploy ke Vercel (tambahkan env vars di Vercel Dashboard terlebih dahulu)

## Env Vars

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

> Tambahkan juga ke Vercel Dashboard → Project Settings → Environment Variables.
