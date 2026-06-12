# Deployment & Hosting

## Platform: Vercel

Project di-deploy di **Vercel** dengan auto-deploy dari branch `main`.

---

## Konfigurasi Vercel (Wajib)

### Framework Preset

Di Vercel Dashboard → **Project Settings → General → Framework Preset** → pilih **Next.js**.

Jika preset salah (misal Vite atau Other), Vercel akan mencari folder `dist/` dan build gagal. Next.js output ke `.next/`, bukan `dist/`.

### Environment Variables

Di Vercel Dashboard → **Project Settings → Environment Variables**:

| Variable | Environment |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production, Preview, Development |

Variabel dengan prefix `NEXT_PUBLIC_` diinline ke client bundle saat build — wajib diisi sebelum build dijalankan.

---

## Cara Deploy

1. Push ke branch `main` di GitHub
2. Vercel otomatis mendeteksi push dan menjalankan `next build`
3. Output: `.next/` (dikelola Vercel otomatis)

Tidak ada `vercel.json` — tidak diperlukan karena Next.js App Router mengelola routing sendiri.

---

## Development Lokal

```bash
npm run dev      # Dev server di http://localhost:3000
npm run build    # Build produksi lokal
npm run start    # Jalankan hasil build lokal
```

File `.env.local` di root berisi env vars untuk development lokal — sudah ada di `.gitignore`, jangan di-commit.

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
```

---

## Catatan Build

- **`app/admin/page.jsx`** menggunakan `export const dynamic = 'force-dynamic'` — mencegah Next.js melakukan static prerender pada halaman yang butuh auth session.
- **ESLint** dikonfigurasi di `eslint.config.js` dengan `globals.node` (untuk `process.env`) dan rule `react-hooks/set-state-in-effect: off` (pola fetch data async dalam `useEffect` adalah valid).
- **`next.config.mjs`** — ekstensi `.mjs` wajib, bukan `.js`, karena file menggunakan ESM syntax.

---

## Histori Hosting

| Periode | Platform | Keterangan |
|---------|----------|------------|
| Jan–Apr 2026 | Firebase Hosting | Deployment awal (React + Vite) |
| Mei 2026 | Vercel | Migrasi ke Next.js |
| Jun 2026 | Vercel (Next.js) | Framework preset difix ke Next.js |
