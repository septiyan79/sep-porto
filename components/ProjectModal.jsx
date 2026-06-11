'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoLogoGithub, IoLogoGitlab, IoOpenOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-4xl"
        >
          <div className={`h-1 w-full bg-linear-to-r ${project.color} rounded-t-4xl`} />
          <div className="p-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <IoClose size={20} />
            </button>
            <div className="mb-6 pr-10">
              <h2 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h2>
              <span className="text-xs font-mono text-emerald-500 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {project.position}
              </span>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{project.periode}</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">{project.status}</span>
              </div>
            </div>
            <div className="h-px bg-white/10 mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-8">{project.detail}</p>
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Tech Stack</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tech.split(' · ').map((t) => (
                  <span key={t} className="px-3 py-1 bg-white/5 rounded-xl text-[10px] border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {project.link.map((item) => (
                <a
                  key={item.type}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all"
                >
                  {item.type === 'github' && <><IoLogoGithub size={16} /> GitHub</>}
                  {item.type === 'gitlab' && <><IoLogoGitlab size={16} /> GitLab</>}
                  {item.type === 'web' && <><IoOpenOutline size={16} /> Live Demo</>}
                </a>
              ))}
              <a
                href="https://wa.me/6281803986390"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-sm text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <FaWhatsapp size={16} /> Let's Talk
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
