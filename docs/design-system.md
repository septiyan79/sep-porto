# Design System & Panduan Styling

## Prinsip Desain

- **Dark theme** eksklusif — tidak ada light mode
- **Glassmorphism** — efek kaca buram dengan `backdrop-blur`
- **Emerald accent** — warna hijau emerald sebagai warna utama interaktif
- **Minimal & clean** — tidak ada dekorasi berlebihan
- **Animasi halus** — transisi smooth via Framer Motion

---

## Palet Warna

### Base Colors

| Nama | Value | Penggunaan |
|------|-------|------------|
| Background utama | `#0a0a0a` | `bg-[#0a0a0a]` di Dashboard |
| Modal background | `#111` | `bg-[#111]` di ProjectModal |

### Accent Colors (Tailwind)

| Warna | Class | Penggunaan |
|-------|-------|------------|
| Emerald | `emerald-500` | Availability indicator, badge, hover border, link aktif |
| Emerald dim | `emerald-400` | Text hover, gradient text |
| Blue | `blue-400` | Gradient text nama di Hero |
| Cyan | `cyan-400` | Gradient text nama di Hero |
| Emerald dark | `emerald-900` | Garis dekoratif section separator, sidebar line |
| Purple dim | `purple-900/10` | Background blob kiri atas |
| Blue dim | `blue-900/10` | Background blob kanan bawah |

### Transparency Layers

| Class | Penggunaan |
|-------|------------|
| `bg-white/5` | Card background tipis |
| `bg-white/10` | Overlay button, badge lebih terang |
| `bg-white/20` | Hover state lebih terang |
| `border-white/10` | Border default semua card |
| `border-white/20` | Border hover state |
| `text-white/40` | Teks sangat redup (label kecil) |
| `bg-black/60` | Backdrop overlay modal |

---

## Pola Card (Glassmorphism)

```html
<!-- Card standar -->
<div class="bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl">

<!-- Card dengan gradient ringan -->
<div class="bg-linear-to-br from-indigo-500/10 to-blue-500/10 border border-white/10 p-8 rounded-4xl backdrop-blur-xl">
```

**Komponen wajib card glassmorphism:**
- `bg-white/5` atau gradient `from-X/10 to-Y/10`
- `border border-white/10`
- `rounded-4xl` (radius besar konsisten)
- `backdrop-blur-xl`

---

## Pola Hover

```html
<!-- Border hover emerald -->
<div class="border border-white/10 hover:border-emerald-500/30 transition-colors duration-500">

<!-- Background hover emerald -->
<span class="hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">

<!-- Scale hover (tombol) -->
<button class="hover:scale-105 active:scale-95 transition-all">

<!-- Lift hover (project card) -->
<div class="whileHover={{ y: -5 }}">  {/* Framer Motion */}
```

---

## Typography

| Elemen | Class |
|--------|-------|
| Judul utama | `text-5xl md:text-6xl font-bold tracking-tighter` |
| Judul section | `text-3xl font-bold` (dalam modal) |
| Section label | `text-xs font-bold uppercase tracking-[0.2em] text-white` |
| Sub-label | `text-xs uppercase tracking-[0.3em] text-white/40 font-bold` |
| Body text | `text-gray-400 text-sm leading-relaxed` |
| Badge/pill teks | `text-[10px] font-mono` |
| Font family | `font-sans` (default sistem, dideklarasikan di root div Dashboard) |

---

## Gradient Text

```html
<!-- Nama di Hero -->
<span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400">

<!-- Teks emerald biasa -->
<span class="text-emerald-500">
```

---

## Responsive Grid

```html
<!-- Layout grid utama -->
<main class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4">

<!-- Contoh distribusi kolom -->
<div class="md:col-span-4">  <!-- Hero: 4/6 kolom -->
<div class="md:col-span-2">  <!-- TechStack: 2/6 kolom -->
<div class="md:col-span-6">  <!-- Projects/Footer: full width -->
<div class="md:col-span-2">  <!-- ProfessionalProfile: 2/6 kolom (3 kartu) -->
```

**Breakpoint:** `md:` = 768px ke atas. Di bawah `md`, semua komponen full width (`grid-cols-1`).

---

## Animasi Framer Motion

### Pattern Dasar

```jsx
// Container (di Dashboard.jsx)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

// Item (diteruskan ke child via prop itemVariants)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};
```

### Cara Pakai di Komponen Baru

```jsx
// Komponen yang menerima itemVariants
export default function NamaKomponen({ itemVariants }) {
  return (
    <motion.div variants={itemVariants}>
      {/* konten */}
    </motion.div>
  );
}
```

### Modal Animation

```jsx
// Backdrop
initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}

// Modal box (spring)
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.95, opacity: 0 }}
transition={{ type: 'spring', stiffness: 300, damping: 25 }}
```

### Project Card Hover

```jsx
<motion.div whileHover={{ y: -5 }}>
```

---

## Warna Gradient Proyek

Setiap proyek memiliki warna gradient unik (field `color` di data proyek):

| Proyek | Gradient |
|--------|----------|
| Wisel Portal | `from-violet-600 to-indigo-400` |
| Pixel Prigel | `from-lime-600 to-orange-400` |
| LPE Hub | `from-purple-600 to-pink-500` |
| Clemira Gold | `from-cyan-600 to-rose-500` |
| HIS (HRCA) | `from-emerald-600 to-teal-400` |
| Kaizen Tournament | `from-rose-600 to-emerald-400` |
| Kaizen Filing | `from-yellow-600 to-green-400` |
| E-Learning | `from-blue-600 to-teal-400` |

Gradient digunakan sebagai: overlay background kartu (`opacity-10` → `opacity-20` saat hover) dan bar tipis di atas modal.

---

## Pola Border Rounded

Project ini secara konsisten menggunakan `rounded-4xl` untuk semua card. Untuk elemen lebih kecil (badge, tombol), menggunakan `rounded-xl`, `rounded-2xl`, atau `rounded-full`.

---

## Selection Color

```css
/* Warna highlight teks saat diseleksi user */
selection:bg-emerald-500/30
```

Dideklarasikan di root div `Dashboard.jsx`.
