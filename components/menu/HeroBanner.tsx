"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import { RestaurantConfig } from "@/lib/menu-schema";
import { Language } from "@/lib/i18n";
import { checkIsOpen } from "@/lib/is-open";

interface HeroBannerProps {
  restaurant: RestaurantConfig;
  lang: Language;
}

export function HeroBanner({ restaurant, lang }: HeroBannerProps) {
  const openStatus = checkIsOpen(restaurant.openingHours.open, restaurant.openingHours.close);

  return (
    <div className="w-full relative">
      {/* Cover image with subtle zoom animation */}
      <div className="relative h-48 sm:h-64 w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={restaurant.coverImage}
            alt={restaurant.name[lang]}
            fill
            className="object-cover"
            priority
          />
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"
          />
        </motion.div>
      </div>

      {/* Restaurant Overview Card */}
      <div className="max-w-2xl mx-auto px-4 -mt-12 relative z-10">
        <div
          className="rounded-2xl p-5 shadow-lg border backdrop-blur-sm"
          style={{
            backgroundColor: restaurant.theme.surface,
            borderColor: restaurant.theme.border,
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border-2 shadow-md -mt-10"
              style={{
                borderColor: restaurant.theme.surface,
                backgroundColor: restaurant.theme.cardBg,
              }}
            >
              <Image
                src={restaurant.logo}
                alt={restaurant.name[lang]}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2
                  className="text-lg sm:text-xl font-bold tracking-tight"
                  style={{ color: restaurant.theme.text }}
                >
                  {restaurant.name[lang]}
                </h2>
              </div>
              <p
                className="text-xs sm:text-sm line-clamp-2 leading-relaxed"
                style={{ color: restaurant.theme.textMuted }}
              >
                {restaurant.tagline[lang]}
              </p>
              <p
                className="mt-1.5 text-[11px] leading-relaxed line-clamp-2"
                style={{ color: restaurant.theme.textMuted }}
              >
                {restaurant.description[lang]}
              </p>
            </div>
          </div>

          {/* Status bar: Open Now / Closed and Hours */}
          <div
            className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-2 border-t text-xs"
            style={{ borderColor: restaurant.theme.border }}
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2.5 h-2.5 rounded-full ${
                  openStatus.isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                }`}
              />
              <span
                className="font-semibold"
                style={{
                  color: openStatus.isOpen ? "#10B981" : "#EF4444",
                }}
              >
                {lang === "en" ? openStatus.textEn : openStatus.textUr}
              </span>
            </div>

            <div
              className="flex items-center gap-1.5"
              style={{ color: restaurant.theme.textMuted }}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{restaurant.openingHours.days[lang]}</span>
            </div>
          </div>

          {/* Promotional Banner */}
          {restaurant.promoBanner?.active && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3.5 p-2.5 rounded-xl flex items-center gap-2.5 text-xs font-medium border"
              style={{
                backgroundColor: `${restaurant.theme.primary}12`,
                borderColor: `${restaurant.theme.primary}33`,
                color: restaurant.theme.text,
              }}
            >
              <Sparkles
                className="w-4 h-4 shrink-0"
                style={{ color: restaurant.theme.primary }}
              />
              <span className="flex-1 leading-snug">
                {restaurant.promoBanner.text[lang]}
              </span>
              {restaurant.promoBanner.code && (
                <span
                  className="px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider shrink-0"
                  style={{
                    backgroundColor: restaurant.theme.primary,
                    color: "#FFFFFF",
                  }}
                >
                  {restaurant.promoBanner.code}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
