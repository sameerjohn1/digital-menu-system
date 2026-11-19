"use client";

import { useState } from "react";
import Link from "next/link";
import {
  QrCode,
  ScanLine,
  ExternalLink,
  CheckCircle2,
  Table as TableIcon,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";

export function QrScannerSection() {
  const [selectedClient, setSelectedClient] = useState<"demo-cafe" | "royal-bbq" | "firestone-pizza" | "dark-bistro">("demo-cafe");
  const [selectedTable, setSelectedTable] = useState<number>(5);
  const [isScanning, setIsScanning] = useState(false);

  const clients = {
    "demo-cafe": {
      name: "The Artisan Roast Café",
      themeColor: "#C8553D",
      tablesCount: 10,
      sampleItem: "2x Spanish Latte (Large), 1x Truffle Panini",
      sampleTotal: "Rs 2,890",
      sampleNotes: "Less spicy, extra napkins",
    },
    "royal-bbq": {
      name: "Royal BBQ House",
      themeColor: "#E63946",
      tablesCount: 12,
      sampleItem: "1x Malai Boti (Full), 1x Desi Ghee Karahi (1 KG), 4x Roghani Naan",
      sampleTotal: "Rs 7,710",
      sampleNotes: "Make it spicy, serve hot with mint raita",
    },
    "firestone-pizza": {
      name: "Firestone Pizza House",
      themeColor: "#D9531E",
      tablesCount: 8,
      sampleItem: "1x Diavola Pepperoni (14-inch), 1x Fettuccine Alfredo, 2x Sicilian Lemonade",
      sampleTotal: "Rs 4,880",
      sampleNotes: "Crispy crust, dressing on the side",
    },
    "dark-bistro": {
      name: "Nocturne Grill & Prime Bistro",
      themeColor: "#D4A24C",
      tablesCount: 10,
      sampleItem: "1x A5 Wagyu Ribeye (Medium), 1x Smash Burger, 1x Lava Cake",
      sampleTotal: "Rs 6,200",
      sampleNotes: "Medium doneness, extra peppercorn jus",
    },
  };

  const current = clients[selectedClient];
  const activeTable = Math.min(selectedTable, current.tablesCount);
  const targetUrl = `/menu/${selectedClient}?table=${activeTable}`;

  const handleSimulateScan = (tableNum: number) => {
    setSelectedTable(tableNum);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 600);
  };

  return (
    <section id="qr-scanner" className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C] flex items-center justify-center gap-1.5">
          <ScanLine className="w-4 h-4 animate-pulse" />
          Interactive Multi-Business QR Simulator
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
          Experience Table QR Recognition Live
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
          Select any restaurant business and tap a table number to simulate camera recognition.
        </p>

        {/* Business switcher */}
        <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mt-6 shadow-sm">
          <button
            onClick={() => setSelectedClient("demo-cafe")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedClient === "demo-cafe"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            ☕ Artisan Roast Café
          </button>
          <button
            onClick={() => setSelectedClient("royal-bbq")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedClient === "royal-bbq"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            🥩 Royal BBQ House
          </button>
          <button
            onClick={() => setSelectedClient("firestone-pizza")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedClient === "firestone-pizza"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            🍕 Firestone Pizza
          </button>
          <button
            onClick={() => setSelectedClient("dark-bistro")}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedClient === "dark-bistro"
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            🍷 Nocturne Bistro
          </button>
        </div>
      </div>

      {/* Main Scanner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Table Selector */}
        <div className="lg:col-span-5 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-[#C8553D] dark:text-[#D4A24C]" />
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Pick a Table to Scan
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
              Table {activeTable} Active
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5 leading-relaxed">
            {current.name} has {current.tablesCount} dining tables. Click any number to test parameter recognition.
          </p>

          {/* Table Buttons Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-6">
            {Array.from({ length: current.tablesCount }, (_, i) => i + 1).map((num) => {
              const isSelected = activeTable === num;
              return (
                <button
                  key={num}
                  onClick={() => handleSimulateScan(num)}
                  className={`py-2.5 rounded-xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95 border ${
                    isSelected
                      ? "ring-2 text-white shadow-md scale-105"
                      : "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700/60 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                  style={{
                    backgroundColor: isSelected ? current.themeColor : undefined,
                    borderColor: isSelected ? current.themeColor : undefined,
                  }}
                >
                  <span className="text-[9px] font-normal uppercase opacity-75">Tbl</span>
                  <span className="font-mono font-black">{num}</span>
                </button>
              );
            })}
          </div>

          {/* Scanned QR Info Box */}
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Target URL</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-white truncate max-w-[200px]">
                {targetUrl}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-zinc-500 dark:text-zinc-400">Detected Tag</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Table #{activeTable} (Dine-in)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                href={targetUrl}
                className="py-2.5 px-3 rounded-xl font-bold text-xs text-white flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                style={{ backgroundColor: current.themeColor }}
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

        {/* Right: Camera Viewfinder & Table QR Simulation */}
        <div className="lg:col-span-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-lg flex flex-col md:flex-row gap-6 items-center">
          {/* Simulated Scanner Viewport */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-zinc-950 p-4 flex flex-col items-center justify-center overflow-hidden border-2 border-zinc-800 shadow-2xl shrink-0">
            {/* Corner viewfinder marks */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2" style={{ borderColor: current.themeColor }} />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2" style={{ borderColor: current.themeColor }} />

            {/* Laser scanning beam */}
            <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_12px_#ef4444] animate-bounce pointer-events-none z-10" />

            {/* Generated Table SVG QR */}
            <div className={`relative p-3 bg-white rounded-2xl shadow-xl transition-all duration-300 ${isScanning ? "scale-90 opacity-75" : "scale-100"}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/qr-codes/${selectedClient}/table-${activeTable}.svg`}
                alt={`Table ${activeTable} QR Code`}
                className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
              />
              <div className="text-center mt-1">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-900 font-mono">
                  {current.name.split(" ")[0]} • Table {activeTable}
                </span>
              </div>
            </div>

            <div className="absolute bottom-2 text-[10px] font-semibold text-zinc-400">
              Point phone camera to test
            </div>
          </div>

          {/* Right Explanation: What Happens Next */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Table Tagged WhatsApp Order
              </span>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white">
                What The Kitchen Receives:
              </h4>
            </div>

            {/* WhatsApp formatted message preview bubble */}
            <div className="p-4 rounded-2xl bg-[#E7F8E8] dark:bg-[#072410] border border-[#25D366]/30 font-mono text-xs text-zinc-800 dark:text-zinc-200 space-y-1 shadow-inner leading-relaxed">
              <div className="font-bold text-[#128C7E] dark:text-[#25D366] flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5" />
                🍽️ *New Order — Table {activeTable} (Dine-in)*
              </div>
              <div className="text-[11px] text-zinc-600 dark:text-zinc-400">
                📍 *{current.name}*
              </div>
              <div className="text-zinc-400">──────────────────</div>
              <div>• {current.sampleItem}</div>
              <div className="text-zinc-400">──────────────────</div>
              <div>📝 *Note:* {current.sampleNotes}</div>
              <div className="font-bold text-zinc-900 dark:text-white">
                💰 *Total: {current.sampleTotal}*
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={`/qr-codes/${selectedClient}/table-${activeTable}.svg`}
                download={`${selectedClient}-table-${activeTable}.svg`}
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
