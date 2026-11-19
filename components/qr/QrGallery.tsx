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
  Phone,
  Sparkles,
} from "lucide-react";

export interface QrBusiness {
  slug: string;
  name: string;
  nameUr: string;
  tagline: string;
  logo: string;
  primaryColor: string;
  whatsapp: string;
  url: string;
}

interface QrGalleryProps {
  businesses: QrBusiness[];
  baseUrl: string;
}

export function QrGallery({ businesses, baseUrl }: QrGalleryProps) {
  const [activeSlug, setActiveSlug] = useState<string>(
    businesses[0]?.slug ?? ""
  );
  const business = businesses.find((entry) => entry.slug === activeSlug) ?? businesses[0];

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4 text-center">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <QrCode className="mx-auto mb-3 h-8 w-8 text-zinc-400" />
          <h1 className="text-lg font-bold">No platforms configured</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Add a JSON file to <code>data/clients/</code> to generate a QR code.
          </p>
        </div>
      </div>
    );
  }

  const qrSvg = `/qr-codes/${business.slug}/${business.slug}.svg`;
  const qrPng = `/qr-codes/${business.slug}/${business.slug}.png`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased pb-24">
      <header className="sticky top-0 z-30 backdrop-blur-md bg-white/85 dark:bg-zinc-900/85 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
              aria-label="Back to home"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight truncate">
                Platform QR Gallery
              </h1>
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate block">
                QR destination: {baseUrl}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print QR</span>
            </button>
            <Link
              href={`/menu/${business.slug}`}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
              style={{ backgroundColor: business.primaryColor }}
            >
              <span>View Menu</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Select Platform:
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
            {businesses.map((entry) => {
              const isSelected = entry.slug === activeSlug;
              return (
                <button
                  key={entry.slug}
                  onClick={() => setActiveSlug(entry.slug)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected
                      ? "ring-2 bg-white dark:bg-zinc-900 shadow-md"
                      : "bg-white/60 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  }`}
                  style={{ borderColor: isSelected ? entry.primaryColor : undefined }}
                >
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <Image src={entry.logo} alt={entry.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {entry.name}
                    </h3>
                    <span className="text-[10px] text-zinc-500 block truncate">
                      {entry.slug}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-4">
              <div
                className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 shadow-md"
                style={{ borderColor: business.primaryColor }}
              >
                <Image src={business.logo} alt={business.name} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                  {business.name}
                </h2>
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
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 font-semibold">
                <QrCode className="w-3.5 h-3.5 text-zinc-500" />
                <span>One QR per platform</span>
              </span>
            </div>
          </div>

          <div className="pt-6">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-3">
              QR Code (For flyers, social media &amp; storefronts)
            </span>

            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-3 bg-white rounded-2xl border border-zinc-200 shadow-md shrink-0">
                <Image
                  src={qrSvg}
                  alt={`${business.name} QR code`}
                  width={144}
                  height={176}
                  className="w-36 h-44 object-contain"
                />
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3 h-3" />
                  <span>Opens This Platform&apos;s Menu Directly</span>
                </div>
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">
                  Menu Destination
                </h4>
                <p
                  className="text-xs font-mono text-zinc-500 dark:text-zinc-400 truncate max-w-md"
                  title={business.url}
                >
                  {business.url}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                  <Link
                    href={`/menu/${business.slug}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-xs inline-flex items-center gap-1.5"
                    style={{ backgroundColor: business.primaryColor }}
                  >
                    <span>Open Menu</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <a
                    href={qrSvg}
                    download={`${business.slug}.svg`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download SVG</span>
                  </a>
                  <a
                    href={qrPng}
                    download={`${business.slug}.png`}
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
      </main>
    </div>
  );
}
