# Panduan Development

## Prasyarat

- Node.js (versi LTS terbaru direkomendasikan)
- npm atau yarn
- Git

## Perintah Tersedia

```bash
npm run dev        # Jalankan dev server (Vite, hot reload)
npm run build      # Build production ke folder dist/
npm run preview    # Preview hasil build production secara lokal
npm run lint       # Jalankan ESLint untuk semua file
```

## Cara Menjalankan Project

```bash
# 1. Install dependensi
npm install

# 2. Jalankan dev server
npm run dev
```

Dev server berjalan di `http://localhost:5173` (port default Vite).

## Struktur File Penting untuk Development

| File | Kapan dibuka |
|------|--------------|
| `src/pages/Dashboard.jsx` | Layout, state, animasi global |
| `src/components/Projects.jsx` | Tambah/edit proyek |
| `src/components/TechStack.jsx` | Tambah/edit skill |
| `src/components/Hero.jsx` | Edit bio, social links |
| `src/components/ProfessionalProfile.jsx` | Edit about me |
| `src/index.css` | Hanya berisi `@import "tailwindcss"` — jangan dimodifikasi |

## Konvensi Kode

### Komponen
- Semua komponen adalah **functional component**
- Export: **default export** (bukan named export), kecuali kasus khusus
- Nama file dan nama komponen menggunakan **PascalCase**
- Satu file = satu komponen utama

### Styling
- **Hanya gunakan Tailwind CSS utility classes** — tidak ada file CSS tambahan
- Jangan membuat CSS custom kecuali sangat diperlukan
- Ikuti pola card dan hover yang sudah ada (lihat [design-system.md](design-system.md))
- Gunakan `md:` prefix untuk styling desktop

### Animasi
- Gunakan Framer Motion untuk semua animasi komponen baru
- Komponen baru yang masuk ke grid Dashboard **harus menerima `itemVariants`** sebagai prop
- Gunakan `motion.div` dengan `variants={itemVariants}` di elemen root komponen

### Import Order (konvensi yang diikuti)
```jsx
// 1. React/hooks
import { useState, useEffect } from 'react';

// 2. Library eksternal
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';

// 3. Komponen lokal
import Background from '../components/Background';
```

### TypeScript
Project ini **belum menggunakan TypeScript** meskipun types sudah terpasang. Semua file berekstensi `.jsx`. Jangan ubah ke `.tsx` tanpa diskusi terlebih dahulu.

## Cara Menambah Komponen Baru

1. Buat file baru di `src/components/NamaKomponen.jsx`
2. Gunakan pola functional component dengan default export
3. Jika masuk ke grid layout, tambahkan `itemVariants` sebagai prop
4. Daftarkan dan render di `src/pages/Dashboard.jsx`
5. Tentukan `md:col-span-X` sesuai ukuran yang diinginkan di grid 6 kolom

**Template komponen baru:**
```jsx
import { motion } from 'framer-motion';

export default function NamaKomponen({ itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-X bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl"
    >
      {/* konten */}
    </motion.div>
  );
}
```

## ESLint

Konfigurasi ada di `eslint.config.js` (format flat config ESLint 9 — bukan `.eslintrc`).

Aturan utama:
- React hooks rules diaktifkan
- `no-unused-vars` mengabaikan variabel kapital (komponen React)
- Tidak ada aturan TypeScript (project masih JS)

```bash
npm run lint        # Cek semua masalah
```

## Catatan Khusus

- **`App.css` kosong** — jangan gunakan file ini. Semua styling via Tailwind.
- **`src/assets/react.svg`** — asset bawaan Vite yang tidak digunakan. Boleh dihapus jika perlu.
- **`.firebase/`** — folder cache dari deployment Firebase lama. Tidak berpengaruh ke development.
- **`.github/workflows/`** — kosong. Belum ada CI/CD workflow terkonfigurasi.
- **`react-icon` v1.0.0** — package lama yang terpasang di `package.json`. Jangan gunakan ini, gunakan `react-icons` (plural).

---

## Migrasi ke Next.js (Planned)

> Project akan dimigrasi ke Next.js App Router. Lihat [docs/srs.md](srs.md) untuk detail penuh.

### Env vars yang dibutuhkan setelah migrasi

Buat file `.env.local` di root project:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

File `.env.local` sudah ada di `.gitignore` — jangan commit file ini.

### Packages baru yang akan ditambahkan

```bash
npm install @supabase/supabase-js @supabase/ssr
```

Package Vite-specific yang akan dihapus saat migrasi:
- `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite`, `eslint-plugin-react-refresh`
