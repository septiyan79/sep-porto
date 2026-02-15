import { motion } from 'framer-motion';

export default function ProfessionalProfile({ itemVariants }) {

    return (
        <>
            <motion.div className="md:col-span-6 flex items-center mt-5">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Professional Profile
                </span>
                <div className="flex-1 h-px bg-emerald-900 ml-4"></div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="md:col-span-2
                    bg-linear-to-br from-indigo-500/10 to-blue-500/10 border border-white/10
                    rounded-4xl backdrop-blur-xl flex flex-col 
                    hover:border-emerald-500/30 transition-colors duration-500 group p-8"
            >
                <div className='mb-6'>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">
                        What I Bring
                    </h3>
                    <small className='text-gray-500'>Coming from a non-traditional tech background gives me a unique advantage:</small>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        "Clean and maintainable React architecture",
                        "Strong Firestore data modeling",
                        "Role-based authentication implementation",
                        "Business flow translated into structured digital systems",
                        "Production-oriented mindset"
                    ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-linear-to-r from-yellow-400 to-blue-500"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="md:col-span-2
                    bg-linear-to-br from-indigo-500/10 to-blue-500/10 border border-white/10
                    rounded-4xl backdrop-blur-xl flex flex-col justify-between 
                    hover:border-emerald-500/30 transition-colors duration-500 group p-8"
            >

                <div className='mb-6'>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">
                        Professional Strength
                    </h3>
                    <small className='text-gray-500'>Coming from a non-traditional tech background gives me a unique advantage:</small>
                </div>

                <div className="flex flex-col gap-4">
                    {[
                        "Strong business awareness",
                        "Risk-oriented thinking",
                        "Structured documentation habits",
                        "Cross-functional communication experience",
                        "Long-term system perspective"
                    ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-linear-to-r from-yellow-400 to-blue-500"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <small className='mt-3 text-gray-500'>I understand that software is not just about features — it is about stability, scalability, and business impact.</small>
            </motion.div>

            <motion.div
                variants={itemVariants}
                className="md:col-span-2
                    bg-linear-to-br from-indigo-500/10 to-blue-500/10 border border-white/10
                    rounded-4xl backdrop-blur-xl flex flex-col justify-between 
                    hover:border-emerald-500/30 transition-colors duration-500 group p-8"
            >
                <div className='mb-6'>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold flex items-center gap-2 mb-2.5">
                        Career Objective
                    </h3>
                    <small className='mb-3 text-gray-500'>I am currently open to:</small>
                </div>
                <div className="flex flex-col gap-4">
                    {[
                        "Remote Frontend Developer roles",
                        "Junior to Mid-level React positions",
                        "Startup or product-based environments",
                        "Contract-to-hire opportunities"
                    ].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                            <div className="w-2 h-2 mt-2 rounded-full bg-linear-to-r from-yellow-400 to-blue-500"></div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                {item}
                            </p>
                        </div>
                    ))}
                </div>

                <small className='mt-3 text-gray-500'>I am eager to grow within a professional tech flow while continuously strengthening my frontend architecture and backend integration skills.</small>
            </motion.div>
        </>
    );
}