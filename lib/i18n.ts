export type Language = "en" | "ur";

export interface TranslationStrings {
  tableBadge: string;
  openNow: string;
  closed: string;
  opensAt: string;
  searchPlaceholder: string;
  searchTitle: string;
  noResults: string;
  tryDifferentSearch: string;
  clearSearch: string;
  allCategories: string;
  popularBadge: string;
  spicyBadge: string;
  newBadge: string;
  vegBadge: string;
  soldOutBadge: string;
  add: string;
  customize: string;
  selectVariant: string;
  selectAddOns: string;
  quantity: string;
  addToCart: string;
  itemAdded: string;
  viewCart: string;
  yourOrder: string;
  orderType: string;
  dineIn: string;
  takeaway: string;
  delivery: string;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  specialInstructions: string;
  instructionsPlaceholder: string;
  subtotal: string;
  deliveryFee: string;
  free: string;
  total: string;
  orderOnWhatsApp: string;
  copyOrder: string;
  copiedToClipboard: string;
  emptyCartTitle: string;
  emptyCartSubtitle: string;
  browseMenu: string;
  clearCart: string;
  whatsappNotice: string;
  getDirections: string;
  openingHours: string;
  address: string;
  contact: string;
  poweredBy: string;
  platformName: string;
  close: string;
  backToMenu: string;
  qrScannerTitle: string;
  qrScannerSubtitle: string;
  qrScannerBadge: string;
  qrScanning: string;
  qrScanned: string;
  qrSimulateScan: string;
  qrScanAgain: string;
  qrDownload: string;
  qrOpenGallery: string;
  qrDestination: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    tableBadge: "Table",
    openNow: "Open Now",
    closed: "Closed",
    opensAt: "Opens at",
    searchPlaceholder: "Search delicious food, drinks...",
    searchTitle: "Search Menu",
    noResults: "No dishes found",
    tryDifferentSearch: "Try searching with a different keyword or category.",
    clearSearch: "Clear search",
    allCategories: "All Items",
    popularBadge: "Popular",
    spicyBadge: "Spicy",
    newBadge: "New",
    vegBadge: "Veg",
    soldOutBadge: "Sold Out",
    add: "Add",
    customize: "Customize",
    selectVariant: "Choose Size / Variant",
    selectAddOns: "Extra Add-ons (Optional)",
    quantity: "Quantity",
    addToCart: "Add to Order",
    itemAdded: "Item added to cart",
    viewCart: "View Order",
    yourOrder: "Your Order",
    orderType: "Order Type",
    dineIn: "Dine-in",
    takeaway: "Takeaway",
    delivery: "Delivery",
    tableNumber: "Table Number",
    customerName: "Your Name",
    customerPhone: "Contact Number",
    deliveryAddress: "Delivery Address",
    specialInstructions: "Special Instructions",
    instructionsPlaceholder: "e.g. Less spicy, dressing on the side, extra napkins...",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    free: "FREE",
    total: "Grand Total",
    orderOnWhatsApp: "Order on WhatsApp",
    copyOrder: "Copy Order Details",
    copiedToClipboard: "Order details copied to clipboard!",
    emptyCartTitle: "Your cart is empty",
    emptyCartSubtitle: "Looks like you haven't added any appetizing dishes yet.",
    browseMenu: "Browse Menu",
    clearCart: "Clear Cart",
    whatsappNotice: "You will be redirected to WhatsApp to confirm and send your order directly to the kitchen.",
    getDirections: "Get Directions",
    openingHours: "Opening Hours",
    address: "Location & Address",
    contact: "Contact & Social",
    poweredBy: "Powered by",
    platformName: "Animated Digital Menu Platform",
    close: "Close",
    backToMenu: "Back to Menu",
    qrScannerTitle: "Scan to open this menu",
    qrScannerSubtitle: "Point your phone camera at the code. No app or typing needed.",
    qrScannerBadge: "Menu QR",
    qrScanning: "Scanning code...",
    qrScanned: "Menu ready on your phone",
    qrSimulateScan: "Simulate scan",
    qrScanAgain: "Scan again",
    qrDownload: "Download QR",
    qrOpenGallery: "QR Gallery",
    qrDestination: "Opens this menu",
  },
  ur: {
    tableBadge: "میز نمبر",
    openNow: "اب کھلا ہے",
    closed: "بند ہے",
    opensAt: "کھلنے کا وقت",
    searchPlaceholder: "کھانے اور مشروبات تلاش کریں...",
    searchTitle: "مینو میں تلاش کریں",
    noResults: "کوئی کھانا نہیں ملا",
    tryDifferentSearch: "کسی دوسرے نام یا کیٹیگری سے تلاش کیجیے۔",
    clearSearch: "تلاش ختم کریں",
    allCategories: "تمام کھانے",
    popularBadge: "مقبول ترین",
    spicyBadge: "چٹ پٹا",
    newBadge: "نیا",
    vegBadge: "سبزی",
    soldOutBadge: "ختم ہو گیا",
    add: "شامل کریں",
    customize: "ترتیب دیں",
    selectVariant: "سائز / قسم منتخب کریں",
    selectAddOns: "اضافی لوازمات (اختیاری)",
    quantity: "تعداد",
    addToCart: "آرڈر میں شامل کریں",
    itemAdded: "آئٹم کارٹ میں شامل ہو گیا",
    viewCart: "آرڈر دیکھیں",
    yourOrder: "آپ کا آرڈر",
    orderType: "آرڈر کی قسم",
    dineIn: "ڈائن ان (ریسٹورنٹ)",
    takeaway: "ٹیک اوے (لے جائیں)",
    delivery: "ڈیلیوری",
    tableNumber: "میز کا نمبر",
    customerName: "آپ کا نام",
    customerPhone: "رابطہ نمبر",
    deliveryAddress: "ڈیلیوری کا پتہ",
    specialInstructions: "خاص ہدایات",
    instructionsPlaceholder: "مثلاً: کم مصالحہ، اضافی چٹنی، ٹشو پیپر...",
    subtotal: "کل رقم",
    deliveryFee: "ڈیلیوری چارجز",
    free: "مفت",
    total: "مکمل رقم",
    orderOnWhatsApp: "واٹس ایپ پر آرڈر بھیجیں",
    copyOrder: "آرڈر کی تفصیل کاپی کریں",
    copiedToClipboard: "آرڈر کی تفصیلات کاپی ہو گئیں!",
    emptyCartTitle: "آپ کی کارٹ خالی ہے",
    emptyCartSubtitle: "لگتا ہے ابھی تک آپ نے کوئی لذیذ کھانا منتخب نہیں کیا۔",
    browseMenu: "مینو دیکھیں",
    clearCart: "کارٹ خالی کریں",
    whatsappNotice: "آپ کو واٹس ایپ پر منتقل کیا جائے گا جہاں آپ باورچی خانے کو براہِ راست آرڈر بھیج سکیں گے۔",
    getDirections: "راستہ دیکھیں (گوگل میپ)",
    openingHours: "اوقاتِ کار",
    address: "پتہ اور مقام",
    contact: "رابطہ اور سوشل میڈیا",
    poweredBy: "پیشکش",
    platformName: "اینیمیٹڈ ڈیجیٹل مینو پلیٹ فارم",
    close: "بند کریں",
    backToMenu: "مینو کی طرف",
    qrScannerTitle: "مینو کھولنے کے لیے اسکین کریں",
    qrScannerSubtitle: "اپنے فون کے کیمرے کو کوڈ پر رکھیں۔ کسی ایپ یا ٹائپنگ کی ضرورت نہیں۔",
    qrScannerBadge: "مینو QR",
    qrScanning: "کوڈ اسکین ہو رہا ہے...",
    qrScanned: "مینو آپ کے فون پر تیار ہے",
    qrSimulateScan: "اسکین کی نقل کریں",
    qrScanAgain: "دوبارہ اسکین کریں",
    qrDownload: "QR ڈاؤن لوڈ کریں",
    qrOpenGallery: "QR گیلری",
    qrDestination: "یہ مینو کھلتا ہے",
  },
};
