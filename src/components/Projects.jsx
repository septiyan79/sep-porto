import { motion } from 'framer-motion';
import { IoArrowRedoOutline, IoEye, IoLogoGithub, IoLogoGitlab } from 'react-icons/io5';

export default function Projects({ itemVariants }) {
    const projects = [
        {
            title: "Pixel Prigel",
            position: "Frontend Developer",
            tech: "React · Firebase · Firestore · TailwindCSS · API",
            color: "from-lime-600 to-orange-400",
            link: [
                { type: "github", url: "https://github.com/septiyan79/pixel-prigel" },
            ],
            desc: "An active development project built with real product considerations, designed as a landing page and lightweight marketplace for digital (printable) sticker products.",
            status: "Active Dev",
            periode: "JAN 2026 - PRESENT",
        },
        {
            title: "LPE Hub",
            position: "Frontend Developer",
            tech: "React · Firebase · Firestore · TailwindCSS · API",
            color: "from-purple-600 to-pink-500",
            link: [
                { type: "github", url: "https://github.com/septiyan79/lpe-hub.git" },
            ],
            desc: "An internal web application designed to support employee daily activities, reporting, and administrative requests within a company.",
            status: "Active Dev",
            periode: "JAN 2026 - PRESENT",
        },
        {
            title: "Clemira Gold",
            position: "Frontend Developer",
            tech: "React · Firebase · Firestore · Bootstrap · API",
            color: "from-cyan-600 to-rose-500",
            link: [],
            desc: "A web application for managing gold products and daily gold prices, built with React.js and Firebase. Features real-time data updates, role-based access control (admin & user), and structured product and transaction management.",
            status: "Active Dev",
            periode: "OCT 2025 - PRESENT",
        },
        {
            title: "HIS (HRCA Information System)",
            position: "Fullstack Developer (Monolithic App)",
            tech: "PHP · Codeigniter · Bootstrap · CSS · Javascript · MySQL · SQL Server",
            color: "from-emerald-600 to-teal-400",
            link: [
                { type: "gitlab", url: "https://gitlab.com/septyan_ep/his-live.git" },
            ],
            desc: "A comprehensive web-based application designed to manage and streamline employee healthcare data and services within a company.",
            status: "Complete",
            periode: "JAN 2023 - DEC 2024",
        },
        {
            title: "Kaizen Tournament Score System",
            position: "Fullstack Developer (Monolithic App)",
            tech: "PHP · Codeigniter · Bootstrap · CSS · Javascript · MySQL",
            color: "from-rose-600 to-emerald-400",
            link: [],
            desc: "A tournament management and scoring system designed to automate match result recording, point accumulation, and real-time ranking calculations. The system helps organizers reduce manual errors, enhance transparency, and accelerate the overall competition result recap process.",
            status: "Complete",
            periode: "SEP 2022 - DEC 2022",
        },
        {
            title: "Kaizen Filling System",
            position: "Fullstack Developer (Monolithic App)",
            tech: "PHP · HTML · Bootstrap · CSS · Javascript · MySQL",
            color: "from-yellow-600 to-green-400",
            link: [],
            desc: "A document storage management system designed to organize, archive, and track data in a structured and efficient manner. The system helps improve administrative organization, simplify document retrieval, and reduce the risk of data loss or duplication.",
            status: "Complete",
            periode: "JAN 2020 - JUN 2020",
        },
        {
            title: "E-Learning for Elementary School",
            position: "Fullstack Developer (Monolithic App)",
            tech: "Telegram Bot · PHP · Codeigniter · Bootstrap · CSS · Javascript · MySQL",
            color: "from-blue-600 to-teal-400",
            link: [],
            desc: "A Telegram Bot–based digital learning platform designed to support elementary school students in an interactive and easily accessible way. The system enables the distribution of learning materials, assignment management, and automated assessments directly through the Telegram application.",
            status: "Complete",
            periode: "OCT 2018 - DEC 2019",
        },
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
                    className="md:col-span-6 group relative overflow-hidden rounded-4xl border border-white/10 cursor-pointer"
                >
                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                    <div className="relative p-8 h-full flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">{project.periode}<br /><small className='text-emerald-500 text-[12px] uppercase tracking-widest'>{project.status}</small></span>
                            <div className='flex gap-3'>
                                {project.link.map((item) => (
                                    <a
                                        key={item.type}
                                        href={item.url}
                                        className="
                                        md:p-3 p-2 bg-white/10 backdrop-blur-md 
                                        rounded-2xl border border-white/10 hover:border-emerald-500
                                        opacity-100 md:opacity-0 
                                        md:group-hover:opacity-100 
                                        transition-all duration-500 
                                        transform translate-y-0 
                                        md:-translate-y-2 md:group-hover:translate-y-0
                                    "
                                    >
                                        {item.type === "github" && <IoLogoGithub size={20} />}
                                        {item.type === "gitlab" && <IoLogoGitlab size={20} />}
                                        {item.type === "web" && <IoArrowRedoOutline size={20} />}

                                    </a>
                                ))}
                                <a
                                    href="#"
                                    className="
                                        md:p-3 p-2 bg-white/10 backdrop-blur-md 
                                        rounded-2xl border border-white/10 hover:border-emerald-500
                                        opacity-100 md:opacity-0 
                                        md:group-hover:opacity-100 
                                        transition-all duration-500 
                                        transform translate-y-0 
                                        md:-translate-y-2 md:group-hover:translate-y-0
                                    "
                                >
                                    <IoEye size={20} />
                                </a>
                            </div>

                        </div>

                        <div>
                            <a
                                href={project.link}
                                className="inline-flex items-center gap-3 md:text-3xl text-2xl font-bold leading-tight mb-2 transition-colors group-hover:text-emerald-400"
                            >
                                {project.title}
                                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 border border-white/10 leading-none">
                                    {project.position}
                                </span>
                            </a>

                            <p className="text-gray-400 mb-4  max-w-4xl text-sm leading-relaxed">{project.desc}</p>
                            <div className="flex flex-wrap gap-3">
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