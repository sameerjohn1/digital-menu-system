"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Plus, Minus, Flame, Sparkles, Leaf } from "lucide-react";
import { FoodItem, RestaurantTheme } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";

interface FoodCardProps {
  item: FoodItem;
  clientSlug: string;
  theme: RestaurantTheme;
  currencySymbol: string;
  lang: Language;
  onOpenDetail: (item: FoodItem) => void;
}

export function FoodCard({
  item,
  clientSlug,
  theme,
  currencySymbol,
  lang,
  onOpenDetail,
}: FoodCardProps) {
  const t = translations[lang];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cart = useCartStore((state) => state.getCart(clientSlug));
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const hasVariantsOrAddOns =
    (item.variants && item.variants.length > 0) ||
    (item.addOns && item.addOns.length > 0);

  // Find if simple item is in cart
  const simpleItemId = `${item.id}__v:none__a:`;
  const cartItem = cart.items.find((ci) => ci.id === simpleItemId);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const handleSimpleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.isSoldOut) return;

    if (hasVariantsOrAddOns) {
      onOpenDetail(item);
    } else {
      addItem(clientSlug, {
        foodId: item.id,
        name: item.name,
        image: item.image,
        basePrice: item.price,
      });
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(clientSlug, cartItem.id, 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      updateQuantity(clientSlug, cartItem.id, -1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onClick={() => onOpenDetail(item)}
      className={`group relative rounded-2xl p-3 sm:p-4 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex gap-3 sm:gap-4 overflow-hidden ${
        item.isSoldOut ? "opacity-65 grayscale-[30%]" : ""
      }`}
      style={{
        backgroundColor: theme.cardBg,
        borderColor: theme.border,
      }}
    >
      {/* Content side */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            {item.isPopular && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Flame className="w-2.5 h-2.5" />
                {t.popularBadge}
              </span>
            )}
            {item.isSpicy && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-600 dark:text-red-400">
                🌶️ {t.spicyBadge}
              </span>
            )}
            {item.isNew && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-2.5 h-2.5" />
                {t.newBadge}
              </span>
            )}
            {item.isVeg && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                <Leaf className="w-2.5 h-2.5" />
                {t.vegBadge}
              </span>
            )}
            {item.isSoldOut && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-500/20 text-zinc-600 dark:text-zinc-400">
                {t.soldOutBadge}
              </span>
            )}
          </div>

          <h3
            className="text-sm sm:text-base font-bold tracking-tight line-clamp-1 leading-snug group-hover:opacity-90 transition-opacity"
            style={{ color: theme.text }}
          >
            {item.name[lang]}
          </h3>

          <p
            className="text-xs line-clamp-2 mt-1 leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {item.description[lang]}
          </p>
        </div>

        {/* Price and Add button */}
        <div className="flex items-center justify-between gap-2 mt-3 pt-2">
          <div className="flex items-baseline gap-1">
            <span
              className="text-xs font-semibold"
              style={{ color: theme.primary }}
            >
              {currencySymbol}
            </span>
            <span
              className="text-base sm:text-lg font-extrabold tracking-tight"
              style={{ color: theme.text }}
            >
              {item.price.toLocaleString()}
            </span>
          </div>

          {/* Action Button */}
          {item.isSoldOut ? (
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-lg"
              style={{
                backgroundColor: `${theme.border}`,
                color: theme.textMuted,
              }}
            >
              {t.soldOutBadge}
            </span>
          ) : !hasVariantsOrAddOns && inCartQty > 0 ? (
            /* Morphing Stepper */
            <div
              className="flex items-center rounded-xl p-0.5 shadow-sm border"
              style={{
                backgroundColor: theme.surface,
                borderColor: theme.primary,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDecrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
                style={{ color: theme.primary }}
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span
                className="w-6 text-center text-xs font-bold font-mono"
                style={{ color: theme.text }}
              >
                {inCartQty}
              </span>
              <button
                onClick={handleIncrement}
                className="w-7 h-7 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
                style={{
                  backgroundColor: theme.primary,
                  color: "#FFFFFF",
                }}
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Standard Add Button */
            <button
              onClick={handleSimpleAdd}
              className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all duration-150 active:scale-95 shadow-sm"
              style={{
                backgroundColor: theme.primary,
                color: "#FFFFFF",
              }}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{hasVariantsOrAddOns ? t.customize : t.add}</span>
            </button>
          )}
        </div>
      </div>

      {/* Image side */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border"
        style={{ borderColor: theme.border }}
      >
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-800 animate-shimmer" />
        )}
        <Image
          src={
            imgError
              ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&h=300&q=80"
              : item.image
          }
          alt={item.name[lang]}
          fill
          className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgError(true);
            setImgLoaded(true);
          }}
          sizes="(max-width: 640px) 96px, 112px"
        />
      </div>
    </motion.div>
  );
}
