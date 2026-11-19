import { CartItem, OrderType, calculateCartTotals } from "./cart-store";
import { Language } from "./i18n";

export interface WhatsAppOrderData {
  restaurantName: string;
  whatsappNumber: string;
  currencySymbol: string;
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: string;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  specialInstructions?: string;
  lang?: Language;
}

export function buildWhatsAppMessage(data: WhatsAppOrderData): string {
  const {
    restaurantName,
    currencySymbol,
    items,
    orderType,
    tableNumber,
    customerName,
    customerPhone,
    deliveryAddress,
    specialInstructions,
    lang = "en",
  } = data;

  const isUrdu = lang === "ur";
  const { subtotal, deliveryFee, total } = calculateCartTotals(items, orderType);

  const lines: string[] = [];

  // Header
  let orderTypeHeader = "";
  if (orderType === "dine_in") {
    if (tableNumber && tableNumber.trim()) {
      orderTypeHeader = isUrdu ? `نیا آرڈر — میز نمبر ${tableNumber} (ڈائن ان)` : `New Order — Table ${tableNumber} (Dine-in)`;
    } else {
      orderTypeHeader = isUrdu ? `نیا آرڈر — ڈائن ان (ریسٹورنٹ)` : `New Order — Dine-in`;
    }
  } else if (orderType === "takeaway") {
    orderTypeHeader = isUrdu ? `نیا آرڈر — ٹیک اوے (پارسل)` : `New Order — Takeaway`;
  } else {
    orderTypeHeader = isUrdu ? `نیا آرڈر — ڈیلیوری` : `New Order — Delivery`;
  }

  lines.push(`🍽️ *${orderTypeHeader}*`);
  lines.push(`📍 *${restaurantName}*`);
  lines.push("──────────────────");

  // Customer details for Takeaway / Delivery
  if (customerName && customerName.trim()) {
    lines.push(`👤 *${isUrdu ? "گاہک کا نام" : "Customer"}:* ${customerName.trim()}`);
  }
  if (customerPhone && customerPhone.trim()) {
    lines.push(`📞 *${isUrdu ? "فون نمبر" : "Phone"}:* ${customerPhone.trim()}`);
  }
  if (orderType === "delivery" && deliveryAddress && deliveryAddress.trim()) {
    lines.push(`🏠 *${isUrdu ? "پتہ" : "Delivery Address"}:* ${deliveryAddress.trim()}`);
  }

  if ((customerName && customerName.trim()) || (orderType === "delivery" && deliveryAddress)) {
    lines.push("──────────────────");
  }

  // Items
  lines.push(isUrdu ? "*آرڈر آئٹمز:*" : "*Order Items:*");
  items.forEach((item) => {
    const itemName = isUrdu ? item.name.ur : item.name.en;
    const variantName = item.selectedVariant ? (isUrdu ? item.selectedVariant.name.ur : item.selectedVariant.name.en) : null;
    const addOnNames = item.selectedAddOns.map((a) => (isUrdu ? a.name.ur : a.name.en));

    let optionsStr = "";
    const optionsList: string[] = [];
    if (variantName) optionsList.push(variantName);
    if (addOnNames.length > 0) optionsList.push(addOnNames.join(", "));
    if (optionsList.length > 0) {
      optionsStr = ` (${optionsList.join(" + ")})`;
    }

    const itemTotal = (item.unitPrice * item.quantity).toLocaleString();
    lines.push(`• ${item.quantity}x ${itemName}${optionsStr} - ${currencySymbol} ${itemTotal}`);
  });

  lines.push("──────────────────");

  // Instructions
  if (specialInstructions && specialInstructions.trim()) {
    lines.push(`📝 *${isUrdu ? "خصوصی ہدایات" : "Special Instructions"}:* ${specialInstructions.trim()}`);
    lines.push("──────────────────");
  }

  // Financial Breakdown
  if (orderType === "delivery" && deliveryFee > 0) {
    lines.push(`${isUrdu ? "سب ٹوٹل" : "Subtotal"}: ${currencySymbol} ${subtotal.toLocaleString()}`);
    lines.push(`${isUrdu ? "ڈیلیوری فیس" : "Delivery Fee"}: ${currencySymbol} ${deliveryFee.toLocaleString()}`);
  }
  lines.push(`💰 *${isUrdu ? "کل رقم" : "Total"}: ${currencySymbol} ${total.toLocaleString()}*`);
  lines.push("──────────────────");
  lines.push(isUrdu ? "✨ اینیمیٹڈ ڈیجیٹل مینو کے ذریعے بھیجا گیا" : "✨ Sent via Animated Digital Menu Platform");

  return lines.join("\n");
}

export function createWhatsAppUrl(whatsappNumber: string, message: string): string {
  // Clean phone number: remove '+' or '-' or spaces
  const cleanNumber = whatsappNumber.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encoded}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    return false;
  }
}
