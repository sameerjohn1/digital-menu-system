import Link from "next/link";
import { Utensils, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] dark:bg-[#121212] text-[#1F1B16] dark:text-[#F5F1E8] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-[#C8553D]/10 dark:bg-[#D4A24C]/15 border border-[#C8553D]/20 dark:border-[#D4A24C]/30 flex items-center justify-center mb-6 shadow-xl">
        <Utensils className="w-10 h-10 text-[#C8553D] dark:text-[#D4A24C]" />
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C] mb-2">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
        Table Is Empty
      </h1>

      <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
        The digital menu or page you are looking for does not exist or may have been relocated.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
        <Link
          href="/menu/demo-cafe"
          className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-bold text-sm bg-[#C8553D] hover:bg-[#B04630] text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>View Demo Café</span>
        </Link>

        <Link
          href="/"
          className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl font-semibold text-sm border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
