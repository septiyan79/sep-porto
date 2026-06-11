# Tech Stack & Dependensi

> Kondisi saat ini — post-migration ke Next.js 15 + Supabase.

---

## Dependencies (Production)

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `next` | ^15.3.3 | Framework utama (App Router, SSR, SSG) |
| `react` | ^19.2.0 | UI library |
| `react-dom` | ^19.2.0 | Rendering React ke DOM |
| `@supabase/supabase-js` | ^2.108.1 | Supabase client — query DB, auth, storage |
| `@supabase/ssr` | ^0.12.0 | Helper Supabase untuk Next.js SSR + middleware |
| `tailwindcss` | ^4.1.18 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4.1.18 | Plugin Tailwind v4 untuk PostCSS (Next.js) |
| `framer-motion` | ^12.34.0 | Animasi komponen React |
| `react-icons` | ^5.5.0 | Library icon (IoX, FaX, RiX dari berbagai set) |

> **`react-icon` v1.0.0** — package lama, jangan dipakai. Gunakan `react-icons` (plural).

## devDependencies

| Package | Versi | Kegunaan |
|---------|-------|----------|
| `eslint` | ^9.39.1 | Linting JavaScript |
| `@eslint/js` | ^9.39.1 | Rule set ESLint untuk JS |
| `eslint-plugin-react-hooks` | ^7.0.1 | Linting rules untuk React Hooks |
| `globals` | ^16.5.0 | Definisi global variables |
| `@types/react` | ^19.2.7 | TypeScript types (terpasang, tidak aktif dipakai) |
| `@types/react-dom` | ^19.2.3 | TypeScript types (terpasang, tidak aktif dipakai) |

---

## Konfigurasi

### Next.js
```js
// next.config.mjs — pakai .mjs bukan .js (ESM syntax)
const nextConfig = {};
export default nextConfig;
```

### Tailwind CSS v4
```js
// postcss.config.mjs
export default { plugins: { '@tailwindcss/postcss': {} } }
```
```css
/* app/globals.css */
@import "tailwindcss";
```
Tidak ada `tailwind.config.js` — konfigurasi via PostCSS plugin.

---

## Icon Sets yang Digunakan

| Import prefix | Set | Digunakan di |
|---------------|-----|--------------|
| `Io5` (`IoX`) | Ionicons 5 | Projects.jsx, ProjectModal.jsx, TechStack.jsx |
| `Fa` (`FaX`) | Font Awesome | Hero.jsx, ProjectModal.jsx, CatalogCard.jsx |
| `Fa6` (`FaX`) | Font Awesome 6 | Hero.jsx |
| `Ri` (`RiX`) | Remix Icons | Sidebar.jsx |

---

## Supabase

- **Project URL:** dari `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`)
- **Anon Key:** dari `.env.local` (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
- **Client browser:** `lib/supabase/client.js` — `createBrowserClient` dari `@supabase/ssr`
- **Client server:** `lib/supabase/server.js` — `createServerClient` + `cookies()` dari `next/headers`
- **Storage bucket:** `catalog-previews` (public read) — untuk gambar preview catalog_themes

---

## Catatan Penting

- **Tidak ada TypeScript** — semua file `.jsx`. Types sudah terpasang jika ingin migrasi nanti.
- **`next.config.mjs`** — wajib `.mjs` bukan `.js`. Next.js load config via Node CJS `require()`, file `.mjs` memaksa ESM treatment.
- **Tailwind v4** — sintaks baru, tidak ada `tailwind.config.js`. Gunakan `@import "tailwindcss"` di CSS.
