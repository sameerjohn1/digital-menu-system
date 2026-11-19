"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  QrCode,
  ScanLine,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";

type PlatformSlug = "demo-cafe" | "royal-bbq" | "firestone-pizza";

export function QrScannerSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformSlug>("demo-cafe");
  const [isScanning, setIsScanning] = useState(false);

  const platforms = {
    "demo-cafe": {
      name: "The Artisan Roast Café",
      themeColor: "#C8553D",
      sampleItem: "2x Spanish Latte (Large), 1x Truffle Panini",
      sampleTotal: "Rs 2,890",
      sampleNotes: "Less spicy, extra napkins",
    },
    "royal-bbq": {
      name: "Royal BBQ House",
      themeColor: "#E63946",
      sampleItem: "1x Malai Boti (Full), 1x Desi Ghee Karahi (1 KG), 4x Roghani Naan",
      sampleTotal: "Rs 7,710",
      sampleNotes: "Make it spicy, serve hot with mint raita",
    },
    "firestone-pizza": {
      name: "Firestone Pizza House",
      themeColor: "#D9531E",
      sampleItem: "1x Diavola Pepperoni (14-inch), 1x Fettuccine Alfredo, 2x Sicilian Lemonade",
      sampleTotal: "Rs 4,880",
      sampleNotes: "Crispy crust, dressing on the side",
    },
  };

  const current = platforms[selectedPlatform];
  const targetUrl = `/menu/${selectedPlatform}`;
  const qrSvg = `/qr-codes/${selectedPlatform}/${selectedPlatform}.svg`;

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 600);
  };

  return (
    <section id="qr-scanner" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C] flex items-center justify-center gap-1.5">
          <ScanLine className="w-4 h-4 animate-pulse" />
          Interactive Platform QR Simulator
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
          See Where Each QR Takes You
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
          Select a platform and simulate a customer opening its exact menu page.
        </p>

        <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mt-6 shadow-sm">
          {(Object.keys(platforms) as PlatformSlug[]).map((slug) => {
            const isSelected = selectedPlatform === slug;
            return (
              <button
                key={slug}
                onClick={() => setSelectedPlatform(slug)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {platforms[slug].name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#C8553D] dark:text-[#D4A24C]" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Scan Platform QR
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              {selectedPlatform}
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
            Each platform has one QR code that points directly to its own menu.
          </p>

          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Target URL</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">
                {targetUrl}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Detected</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {current.name}
              </span>
            </div>

            <button
              onClick={handleSimulateScan}
              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
              style={{ backgroundColor: current.themeColor }}
            >
              <ScanLine className="w-3.5 h-3.5" />
              <span>Simulate Scan</span>
            </button>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                href={targetUrl}
                className="py-2.5 px-3 rounded-xl font-bold text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Open Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/qr-codes"
                className="py-2.5 px-3 rounded-xl font-bold text-xs border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Gallery</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-lg flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-zinc-950 p-4 flex flex-col items-center justify-center overflow-hidden border-2 border-zinc-800 shadow-2xl shrink-0">
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: current.themeColor }} />

            <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] animate-bounce pointer-events-none z-10" />

            <div className={`relative p-3 bg-white rounded-2xl shadow-xl transition-all duration-300 ${isScanning ? "scale-90 opacity-75" : "scale-100"}`}>
              <Image
                src={qrSvg}
                alt={`${current.name} QR code`}
                width={176}
                height={176}
                className="w-36 h-44 sm:w-44 sm:h-52 object-contain"
              />
              <div className="text-center mt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-900 font-mono">
                  {current.name} • Menu QR
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 text-[10px] font-semibold text-zinc-400">
              Point phone camera to test
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Direct Platform Menu
              </span>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                What The Customer Sees:
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-[#E7F8E8] dark:bg-[#072410] border border-[#25D366]/30 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-1 shadow-inner leading-relaxed">
              <div className="font-bold text-[#128C7E] dark:text-[#25D366] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                New Order
              </div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                {current.name}
              </div>
              <div className="text-zinc-400">──────────────────</div>
              <div>{current.sampleItem}</div>
              <div className="text-zinc-400">──────────────────</div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Note: {current.sampleNotes}
              </div>
              <div className="font-bold text-zinc-900 dark:text-white">
                Total: {current.sampleTotal}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={qrSvg}
                download={`${selectedPlatform}.svg`}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </a>

              <Link
                href={targetUrl}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-opacity hover:opacity-90 inline-flex items-center gap-1.5"
                style={{ backgroundColor: current.themeColor }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Test Flow</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
