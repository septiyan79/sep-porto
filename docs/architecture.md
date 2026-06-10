# Arsitektur Aplikasi

> **Catatan:** Bagian ini menggambarkan kondisi codebase saat ini (React + Vite). Untuk arsitektur target setelah migrasi, lihat section [Target Architecture](#target-architecture-post-migration) di bawah dan [docs/srs.md](srs.md).

---

## Kondisi Saat Ini (Pre-migration)

### Struktur Folder

```
sep-porto/
├── src/
│   ├── components/              # Komponen UI yang dapat digunakan ulang
│   │   ├── Background.jsx       # Background blur gradient (dekoratif)
│   │   ├── Footer.jsx           # Footer halaman
│   │   ├── Hero.jsx             # Kartu profil utama
│   │   ├── ProfessionalProfile.jsx  # 3 kartu about/profile
│   │   ├── ProjectModal.jsx     # Modal detail proyek
│   │   ├── Projects.jsx         # Daftar kartu proyek + data proyek
│   │   ├── Sidebar.jsx          # Navigasi sidebar fixed (desktop only)
│   │   └── TechStack.jsx        # Tampilan skill teknis + data skill
│   ├── pages/
│   │   └── Dashboard.jsx        # Satu-satunya halaman — layout utama
│   ├── assets/
│   │   └── react.svg            # Asset bawaan Vite (tidak digunakan aktif)
│   ├── App.jsx                  # Konfigurasi routing React Router
│   ├── App.css                  # Kosong (tidak digunakan)
│   ├── main.jsx                 # Entry point React (ReactDOM.createRoot)
│   └── index.css                # Hanya: @import "tailwindcss"
├── public/
│   └── S.png                    # Favicon (102KB)
├── .github/workflows/           # Kosong (belum ada CI/CD workflow)
├── .firebase/                   # Cache Firebase lama (legacy, bisa diabaikan)
├── index.html                   # HTML entry point
├── vite.config.js               # Konfigurasi Vite + plugin
├── vercel.json                  # Konfigurasi deployment Vercel
├── eslint.config.js             # ESLint 9 flat config
├── package.json                 # Dependensi dan scripts
└── docs/                        # Dokumentasi project ini
```

## Hierarki Komponen

```
App.jsx (Router)
└── Dashboard.jsx (Page — satu-satunya halaman)
    ├── Background.jsx          (fixed, -z-10)
    ├── Sidebar.jsx             (fixed, z-50, hidden di mobile)
    ├── motion.main             (grid layout dengan Framer Motion)
    │   ├── Hero.jsx            (md:col-span-4)
    │   ├── TechStack.jsx       (md:col-span-2)
    │   ├── Projects.jsx        (md:col-span-6 per kartu)
    │   ├── ProfessionalProfile.jsx  (md:col-span-2 per kartu, 3 kartu)
    │   └── Footer.jsx          (md:col-span-6)
    └── ProjectModal.jsx        (conditional render, fixed overlay z-50)
```

## State Management

Project ini menggunakan **React local state only** — tidak ada Redux, Zustand, atau Context API.

Satu-satunya state yang ada:

```jsx
// src/pages/Dashboard.jsx
const [selectedProject, setSelectedProject] = useState(null);
```

**Alur state untuk ProjectModal:**
1. User klik tombol "View" di dalam `Projects.jsx` → callback `onSelect(project)` dipanggil
2. `Dashboard.jsx` menerima via prop `onSelect={setSelectedProject}` → state ter-update
3. `selectedProject !== null` → `ProjectModal` dirender dengan `project={selectedProject}`
4. User tutup modal → `onClose={() => setSelectedProject(null)}` → state kembali null

## Routing

Menggunakan **React Router DOM v7** dengan konfigurasi minimal:

```jsx
// src/App.jsx
<Routes>
  <Route path="/" element={<Dashboard />} />
</Routes>
```

Hanya satu route. Semua konten ada di halaman tunggal (`/`). File `vercel.json` mengkonfigurasi rewrite semua path ke `index.html` untuk mendukung SPA routing.

## Layout Grid

Dashboard menggunakan CSS Grid Tailwind:

```
Mobile:  1 kolom  (grid-cols-1)
Desktop: 6 kolom  (md:grid-cols-6)
```

Distribusi grid per komponen:

| Komponen | Desktop | Mobile |
|----------|---------|--------|
| Hero | `md:col-span-4` | full width |
| TechStack | `md:col-span-2` | full width |
| Projects (tiap kartu) | `md:col-span-6` | full width |
| ProfessionalProfile (tiap kartu) | `md:col-span-2` | full width |
| Footer | `md:col-span-6` | full width |

## Data Flow Diagram

```
Dashboard.jsx
    │
    ├── [state] selectedProject ────────────────────► ProjectModal
    │                                                  (project, onClose)
    │
    └── Projects.jsx
            │  (onSelect callback)
            └── [user click] ──► setSelectedProject(project)
```

## Pola Animasi (Framer Motion)

Animasi dikelola di `Dashboard.jsx` dan diteruskan ke child via prop `itemVariants`:

```jsx
// containerVariants — di Dashboard.jsx, untuk motion.main
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// itemVariants — diteruskan ke TechStack, Projects, ProfessionalProfile, Footer
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};
```

`Hero.jsx` tidak menerima `itemVariants` — animasinya mandiri dari `motion.div` langsung.

---

## Target Architecture (Post-migration)

> Status: **Disepakati, belum diimplementasikan.** Detail lengkap di [docs/srs.md](srs.md).

### Framework: Next.js App Router

```
sep-porto/ (after migration)
├── app/
│   ├── page.jsx               ← Halaman / (portfolio)
│   ├── catalog/
│   │   └── page.jsx           ← Halaman /catalog
│   ├── admin/
│   │   ├── page.jsx           ← Halaman /admin (dashboard, protected)
│   │   └── login/
│   │       └── page.jsx       ← Halaman /admin/login
│   └── layout.jsx             ← Root layout
├── components/                ← Komponen yang dimigrasi dari src/components/
├── lib/
│   └── supabase.js            ← Supabase client instance
├── middleware.js              ← Proteksi route /admin
└── ...
```

### Routing

| Route | Fungsi | Rendering |
|-------|--------|-----------|
| `/` | Portfolio | SSG + revalidate |
| `/catalog` | Katalog tema UMKM | SSG + revalidate |
| `/admin` | Dashboard admin (protected) | CSR |
| `/admin/login` | Login admin | CSR |

### Supabase Integration

5 tabel utama:

| Tabel | Digunakan di |
|-------|-------------|
| `projects` | Halaman `/` (Projects section) |
| `skills` | Halaman `/` (TechStack section) |
| `profile_content` | Halaman `/` (Hero, ProfessionalProfile) |
| `social_links` | Halaman `/` (Hero) |
| `catalog_themes` | Halaman `/catalog` |

**Data fetching pattern:**
- Halaman SSG: `fetch` di server component (Next.js App Router)
- Halaman admin: Supabase JS client di client component dengan auth session

### Autentikasi Admin

- Supabase Auth (email/password)
- Middleware Next.js mengecek session → redirect `/admin/login` jika tidak ada
- RLS aktif: public READ, authenticated CRUD
