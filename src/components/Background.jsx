export default function Background() {

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 blur-[120px] rounded-full"></div>
        </div>
    );
}