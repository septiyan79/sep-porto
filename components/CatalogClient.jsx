'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import CatalogCard from './CatalogCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function CatalogClient({ themes, waLink }) {
  const [activeCategory, setActiveCategory] = useState('Semua');

  const categories = useMemo(() => {
    const cats = themes.map(t => t.category).filter(Boolean);
    return ['Semua', ...Array.from(new Set(cats))];
  }, [themes]);

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
        <motion.div variants={itemVariants} className="mb-10">
          <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-3">
            Web Theme Catalog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Tema Web untuk{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400">
              UMKM
            </span>
          </h1>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            Koleksi tema company profile siap pakai. Pilih tema, lihat demo, dan hubungi langsung via WhatsApp untuk pemesanan.
          </p>
        </motion.div>

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
      </motion.main>
    </div>
  );
}
