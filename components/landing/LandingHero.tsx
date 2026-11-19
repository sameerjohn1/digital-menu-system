"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { QrCode, ArrowRight, ShieldCheck, Zap, Globe2, Phone } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Top Announcement Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-sm backdrop-blur-md mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Next-Gen WhatsApp Ordering for Modern Dining
          </span>
          <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
            0% Commission
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.12]"
        >
          Turn Dining Tables Into{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8553D] via-[#D4A24C] to-[#C8553D]">
            Instant WhatsApp Orders.
          </span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed"
        >
          Say goodbye to expensive paper menus and 30% delivery app fees. Give your guests a high-speed, animated mobile menu with table QR tracking and direct kitchen WhatsApp orders.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <Link
            href="/menu/demo-cafe"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#C8553D] hover:bg-[#B04630] text-white font-bold text-base shadow-xl shadow-[#C8553D]/25 transition-all active:scale-95 flex items-center justify-center gap-2 group"
          >
            <span>Experience Live Demo</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <a
            href="https://wa.me/923001234567?text=Hi%2C%20I%20am%20interested%20in%20setting%20up%20an%20Animated%20Digital%20Menu%20for%20my%20restaurant."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-900 dark:text-white font-bold text-base transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm"
          >
            <Phone className="w-4 h-4 text-emerald-500" />
            <span>Setup Your Menu</span>
          </a>
        </motion.div>

        {/* Proof Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Instant Mobile Loading</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Globe2 className="w-4 h-4 text-blue-500" />
            <span>English & Urdu Bilingual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#C8553D]" />
            <span>Table QR Tracking</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero Server Maintenance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
