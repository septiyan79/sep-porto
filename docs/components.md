# Katalog Komponen

Semua komponen adalah **functional component**. Komponen yang memakai hooks atau Framer Motion wajib `"use client"`. Data tidak lagi hardcoded — semua diterima via props dari Server Component di `app/`.

---

## DashboardClient

**File:** `components/DashboardClient.jsx` | `"use client"`

**Fungsi:** Orchestrator halaman `/` — layout, state modal, Framer Motion container.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `projects` | array | Data proyek dari Supabase |
| `skills` | object | `{ frontend, backend, tools, practices }` — array string per kategori |
| `profile` | object | Key-value dari tabel `profile_content` |
| `socialLinks` | array | Data social links dari Supabase |

**State:** `selectedProject` (object|null) — kontrol buka/tutup ProjectModal.

---

## CatalogClient

**File:** `components/CatalogClient.jsx` | `"use client"`

**Fungsi:** Layout halaman `/catalog` — header, filter category, grid kartu tema.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `themes` | array | Data catalog_themes dari Supabase |
| `waLink` | string | URL WhatsApp dari tabel social_links |

**State:** `activeCategory` (string) — filter kategori yang aktif, default `"Semua"`.

**Perilaku:**
- Daftar category button dibuat otomatis dari nilai unik `theme.category` yang ada di data
- Grid difilter secara client-side saat category berubah
- Jika tidak ada tema yang cocok (atau tabel kosong), tampil empty state dengan tombol WA

---

## CatalogCard

**File:** `components/CatalogCard.jsx` | `"use client"`

**Fungsi:** Card satu tema di halaman `/catalog`.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `theme` | object | Row dari tabel `catalog_themes` |
| `waLink` | string | URL WhatsApp base (misal `https://wa.me/628xxx`) |
| `itemVariants` | object | Framer Motion variants untuk animasi masuk |

**Konten card:**
- Preview image (fallback teks "No Preview" jika `preview_image_url` kosong)
- Nama tema + badge category
- Daftar fitur (dari `theme.features` text[])
- Tombol "Lihat Demo" (link ke `theme.demo_url`, hanya muncul jika ada)
- Tombol "Pesan" — WA dengan pesan otomatis menyebut nama tema

---

## Hero

**File:** `components/Hero.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `profile` | object | Key-value dari `profile_content` |
| `socialLinks` | array | Rows dari `social_links` |

**Keys `profile` yang digunakan:**
`hero_name`, `hero_availability`, `hero_badge_role`, `hero_badge_stack`, `hero_badge_mindset`, `hero_bio`, `hero_quote`, `hero_location`, `hero_timezone`

**Grid:** `md:col-span-4`

---

## TechStack

**File:** `components/TechStack.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants |
| `skills` | object | `{ frontend[], backend[], tools[], practices[] }` |

**Grid:** `md:col-span-2`

---

## Projects

**File:** `components/Projects.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants |
| `onSelect` | function | Callback saat user klik tombol view — menerima object project |
| `projects` | array | Rows dari tabel `projects` |

**Struktur tiap project (dari Supabase):**
```js
{
  id, title, position, tech, color,
  links: [{ type: "github"|"gitlab"|"web", url }],  // jsonb
  description,   // bukan 'desc' — reserved keyword PostgreSQL
  detail, status, periode, display_order, is_visible
}
```

**Grid:** `md:col-span-6` per kartu

---

## ProjectModal

**File:** `components/ProjectModal.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `project` | object | Data proyek (struktur sama seperti di Projects) |
| `onClose` | function | Callback untuk menutup modal |

**Perilaku:**
- Animasi scale + fade via `AnimatePresence`
- Klik backdrop → tutup; klik dalam modal → tidak tutup (`stopPropagation`)
- Tombol X + `Escape` key → tutup
- Gradient bar atas menggunakan `project.color`

---

## ProfessionalProfile

**File:** `components/ProfessionalProfile.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants |
| `profile` | object | Key-value dari `profile_content` |

**Keys `profile` yang digunakan:**
`what_i_bring` (array), `what_i_bring_subtitle`, `professional_strength` (array), `professional_strength_subtitle`, `professional_strength_footnote`, `career_objective` (array), `career_objective_subtitle`, `career_objective_footnote`

**Grid:** `md:col-span-2` per kartu (3 kartu = full 6 kolom)

---

## Sidebar

**File:** `components/Sidebar.jsx` | `"use client"`

**Props:** Tidak ada

**Perilaku:**
- Hanya tampil di `lg:` ke atas
- Scroll links (Hero, Projects, Profile) hanya muncul di halaman `/` — dicek via `usePathname()`
- Link `/catalog` selalu tampil, aktif saat di halaman `/catalog`
- Tooltip hover pada setiap ikon

---

## Background

**File:** `components/Background.jsx` | Server Component (tidak ada `"use client"`)

**Props:** Tidak ada — murni dekoratif, dua blur gradient `fixed -z-10`.

---

## Footer

**File:** `components/Footer.jsx` | `"use client"`

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants |

**Grid:** `md:col-span-6`
