import { motion } from 'framer-motion';
import { IoArrowRedoOutline } from 'react-icons/io5';

export default function Projects({ itemVariants }) {
    const projects = [
        {
            title: "Pixel Prigel",
            tech: "React · Firebase · Firestore · TailwindCSS · API",
            color: "from-lime-600 to-orange-400",
            link: "https://github.com/septiyan79/pixel-prigel",
            desc: "Pixel Prigel is an active development project built with real product considerations, designed as a landing page and lightweight marketplace for digital (printable) sticker products."
        },
        {
            title: "LPE Hub",
            tech: "React · Firebase · Firestore · TailwindCSS · API",
            color: "from-purple-600 to-pink-500",
            link: "https://github.com/septiyan79/lpe-hub.git",
            desc: "LPE HUB is an internal web application designed to support employee daily activities, reporting, and administrative requests within a company."
        },
        {
            title: "HIS Medical",
            tech: "PHP · Codeigniter · Bootstrap · CSS · Javascript · MySQL · SQL Server",
            color: "from-emerald-600 to-teal-400",
            link: "https://gitlab.com/septyan_ep/his-live.git",
            desc: "HIS - Medical is a comprehensive web-based application designed to manage and streamline employee healthcare data and services within a company. It covers hospital information, medical ceiling management, inpatient and outpatient records, hospital billing, and detailed employee medical history. Built with PHP using the CodeIgniter framework and a Bootstrap front-end, the system is scalable, efficient, and user-friendly, providing a robust solution for managing corporate healthcare benefits."
        }
    ];

    return (
        <>
            <motion.div className="md:col-span-6 flex items-center mt-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Projects
                </span>
                <div className="flex-1 h-px bg-emerald-900 ml-4"></div>
            </motion.div>

            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className="md:col-span-6 group relative overflow-hidden rounded-4xl border border-white/10 aspect-16/10 md:aspect-auto cursor-pointer"
                >
                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative p-8 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <a href={project.link}
                               className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                                <IoArrowRedoOutline size={20} />
                            </a>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Featured Project</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-4 text-sm leading-relaxed">{project.desc}</p>
                            <div className="flex gap-3">
                                {project.tech.split(' · ').map(t => (
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