
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaRegEnvelope, FaWhatsapp } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export default function Hero() {
    return (
        <motion.div
            className="md:col-span-4 bg-white/5 border border-white/10 p-8 rounded-4xl backdrop-blur-xl flex flex-col justify-between hover:border-emerald-500/30 transition-colors duration-500 group"
        >
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">Available for projects</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-none">
                    I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-emerald-400 to-cyan-400">Septiyan E.P.</span>
                </h1>
                <div className="flex gap-3 mb-6">
                    <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">FRONTEND DEVELOPER</span>
                    <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">REACT & FIREBASE</span>
                    <span className="text-xs text-emerald-500 font-mono bg-white/5 px-2 py-1 rounded border border-white/5 tracking-widest">BUSSINESS-ORIENTED SYSTEM THINKER</span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed w-full font-thin">
                    <span className='text-md font-semibold text-gray-300'>I am a Frontend Developer with hands-on experience building end-to-end web applications using React and Firebase.</span>
                    <br /><br />
                    With more than 10 years of experience in business operations and compliance at manufacture, I developed a strong foundation in structured thinking, risk awareness, and process optimization.
                    <br /><br />
                    That background allows me to approach software development not only from a technical perspective, but also from a business and system design perspective.

                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {/* 3. Location/Contact Mini Card */}
                <div
                    className="bg-linear-to-br from-emerald-500/10 to-blue-500/10 border border-white/10 p-8 rounded-4xl
           flex flex-col justify-center items-center text-center group hover:border-white/20 transition-all mb-2"
                >
                    <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                        <FaLocationDot className="text-emerald-500" size={32} />
                    </div>
                    <p className="text-gray-300 font-medium">Jakarta, Indonesia</p>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">UTC +7</p>
                </div>

                {/* 5. Experience/Quote Card */}
                <div
                    className=" bg-white/5 border border-white/10 p-8 rounded-4xl flex flex-col justify-center italic text-md text-gray-400 leading-relaxed mb-2"
                >
                    I don’t just build interfaces.<br />
                    <span className='text-emerald-500'>I build structured, scalable systems.</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-12">
                <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
                    Let's Talk <FaRegEnvelope size={18} />
                </button>
                <div className="flex gap-2">
                    <a href="https://github.com/septiyan79" className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"><FaGithub size={22} /></a>
                    <a href="https://www.linkedin.com/in/septiyan-eka-5b59a0257" className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"><FaLinkedinIn size={22} /></a>
                    <a href="https://wa.me/6281803986390" className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-all"><FaWhatsapp size={22} /></a>
                </div>
            </div>
        </motion.div>
    );
}