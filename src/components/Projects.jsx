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
            desc: "HIS - Medical is a comprehensive web-based application designed to manage and streamline employee healthcare data and services within a company. It covers hospital information, medical ceiling management, inpatient and outpatient records, hospital billing, and detailed employee medical history. Providing a robust solution for managing corporate healthcare benefits."
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
                        <div className="flex justify-between items-start mb-6">
                            <a
                                href={project.link}
                                className="
                                        absolute bottom-5 right-5
                                        p-3 bg-white/10 backdrop-blur-md 
                                        rounded-2xl border border-white/10 
                                        opacity-100 md:opacity-0 
                                        md:group-hover:opacity-100 
                                        transition-all duration-500 
                                        transform translate-y-0 
                                        md:-translate-y-2 md:group-hover:translate-y-0
                                    "
                            >
                                <IoArrowRedoOutline size={20} />
                            </a>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Active Development</span>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Feb 2025</span>
                        </div>

                        <div>
                            <a href={project.link} className="text-3xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</a>
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