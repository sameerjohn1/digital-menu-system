"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Search } from "lucide-react";
import { RestaurantConfig } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";

interface MenuHeaderProps {
  restaurant: RestaurantConfig;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenSearch: () => void;
  tableNumber?: string;
}

export function MenuHeader({
  restaurant,
  lang,
  onLanguageChange,
  onOpenSearch,
  tableNumber,
}: MenuHeaderProps) {
  const t = translations[lang];

  return (
    <header
      className="sticky top-0 z-30 w-full backdrop-blur-md transition-all duration-200 border-b"
      style={{
        backgroundColor: `${restaurant.theme.surface}EE`,
        borderColor: restaurant.theme.border,
      }}
    >
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Left: Brand info */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border"
            style={{ borderColor: restaurant.theme.border }}
          >
            <Image
              src={restaurant.logo}
              alt={restaurant.name[lang]}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1
              className="text-sm font-bold truncate leading-tight"
              style={{ color: restaurant.theme.text }}
            >
              {restaurant.name[lang]}
            </h1>
            {tableNumber && (
              <span
                className="inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full mt-0.5"
                style={{
                  backgroundColor: `${restaurant.theme.primary}1A`,
                  color: restaurant.theme.primary,
                }}
              >
                {t.tableBadge} {tableNumber}
              </span>
            )}
          </div>
        </div>

        {/* Right: Actions (Search + Language switcher) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl transition-all duration-200 active:scale-95 border"
            style={{
              backgroundColor: restaurant.theme.cardBg,
              borderColor: restaurant.theme.border,
              color: restaurant.theme.text,
            }}
            aria-label={t.searchTitle}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Toggle */}
          <div
            className="flex items-center p-1 rounded-xl border relative"
            style={{
              backgroundColor: restaurant.theme.background,
              borderColor: restaurant.theme.border,
            }}
          >
            <button
              onClick={() => onLanguageChange("en")}
              className={`relative px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors z-10 ${
                lang === "en" ? "text-white" : ""
              }`}
              style={{
                color: lang === "en" ? "#FFFFFF" : restaurant.theme.textMuted,
              }}
            >
              {lang === "en" && (
                <motion.div
                  layoutId="langToggleIndicator"
                  className="absolute inset-0 rounded-lg -z-10 shadow-sm"
                  style={{ backgroundColor: restaurant.theme.primary }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              EN
            </button>

            <button
              onClick={() => onLanguageChange("ur")}
              className={`relative px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors z-10 ${
                lang === "ur" ? "text-white" : ""
              }`}
              style={{
                color: lang === "ur" ? "#FFFFFF" : restaurant.theme.textMuted,
              }}
            >
              {lang === "ur" && (
                <motion.div
                  layoutId="langToggleIndicator"
                  className="absolute inset-0 rounded-lg -z-10 shadow-sm"
                  style={{ backgroundColor: restaurant.theme.primary }}
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
              اردو
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
