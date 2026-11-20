import Link from "next/link";
import { Utensils, Phone, ScanLine, QrCode, LayoutGrid } from "lucide-react";

export function LandingNav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#C8553D] to-[#D4A24C] flex items-center justify-center text-white shadow-md">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-white block leading-none">
              MenuPlatform
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">
              Animated QR Menus
            </span>
          </div>
        </Link>

        {/* Links & CTA */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/qr-codes"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#C8553D] dark:hover:text-[#D4A24C] transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden md:inline">QR Codes</span>
          </Link>

          <Link
            href="/#qr-scanner"
            className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#C8553D] dark:hover:text-[#D4A24C] transition-colors"
          >
            <ScanLine className="w-3.5 h-3.5 text-[#C8553D]" />
            <span>Scanner</span>
          </Link>

          <Link
            href="/platforms"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-[#C8553D] dark:hover:text-[#D4A24C] transition-colors"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-[#C8553D] dark:text-[#D4A24C]" />
            <span>Platforms</span>
          </Link>

          <a
            href="https://wa.me/923001234567?text=Hi%2C%20I%20want%20to%20get%20started%20with%20Animated%20Digital%20Menu."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#C8553D] hover:bg-[#B04630] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Get Started</span>
            <span className="sm:hidden">Start</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
