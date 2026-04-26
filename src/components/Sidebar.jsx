import { RiEmojiStickerFill, RiShiningFill, RiRobot3Fill } from "react-icons/ri";

const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const links = [
    { icon: <RiEmojiStickerFill size={25} />, target: 'hero', label: 'Hero' },
    { icon: <RiShiningFill size={25} />, target: 'projects', label: 'Projects' },
    { icon: <RiRobot3Fill size={25} />, target: 'professional-profile', label: 'Profile' },
];

export default function Sidebar() {
    return (
        <div className="hidden lg:block fixed left-10 bottom-0 w-10 z-50">
            <div className="flex flex-col space-y-8 items-center after:content-[''] after:w-px after:h-80 after:bg-emerald-900 after:mt-4">
                {links.map(({ icon, target, label }) => (
                    <span
                        key={target}
                        onClick={() => scrollTo(target)}
                        className="relative group hover:text-emerald-500 cursor-pointer transition-all"
                    >
                        {icon}
                        <span className="absolute left-8 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 border border-white/10 text-emerald-400 text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono pointer-events-none">
                            {label}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    );
}