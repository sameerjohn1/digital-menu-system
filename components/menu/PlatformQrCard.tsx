"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CircleCheck,
  Download,
  QrCode,
  ScanLine,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { RestaurantConfig } from "@/lib/menu-schema";
import { translations, type Language } from "@/lib/i18n";
import { getMenuUrl } from "@/lib/site-url";

interface PlatformQrCardProps {
  restaurant: RestaurantConfig;
  lang: Language;
}

export function PlatformQrCard({ restaurant, lang }: PlatformQrCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = translations[lang];
  const theme = restaurant.theme;
  const qrSvg = `/qr-codes/${restaurant.slug}/${restaurant.slug}.svg`;
  const qrPng = `/qr-codes/${restaurant.slug}/${restaurant.slug}.png`;
  const menuUrl = getMenuUrl(restaurant.slug);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleScan = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsScanned(false);
    setIsScanning(true);
    timeoutRef.current = setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
    }, 1000);
  };

  return (
    <section
      className="relative overflow-hidden rounded-3xl border p-5 shadow-sm sm:p-6"
      style={{ backgroundColor: theme.cardBg, borderColor: theme.border }}
    >
      <div
        className="pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full opacity-10 blur-2xl"
        style={{ backgroundColor: theme.primary }}
      />

      <div className="relative flex items-start justify-between gap-3 border-b pb-4" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
          >
            <ScanLine className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold tracking-tight sm:text-lg" style={{ color: theme.text }}>
              {t.qrScannerTitle}
            </h3>
            <p className="mt-0.5 text-xs" style={{ color: theme.textMuted }}>
              {t.qrScannerSubtitle}
            </p>
          </div>
        </div>
        <span
          className="hidden shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline-flex"
          style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
        >
          {t.qrScannerBadge}
        </span>
      </div>

      <div className="relative mt-5 flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:gap-6">
        <div className="relative h-[196px] w-[196px] shrink-0 overflow-hidden rounded-2xl bg-zinc-950 p-3 shadow-inner">
          <div
            className="absolute top-3 left-3 h-6 w-6 rounded-tl-sm border-t-2 border-l-2"
            style={{ borderColor: theme.primary }}
          />
          <div
            className="absolute top-3 right-3 h-6 w-6 rounded-tr-sm border-t-2 border-r-2"
            style={{ borderColor: theme.primary }}
          />
          <div
            className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-sm border-b-2 border-l-2"
            style={{ borderColor: theme.primary }}
          />
          <div
            className="absolute right-3 bottom-3 h-6 w-6 rounded-br-sm border-r-2 border-b-2"
            style={{ borderColor: theme.primary }}
          />

          <div
            className={`relative flex h-full w-full items-center justify-center rounded-xl bg-white p-1.5 shadow-xl transition-all duration-300 ${
              isScanning ? "scale-95 opacity-80" : "scale-100"
            }`}
          >
            <Image
              src={qrSvg}
              alt={`${restaurant.name[lang]} QR code`}
              width={128}
              height={156}
              className="h-[152px] w-[125px] object-contain"
            />
          </div>

          <div className="animate-scanline pointer-events-none absolute inset-x-4 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_14px_#f43f5e]" />
          <span className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">
            QR • Scanner
          </span>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left" dir={lang === "ur" ? "rtl" : "ltr"}>
          <div className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase" style={{ color: theme.primary }}>
            <Sparkles className="h-3.5 w-3.5" />
            {restaurant.name[lang]}
          </div>

          <div
            className="mb-3 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold"
            style={{
              backgroundColor: isScanned ? "rgba(16,185,129,0.12)" : `${theme.primary}10`,
              color: isScanned ? "#059669" : theme.text,
            }}
          >
            {isScanned ? (
              <CircleCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            ) : isScanning ? (
              <ScanLine className="h-4 w-4 animate-pulse" style={{ color: theme.primary }} />
            ) : (
              <Smartphone className="h-4 w-4" style={{ color: theme.primary }} />
            )}
            <span>
              {isScanned ? t.qrScanned : isScanning ? t.qrScanning : t.qrDestination}
            </span>
          </div>

          <p
            className="mb-4 truncate font-mono text-[11px]"
            style={{ color: theme.textMuted }}
            title={menuUrl}
            dir="ltr"
          >
            {menuUrl}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <button
              type="button"
              onClick={handleScan}
              disabled={isScanning}
              className="inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:cursor-wait disabled:opacity-70"
              style={{
                backgroundColor: isScanned ? "#059669" : theme.primary,
              }}
            >
              {isScanned ? <CircleCheck className="h-3.5 w-3.5" /> : <ScanLine className="h-3.5 w-3.5" />}
              <span>{isScanned ? t.qrScanAgain : t.qrSimulateScan}</span>
            </button>

            <a
              href={qrPng}
              download={`${restaurant.slug}.png`}
              className="inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-bold transition-colors hover:opacity-80"
              style={{ borderColor: theme.border, color: theme.text, backgroundColor: theme.surface }}
            >
              <Download className="h-3.5 w-3.5" />
              <span>{t.qrDownload}</span>
            </a>

            <Link
              href="/qr-codes"
              className="inline-flex items-center gap-1.5 rounded-xl px-2 py-2 text-xs font-bold transition-opacity hover:opacity-70"
              style={{ color: theme.primary }}
            >
              <QrCode className="h-3.5 w-3.5" />
              <span>{t.qrOpenGallery}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
