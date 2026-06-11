'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

const iconMap = {
  FaGithub:     <FaGithub size={22} />,
  FaLinkedinIn: <FaLinkedinIn size={22} />,
  FaWhatsapp:   <FaWhatsapp size={22} />,
};

export default function Hero({ profile = {}, socialLinks = [] }) {
  const waLink = socialLinks.find(s => s.icon_key === 'FaWhatsapp')?.url ?? '#';

  return (
    <motion.div
      id="hero"
      className="md:col-span-4 bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-500 group"
    >
      <div>
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">
            {profile.hero_availability ?? 'Available for projects'}
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-none">
          I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400">
            {profile.hero_name ?? 'Septiyan E.P.'}
          </span>
        </h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">
            {profile.hero_badge_role ?? 'FULLSTACK DEVELOPER'}
          </span>
          <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">
            {profile.hero_badge_stack ?? 'REACT · NEXT.JS · FIREBASE'}
          </span>
          <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">
            {profile.hero_badge_mindset ?? 'BUSINESS-ORIENTED SYSTEM THINKER'}
          </span>
        </div>
        <p className="text-gray-400 text-lg leading-relaxed w-full font-thin whitespace-pre-line">
          {profile.hero_bio ?? ''}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-linear-to-br from-emerald-500/10 to-blue-500/10 border border-white/10 p-8 rounded-4xl flex flex-col justify-center items-center text-center group hover:border-white/20 transition-all mb-2">
          <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
            <FaLocationDot className="text-emerald-500" size={32} />
          </div>
          <p className="text-gray-300 font-medium">{profile.hero_location ?? 'Jakarta, Indonesia'}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{profile.hero_timezone ?? 'UTC +7'}</p>
        </div>
        <div className="bg-white/5 border border-white/10 p-8 rounded-4xl flex flex-col justify-center italic text-md text-gray-400 leading-relaxed mb-2">
          {profile.hero_quote ?? ''}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mt-12">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          Let's Talk <FaRegEnvelope size={18} />
        </a>
        <div className="flex gap-2">
          {socialLinks.map(link => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"
            >
              {iconMap[link.icon_key]}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
