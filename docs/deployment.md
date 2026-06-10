# Deployment & Hosting

## Platform Aktif: Vercel

Project saat ini di-deploy di **Vercel** dengan konfigurasi auto-deploy dari branch `main`.

### Konfigurasi Vercel

File: `vercel.json`

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Semua path di-rewrite ke `/index.html` agar React Router bisa menangani routing di client-side (SPA behavior). Tanpa konfigurasi ini, refresh halaman di path selain `/` akan menghasilkan 404 di server.

### Cara Deploy

1. Push perubahan ke branch `main` di GitHub
2. Vercel otomatis mendeteksi push dan menjalankan build
3. Build command default Vercel: `npm run build` (menghasilkan folder `dist/`)
4. Output folder: `dist/`

Tidak diperlukan konfigurasi tambahan — Vercel mendeteksi Vite secara otomatis.

### Build Manual (jika diperlukan)

```bash
npm run build     # Buat folder dist/
npm run preview   # Preview hasil build di http://localhost:4173
```

---

## Histori Hosting

| Periode | Platform | Keterangan |
|---------|----------|------------|
| Jan–Apr 2026 | Firebase Hosting | Deployment awal |
| Mei 2026 | Vercel | Migrasi dari Firebase |

### Sisa Artefak Firebase

- Folder `.firebase/` masih ada di repository — berisi cache hosting Firebase
- File ini tidak berpengaruh ke Vercel dan tidak perlu dihapus kecuali ingin membersihkan repo
- Tidak ada `firebase.json` atau `.firebaserc` aktif yang digunakan

---

## HTML Entry Point

File: `index.html`

```html
<title>Septiyan E.P.</title>
<link rel="icon" type="image/png" href="/public/S.png" />
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

Favicon menggunakan `public/S.png`.

---

## Environment Variables (Saat Ini)

Saat ini **tidak ada environment variables** yang digunakan. Semua data hardcoded di komponen React.

---

## Planned: Setelah Migrasi ke Next.js

### Perubahan Konfigurasi Vercel

Setelah migrasi ke Next.js:
- File `vercel.json` dengan SPA rewrites **tidak diperlukan lagi** — Next.js mengelola routing sendiri
- Vercel mendeteksi Next.js secara otomatis dan menggunakan build command `next build`
- Output: `.next/` (bukan `dist/`)

### Environment Variables di Vercel

Tambahkan di Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Environment |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |

Variabel dengan prefix `NEXT_PUBLIC_` dapat diakses di client-side. Untuk server-only (tanpa prefix), tidak terekspos ke browser.

### File `.env.local` untuk Development Lokal

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

File ini sudah ada di `.gitignore` — jangan commit.
