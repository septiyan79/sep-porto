'use client';

import { motion } from 'framer-motion';

export default function Footer({ itemVariants }) {
  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-6 bg-white/5 border border-white/10 p-6 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-4 mt-8"
    >
      <p className="text-gray-500 text-sm font-mono">© 2026 / github.com/septiyan79</p>
      <div className="flex gap-8"></div>
    </motion.div>
  );
}
