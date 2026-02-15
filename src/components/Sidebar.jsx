import { RiEmojiStickerFill, RiShiningFill, RiRobot3Fill } from "react-icons/ri";

export default function Sidebar() {

    return (
        <div className="hidden lg:block fixed left-10 bottom-0 w-10">
            <div className="flex flex-col space-y-8 items-center after:content-[''] after:w-px after:h-180 after:bg-emerald-900 after:mt-4">
                {/* Ganti dengan Icon dari lucide-react atau react-icons */}
                <span className="hover:text-emerald-500 cursor-pointer transition-all"><RiEmojiStickerFill size={25} /></span>
                <span className="hover:text-emerald-500 cursor-pointer transition-all"><RiShiningFill size={25} /></span>
                <span className="hover:text-emerald-500 cursor-pointer transition-all"><RiRobot3Fill size={25} /></span>
            </div>
        </div>
    );
}