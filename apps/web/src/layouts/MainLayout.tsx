export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-hidden">

      {/* Starry overlay */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <h1 className="text-lg font-semibold">AI Image Studio ✨</h1>

        <div className="flex gap-6">
          <a href="/" className="hover:text-purple-300">Generate</a>
          <a href="/packs" className="hover:text-purple-300">Packs</a>
          <a href="/history" className="hover:text-purple-300">History</a>
        </div>
      </nav>

      <main className="relative z-10 px-6 py-10">
        {children}
      </main>
    </div>
  );
}
