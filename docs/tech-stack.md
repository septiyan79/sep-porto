# Tech Stack & Dependensi

> Bagian ini mencatat kondisi **saat ini (pre-migration)**. Untuk planned stack setelah migrasi ke Next.js + Supabase, lihat section [Planned Stack](#planned-stack-post-migration) di bawah.

---

## Current Stack (Pre-migration)

### Dependencies (Production)

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `react` | ^19.2.0 | UI library utama |
| `react-dom` | ^19.2.0 | Rendering React ke DOM |
| `react-router-dom` | ^7.13.0 | Client-side routing (SPA) |
| `tailwindcss` | ^4.1.18 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.18 | Plugin Tailwind untuk Vite (v4 integration) |
| `framer-motion` | ^12.34.0 | Animasi komponen React |
| `react-icons` | ^5.5.0 | Library icon (IoX, FaX, RiX dari berbagai set) |
| `react-icon` | ^1.0.0 | Package lama, kemungkinan tidak terpakai aktif |

## devDependencies

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `vite` | ^7.3.1 | Build tool dan dev server |
| `@vitejs/plugin-react` | ^5.1.1 | React Fast Refresh untuk Vite |
| `eslint` | ^9.39.1 | Linting JavaScript |
| `@eslint/js` | ^9.39.1 | Rule set ESLint untuk JS |
| `eslint-plugin-react-hooks` | ^7.0.1 | Linting rules untuk React Hooks |
| `eslint-plugin-react-refresh` | ^0.4.24 | Linting untuk Vite HMR |
| `globals` | ^16.5.0 | Definisi global variables (browser, node) |
| `@types/react` | ^19.2.7 | TypeScript types untuk React (terpasang tapi tidak aktif dipakai) |
| `@types/react-dom` | ^19.2.3 | TypeScript types untuk React DOM (terpasang tapi tidak aktif dipakai) |

## Catatan Penting

- **TypeScript**: Types sudah terpasang (`@types/react`, `@types/react-dom`) tapi project masih menggunakan **JSX murni** (`.jsx`), bukan `.tsx`. Jika ingin migrasi ke TypeScript, tidak perlu install ulang types.
- **`react-icon` v1.0.0**: Package ini berbeda dari `react-icons`. Kemungkinan package warisan yang belum dihapus. Semua icon aktif digunakan berasal dari `react-icons`.
- **Tailwind v4**: Menggunakan sintaks baru — tidak ada `tailwind.config.js`. Konfigurasi via plugin Vite (`@tailwindcss/vite`) dan import CSS `@import "tailwindcss"` di `index.css`.

## Icon Sets yang Digunakan

Dari library `react-icons`:

| Import prefix | Set | Digunakan di |
|---------------|-----|--------------|
| `Io5` (`IoX`) | Ionicons 5 | Projects.jsx, ProjectModal.jsx |
| `Fa` (`FaX`) | Font Awesome | Hero.jsx, ProjectModal.jsx |
| `Fa6` (`FaX`) | Font Awesome 6 | Hero.jsx |
| `Ri` (`RiX`) | Remix Icons | Sidebar.jsx |

## Konfigurasi Vite

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Tidak ada custom alias, proxy, atau konfigurasi tambahan.

## Konfigurasi ESLint

```js
// eslint.config.js — menggunakan flat config (ESLint 9)
```

- Format: ESLint 9 flat config (bukan `.eslintrc`)
- Rule aktif: JS recommended + react-hooks + react-refresh
- Globals: browser environment
- Custom rule: `no-unused-vars` mengabaikan variabel yang diawali huruf kapital (untuk komponen React)

---

## Planned Stack (Post-migration)

> Belum diimplementasikan. Lihat [docs/srs.md](srs.md) untuk konteks.

### Packages Baru

| Package | Kegunaan |
|---------|----------|
| `next` | Framework utama (menggantikan React + Vite) |
| `@supabase/supabase-js` | Supabase client — query database, auth, storage |
| `@supabase/ssr` | Helper Supabase untuk Next.js SSR/middleware |

### Packages yang Dihapus Saat Migrasi

| Package | Alasan |
|---------|--------|
| `vite` | Digantikan oleh Next.js build system |
| `@vitejs/plugin-react` | Tidak diperlukan di Next.js |
| `@tailwindcss/vite` | Digantikan oleh `@tailwindcss/postcss` atau config Next.js |
| `react-router-dom` | Digantikan oleh Next.js App Router |
| `eslint-plugin-react-refresh` | Spesifik untuk Vite HMR |

### Packages yang Tetap

`react`, `react-dom`, `tailwindcss`, `framer-motion`, `react-icons`

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```
