# Software Requirements Specification (SRS)
# sep-porto — Portfolio & Catalog Platform

**Tanggal:** Juni 2026  
**Status:** Disepakati, belum diimplementasikan  
**Pemilik:** Septiyan E.P.

---

## 1. Overview

### 1.1 Tujuan

Mengembangkan sep-porto dari portfolio statis menjadi platform dinamis dengan dua fungsi utama:
1. **Portfolio** — menampilkan profil, skill, dan proyek dengan konten yang dapat di-manage
2. **Catalog** — menampilkan tema web company profile yang ditawarkan ke klien UMKM

### 1.2 Kondisi Saat Ini (Pre-migration)

| Aspek | Kondisi Saat Ini |
|-------|-----------------|
| Framework | React 19 + Vite 7 |
| Konten | Hardcoded di dalam komponen `.jsx` |
| Halaman | Single page (`/`) |
| Admin | Tidak ada — edit langsung di kode |
| Deploy | Vercel |
| Rendering | CSR (Client-Side Rendering) |

### 1.3 Target Setelah Migrasi

| Aspek | Target |
|-------|--------|
| Framework | Next.js (App Router) |
| Konten | Disimpan di Supabase (PostgreSQL) |
| Halaman | `/`, `/catalog`, `/admin`, `/admin/login` |
| Admin | Halaman `/admin` dengan Supabase Auth |
| Deploy | Vercel (tetap) |
| Rendering | SSG/SSR via Next.js |

---

## 2. Halaman & Fitur

### 2.1 Halaman `/` — Portfolio

**Rendering:** SSG (Static Site Generation) — di-generate saat build, revalidate berkala  
**Data source:** Supabase

**Konten yang ditampilkan:**
- Hero section — nama, bio, badge role, lokasi, kutipan, social links
- Tech Stack — skill per kategori (frontend, backend, tools, practices)
- Projects — daftar proyek dengan kartu, link, dan modal detail
- Professional Profile — What I Bring, Professional Strength, Career Objective
- Footer

**Perubahan vs sekarang:** Tampilan visual tetap sama, hanya sumber data berubah dari hardcoded ke Supabase.

---

### 2.2 Halaman `/catalog` — Katalog Tema UMKM

**Rendering:** SSG + revalidation  
**Data source:** Supabase tabel `catalog_themes`

**Fitur:**
- Grid/list kartu tema web company profile
- Setiap kartu menampilkan:
  - Preview screenshot/mockup tema
  - Nama tema
  - Daftar fitur (list)
  - Tombol "Live Demo" → buka URL demo di tab baru
  - Tombol "Hubungi WA" → buka WhatsApp

**Tidak ada:** harga, checkout, payment gateway

---

### 2.3 Halaman `/admin/login` — Login Admin

**Rendering:** CSR  
**Auth:** Supabase Auth (email/password)

**Fitur:**
- Form login (email + password)
- Validasi & pesan error
- Redirect ke `/admin` setelah login berhasil
- Redirect ke `/admin/login` jika sudah login (tidak perlu login lagi)

---

### 2.4 Halaman `/admin` — Dashboard Admin

**Rendering:** CSR  
**Auth:** Protected route — redirect ke `/admin/login` jika belum terautentikasi

**Fitur per section:**

| Section | Operasi |
|---------|---------|
| Projects | Create, Read, Update, Delete + toggle `is_visible` + reorder |
| Skills | Create, Read, Update, Delete + reorder per kategori |
| Profile Content | Update value per key (bio, kutipan, career objective, dll.) |
| Social Links | Update URL per platform + toggle `is_active` |
| Catalog Themes | Create, Read, Update, Delete + upload preview image + toggle `is_active` |

**Upload gambar:** Form admin → upload ke Supabase Storage bucket `catalog-previews` → URL otomatis tersimpan ke field `preview_image_url`

---

## 3. Skema Database Supabase

### 3.1 Tabel `projects`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid (PK) | Auto-generated |
| `title` | varchar | Nama proyek |
| `position` | varchar | Role di proyek |
| `tech` | varchar | Tech stack, dipisah ` · ` |
| `color` | varchar | Tailwind gradient class (contoh: `from-violet-600 to-indigo-400`) |
| `links` | jsonb | Array `[{ type, url }]` |
| `desc` | text | Deskripsi singkat (tampil di kartu) |
| `detail` | text | Deskripsi lengkap (tampil di modal) |
| `status` | varchar | `"Active Dev"` atau `"Complete"` |
| `periode` | varchar | Contoh: `"MAR 2026 - PRESENT"` |
| `display_order` | integer | Urutan tampil |
| `is_visible` | boolean | Default `true` |
| `created_at` | timestamptz | Auto |

### 3.2 Tabel `skills`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid (PK) | Auto-generated |
| `category` | varchar | `frontend` / `backend` / `tools` / `practices` |
| `name` | varchar | Nama skill |
| `display_order` | integer | Urutan dalam kategori |
| `created_at` | timestamptz | Auto |

### 3.3 Tabel `profile_content`

Key-value store untuk semua konten teks profil.

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid (PK) | Auto-generated |
| `key` | varchar (unique) | Identifier konten |
| `value` | text | Isi konten |
| `updated_at` | timestamptz | Auto |

**Keys yang direncanakan:**

| Key | Konten |
|-----|--------|
| `hero_name` | Septiyan E.P. |
| `hero_bio` | Teks bio paragraf |
| `hero_quote` | Kutipan di Hero |
| `hero_location` | Jakarta, Indonesia |
| `hero_timezone` | UTC +7 |
| `hero_badge_role` | FULLSTACK DEVELOPER |
| `hero_badge_stack` | REACT · NEXT.JS · FIREBASE |
| `hero_badge_mindset` | BUSINESS-ORIENTED SYSTEM THINKER |
| `what_i_bring` | JSON array of strings |
| `professional_strength` | JSON array of strings |
| `career_objective` | JSON array of strings |

### 3.4 Tabel `social_links`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid (PK) | Auto-generated |
| `platform` | varchar | `github` / `linkedin` / `whatsapp` |
| `url` | varchar | URL lengkap |
| `icon_key` | varchar | Key untuk mapping ikon (contoh: `FaGithub`) |
| `is_active` | boolean | Default `true` |
| `display_order` | integer | Urutan tampil |

### 3.5 Tabel `catalog_themes`

| Kolom | Tipe | Keterangan |
|-------|------|------------|
| `id` | uuid (PK) | Auto-generated |
| `name` | varchar | Nama tema |
| `preview_image_url` | varchar | URL gambar dari Supabase Storage |
| `features` | text[] | Array fitur (contoh: `{Responsive, 5 Halaman, Form Kontak}`) |
| `demo_url` | varchar | URL live demo tema |
| `is_active` | boolean | Default `true` |
| `display_order` | integer | Urutan tampil |
| `created_at` | timestamptz | Auto |

---

## 4. Supabase Storage

**Bucket:** `catalog-previews`  
**Akses:** Public read (URL bisa diakses langsung tanpa auth)  
**Upload:** Hanya dari halaman `/admin` (authenticated)

---

## 5. Autentikasi & Keamanan

### 5.1 Supabase Auth

- Provider: Email/Password
- Satu akun admin (dibuat manual di Supabase Dashboard → Authentication)
- Session dikelola oleh Supabase SDK

### 5.2 Row Level Security (RLS)

Semua tabel mengaktifkan RLS dengan policy:

| Policy | Operasi | Kondisi |
|--------|---------|---------|
| Public read | SELECT | `true` (semua orang) |
| Admin write | INSERT, UPDATE, DELETE | `auth.uid() IS NOT NULL` |

### 5.3 Protected Route `/admin`

Middleware Next.js mengecek session Supabase — redirect ke `/admin/login` jika tidak ada session aktif.

---

## 6. Stack Teknis Target

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS 4 (tetap) |
| Animasi | Framer Motion (tetap) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| SDK | `@supabase/supabase-js`, `@supabase/ssr` |
| Deploy | Vercel (tetap) |

### 6.1 Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

---

## 7. Rendering Strategy

| Halaman | Strategy | Alasan |
|---------|----------|--------|
| `/` | SSG + revalidate | Konten portfolio jarang berubah, SEO penting |
| `/catalog` | SSG + revalidate | Sama seperti portfolio |
| `/admin/login` | CSR | Tidak perlu SEO, interaktif |
| `/admin` | CSR | Private, tidak perlu SEO |

---

## 8. Out of Scope

- Payment gateway / checkout
- Multi-user admin
- Blog / artikel
- Dark/light mode toggle
- Internasionalisasi (i18n)
- Analytics tracking
- Email service (form kontak fungsional)
