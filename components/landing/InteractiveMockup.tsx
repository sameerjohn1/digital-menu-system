"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, ShoppingBag, QrCode } from "lucide-react";

export function InteractiveMockup() {
  const [activeSlug, setActiveSlug] = useState<"demo-cafe" | "royal-bbq" | "firestone-pizza">("demo-cafe");

  const businesses = {
    "demo-cafe": {
      name: "The Artisan Roast Café",
      slug: "demo-cafe",
      bg: "#FFF8F0",
      surface: "#FFFFFF",
      primary: "#C8553D",
      text: "#1F1B16",
      muted: "#6E6259",
      logo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80",
      hero: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
      items: [
        { name: "Signature Spanish Latte", price: "Rs 680", badge: "Popular" },
        { name: "Truffle Chicken Panini", price: "Rs 1,250", badge: "Chef's Special" },
        { name: "Burnt Basque Cheesecake", price: "Rs 790", badge: "Sweet" },
      ],
      cartItems: "2 items",
      cartTotal: "Rs 1,930",
    },
    "royal-bbq": {
      name: "Royal BBQ House",
      slug: "royal-bbq",
      bg: "#0F0C0C",
      surface: "#1A1515",
      primary: "#E63946",
      text: "#FDF8F5",
      muted: "#A89F91",
      logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=150&q=80",
      hero: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
      items: [
        { name: "Melt-in-Mouth Chicken Malai Boti", price: "Rs 1,050", badge: "Live Charcoal" },
        { name: "Desi Ghee Mutton Karahi", price: "Rs 2,800", badge: "Shinwari" },
        { name: "Royal Mutton Dum Biryani", price: "Rs 1,350", badge: "Special" },
      ],
      cartItems: "3 items",
      cartTotal: "Rs 5,200",
    },
    "firestone-pizza": {
      name: "Firestone Pizza House",
      slug: "firestone-pizza",
      bg: "#FBF7EE",
      surface: "#FFFFFF",
      primary: "#D9531E",
      text: "#1C1917",
      muted: "#78716C",
      logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80",
      hero: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=600&q=80",
      items: [
        { name: "Classic Margherita D.O.P", price: "Rs 1,450", badge: "Neapolitan" },
        { name: "Diavola Beef Pepperoni", price: "Rs 1,750", badge: "Wood-Fired" },
        { name: "Truffle Fettuccine Alfredo", price: "Rs 1,490", badge: "Handmade" },
      ],
      cartItems: "2 items",
      cartTotal: "Rs 3,200",
    },
  };

  const current = businesses[activeSlug];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/50 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C]">
            Multi-Business Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
            One Platform, Unlimited Businesses
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Each business gets its own independent URL, visual brand identity, opening hours, WhatsApp kitchen line, and one dedicated QR code.
          </p>

          {/* Business Switcher Pills */}
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 mt-6 shadow-sm">
            <button
              onClick={() => setActiveSlug("demo-cafe")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSlug === "demo-cafe"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              ☕ 1. Artisan Roast Café
            </button>
            <button
              onClick={() => setActiveSlug("royal-bbq")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSlug === "royal-bbq"
                  ? "bg-zinc-800 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              🥩 2. Royal BBQ House
            </button>
            <button
              onClick={() => setActiveSlug("firestone-pizza")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeSlug === "firestone-pizza"
                  ? "bg-[#D9531E] text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              🍕 3. Firestone Pizza House
            </button>
          </div>
        </div>

        {/* Main Mockup Container */}
        <div className="max-w-md mx-auto">
          {/* Phone Bezel */}
          <div className="relative rounded-[40px] border-8 border-zinc-900 dark:border-zinc-800 bg-zinc-900 p-2 shadow-2xl overflow-hidden ring-1 ring-zinc-800">
            {/* Dynamic Screen View */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlug}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-[32px] overflow-hidden min-h-[580px] flex flex-col justify-between"
                style={{ backgroundColor: current.bg }}
              >
                {/* Header Mockup */}
                <div>
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={current.hero}
                      alt={current.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 end-3 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Table 5
                    </div>
                  </div>

                  {/* Brand bar */}
                  <div className="px-4 -mt-6 flex items-end gap-3 relative z-10">
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden relative border-2 shadow-md shrink-0"
                      style={{ borderColor: current.surface }}
                    >
                      <Image
                        src={current.logo}
                        alt="Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h4
                        className="text-xs font-bold truncate"
                        style={{ color: current.text }}
                      >
                        {current.name}
                      </h4>
                      <p
                        className="text-[10px]"
                        style={{ color: current.muted }}
                      >
                        Direct WhatsApp Kitchen Ordering
                      </p>
                    </div>
                  </div>

                  {/* Sample Items List */}
                  <div className="p-4 space-y-2 mt-2">
                    {current.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border flex items-center justify-between shadow-xs"
                        style={{
                          backgroundColor: current.surface,
                          borderColor: `${current.muted}30`,
                        }}
                      >
                        <div>
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider block"
                            style={{ color: current.primary }}
                          >
                            {it.badge}
                          </span>
                          <span
                            className="text-xs font-bold"
                            style={{ color: current.text }}
                          >
                            {it.name}
                          </span>
                        </div>
                        <span
                          className="text-xs font-bold font-mono"
                          style={{ color: current.primary }}
                        >
                          {it.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Bar Mockup */}
                <div
                  className="p-3.5 border-t flex items-center justify-between"
                  style={{
                    backgroundColor: current.surface,
                    borderColor: `${current.muted}30`,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: current.primary }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className="text-[10px] block"
                        style={{ color: current.muted }}
                      >
                        {current.cartItems} in cart
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: current.text }}
                      >
                        {current.cartTotal}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/menu/${current.slug}`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                    style={{ backgroundColor: current.primary }}
                  >
                    <span>Open Menu</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick link below preview */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <Link
              href={`/menu/${current.slug}?table=5`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C8553D] dark:text-[#D4A24C] hover:underline"
            >
              <span>Scan Table 5 (/menu/{current.slug}?table=5)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <span className="text-zinc-400 hidden sm:inline">•</span>
            <Link
              href="/qr-codes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>View All Downloadable QR Codes</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
