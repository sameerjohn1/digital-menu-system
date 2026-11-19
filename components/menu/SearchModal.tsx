"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Plus, UtensilsCrossed } from "lucide-react";
import { FoodItem, Category, RestaurantTheme } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: FoodItem[];
  categories: Category[];
  theme: RestaurantTheme;
  currencySymbol: string;
  lang: Language;
  onSelectItem: (item: FoodItem) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  items,
  categories,
  theme,
  currencySymbol,
  lang,
  onSelectItem,
}: SearchModalProps) {
  const t = translations[lang];
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const q = query.trim().toLowerCase();
      const matchCategory = !selectedCategoryId || item.categoryId === selectedCategoryId;
      if (!matchCategory) return false;
      if (!q) return true;

      const nameEn = item.name.en.toLowerCase();
      const nameUr = item.name.ur.toLowerCase();
      const descEn = item.description.en.toLowerCase();
      const descUr = item.description.ur.toLowerCase();

      return (
        nameEn.includes(q) ||
        nameUr.includes(q) ||
        descEn.includes(q) ||
        descUr.includes(q)
      );
    });
  }, [items, query, selectedCategoryId]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-xl mx-auto h-[90vh] sm:h-[80vh] rounded-t-3xl sm:rounded-3xl border flex flex-col overflow-hidden shadow-2xl"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {/* Header & Search Input */}
          <div
            className="p-4 border-b space-y-3"
            style={{ borderColor: theme.border }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                }}
              >
                <Search
                  className="w-4 h-4 shrink-0"
                  style={{ color: theme.textMuted }}
                />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent text-sm focus:outline-none placeholder:text-zinc-400 font-medium"
                  style={{ color: theme.text }}
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-2.5 rounded-xl border shrink-0 transition-transform active:scale-95 text-xs font-semibold"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                }}
              >
                {t.close}
              </button>
            </div>

            {/* Quick Filter category tags */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedCategoryId === null ? "text-white" : ""
                }`}
                style={{
                  backgroundColor: selectedCategoryId === null ? theme.primary : theme.cardBg,
                  borderColor: selectedCategoryId === null ? theme.primary : theme.border,
                  color: selectedCategoryId === null ? "#FFFFFF" : theme.textMuted,
                }}
              >
                {t.allCategories}
              </button>
              {categories.map((c) => {
                const isSelected = selectedCategoryId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategoryId(isSelected ? null : c.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                      isSelected ? "text-white" : ""
                    }`}
                    style={{
                      backgroundColor: isSelected ? theme.primary : theme.cardBg,
                      borderColor: isSelected ? theme.primary : theme.border,
                      color: isSelected ? "#FFFFFF" : theme.textMuted,
                    }}
                  >
                    {c.name[lang]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <UtensilsCrossed
                    className="w-7 h-7"
                    style={{ color: theme.primary }}
                  />
                </div>
                <h4
                  className="text-base font-bold"
                  style={{ color: theme.text }}
                >
                  {t.noResults}
                </h4>
                <p
                  className="text-xs max-w-xs mt-1"
                  style={{ color: theme.textMuted }}
                >
                  {t.tryDifferentSearch}
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm"
                  style={{
                    backgroundColor: theme.cardBg,
                    borderColor: theme.border,
                  }}
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border"
                    style={{ borderColor: theme.border }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name[lang]}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h5
                      className="text-sm font-bold truncate"
                      style={{ color: theme.text }}
                    >
                      {item.name[lang]}
                    </h5>
                    <p
                      className="text-xs line-clamp-1 mt-0.5"
                      style={{ color: theme.textMuted }}
                    >
                      {item.description[lang]}
                    </p>
                    <span
                      className="text-xs font-bold font-mono mt-1 inline-block"
                      style={{ color: theme.primary }}
                    >
                      {currencySymbol} {item.price.toLocaleString()}
                    </span>
                  </div>

                  <button
                    className="p-2 rounded-xl text-white shadow-sm shrink-0"
                    style={{ backgroundColor: theme.primary }}
                    aria-label={t.add}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
