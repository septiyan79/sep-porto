import { motion } from 'framer-motion';
import { IoArrowRedoOutline } from 'react-icons/io5';

export default function Projects({ itemVariants }) {
    const projects = [
        {
            title: "Quantum Dashboard",
            tech: "React · Three.js",
            color: "from-blue-600 to-cyan-400",
            desc: "High-performance data visualization with 3D elements."
        },
        {
            title: "Neural Commerce",
            tech: "Next.js · Stripe",
            color: "from-purple-600 to-pink-500",
            desc: "AI-driven e-commerce platform with seamless checkout."
        },
        {
            title: "Eco-Track App",
            tech: "React Native",
            color: "from-emerald-600 to-teal-400",
            desc: "Mobile solution for carbon footprint monitoring."
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
                            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                                <IoArrowRedoOutline size={20} />
                            </div>
                            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold">Featured Project</span>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                            <p className="text-gray-400 mb-4 max-w-xs text-sm leading-relaxed">{project.desc}</p>
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