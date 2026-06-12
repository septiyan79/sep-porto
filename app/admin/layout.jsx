export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-emerald-500/30">
      {children}
    </div>
  );
}
