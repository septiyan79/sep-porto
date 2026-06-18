'use client';

import { motion } from 'framer-motion';
import { IoOpenOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';

export default function CatalogCard({ theme, waLink, itemVariants }) {
  const waMessage = encodeURIComponent(`Halo, saya tertarik dengan tema "${theme.name}". Boleh info lebih lanjut?`);
  const waUrl = waLink !== '#' ? `${waLink}?text=${waMessage}` : '#';

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 backdrop-blur-xl flex flex-col hover:border-emerald-500/30 transition-colors duration-500"
    >
      {/* Preview Image */}
      <div className="relative w-full aspect-video bg-white/5 overflow-hidden rounded-t-4xl">
        {/* Price Badge */}
        <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/60 border border-emerald-500/50 backdrop-blur-sm">
          <span className="text-emerald-400 font-mono font-bold text-xs">Rp1,5jt</span>
        </div>
        {theme.preview_image_url ? (
          <img
            src={theme.preview_image_url}
            alt={theme.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-xs text-gray-600 font-mono uppercase tracking-widest">No Preview</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 gap-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight group-hover:text-emerald-400 transition-colors">
            {theme.name}
          </h2>
          {theme.category && (
            <span className="shrink-0 text-[10px] font-mono px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 whitespace-nowrap">
              {theme.category}
            </span>
          )}
        </div>

        {/* Features */}
        {theme.features?.length > 0 && (
          <ul className="flex flex-col gap-2">
            {theme.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          {theme.demo_url && (
            <a
              href={theme.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all text-xs font-mono"
            >
              <IoOpenOutline size={14} /> Lihat Demo
            </a>
          )}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all text-xs font-mono"
          >
            <FaWhatsapp size={14} /> Pesan
          </a>
        </div>
      </div>
    </motion.div>
  );
}
