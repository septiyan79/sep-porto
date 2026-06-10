# sep-porto — Claude Code Context

## Project

Personal portfolio + catalog platform milik **Septiyan E.P.** (Fullstack Developer, Jakarta).

## Status Migrasi

> **Codebase saat ini masih dalam kondisi pre-migration** (React + Vite + hardcoded).  
> Arsitektur target sudah disepakati — lihat `docs/srs.md` untuk detail lengkap.

| Aspek | Saat Ini (Codebase) | Target (SRS) |
|-------|---------------------|--------------|
| Framework | React 19 + Vite 7 | Next.js App Router |
| Konten | Hardcoded di `.jsx` | Supabase (PostgreSQL) |
| Halaman | `/` saja | `/`, `/catalog`, `/admin`, `/admin/login` |
| Admin | Tidak ada | Halaman `/admin` + Supabase Auth |
| Rendering | CSR | SSG/SSR via Next.js |

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
src/pages/Dashboard.jsx          ← satu-satunya halaman, state modal ada di sini
src/components/Projects.jsx      ← data proyek hardcoded di sini
src/components/TechStack.jsx     ← data skill hardcoded di sini
src/components/Hero.jsx          ← bio, social links
src/components/ProfessionalProfile.jsx  ← about me (3 kartu)
src/components/ProjectModal.jsx  ← modal detail proyek
src/components/Sidebar.jsx       ← navigasi fixed desktop
src/components/Background.jsx    ← blob gradient dekoratif
src/components/Footer.jsx        ← footer
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
