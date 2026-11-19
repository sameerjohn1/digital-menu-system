"use client";

import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { RestaurantTheme } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";
import { useCartStore, calculateCartTotals } from "@/lib/cart-store";

interface CartBarProps {
  clientSlug: string;
  theme: RestaurantTheme;
  currencySymbol: string;
  lang: Language;
  onOpenCart: () => void;
}

export function CartBar({
  clientSlug,
  theme,
  currencySymbol,
  lang,
  onOpenCart,
}: CartBarProps) {
  const t = translations[lang];
  const cart = useCartStore((state) => state.getCart(clientSlug));
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  // If not hydrated yet or cart is empty, do not show
  if (!hasHydrated || cart.items.length === 0) return null;

  const { total, count } = calculateCartTotals(cart.items, cart.orderType);

  const isRTL = lang === "ur";
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 inset-x-0 z-30 px-4 max-w-lg mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className="pointer-events-auto shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-3 border backdrop-blur-lg"
          style={{
            backgroundColor: theme.primary,
            borderColor: `${theme.accent}66`,
            color: "#FFFFFF",
          }}
          onClick={onOpenCart}
          role="button"
          tabIndex={0}
        >
          {/* Left: Bag Icon & Item count badge */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 text-white" />
              <motion.span
                key={count}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-white text-zinc-900 font-extrabold text-[11px] flex items-center justify-center shadow-md font-mono"
              >
                {count}
              </motion.span>
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-white/80 block">
                {t.yourOrder}
              </span>
              <span className="text-sm font-bold flex items-center gap-1 text-white">
                {t.viewCart}
                <ArrowIcon className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Right: Total price */}
          <div className="text-end">
            <span className="text-xs text-white/80 block">
              {t.total}
            </span>
            <span className="text-base sm:text-lg font-black tracking-tight font-mono text-white">
              {currencySymbol} {total.toLocaleString()}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
