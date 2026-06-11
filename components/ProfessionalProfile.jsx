'use client';

import { motion } from 'framer-motion';

const cardClass = "md:col-span-2 bg-linear-to-br from-indigo-500/10 to-blue-500/10 border border-white/10 rounded-4xl backdrop-blur-xl flex flex-col hover:border-emerald-500/30 transition-colors duration-500 group p-8";

const ListItem = ({ item }) => (
  <div className="flex items-start gap-3">
    <div className="w-2 h-2 mt-2 rounded-full bg-linear-to-r from-yellow-400 to-blue-500 shrink-0"></div>
    <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
  </div>
);

export default function ProfessionalProfile({ itemVariants, profile = {} }) {
  const whatIBring        = profile.what_i_bring ?? [];
  const profStrength      = profile.professional_strength ?? [];
  const careerObjective   = profile.career_objective ?? [];

  return (
    <>
      <motion.div id="professional-profile" className="md:col-span-6 flex items-center mt-5">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">Professional Profile</span>
        <div className="flex-1 h-px bg-emerald-900 ml-4"></div>
      </motion.div>

      <motion.div variants={itemVariants} className={cardClass}>
        <div className='mb-6'>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">What I Bring</h3>
          <small className='text-gray-500'>{profile.what_i_bring_subtitle}</small>
        </div>
        <div className="flex flex-col gap-4">
          {whatIBring.map(item => <ListItem key={item} item={item} />)}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className={`${cardClass} justify-between`}>
        <div className='mb-6'>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">Professional Strength</h3>
          <small className='text-gray-500'>{profile.professional_strength_subtitle}</small>
        </div>
        <div className="flex flex-col gap-4">
          {profStrength.map(item => <ListItem key={item} item={item} />)}
        </div>
        <small className='mt-3 text-gray-500'>{profile.professional_strength_footnote}</small>
      </motion.div>

      <motion.div variants={itemVariants} className={`${cardClass} justify-between`}>
        <div className='mb-6'>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">Career Objective</h3>
          <small className='mb-3 text-gray-500'>{profile.career_objective_subtitle}</small>
        </div>
        <div className="flex flex-col gap-4">
          {careerObjective.map(item => <ListItem key={item} item={item} />)}
        </div>
        <small className='mt-3 text-gray-500'>{profile.career_objective_footnote}</small>
      </motion.div>
    </>
  );
}
