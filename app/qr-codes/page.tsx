"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  QrCode,
  Download,
  ExternalLink,
  Printer,
  ArrowLeft,
  Utensils,
  Table as TableIcon,
  Phone,
  Sparkles,
} from "lucide-react";

interface BusinessData {
  slug: string;
  name: string;
  nameUr: string;
  tagline: string;
  category: string;
  logo: string;
  themeColor: string;
  whatsapp: string;
  tablesCount: number;
}

const businesses: BusinessData[] = [
  {
    slug: "demo-cafe",
    name: "The Artisan Roast Café & Bakery",
    nameUr: "دی آرٹیسن روسٹ کیفے اینڈ بیکری",
    tagline: "Artisanal espresso, handcrafted sourdough & gourmet brunch",
    category: "Specialty Coffee & Bakery",
    logo: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=150&q=80",
    themeColor: "#C8553D",
    whatsapp: "923001234567",
    tablesCount: 10,
  },
  {
    slug: "royal-bbq",
    name: "Royal BBQ House",
    nameUr: "رائل بی بی کیو ہاؤس",
    tagline: "Traditional charcoal grills, smoky skewers & royal clay-oven karahis",
    category: "Traditional Grills & Karahi",
    logo: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=150&q=80",
    themeColor: "#E63946",
    whatsapp: "923008889911",
    tablesCount: 12,
  },
  {
    slug: "firestone-pizza",
    name: "Firestone Pizza House",
    nameUr: "فائر اسٹون پیزا ہاؤس",
    tagline: "Authentic wood-fired Neapolitan crusts, calzones & artisan pasta",
    category: "Neapolitan Pizzeria",
    logo: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80",
    themeColor: "#D9531E",
    whatsapp: "923007773322",
    tablesCount: 8,
  },
  {
    slug: "dark-bistro",
    name: "Nocturne Grill & Prime Bistro",
    nameUr: "نوکٹرن گرل اینڈ پرائم بسٹرو",
    tagline: "Prime dry-aged steaks, artisan smash burgers & handcrafted cocktails",
    category: "Steakhouse & Lounge",
    logo: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=150&q=80",
    themeColor: "#D4A24C",
    whatsapp: "923009876543",
    tablesCount: 10,
  },
];

export default function QrCodesPage() {
  const [activeSlug, setActiveSlug] = useState<string>("demo-cafe");
  const business = businesses.find((b) => b.slug === activeSlug) || businesses[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/85 dark:bg-zinc-900/85 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight">
                Business & Table QR Gallery
              </h1>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Printable vector SVGs & PNGs for every dining table
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Cards</span>
            </button>
            <Link
              href={`/menu/${business.slug}`}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              style={{ backgroundColor: business.themeColor }}
            >
              <span>View Menu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Business Selector Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Select Restaurant Business:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {businesses.map((b) => {
              const isSelected = b.slug === activeSlug;
              return (
                <button
                  key={b.slug}
                  onClick={() => setActiveSlug(b.slug)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? "ring-2 bg-white dark:bg-zinc-900 shadow-md"
                      : "bg-white/60 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  }`}
                  style={{
                    borderColor: isSelected ? b.themeColor : undefined,
                  }}
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={b.logo}
                      alt={b.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {b.name}
                    </h3>
                    <span className="text-[10px] text-zinc-500 block truncate">
                      {b.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Business Overview Card */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 shadow-md"
                style={{ borderColor: business.themeColor }}
              >
                <Image
                  src={business.logo}
                  alt={business.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                    {business.name}
                  </h2>
                </div>
                <p className="text-xs font-urdu text-zinc-600 dark:text-zinc-300 mt-0.5">
                  {business.nameUr}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                  {business.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                <Phone className="w-3.5 h-3.5" />
                <span>WA: +{business.whatsapp}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 font-semibold font-mono">
                <TableIcon className="w-3.5 h-3.5 text-zinc-500" />
                <span>{business.tablesCount} Tables Configured</span>
              </span>
            </div>
          </div>

          {/* Section 1: Main Business QR Code */}
          <div className="pt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
              1. General Business QR Code (For flyers, social media & storefronts)
            </span>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-3 bg-white rounded-2xl border border-zinc-200 shadow-md shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/qr-codes/${business.slug}/main-menu.svg`}
                  alt={`${business.name} Main QR`}
                  className="w-32 h-32 object-contain"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Opens Main Menu Without Table Parameter</span>
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  General Scan Destination
                </h4>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-md">
                  /menu/{business.slug}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <Link
                    href={`/menu/${business.slug}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-1.5"
                    style={{ backgroundColor: business.themeColor }}
                  >
                    <span>Open Menu</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <a
                    href={`/qr-codes/${business.slug}/main-menu.svg`}
                    download={`${business.slug}-main-qr.svg`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </a>
                  <a
                    href={`/qr-codes/${business.slug}/main-menu.png`}
                    download={`${business.slug}-main-qr.png`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download PNG</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Table-Specific QR Codes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <TableIcon className="w-5 h-5" style={{ color: business.themeColor }} />
                <span>2. Table-Specific QR Codes (Tables 1 to {business.tablesCount})</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Each table QR code passes its unique <code className="font-mono text-zinc-700 dark:text-zinc-300">?table=X</code> parameter and attaches it to the customer&apos;s WhatsApp order.
              </p>
            </div>
          </div>

          {/* Grid of Table QR Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: business.tablesCount }, (_, i) => i + 1).map((tableNum) => {
              const tableUrl = `/menu/${business.slug}?table=${tableNum}`;
              return (
                <div
                  key={tableNum}
                  className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 shadow-xs flex flex-col items-center text-center space-y-3 group hover:shadow-md transition-shadow"
                >
                  {/* Table Badge */}
                  <div className="w-full flex items-center justify-between text-xs">
                    <span
                      className="px-2.5 py-0.5 rounded-full font-extrabold text-[11px] text-white"
                      style={{ backgroundColor: business.themeColor }}
                    >
                      Table {tableNum}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      ?table={tableNum}
                    </span>
                  </div>

                  {/* QR Image Box */}
                  <div className="p-3 bg-white rounded-xl border border-zinc-200 shadow-sm transition-transform group-hover:scale-102">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/qr-codes/${business.slug}/table-${tableNum}.svg`}
                      alt={`Table ${tableNum} QR`}
                      className="w-32 h-32 object-contain"
                    />
                  </div>

                  {/* Actions */}
                  <div className="w-full space-y-2 pt-1">
                    <Link
                      href={tableUrl}
                      className="w-full py-2 px-3 rounded-xl font-bold text-xs text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      style={{ backgroundColor: business.themeColor }}
                    >
                      <span>Test Table {tableNum}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      <a
                        href={`/qr-codes/${business.slug}/table-${tableNum}.svg`}
                        download={`${business.slug}-table-${tableNum}.svg`}
                        className="py-1.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold text-zinc-700 dark:text-zinc-300 transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>SVG</span>
                      </a>
                      <a
                        href={`/qr-codes/${business.slug}/table-${tableNum}.png`}
                        download={`${business.slug}-table-${tableNum}.png`}
                        className="py-1.5 px-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 font-semibold text-zinc-700 dark:text-zinc-300 transition-colors inline-flex items-center justify-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>PNG</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
