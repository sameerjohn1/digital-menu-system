"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Minus, Check, Flame, Leaf, Sparkles } from "lucide-react";
import { FoodItem, RestaurantTheme, Variant, AddOn } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";
import { useCartStore, SelectedOption } from "@/lib/cart-store";

interface ItemDetailSheetProps {
  item: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  clientSlug: string;
  theme: RestaurantTheme;
  currencySymbol: string;
  lang: Language;
}

function ItemDetailSheetContent({
  item,
  onClose,
  clientSlug,
  theme,
  currencySymbol,
  lang,
}: {
  item: FoodItem;
  onClose: () => void;
  clientSlug: string;
  theme: RestaurantTheme;
  currencySymbol: string;
  lang: Language;
}) {
  const t = translations[lang];
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    item.variants && item.variants.length > 0 ? item.variants[0] : undefined
  );
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [quantity, setQuantity] = useState(1);

  const basePrice = selectedVariant ? selectedVariant.price : item.price;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOn) => {
    const exists = selectedAddOns.some((a) => a.id === addon.id);
    if (exists) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    const variantOption: SelectedOption | undefined = selectedVariant
      ? {
          id: selectedVariant.id,
          name: selectedVariant.name,
          price: selectedVariant.price,
        }
      : undefined;

    const addOnOptions: SelectedOption[] = selectedAddOns.map((a) => ({
      id: a.id,
      name: a.name,
      price: a.price,
    }));

    addItem(clientSlug, {
      foodId: item.id,
      name: item.name,
      image: item.image,
      basePrice: item.price,
      selectedVariant: variantOption,
      selectedAddOns: addOnOptions,
      quantity,
    });

    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        drag="y"
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          if (info.offset.y > 140) {
            onClose();
          }
        }}
        className="fixed bottom-0 inset-x-0 z-50 max-w-lg mx-auto rounded-t-3xl border-t shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.border,
        }}
      >
        {/* Drag Handle Indicator */}
        <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing">
          <div
            className="w-12 h-1.5 rounded-full"
            style={{ backgroundColor: `${theme.textMuted}40` }}
          />
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 pt-1 space-y-5">
          {/* Header Image */}
          <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden border shadow-sm">
            <Image
              src={item.image}
              alt={item.name[lang]}
              fill
              className="object-cover"
              priority
            />
            <button
              onClick={onClose}
              className="absolute top-3 end-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md transition-transform active:scale-90"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Title & Description */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {item.isPopular && (
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Flame className="w-3 h-3" />
                  {t.popularBadge}
                </span>
              )}
              {item.isSpicy && (
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/10 text-red-600 dark:text-red-400">
                  🌶️ {t.spicyBadge}
                </span>
              )}
              {item.isNew && (
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-3 h-3" />
                  {t.newBadge}
                </span>
              )}
              {item.isVeg && (
                <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-500/10 text-green-600 dark:text-green-400">
                  <Leaf className="w-3 h-3" />
                  {t.vegBadge}
                </span>
              )}
            </div>

            <h2
              className="text-xl sm:text-2xl font-bold tracking-tight"
              style={{ color: theme.text }}
            >
              {item.name[lang]}
            </h2>

            <p
              className="text-sm mt-1.5 leading-relaxed"
              style={{ color: theme.textMuted }}
            >
              {item.description[lang]}
            </p>
          </div>

          {/* Variants Section */}
          {item.variants && item.variants.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: theme.border }}>
              <label
                className="block text-xs font-bold uppercase tracking-wider"
                style={{ color: theme.textMuted }}
              >
                {t.selectVariant}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isSelected ? "ring-2" : ""
                      }`}
                      style={{
                        backgroundColor: isSelected ? `${theme.primary}12` : theme.cardBg,
                        borderColor: isSelected ? theme.primary : theme.border,
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? "bg-white" : ""
                          }`}
                          style={{ borderColor: theme.primary }}
                        >
                          {isSelected && (
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: theme.primary }}
                            />
                          )}
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: theme.text }}
                        >
                          {v.name[lang]}
                        </span>
                      </div>
                      <span
                        className="text-sm font-bold font-mono"
                        style={{ color: theme.primary }}
                      >
                        {currencySymbol} {v.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-ons Section */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: theme.border }}>
              <label
                className="block text-xs font-bold uppercase tracking-wider"
                style={{ color: theme.textMuted }}
              >
                {t.selectAddOns}
              </label>
              <div className="grid grid-cols-1 gap-2">
                {item.addOns.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isChecked ? "ring-1" : ""
                      }`}
                      style={{
                        backgroundColor: isChecked ? `${theme.primary}10` : theme.cardBg,
                        borderColor: isChecked ? theme.primary : theme.border,
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? "text-white" : ""
                          }`}
                          style={{
                            backgroundColor: isChecked ? theme.primary : "transparent",
                            borderColor: isChecked ? theme.primary : theme.border,
                          }}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: theme.text }}
                        >
                          {addon.name[lang]}
                        </span>
                      </div>
                      <span
                        className="text-xs font-bold font-mono"
                        style={{ color: theme.textMuted }}
                      >
                        +{currencySymbol} {addon.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Bottom Actions Bar */}
        <div
          className="p-4 border-t flex items-center gap-3 backdrop-blur-md"
          style={{
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }}
        >
          {/* Quantity Stepper */}
          <div
            className="flex items-center rounded-xl p-1 border shadow-sm shrink-0"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.border,
            }}
          >
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ color: theme.text }}
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-8 text-center text-sm font-bold font-mono"
              style={{ color: theme.text }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
              style={{ color: theme.text }}
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
            style={{
              backgroundColor: theme.primary,
              color: "#FFFFFF",
            }}
          >
            <span>{t.addToCart}</span>
            <span className="font-mono">
              {currencySymbol} {totalPrice.toLocaleString()}
            </span>
          </button>
        </div>
      </motion.div>
    </>
  );
}

export function ItemDetailSheet(props: ItemDetailSheetProps) {
  return (
    <AnimatePresence>
      {props.isOpen && props.item && (
        <ItemDetailSheetContent
          key={props.item.id}
          {...props}
          item={props.item}
        />
      )}
    </AnimatePresence>
  );
}
