'use client';

import { useEffect } from 'react';

export default function AdminModal({ title, onClose, children }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111] border border-white/10 rounded-3xl p-6 flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono text-emerald-500 uppercase tracking-widest">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all text-xs"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
