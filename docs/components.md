# Katalog Komponen

## Overview

Semua komponen berbentuk **functional component** dengan **React Hooks**. Tidak ada class component.

---

## Background

**File:** `src/components/Background.jsx`

**Fungsi:** Efek background dekoratif — dua blur gradient bulat (purple dan blue) yang diletakkan di belakang semua konten.

**Props:** Tidak ada

**State:** Tidak ada

**Detail:**
- Posisi: `fixed`, `top-0 left-0`, `w-full h-full`, `-z-10` (di belakang semua konten)
- Dua elemen div gradient:
  - Kiri atas: `bg-purple-900/10 blur-[120px]`
  - Kanan bawah: `bg-blue-900/10 blur-[120px]`
- Murni dekoratif — tidak ada interaksi

---

## Sidebar

**File:** `src/components/Sidebar.jsx`

**Fungsi:** Navigasi scroll fixed di sisi kiri layar, hanya ditampilkan pada layar desktop (`lg:` ke atas).

**Props:** Tidak ada

**State:** Tidak ada

**Detail:**
- `hidden lg:block fixed left-10 bottom-0 z-50`
- 3 link navigasi dengan smooth scroll ke section ID:
  - `hero` → ikon `RiEmojiStickerFill`
  - `projects` → ikon `RiShiningFill`
  - `professional-profile` → ikon `RiRobot3Fill`
- Setiap ikon punya tooltip hover (label nama section)
- Garis vertikal dekoratif di bawah ikon via CSS `::after`
- `scrollTo(id)` menggunakan `document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })`

**Catatan:** Tidak menggunakan Framer Motion — murni Tailwind transition.

---

## Hero

**File:** `src/components/Hero.jsx`

**Fungsi:** Kartu profil utama — bagian pertama yang dilihat visitor.

**Props:** Tidak ada

**State:** Tidak ada

**Grid:** `md:col-span-4`

**Konten:**
- Indikator availability (ping animation `animate-ping`)
- Heading nama dengan gradient text
- Badge: `FULLSTACK DEVELOPER`, `REACT · NEXT.JS · FIREBASE`, `BUSINESS-ORIENTED SYSTEM THINKER`
- Bio teks 3 paragraf
- Kartu lokasi: Jakarta, Indonesia — UTC+7
- Kutipan: *"I don't just write code. I build end-to-end, business-driven systems."*
- Tombol "Let's Talk" (belum ada aksi email, hanya tampilan)
- Social links: GitHub, LinkedIn, WhatsApp

**Link sosial:**
- GitHub: `https://github.com/septiyan79`
- LinkedIn: `https://www.linkedin.com/in/septiyan-eka-5b59a0257`
- WhatsApp: `https://wa.me/6281803986390`

**Catatan:** `Hero` adalah satu-satunya komponen yang tidak menerima `itemVariants` dari `Dashboard`. Animasinya menggunakan `motion.div` langsung (tanpa variants prop).

---

## TechStack

**File:** `src/components/TechStack.jsx`

**Fungsi:** Menampilkan keahlian teknis dalam 4 kategori sebagai badge/pill.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants untuk animasi masuk |

**State:** Tidak ada

**Grid:** `md:col-span-2`

**Data (hardcoded di dalam komponen):**

- `feSkills` — 12 Frontend skills
- `beSkills` — 11 Backend skills
- `toolSkills` — 8 Tools & Environment skills
- `practiceSkills` — 5 Engineering Practices

Untuk cara update, lihat [content-guide.md](content-guide.md).

---

## Projects

**File:** `src/components/Projects.jsx`

**Fungsi:** Menampilkan daftar proyek sebagai kartu dengan animasi hover, dan mengelola tampilan link + tombol view.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants untuk animasi masuk |
| `onSelect` | function | Callback saat user klik tombol view — menerima object `project` |

**State:** Tidak ada (state dikelola oleh `Dashboard.jsx`)

**Grid:** `md:col-span-6` (full width) untuk setiap kartu proyek

**Data proyek (hardcoded):**

Setiap item di array `projects` memiliki struktur:

```js
{
  title: string,       // Nama proyek
  position: string,    // Role di proyek
  tech: string,        // Tech stack (dipisah ' · ')
  color: string,       // Gradient Tailwind (contoh: "from-violet-600 to-indigo-400")
  link: [              // Array link (bisa kosong [])
    { type: "github" | "gitlab" | "web", url: string }
  ],
  desc: string,        // Deskripsi singkat (tampil di kartu)
  detail: string,      // Deskripsi panjang (tampil di modal)
  status: string,      // "Active Dev" | "Complete"
  periode: string,     // Contoh: "MAR 2026 - PRESENT"
}
```

**Perilaku link:**
- Link button (`github`, `gitlab`, `web`) muncul smooth saat hover di desktop, selalu tampil di mobile
- Tombol view (ikon `IoEye`) memanggil `onSelect(project)`
- Link di dalam kartu menggunakan `e.stopPropagation()` agar tidak memicu hal lain

---

## ProjectModal

**File:** `src/components/ProjectModal.jsx`

**Fungsi:** Overlay modal yang menampilkan detail lengkap sebuah proyek.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `project` | object | Data proyek (struktur sama dengan item di `Projects.jsx`) |
| `onClose` | function | Callback untuk menutup modal |

**State:** Tidak ada

**Perilaku:**
- Muncul dengan animasi scale + fade (Framer Motion `AnimatePresence`)
- Klik backdrop (area luar modal) → `onClose()`
- Klik dalam modal → `e.stopPropagation()` (tidak menutup)
- Tombol `X` (kanan atas) → `onClose()`
- Tekan `Escape` → `onClose()` (via `useEffect` keydown listener)
- Gradient bar tipis di atas modal menggunakan `project.color`

**Konten modal:**
- Judul, position, periode, status
- Deskripsi panjang (`project.detail`)
- Tech stack pills (dari `project.tech.split(' · ')`)
- Link buttons (GitHub/GitLab/Live Demo) + tombol "Let's Talk" WhatsApp

---

## ProfessionalProfile

**File:** `src/components/ProfessionalProfile.jsx`

**Fungsi:** Menampilkan 3 kartu "about me" secara paralel.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants untuk animasi masuk |

**State:** Tidak ada

**Grid:** `md:col-span-2` per kartu (3 kartu = full 6 kolom)

**3 Kartu:**

1. **What I Bring** — 5 poin keahlian yang ditawarkan
2. **Professional Strength** — 5 poin kekuatan profesional
3. **Career Objective** — 5 tipe kesempatan yang sedang dicari

Semua data hardcoded sebagai array string yang di-map menjadi list item dengan dot gradient.

---

## Footer

**File:** `src/components/Footer.jsx`

**Fungsi:** Footer halaman dengan copyright dan link GitHub.

**Props:**

| Prop | Tipe | Keterangan |
|------|------|------------|
| `itemVariants` | object | Framer Motion variants untuk animasi masuk |

**State:** Tidak ada

**Grid:** `md:col-span-6`

**Konten:**
- Copyright: `© 2026 / github.com/septiyan79`
- Terdapat 3 link yang dikomentari: Resume, Work History, Find Me

---

## Dashboard (Page)

**File:** `src/pages/Dashboard.jsx`

**Fungsi:** Satu-satunya halaman aplikasi. Mengorkestrasi layout, animasi, dan state modal.

**Props:** Tidak ada (dipanggil langsung oleh Router)

**State:**

| State | Tipe | Default | Keterangan |
|-------|------|---------|------------|
| `selectedProject` | object \| null | `null` | Proyek yang sedang ditampilkan di modal |

**Yang dilakukan:**
1. Mendefinisikan `containerVariants` dan `itemVariants` untuk Framer Motion
2. Merender semua komponen dalam `motion.main` dengan grid layout
3. Mengelola buka/tutup `ProjectModal` via `selectedProject` state
4. Meneruskan `itemVariants` ke komponen yang membutuhkan
5. Meneruskan `setSelectedProject` sebagai `onSelect` ke `Projects`
