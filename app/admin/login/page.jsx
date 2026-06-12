import LoginForm from '../../../components/admin/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-mono text-emerald-500 tracking-widest uppercase mb-2">Admin</p>
          <h1 className="text-3xl font-bold tracking-tighter">sep-porto</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
