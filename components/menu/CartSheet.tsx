"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  Send,
  AlertCircle,
  MapPin,
  Utensils,
  ShoppingBag,
  Bike,
} from "lucide-react";
import { RestaurantConfig } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";
import { useCartStore, calculateCartTotals, OrderType } from "@/lib/cart-store";
import { buildWhatsAppMessage, createWhatsAppUrl, copyToClipboard } from "@/lib/whatsapp";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: RestaurantConfig;
  lang: Language;
}

export function CartSheet({
  isOpen,
  onClose,
  restaurant,
  lang,
}: CartSheetProps) {
  const t = translations[lang];
  const clientSlug = restaurant.slug;

  const cart = useCartStore((state) => state.getCart(clientSlug));
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const setOrderType = useCartStore((state) => state.setOrderType);
  const setTableNumber = useCartStore((state) => state.setTableNumber);
  const setCustomerInfo = useCartStore((state) => state.setCustomerInfo);
  const clearCart = useCartStore((state) => state.clearCart);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { subtotal, deliveryFee, total, count } = calculateCartTotals(
    cart.items,
    cart.orderType
  );

  const handleCopyOrder = async () => {
    const text = buildWhatsAppMessage({
      restaurantName: restaurant.name[lang],
      whatsappNumber: restaurant.whatsappNumber,
      currencySymbol: restaurant.currency.symbol,
      items: cart.items,
      orderType: cart.orderType,
      tableNumber: cart.tableNumber,
      customerName: cart.customerName,
      customerPhone: cart.customerPhone,
      deliveryAddress: cart.deliveryAddress,
      specialInstructions: cart.specialInstructions,
      lang,
    });

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppOrder = () => {
    const text = buildWhatsAppMessage({
      restaurantName: restaurant.name[lang],
      whatsappNumber: restaurant.whatsappNumber,
      currencySymbol: restaurant.currency.symbol,
      items: cart.items,
      orderType: cart.orderType,
      tableNumber: cart.tableNumber,
      customerName: cart.customerName,
      customerPhone: cart.customerPhone,
      deliveryAddress: cart.deliveryAddress,
      specialInstructions: cart.specialInstructions,
      lang,
    });

    const url = createWhatsAppUrl(restaurant.whatsappNumber, text);
    window.open(url, "_blank");
  };

  const orderTypes: { id: OrderType; label: string; icon: typeof Utensils }[] = [
    { id: "dine_in", label: t.dineIn, icon: Utensils },
    { id: "takeaway", label: t.takeaway, icon: ShoppingBag },
    { id: "delivery", label: t.delivery, icon: Bike },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Slide-up Sheet */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 320 }}
          className="relative z-10 w-full max-w-lg mx-auto rounded-t-3xl border-t shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
          style={{
            backgroundColor: restaurant.theme.surface,
            borderColor: restaurant.theme.border,
          }}
        >
          {/* Header */}
          <div
            className="p-4 border-b flex items-center justify-between"
            style={{ borderColor: restaurant.theme.border }}
          >
            <div className="flex items-center gap-2">
              <h3
                className="text-lg font-bold"
                style={{ color: restaurant.theme.text }}
              >
                {t.yourOrder}
              </h3>
              {count > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold font-mono text-white"
                  style={{ backgroundColor: restaurant.theme.primary }}
                >
                  {count}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {cart.items.length > 0 && (
                <button
                  onClick={() => clearCart(clientSlug)}
                  className="p-2 rounded-xl text-zinc-400 hover:text-red-500 transition-colors"
                  title={t.clearCart}
                  aria-label={t.clearCart}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-xl border transition-transform active:scale-90"
                style={{
                  backgroundColor: restaurant.theme.cardBg,
                  borderColor: restaurant.theme.border,
                  color: restaurant.theme.text,
                }}
                aria-label={t.close}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {cart.items.length === 0 ? (
              /* Empty state */
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${restaurant.theme.primary}15` }}
                >
                  <ShoppingBag
                    className="w-8 h-8"
                    style={{ color: restaurant.theme.primary }}
                  />
                </div>
                <h4
                  className="text-base font-bold"
                  style={{ color: restaurant.theme.text }}
                >
                  {t.emptyCartTitle}
                </h4>
                <p
                  className="text-xs max-w-xs mt-1"
                  style={{ color: restaurant.theme.textMuted }}
                >
                  {t.emptyCartSubtitle}
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm"
                  style={{ backgroundColor: restaurant.theme.primary }}
                >
                  {t.browseMenu}
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Selector */}
                <div className="space-y-2">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: restaurant.theme.textMuted }}
                  >
                    {t.orderType}
                  </label>
                  <div
                    className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl border"
                    style={{
                      backgroundColor: restaurant.theme.cardBg,
                      borderColor: restaurant.theme.border,
                    }}
                  >
                    {orderTypes.map((type) => {
                      const isSelected = cart.orderType === type.id;
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setOrderType(clientSlug, type.id)}
                          className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all ${
                            isSelected ? "text-white shadow-sm" : ""
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? restaurant.theme.primary
                              : "transparent",
                            color: isSelected
                              ? "#FFFFFF"
                              : restaurant.theme.textMuted,
                          }}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dine-In Table Field */}
                {cart.orderType === "dine_in" && (
                  <div
                    className="p-3.5 rounded-2xl border space-y-1.5"
                    style={{
                      backgroundColor: restaurant.theme.cardBg,
                      borderColor: restaurant.theme.border,
                    }}
                  >
                    <label
                      className="block text-xs font-bold"
                      style={{ color: restaurant.theme.text }}
                    >
                      {t.tableNumber}
                    </label>
                    <input
                      type="text"
                      value={cart.tableNumber}
                      onChange={(e) => setTableNumber(clientSlug, e.target.value)}
                      placeholder="e.g. 5"
                      className="w-full px-3 py-2 rounded-xl border text-sm font-semibold focus:outline-none"
                      style={{
                        backgroundColor: restaurant.theme.surface,
                        borderColor: restaurant.theme.border,
                        color: restaurant.theme.text,
                      }}
                    />
                  </div>
                )}

                {/* Delivery Fields */}
                {cart.orderType === "delivery" && (
                  <div
                    className="p-3.5 rounded-2xl border space-y-3"
                    style={{
                      backgroundColor: restaurant.theme.cardBg,
                      borderColor: restaurant.theme.border,
                    }}
                  >
                    <div>
                      <label
                        className="block text-xs font-bold mb-1"
                        style={{ color: restaurant.theme.text }}
                      >
                        {t.customerName}
                      </label>
                      <input
                        type="text"
                        value={cart.customerName}
                        onChange={(e) =>
                          setCustomerInfo(clientSlug, {
                            customerName: e.target.value,
                          })
                        }
                        placeholder="e.g. Ali Ahmed"
                        className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                        style={{
                          backgroundColor: restaurant.theme.surface,
                          borderColor: restaurant.theme.border,
                          color: restaurant.theme.text,
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-bold mb-1"
                        style={{ color: restaurant.theme.text }}
                      >
                        {t.customerPhone}
                      </label>
                      <input
                        type="tel"
                        value={cart.customerPhone}
                        onChange={(e) =>
                          setCustomerInfo(clientSlug, {
                            customerPhone: e.target.value,
                          })
                        }
                        placeholder="e.g. 0300 1234567"
                        className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                        style={{
                          backgroundColor: restaurant.theme.surface,
                          borderColor: restaurant.theme.border,
                          color: restaurant.theme.text,
                        }}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-xs font-bold mb-1 flex items-center gap-1"
                        style={{ color: restaurant.theme.text }}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        {t.deliveryAddress}
                      </label>
                      <textarea
                        rows={2}
                        value={cart.deliveryAddress}
                        onChange={(e) =>
                          setCustomerInfo(clientSlug, {
                            deliveryAddress: e.target.value,
                          })
                        }
                        placeholder="House / Apartment #, Street, Area..."
                        className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none resize-none"
                        style={{
                          backgroundColor: restaurant.theme.surface,
                          borderColor: restaurant.theme.border,
                          color: restaurant.theme.text,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Takeaway Fields */}
                {cart.orderType === "takeaway" && (
                  <div
                    className="p-3.5 rounded-2xl border space-y-3"
                    style={{
                      backgroundColor: restaurant.theme.cardBg,
                      borderColor: restaurant.theme.border,
                    }}
                  >
                    <div>
                      <label
                        className="block text-xs font-bold mb-1"
                        style={{ color: restaurant.theme.text }}
                      >
                        {t.customerName}
                      </label>
                      <input
                        type="text"
                        value={cart.customerName}
                        onChange={(e) =>
                          setCustomerInfo(clientSlug, {
                            customerName: e.target.value,
                          })
                        }
                        placeholder="e.g. Sarah Khan"
                        className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                        style={{
                          backgroundColor: restaurant.theme.surface,
                          borderColor: restaurant.theme.border,
                          color: restaurant.theme.text,
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-xs font-bold mb-1"
                        style={{ color: restaurant.theme.text }}
                      >
                        {t.customerPhone}
                      </label>
                      <input
                        type="tel"
                        value={cart.customerPhone}
                        onChange={(e) =>
                          setCustomerInfo(clientSlug, {
                            customerPhone: e.target.value,
                          })
                        }
                        placeholder="e.g. 0321 9876543"
                        className="w-full px-3 py-2 rounded-xl border text-sm focus:outline-none"
                        style={{
                          backgroundColor: restaurant.theme.surface,
                          borderColor: restaurant.theme.border,
                          color: restaurant.theme.text,
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Cart Items List */}
                <div className="space-y-2.5">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider"
                    style={{ color: restaurant.theme.textMuted }}
                  >
                    {t.yourOrder}
                  </label>
                  <AnimatePresence>
                    {cart.items.map((item) => {
                      const itemTotal = item.unitPrice * item.quantity;
                      return (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                          transition={{ duration: 0.2 }}
                          className="p-3 rounded-2xl border flex items-center gap-3"
                          style={{
                            backgroundColor: restaurant.theme.cardBg,
                            borderColor: restaurant.theme.border,
                          }}
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border"
                            style={{ borderColor: restaurant.theme.border }}
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
                              className="text-xs sm:text-sm font-bold truncate"
                              style={{ color: restaurant.theme.text }}
                            >
                              {item.name[lang]}
                            </h5>

                            {/* Variant / Add-on subtitles */}
                            <div className="text-[11px] space-y-0.5 mt-0.5"
                              style={{ color: restaurant.theme.textMuted }}
                            >
                              {item.selectedVariant && (
                                <p className="truncate">
                                  {item.selectedVariant.name[lang]}
                                </p>
                              )}
                              {item.selectedAddOns.length > 0 && (
                                <p className="truncate">
                                  + {item.selectedAddOns.map((a) => a.name[lang]).join(", ")}
                                </p>
                              )}
                            </div>

                            <span
                              className="text-xs font-bold font-mono mt-1 inline-block"
                              style={{ color: restaurant.theme.primary }}
                            >
                              {restaurant.currency.symbol} {itemTotal.toLocaleString()}
                            </span>
                          </div>

                          {/* Stepper & Trash */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <div
                              className="flex items-center rounded-xl p-0.5 border"
                              style={{
                                backgroundColor: restaurant.theme.surface,
                                borderColor: restaurant.theme.border,
                              }}
                            >
                              <button
                                onClick={() => updateQuantity(clientSlug, item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
                                style={{ color: restaurant.theme.text }}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span
                                className="w-6 text-center text-xs font-bold font-mono"
                                style={{ color: restaurant.theme.text }}
                              >
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(clientSlug, item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center rounded-lg active:scale-90 transition-transform"
                                style={{ color: restaurant.theme.text }}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(clientSlug, item.id)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Special Instructions */}
                <div>
                  <label
                    className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                    style={{ color: restaurant.theme.textMuted }}
                  >
                    {t.specialInstructions}
                  </label>
                  <textarea
                    rows={2}
                    value={cart.specialInstructions}
                    onChange={(e) =>
                      setCustomerInfo(clientSlug, {
                        specialInstructions: e.target.value,
                      })
                    }
                    placeholder={t.instructionsPlaceholder}
                    className="w-full px-3 py-2 rounded-xl border text-xs focus:outline-none resize-none"
                    style={{
                      backgroundColor: restaurant.theme.cardBg,
                      borderColor: restaurant.theme.border,
                      color: restaurant.theme.text,
                    }}
                  />
                </div>

                {/* Price Breakdown */}
                <div
                  className="p-3.5 rounded-2xl border space-y-2 text-xs"
                  style={{
                    backgroundColor: restaurant.theme.cardBg,
                    borderColor: restaurant.theme.border,
                  }}
                >
                  <div className="flex justify-between" style={{ color: restaurant.theme.textMuted }}>
                    <span>{t.subtotal}</span>
                    <span className="font-mono font-semibold">
                      {restaurant.currency.symbol} {subtotal.toLocaleString()}
                    </span>
                  </div>

                  {cart.orderType === "delivery" && (
                    <div className="flex justify-between" style={{ color: restaurant.theme.textMuted }}>
                      <span>{t.deliveryFee}</span>
                      <span className="font-mono font-semibold">
                        {deliveryFee > 0
                          ? `${restaurant.currency.symbol} ${deliveryFee.toLocaleString()}`
                          : t.free}
                      </span>
                    </div>
                  )}

                  <div
                    className="pt-2 border-t flex justify-between text-sm sm:text-base font-extrabold"
                    style={{
                      borderColor: restaurant.theme.border,
                      color: restaurant.theme.text,
                    }}
                  >
                    <span>{t.total}</span>
                    <span className="font-mono" style={{ color: restaurant.theme.primary }}>
                      {restaurant.currency.symbol} {total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Notice */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] leading-relaxed">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{t.whatsappNotice}</span>
                </div>
              </>
            )}
          </div>

          {/* Bottom Actions */}
          {cart.items.length > 0 && (
            <div
              className="p-4 border-t space-y-2 backdrop-blur-md"
              style={{
                backgroundColor: restaurant.theme.surface,
                borderColor: restaurant.theme.border,
              }}
            >
              {/* WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-lg active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{t.orderOnWhatsApp}</span>
                <span className="font-mono font-extrabold ms-1">
                  ({restaurant.currency.symbol} {total.toLocaleString()})
                </span>
              </button>

              {/* Fallback Copy Order Button */}
              <button
                onClick={handleCopyOrder}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all active:scale-[0.99]"
                style={{
                  backgroundColor: restaurant.theme.cardBg,
                  borderColor: restaurant.theme.border,
                  color: restaurant.theme.text,
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-bold">{t.copiedToClipboard}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{t.copyOrder}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
