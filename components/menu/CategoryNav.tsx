"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Category, RestaurantTheme } from "@/lib/menu-schema";
import { Language } from "@/lib/i18n";
import {
  Coffee,
  Sandwich,
  Egg,
  Cake,
  GlassWater,
  Flame,
  Utensils,
  Sparkles,
  Wine,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  theme: RestaurantTheme;
  lang: Language;
}

const iconMap: Record<string, LucideIcon> = {
  Coffee,
  Sandwich,
  Egg,
  Cake,
  GlassWater,
  Flame,
  Utensils,
  Sparkles,
  Wine,
  HeartHandshake,
};

export function CategoryNav({
  categories,
  activeCategoryId,
  onSelectCategory,
  theme,
  lang,
}: CategoryNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view horizontally smoothly
  useEffect(() => {
    if (activeTabRef.current && containerRef.current) {
      const container = containerRef.current;
      const tab = activeTabRef.current;
      const containerWidth = container.clientWidth;
      const tabOffset = tab.offsetLeft;
      const tabWidth = tab.clientWidth;

      container.scrollTo({
        left: tabOffset - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeCategoryId]);

  return (
    <div
      className="sticky top-16 z-20 w-full border-b backdrop-blur-md transition-all py-2.5"
      style={{
        backgroundColor: `${theme.background}F0`,
        borderColor: theme.border,
      }}
    >
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto px-4 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          const IconComponent = cat.icon ? iconMap[cat.icon] : null;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeTabRef : null}
              onClick={() => onSelectCategory(cat.id)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 transition-colors shrink-0 z-10 ${
                isActive ? "text-white" : ""
              }`}
              style={{
                color: isActive ? "#FFFFFF" : theme.textMuted,
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 rounded-xl -z-10 shadow-sm"
                  style={{ backgroundColor: theme.primary }}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              {IconComponent && (
                <IconComponent
                  className="w-3.5 h-3.5"
                  style={{ color: isActive ? "#FFFFFF" : theme.primary }}
                />
              )}
              <span>{cat.name[lang]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
