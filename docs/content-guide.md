# Panduan Update Konten

> **Status migrasi:** Konten saat ini masih hardcoded di komponen React.  
> Setelah migrasi ke Next.js + Supabase, konten akan dikelola via halaman `/admin`.  
> Lihat section [Setelah Migrasi](#setelah-migrasi-manage-via-admin) di bawah untuk panduan target.

---

## Pre-migration (Kondisi Saat Ini)

Semua konten portfolio di-hardcode langsung di dalam komponen React. Edit langsung di file `.jsx`.

---

## Update Proyek (Projects Section)

**File:** `src/components/Projects.jsx`

Array `projects` di baris 5 berisi semua data proyek. Setiap objek proyek memiliki struktur:

```js
{
  title: "Nama Proyek",
  position: "Role yang dijalankan",
  tech: "Tech1 · Tech2 · Tech3",    // Dipisah ' · ' (spasi-titik-spasi)
  color: "from-X-600 to-Y-400",     // Gradient Tailwind (untuk kartu dan modal)
  link: [                            // Bisa array kosong []
    { type: "github", url: "https://github.com/..." },
    { type: "gitlab", url: "https://gitlab.com/..." },
    { type: "web", url: "https://..." },
  ],
  desc: "Deskripsi singkat (tampil di kartu)",
  detail: "Deskripsi lengkap (tampil di modal detail)",
  status: "Active Dev",              // atau "Complete"
  periode: "MMM YYYY - PRESENT",    // atau "MMM YYYY - MMM YYYY"
}
```

### Menambah Proyek Baru

Tambahkan objek baru ke dalam array `projects` sebelum closing `]`. Posisi array menentukan urutan tampilan di halaman.

### Menyembunyikan Proyek

Komentari seluruh objek proyek:
```js
// {
//   title: "Nama Proyek",
//   ...
// },
```

> Contoh: ERP Report Developer sudah dikomentari di baris 61–73.

### Memilih Warna Gradient

Gunakan kombinasi warna Tailwind yang belum dipakai proyek lain. Lihat tabel warna di [design-system.md](design-system.md#warna-gradient-proyek).

---

## Update Skill Teknis (TechStack Section)

**File:** `src/components/TechStack.jsx`

4 array skill di baris 5–51:

| Array | Kategori |
|-------|----------|
| `feSkills` | Frontend Skills |
| `beSkills` | Backend Skills |
| `toolSkills` | Tools & Environment |
| `practiceSkills` | Engineering Practices |

### Menambah Skill

Tambahkan string baru ke array yang sesuai:
```js
const feSkills = [
  'React.js',
  'Next.js (App Router)',
  'Skill Baru',     // tambahkan di sini
  ...
];
```

### Menghapus Skill

Hapus string dari array.

---

## Update Bio / Profil (Hero Section)

**File:** `src/components/Hero.jsx`

| Konten | Lokasi di file |
|--------|---------------|
| Nama | Baris ~21: `I'm <span>Septiyan E.P.</span>` |
| Badge role | Baris ~23–27: 3 `<span>` badge |
| Teks bio | Baris ~28–34: Paragraf teks |
| Kota/lokasi | Baris ~45: `Jakarta, Indonesia` dan `UTC +7` |
| Kutipan | Baris ~53–54: Teks italic |
| Link WhatsApp | Baris ~65: `href="https://wa.me/..."` |
| Link GitHub | Baris ~63: `href="https://github.com/..."` |
| Link LinkedIn | Baris ~64: `href="https://www.linkedin.com/..."` |

---

## Update Professional Profile

**File:** `src/components/ProfessionalProfile.jsx`

3 kartu, masing-masing berisi array string yang dirender sebagai list item:

| Kartu | Array di kode |
|-------|--------------|
| What I Bring | Array `[...]` di dalam kartu pertama (baris ~29–35) |
| Professional Strength | Array `[...]` di dalam kartu kedua (baris ~62–68) |
| Career Objective | Array `[...]` di dalam kartu ketiga (baris ~95–101) |

### Cara Update

Ubah string di dalam array:
```jsx
{[
  "Item lama",
  "Item baru yang ditambahkan",
  "Item lainnya",
].map((item) => ( ... ))}
```

---

## Update Footer

**File:** `src/components/Footer.jsx`

| Konten | Lokasi |
|--------|--------|
| Copyright text | Baris ~11: `© 2026 / github.com/septiyan79` |
| Link tersembunyi | Baris ~13–15: Resume, Work History, Find Me (dikomentari) |

---

## Update Sidebar Navigation

**File:** `src/components/Sidebar.jsx`

Array `links` di baris 7–11 mendefinisikan navigasi:

```js
const links = [
  { icon: <RiEmojiStickerFill size={25} />, target: 'hero', label: 'Hero' },
  { icon: <RiShiningFill size={25} />, target: 'projects', label: 'Projects' },
  { icon: <RiRobot3Fill size={25} />, target: 'professional-profile', label: 'Profile' },
];
```

`target` harus sesuai dengan atribut `id` pada elemen section di halaman:
- `id="hero"` → di `Hero.jsx`
- `id="projects"` → di `Projects.jsx`
- `id="professional-profile"` → di `ProfessionalProfile.jsx`

---

## Update Favicon & Title

| Item | File |
|------|------|
| Title browser | `index.html` baris 7: `<title>Septiyan E.P.</title>` |
| Favicon | Ganti file `public/S.png` (format PNG, link di `index.html` baris 6) |

---

## Setelah Migrasi — Manage via /admin

> Berlaku setelah migrasi ke Next.js + Supabase selesai.

Semua konten dikelola melalui halaman `/admin` (login dengan Supabase Auth). Tidak perlu menyentuh kode.

### Manage Projects

Login ke `/admin` → section **Projects**. Field yang tersedia:

| Field | Keterangan |
|-------|------------|
| `title` | Nama proyek |
| `position` | Role di proyek |
| `tech` | Tech stack, pisahkan dengan ` · ` |
| `color` | Gradient Tailwind (contoh: `from-violet-600 to-indigo-400`) |
| `links` | JSON array: `[{"type":"github","url":"..."}]` |
| `desc` | Deskripsi singkat untuk kartu |
| `detail` | Deskripsi panjang untuk modal |
| `status` | `Active Dev` atau `Complete` |
| `periode` | Contoh: `MAR 2026 - PRESENT` |
| `display_order` | Urutan tampil (angka kecil = tampil lebih atas) |
| `is_visible` | Toggle tampil/sembunyikan proyek |

### Manage Skills

Login ke `/admin` → section **Skills**. Pilih kategori: `frontend`, `backend`, `tools`, atau `practices`. Tambah/hapus/reorder skill per kategori.

### Manage Profile Content

Login ke `/admin` → section **Profile**. Update `value` dari key yang tersedia:

| Key | Konten |
|-----|--------|
| `hero_bio` | Teks bio di Hero |
| `hero_quote` | Kutipan di Hero |
| `what_i_bring` | JSON array string untuk kartu "What I Bring" |
| `professional_strength` | JSON array string untuk kartu "Professional Strength" |
| `career_objective` | JSON array string untuk kartu "Career Objective" |

### Manage Social Links

Login ke `/admin` → section **Social Links**. Update URL per platform, toggle aktif/nonaktif.

### Manage Catalog Themes

Login ke `/admin` → section **Catalog**. Field yang tersedia:

| Field | Keterangan |
|-------|------------|
| `name` | Nama tema |
| `preview_image` | Upload file gambar → otomatis tersimpan ke Supabase Storage |
| `features` | Daftar fitur (tambah per baris) |
| `demo_url` | URL live demo |
| `is_active` | Toggle tampil/sembunyikan di halaman `/catalog` |
| `display_order` | Urutan tampil |
