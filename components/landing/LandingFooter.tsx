import Link from "next/link";
import { Utensils } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#C8553D] to-[#D4A24C] flex items-center justify-center text-white">
            <Utensils className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-zinc-900 dark:text-white">
            Animated Digital Menu Platform
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          <Link href="/menu/demo-cafe" className="hover:text-zinc-900 dark:hover:text-white">
            The Artisan Roast Café
          </Link>
          <Link href="/menu/royal-bbq" className="hover:text-zinc-900 dark:hover:text-white">
            Royal BBQ House
          </Link>
          <Link href="/menu/firestone-pizza" className="hover:text-zinc-900 dark:hover:text-white">
            Firestone Pizza House
          </Link>
          <Link href="/qr-codes" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Table QR Gallery
          </Link>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            WhatsApp Support
          </a>
        </div>

        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © {new Date().getFullYear()} Animated Digital Menu Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
