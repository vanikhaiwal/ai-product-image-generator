import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  console.log("MainLayout rendering");

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-white flex flex-col">

      {/* NAVBAR */}
      <nav className="w-full px-6 py-4 border-b border-purple-500 bg-[#111426] flex gap-6">
        <Link to="/" className="text-purple-300 hover:text-purple-400 font-semibold">Generate</Link>
        <Link to="/packs" className="text-purple-300 hover:text-purple-400 font-semibold">Packs</Link>
        <Link to="/history" className="text-purple-300 hover:text-purple-400 font-semibold">History</Link>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full p-6">
        {children}
      </main>
    </div>
  );
}

