# sep-porto — Claude Code Context

## Project

Personal portfolio + catalog platform milik **Septiyan E.P.** (Fullstack Developer, Jakarta).

## Status Migrasi

> **Codebase saat ini masih dalam kondisi pre-migration** (React + Vite + hardcoded).  
> Arsitektur target sudah disepakati — lihat `docs/srs.md` untuk detail lengkap.

| Aspek | Saat Ini (Codebase) | Target (SRS) |
|-------|---------------------|--------------|
| Framework | ✅ Next.js 15 App Router | — |
| Konten | Hardcoded di `.jsx` | Supabase (PostgreSQL) |
| Halaman | `/`, `/catalog` (placeholder), `/admin` (placeholder) | Semua halaman aktif |
| Admin | Placeholder, belum ada auth | Halaman `/admin` + Supabase Auth |
| Rendering | `"use client"` (CSR) | SSG/SSR via Next.js |

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
```

## Aturan Penting (Saat Ini)

- **Semua konten hardcoded** — tidak ada API, CMS, atau database (pre-migration)
- **Tidak ada TypeScript** — semua file `.jsx`, meskipun types sudah terpasang
- **Styling hanya Tailwind** — `App.css` kosong, jangan tambah CSS manual
- **Animasi via Framer Motion** — komponen baru di grid wajib terima prop `itemVariants`
- **State management minimal** — hanya `useState` di `Dashboard.jsx` untuk modal
- **`react-icon` v1.0.0 jangan dipakai** — gunakan `react-icons` (plural)

## Env Vars yang Dibutuhkan Setelah Migrasi

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
