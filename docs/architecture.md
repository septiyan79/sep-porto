# Arsitektur Aplikasi

> Dokumen ini mencerminkan kondisi **saat ini** (Next.js 15 + Supabase, post-migration).

---

## Struktur Folder

```
sep-porto/
├── app/
│   ├── page.jsx               ← Server Component — fetch Supabase, render DashboardClient
│   ├── catalog/
│   │   └── page.jsx           ← Server Component — fetch catalog_themes, render CatalogClient
│   ├── admin/
│   │   ├── page.jsx           ← Placeholder (Phase 6)
│   │   └── login/
│   │       └── page.jsx       ← Placeholder (Phase 6)
│   ├── layout.jsx             ← Root layout (metadata, globals.css)
│   └── globals.css            ← @import "tailwindcss"
├── components/
│   ├── DashboardClient.jsx    ← "use client" — layout /, state modal, motion
│   ├── CatalogClient.jsx      ← "use client" — layout /catalog, filter category
│   ├── CatalogCard.jsx        ← "use client" — card tiap tema
│   ├── Hero.jsx               ← "use client" — kartu profil utama
│   ├── TechStack.jsx          ← "use client" — skill badges per kategori
│   ├── Projects.jsx           ← "use client" — daftar kartu proyek
│   ├── ProfessionalProfile.jsx ← "use client" — 3 kartu about
│   ├── ProjectModal.jsx       ← "use client" — modal detail proyek
│   ├── Sidebar.jsx            ← "use client" — navigasi fixed desktop
│   ├── Background.jsx         ← Server Component — blob gradient dekoratif
│   └── Footer.jsx             ← "use client" — footer
├── lib/
│   └── supabase/
│       ├── client.js          ← createBrowserClient (untuk Client Components)
│       └── server.js          ← createServerClient + cookies (untuk Server Components)
├── supabase/
│   ├── schema.sql             ← DDL 5 tabel + RLS (sudah dijalankan)
│   └── seed.sql               ← Data awal dari konten hardcoded (sudah dijalankan)
├── docs/                      ← Dokumentasi project
├── next.config.mjs            ← Next.js config (ESM, pakai .mjs)
├── postcss.config.mjs         ← Tailwind CSS 4 via @tailwindcss/postcss
├── eslint.config.js           ← ESLint 9 flat config
└── .env.local                 ← Env vars Supabase (tidak di-commit)
```

---

## Hierarki Komponen

### Halaman `/`

```
app/page.jsx (Server Component)
│   fetch: projects, skills, profile_content, social_links
│
└── DashboardClient (Client Component)
    ├── Background
    ├── Sidebar
    ├── motion.main (grid 6 kolom)
    │   ├── Hero               props: profile, socialLinks
    │   ├── TechStack          props: itemVariants, skills
    │   ├── Projects           props: itemVariants, onSelect, projects
    │   ├── ProfessionalProfile props: itemVariants, profile
    │   └── Footer             props: itemVariants
    └── ProjectModal           (conditional — muncul saat selectedProject !== null)
```

### Halaman `/catalog`

```
app/catalog/page.jsx (Server Component)
│   fetch: catalog_themes, social_links
│
└── Background
└── Sidebar
└── CatalogClient (Client Component)
    │   state: activeCategory
    └── CatalogCard[]          props: theme, waLink, itemVariants
```

---

## Data Flow

### Halaman `/`

```
Supabase DB
    │
    ├── projects        ──► app/page.jsx ──► DashboardClient ──► Projects.jsx
    ├── skills          ──► app/page.jsx ──► DashboardClient ──► TechStack.jsx
    ├── profile_content ──► app/page.jsx ──► DashboardClient ──► Hero.jsx
    │                                                          └► ProfessionalProfile.jsx
    └── social_links    ──► app/page.jsx ──► DashboardClient ──► Hero.jsx
```

### Halaman `/catalog`

```
Supabase DB
    │
    ├── catalog_themes ──► app/catalog/page.jsx ──► CatalogClient ──► CatalogCard[]
    └── social_links   ──► app/catalog/page.jsx ──► CatalogClient (waLink)
                                                              └──► CatalogCard (waLink)
```

---

## Supabase — 5 Tabel

| Tabel | Digunakan di | Kolom penting |
|-------|-------------|---------------|
| `projects` | `/` — Projects section | title, description, tech, color, links (jsonb), status, periode, is_visible, display_order |
| `skills` | `/` — TechStack section | name, category (frontend\|backend\|tools\|practices), display_order |
| `profile_content` | `/` — Hero + ProfessionalProfile | key (unique), value |
| `social_links` | `/` — Hero + `/catalog` — WA button | platform, url, icon_key, is_active |
| `catalog_themes` | `/catalog` | name, preview_image_url, features (text[]), demo_url, category, is_active, display_order |

RLS: public SELECT untuk semua tabel, authenticated ALL untuk semua tabel.

---

## State Management

Hanya React local state — tidak ada Redux, Zustand, atau Context API.

| Komponen | State | Kegunaan |
|----------|-------|----------|
| `DashboardClient` | `selectedProject` (object\|null) | Buka/tutup ProjectModal |
| `CatalogClient` | `activeCategory` (string) | Filter tampilan kartu per kategori |

---

## Layout Grid (Halaman `/`)

```
Mobile:  1 kolom  (grid-cols-1)
Desktop: 6 kolom  (md:grid-cols-6)
```

| Komponen | Desktop | Mobile |
|----------|---------|--------|
| Hero | `md:col-span-4` | full width |
| TechStack | `md:col-span-2` | full width |
| Projects (tiap kartu) | `md:col-span-6` | full width |
| ProfessionalProfile (tiap kartu) | `md:col-span-2` | full width |
| Footer | `md:col-span-6` | full width |

---

## Rendering Strategy

| Route | Strategy | Catatan |
|-------|----------|---------|
| `/` | Dynamic (server-rendered) | `export const revalidate = 3600` |
| `/catalog` | Dynamic (server-rendered) | `export const revalidate = 3600` |
| `/admin` | Placeholder static | Phase 6 |
| `/admin/login` | Placeholder static | Phase 6 |
