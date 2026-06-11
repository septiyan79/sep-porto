'use client';

import { motion } from 'framer-motion';
import { IoOpenOutline, IoEye, IoLogoGithub, IoLogoGitlab } from 'react-icons/io5';

export default function Projects({ itemVariants, onSelect, projects = [] }) {
  return (
    <>
      <motion.div id="projects" className="md:col-span-6 flex items-center mt-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Projects</span>
        <div className="flex-1 h-px bg-emerald-900 ml-4"></div>
      </motion.div>

      {projects.map((project, index) => (
        <motion.div
          key={project.id ?? index}
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="md:col-span-6 group relative overflow-hidden rounded-4xl border border-white/10 cursor-pointer"
        >
          <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
          <div className="relative p-8 h-full flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">
                {project.periode}<br />
                <small className='text-emerald-500 text-[12px] uppercase tracking-widest'>{project.status}</small>
              </span>
              <div className='flex gap-3'>
                {(project.links ?? []).map((item) => (
                  <a
                    key={item.type}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="md:p-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:-translate-y-2 md:group-hover:translate-y-0"
                  >
                    {item.type === "github" && <IoLogoGithub size={20} />}
                    {item.type === "gitlab" && <IoLogoGitlab size={20} />}
                    {item.type === "web" && <IoOpenOutline size={20} />}
                  </a>
                ))}
                <button
                  onClick={() => onSelect(project)}
                  className="md:p-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:border-emerald-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:-translate-y-2 md:group-hover:translate-y-0 cursor-pointer"
                >
                  <IoEye size={20} />
                </button>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-3 md:text-3xl text-2xl font-bold leading-tight mb-2 transition-colors group-hover:text-emerald-400">
                {project.title}
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/10 leading-none">
                  {project.position}
                </span>
              </span>
              <p className="text-gray-400 mb-4 max-w-4xl text-sm leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-3">
                {(project.tech ?? '').split(' · ').map(t => (
                  <span key={t} className="text-[10px] font-mono bg-white/5 px-2 py-1 rounded border border-white/5">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}
