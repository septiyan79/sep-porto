'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { RiSmartphoneFill, RiShieldCheckFill } from 'react-icons/ri';
import CatalogCard from './CatalogCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const INCLUDED = [
  'Konten diganti sesuai bisnis anda',
  'Bisa custom design lain sesuai imajinasi',
  'Integrasi tombol WhatsApp',
  'Free hosting',
  'Selesai 3–5 hari kerja',
  'Free 2x revisi',
  'Responsive mobile',
  'Free domain .com / .co.id selama 1 tahun',
];

const ORDER_STEPS = [
  { num: '01', label: 'Pilih Tema', desc: 'Browse katalog, pilih yang cocok untuk bisnis kamu' },
  { num: '02', label: 'Chat WhatsApp', desc: 'Hubungi langsung, diskusi kebutuhan kamu' },
  { num: '03', label: 'Kirim Konten', desc: 'Kirim foto, teks, dan info bisnis kamu' },
  { num: '04', label: 'Website Live', desc: 'Selesai dan online dalam 3–5 hari kerja' },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const METRICS = [
  { value: '12', label: 'Tema tersedia' },
  { value: '1 jutaan', label: 'Harga mulai dari' },
  { value: '3–5 hari', label: 'Selesai & online' },
];

const TRUST = [
  { icon: <RiSmartphoneFill size={13} />, label: 'Mobile-friendly' },
  { icon: <FaWhatsapp size={13} />, label: 'Konsultasi gratis' },
  { icon: <RiShieldCheckFill size={13} />, label: 'Free domain & hosting 1 tahun' },
];

export default function CatalogClient({ themes, waLink }) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = useMemo(() => {
    const cats = themes.map(t => t.category).filter(Boolean);
    return ['Semua', ...Array.from(new Set(cats))];
  }, [themes]);

  const rawNum = waLink !== '#' ? waLink.replace(/^https?:\/\/wa\.me\//, '') : '';
  const waPhone = rawNum
    ? `+${rawNum.slice(0, 2)} ${rawNum.slice(2, 5)}-${rawNum.slice(5, 9)}-${rawNum.slice(9)}`
    : null;

  const filtered = activeCategory === 'Semua'
    ? themes
    : themes.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-12 font-sans selection:bg-emerald-500/30">
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-4">
            Web Theme Catalog
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 max-w-3xl leading-tight">
            Website profesional untuk bisnis kamu —{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400">
              jadi dalam 3–5 hari
            </span>
          </h1>
          <p className="text-gray-400 leading-relaxed max-w-xl mb-8">
            Pilih dari 12 tema siap pakai untuk toko online, wedding organizer, atau personal brand. Sudah termasuk domain &amp; hosting 1 tahun.
          </p>

          {/* Metric Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-xs sm:max-w-sm mb-8">
            {METRICS.map((m) => (
              <div key={m.label} className="flex flex-col gap-1 px-3 py-2.5 rounded-2xl border border-white/10 bg-white/5">
                <span className="text-base sm:text-lg font-bold text-white leading-none">{m.value}</span>
                <span className="text-[10px] text-gray-500 leading-snug">{m.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-7">
            <button
              onClick={() => scrollTo('themes-section')}
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all"
            >
              Lihat semua tema
            </button>
            <button
              onClick={() => scrollTo('cara-order')}
              className="px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 text-gray-300 hover:text-white text-sm transition-all"
            >
              Cara order
            </button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {TRUST.map((t) => (
              <span key={t.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className="text-emerald-500/70">{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </motion.div>

        <div id="themes-section" />
        {/* Category Filter */}
        {categories.length > 1 && (
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono border transition-all ${
                  activeCategory === cat
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center py-32 border border-white/10 rounded-4xl bg-white/5"
          >
            <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-3">Coming Soon</p>
            <p className="text-gray-500 text-sm">Tema sedang disiapkan. Hubungi via WhatsApp untuk info lebih lanjut.</p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-mono hover:bg-emerald-500/20 transition-all"
            >
              Hubungi via WhatsApp
            </a>
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map(theme => (
              <CatalogCard
                key={theme.id}
                theme={theme}
                waLink={waLink}
                itemVariants={itemVariants}
              />
            ))}
          </motion.div>
        )}

        {/* Cara Order */}
        <motion.div id="cara-order" variants={itemVariants} className="mt-20">
          <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-3">Cara Order</p>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Semudah 4 Langkah</h2>
          <p className="text-gray-400 text-sm mb-8">
            Pilih tema → Chat WhatsApp → Kirim konten → Selesai dalam 3–5 hari kerja
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ORDER_STEPS.map((step) => (
              <div key={step.num} className="flex flex-col gap-3 p-5 rounded-3xl border border-white/10 bg-white/5">
                <span className="text-xs font-mono text-emerald-500">{step.num}</span>
                <p className="font-bold text-sm">{step.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Harga & Included */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1">
                <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-3">Harga</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold">1 jutaan</span>
                  <span className="text-gray-500 text-sm">/ tema</span>
                </div>
                <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-3">Sudah Termasuk</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                        <span className="text-emerald-400 text-[9px]">✓</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:w-64 p-5 rounded-3xl border border-yellow-500/20 bg-yellow-500/5 flex flex-col gap-2">
                <p className="text-xs font-mono text-yellow-400 tracking-widest uppercase">Info Revisi</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Revisi atau update konten setelah website selesai dikenakan biaya tambahan.
                </p>
                <p className="text-lg font-bold text-yellow-400">
                  Rp100.000<span className="text-sm font-normal text-gray-400"> / sesi</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Developer */}
        <motion.div variants={itemVariants} className="mt-12">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative shrink-0">
              <img
                src="/saya.png"
                alt="Septiyan E.P."
                className="w-40 h-48 md:w-48 md:h-56 object-cover object-top"
                style={{
                  maskImage: 'radial-gradient(ellipse 75% 80% at 50% 42%, black 12%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.12) 62%, transparent 76%)',
                  WebkitMaskImage: 'radial-gradient(ellipse 75% 80% at 50% 42%, black 12%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.12) 62%, transparent 76%)',
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 65% 65% at 50% 45%, rgba(16,185,129,0.09) 0%, transparent 70%)',
                }}
              />
            </div>
            <div>
              <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-2">Developer</p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Halo, saya Septiyan!</h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Developer dengan 5+ tahun pengalaman, siap bantu bisnis kamu tampil profesional di dunia online.
              </p>
            </div>
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        {waPhone && (
          <motion.div variants={itemVariants} className="mt-12 mb-8">
            <div className="rounded-4xl border border-emerald-500/20 bg-emerald-500/5 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-2">Hubungi Langsung</p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl md:text-3xl font-bold text-white hover:text-emerald-400 transition-colors"
                >
                  {waPhone}
                </a>
              </div>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all"
              >
                <FaWhatsapp size={16} />
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
