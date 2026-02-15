import { motion } from 'framer-motion';
import { IoCodeSlashOutline } from 'react-icons/io5';

export default function TechStack({ itemVariants }) {
    const feSkills = [
        'ReactJS',
        'Tailwind CSS',
        'Bootstrap',
        'Responsive UI Development',
        'Component-based architecture'
    ];

    const beSkills = [
        'Firebase Authentication',
        'Firestore (advanced data structuring & relational-like modeling)',
        'Cloudinary integration',
        'Basic REST API integration',
    ];

    const toolSkills = [
        'Git & GitHub',
        'Vite',
        'Environment configuration',
        'Firebase Hosting deployment',
    ];

    return (
        <>
            <motion.div
                variants={itemVariants}
                className="md:col-span-2 bg-white/5 border border-white/10 p-6 rounded-4xl backdrop-blur-xl h-full flex flex-col gap-4"
            >
                <div
                    className="md:col-span-1 bg-linear-to-br from-teal-500/10 to-blue-500/10 border border-white/10 rounded-4xl
                                flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all"
                >
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 m-3 font-bold flex items-center gap-2">
                        <IoCodeSlashOutline size={16} /> Technical Skills
                    </h3>
                </div>
                <div

                    className="md:col-span-1 bg-linear-to-br from-green-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl
                                flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all"
                >

                    <span className='text-xs mb-3 text-gray-500 flex flex-warp'>- Frontend Skills -</span>
                    <div className="flex flex-wrap gap-2">
                        {feSkills.map((tech, i) => (
                            <span key={tech} className="px-4 py-2 bg-white/5 rounded-xl text-sm border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    variants={itemVariants}
                    className="md:col-span-1 bg-linear-to-br from-lime-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl
                                flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all"
                >
                    <span className='text-xs mb-3 text-gray-500 flex flex-warp'>- Backend Skills -</span>
                    <div className="flex flex-wrap gap-2">
                        {beSkills.map((tech, i) => (
                            <span key={tech} className="px-4 py-2 bg-white/5 rounded-xl text-sm border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div
                    variants={itemVariants}
                    className="md:col-span-1 bg-linear-to-br from-rose-500/10 to-blue-500/10 border border-white/10 p-6 rounded-4xl
                                flex flex-col justify-center items-center text-left group hover:border-white/20 transition-all"
                >
                    <span className='text-xs mb-3 text-gray-500 flex flex-warp'>- Tools -</span>
                    <div className="flex flex-wrap gap-2">
                        {toolSkills.map((tech, i) => (
                            <span key={tech} className="px-4 py-2 bg-white/5 rounded-xl text-sm border border-white/5 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
}