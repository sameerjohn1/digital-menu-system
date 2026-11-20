import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  LayoutGrid,
  QrCode,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { getAllClients } from "@/lib/get-client";

export const metadata: Metadata = {
  title: "Platforms | Animated Digital Menu",
  description: "Browse every configured platform and open its official animated QR menu.",
};

export default function PlatformsPage() {
  const platforms = getAllClients();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 antialiased dark:bg-[#0C0C0D] dark:text-zinc-100">
      <LandingNav />

      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8553D]/20 bg-white px-3.5 py-1.5 text-xs font-bold tracking-wide text-[#C8553D] shadow-sm dark:border-[#D4A24C]/25 dark:bg-zinc-900 dark:text-[#D4A24C]">
            <LayoutGrid className="h-3.5 w-3.5" />
            Platform Directory
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8553D] to-[#D4A24C]">Platform</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            Pick a restaurant below to open its official animated menu — with its own QR code, live item list and WhatsApp ordering.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3.5 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            {platforms.length} live {platforms.length === 1 ? "menu" : "menus"}
          </div>
        </div>

        {platforms.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Store className="mx-auto mb-3 h-9 w-9 text-zinc-400" />
            <h2 className="text-lg font-bold">No platforms configured</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Add a JSON file to <code>data/clients/</code> to publish a new platform menu.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platforms.map((platform) => (
              <Link
                key={platform.slug}
                href={`/menu/${platform.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ backgroundColor: platform.theme.primary }}
                />

                <div className="flex items-start justify-between gap-3">
                  <div
                    className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-700"
                    style={{ borderColor: platform.theme.primary }}
                  >
                    <Image
                      src={platform.logo}
                      alt={platform.name.en}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                    <UtensilsCrossed className="h-3 w-3" />
                    {platform.items.length} items
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  {platform.name.en}
                </h2>
                <p className="mt-0.5 font-urdu text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {platform.name.ur}
                </p>
                <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {platform.tagline.en}
                </p>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <span className="truncate font-mono text-[10px] text-zinc-400" dir="ltr">
                    /menu/{platform.slug}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-bold transition-transform group-hover:translate-x-0.5"
                    style={{ color: platform.theme.primary }}
                  >
                    Open Menu
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Need the QR code?</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Download a ready-to-print QR for every platform from the gallery.
              </p>
            </div>
          </div>
          <Link
            href="/qr-codes"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#C8553D] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Open QR Gallery
          </Link>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
