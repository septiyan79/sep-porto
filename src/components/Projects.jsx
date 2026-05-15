import { motion } from 'framer-motion';
import { IoOpenOutline, IoEye, IoLogoGithub, IoLogoGitlab } from 'react-icons/io5';

export default function Projects({ itemVariants, onSelect }) {
    const projects = [
        {
            title: "Wisel Portal",
            position: "Fullstack Developer (Modern Web Stack)",
            tech: "Next.js · PostgreSQL · NextAuth.js · TailwindCSS · Vercel",
            color: "from-violet-600 to-indigo-400",
            link: [
                { type: "github", url: "https://github.com/septiyan79/wisel-portal" },
                { type: "web", url: "https://wisel-portal.vercel.app/landing" },
            ],
            desc: "Fullstack Next.js app with SSR, PostgreSQL, NextAuth.js authentication, and Vercel CI/CD deployment.",
            detail: "A fullstack web application built with Next.js and PostgreSQL (Neon), implementing server-side rendering (SSR) to improve page load performance by ~30% and enhance SEO readiness. Features secure authentication with NextAuth.js, a structured relational database schema, and CI/CD deployment via Vercel reducing deployment time by ~50%.",
            status: "Active Dev",
            periode: "MAR 2026 - PRESENT",
        },
        {
            title: "Pixel Prigel",
            position: "Fullstack Developer (Serverless Architecture)",
            tech: "React · Firebase · Firestore · TailwindCSS · Cloudinary",
            color: "from-lime-600 to-orange-400",
            link: [
                { type: "github", url: "https://github.com/septiyan79/pixel-prigel" },
                { type: "web", url: "https://pixel-prigel.web.app/" },
            ],
            desc: "Serverless digital sticker marketplace built with React, Firebase, and Cloudinary for optimized image delivery.",
            detail: "A scalable digital product platform built with React.js, Firebase, and Firestore, transforming a static landing concept into a fully functional marketplace for digital sticker products. Integrated Cloudinary for image optimization reducing load time by ~30%. Improved content management efficiency by up to 80% through serverless architecture.",
            status: "Active Dev",
            periode: "JAN 2026 - PRESENT",
        },
        {
            title: "LPE Hub",
            position: "Fullstack Developer (Serverless Architecture)",
            tech: "React · Firebase · Firestore · TailwindCSS",
            color: "from-purple-600 to-pink-500",
            link: [
                { type: "github", url: "https://github.com/septiyan79/lpe-hub.git" },
            ],
            desc: "Internal tool digitizing workflows for activity planning, reporting, and employee administrative requests.",
            detail: "An internal operational web application (License & Permit Expatriate Hub) digitizing department workflows for activity planning, reporting, and employee administrative requests. Improved task tracking efficiency by ~60% and reduced manual documentation workload by ~50% through structured Firestore data management.",
            status: "Active Dev",
            periode: "JAN 2026 - PRESENT",
        },
        {
            title: "Clemira Gold",
            position: "Fullstack Developer (Serverless Architecture)",
            tech: "React · Firebase · Firestore · Bootstrap",
            color: "from-cyan-600 to-rose-500",
            link: [
                { type: "github", url: "https://github.com/septiyan79/clemira-gold" },
                { type: "web", url: "https://clemiragold-75f94.web.app/" },
            ],
            desc: "Real-time gold inventory and transaction system with role-based access and structured Firestore data models.",
            detail: "A fullstack real-time inventory and transaction management system for gold products, replacing manual tracking and reducing inventory discrepancies by ~45%. Features structured Firestore data models for products and transactions, role-based access control, and real-time synchronization improving operational visibility by ~40%.",
            status: "Active Dev",
            periode: "AUG 2025 - PRESENT",
        },
        // {
        //     title: "ERP Report Developer",
        //     position: "Data / Reporting Developer",
        //     tech: "Radius ERP · Crystal Reports · SQL Server · DBVisualizer",
        //     color: "from-amber-600 to-orange-400",
        //     link: [],
        //     desc: "Business reports and dashboards within the Radius ERP using Crystal Reports and optimized SQL Server queries.",
        //     detail: "Developed and maintained business reports within the Radius ERP system using Crystal Reports, supporting financial, operational, and management reporting needs. Designed and optimized SQL Server queries improving report generation efficiency by ~30% and enhancing data visibility for operational stakeholders.",
        //     status: "Complete",
        //     periode: "JAN 2023 - DEC 2023",
        // },
        {
            title: "HIS (HRCA Information System)",
            position: "Fullstack Web Developer (Monolithic App)",
            tech: "PHP · CodeIgniter · Bootstrap · SQL Server",
            color: "from-emerald-600 to-teal-400",
            link: [
                { type: "gitlab", url: "https://gitlab.com/septyan_ep/his-live.git" },
            ],
            desc: "Internal HRCA system digitizing employee health-related administrative workflows with PHP, CodeIgniter, and SQL Server.",
            detail: "A comprehensive internal HRCA Information System built with PHP (CodeIgniter) and SQL Server, digitizing administrative workflows and improving operational efficiency by ~50%. Implemented data management and reporting modules reducing manual record processing time by ~40% and optimizing database query performance by ~30%.",
            status: "Complete",
            periode: "JAN 2021 - DEC 2023",
        },
        {
            title: "Kaizen Tournament Score System",
            position: "Fullstack Web Developer (Monolithic App)",
            tech: "PHP · CodeIgniter · Bootstrap · MySQL",
            color: "from-rose-600 to-emerald-400",
            link: [],
            desc: "Tournament scoring system automating ranking calculations and reducing manual score errors by ~70%.",
            detail: "A web-based tournament scoring system automating match result recording, ranking calculations, and score management. Implemented backend logic to automatically calculate rankings, reducing manual calculation errors by ~70% and cutting score processing time by ~60% compared to manual methods.",
            status: "Complete",
            periode: "SEP 2022 - DEC 2022",
        },
        {
            title: "Kaizen Filing System",
            position: "Fullstack Web Developer (Monolithic App)",
            tech: "PHP · HTML · Bootstrap · CSS · JavaScript · MySQL",
            color: "from-yellow-600 to-green-400",
            link: [],
            desc: "Document filing system with search and categorization, improving internal document retrieval speed by ~50%.",
            detail: "A web-based document filing system enabling digital storage, categorization, and retrieval of internal documents. Implemented search and filtering features improving document retrieval speed by ~50% and digitizing manual filing processes to reduce the risk of data loss or duplication.",
            status: "Complete",
            periode: "JAN 2020 - JUN 2020",
        },
        {
            title: "E-Learning for Elementary School",
            position: "Fullstack Web Developer (Monolithic App)",
            tech: "Telegram Bot · PHP · CodeIgniter · Bootstrap · MySQL",
            color: "from-blue-600 to-teal-400",
            link: [],
            desc: "Telegram Bot–based e-learning platform for elementary students with materials, assignments, and automated assessments.",
            detail: "A Telegram Bot–based digital learning platform supporting elementary school students with course materials, assignment management, and automated assessments. Integrated Telegram Bot notifications improving teacher-student communication and enabling digital access to learning materials outside the classroom.",
            status: "Complete",
            periode: "OCT 2018 - DEC 2019",
        },
    ];

    return (
        <>
            <motion.div id="projects" className="md:col-span-6 flex items-center mt-8">
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
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
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
                                        {item.type === "web" && <IoOpenOutline size={20} />}
                                    </a>
                                ))}
                                <button
                                    onClick={() => onSelect(project)}
                                    className="
                                        md:p-3 p-2 bg-white/10 backdrop-blur-md
                                        rounded-2xl border border-white/10 hover:border-emerald-500
                                        opacity-100 md:opacity-0
                                        md:group-hover:opacity-100
                                        transition-all duration-500
                                        transform translate-y-0
                                        md:-translate-y-2 md:group-hover:translate-y-0
                                        cursor-pointer
                                    "
                                >
                                    <IoEye size={20} />
                                </button>
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