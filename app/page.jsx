'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import Background from '../components/Background';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import TechStack from '../components/TechStack';
import Project from '../components/Projects';
import ProfessionalProfile from '../components/ProfessionalProfile';
import Footer from '../components/Footer';
import ProjectModal from '../components/ProjectModal';

const Dashboard = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-12 font-sans selection:bg-emerald-500/30">
      <Background />
      <Sidebar />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-4"
      >
        <Hero />
        <TechStack itemVariants={itemVariants} />
        <Project itemVariants={itemVariants} onSelect={setSelectedProject} />
        <ProfessionalProfile itemVariants={itemVariants} />
        <Footer itemVariants={itemVariants} />
      </motion.main>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
};

export default Dashboard;
