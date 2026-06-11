'use client';

import { motion } from 'framer-motion';
import { IoCodeSlashOutline } from 'react-icons/io5';

const SkillBadge = ({ tech }) => (
  <span className="px-3 py-1 bg-white/5 rounded-xl text-[10px] border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default">
    {tech}
  </span>
);

export default function TechStack({ itemVariants, skills = {} }) {
  const { frontend = [], backend = [], tools = [], practices = [] } = skills;

  return (
    <motion.div
      variants={itemVariants}
      className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-4xl backdrop-blur-xl h-full flex flex-col gap-4"
    >
      <div className="bg-linear-to-br from-teal-500/10 to-blue-500/10 border border-white/10 rounded-4xl flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all">
        <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 m-3 font-bold flex items-center gap-2">
          <IoCodeSlashOutline size={16} /> Technical Skills
        </h3>
      </div>

      <div className="bg-linear-to-br from-green-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all">
        <span className='text-xs mb-3 text-gray-500'>- Frontend Skills -</span>
        <div className="flex flex-wrap gap-2">
          {frontend.map(tech => <SkillBadge key={tech} tech={tech} />)}
        </div>
      </div>

      <div className="bg-linear-to-br from-lime-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all">
        <span className='text-xs mb-3 text-gray-500'>- Backend Skills -</span>
        <div className="flex flex-wrap gap-2">
          {backend.map(tech => <SkillBadge key={tech} tech={tech} />)}
        </div>
      </div>

      <div className="bg-linear-to-br from-rose-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all">
        <span className='text-xs mb-3 text-gray-500'>- Tools & Environment -</span>
        <div className="flex flex-wrap gap-2">
          {tools.map(tech => <SkillBadge key={tech} tech={tech} />)}
        </div>
      </div>

      <div className="bg-linear-to-br from-violet-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all">
        <span className='text-xs mb-3 text-gray-500'>- Engineering Practices -</span>
        <div className="flex flex-wrap gap-2">
          {practices.map(tech => <SkillBadge key={tech} tech={tech} />)}
        </div>
      </div>
    </motion.div>
  );
}
