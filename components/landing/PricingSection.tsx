import { Check, Sparkles, Phone } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Starter Launch",
      tagline: "Ideal for independent cafés, bistros & home chefs.",
      price: "Rs 24,999",
      billing: "One-time setup fee",
      popular: false,
      features: [
        "Full branded menu digitisation",
        "Custom restaurant colors & typography",
        "High-res printable QR codes for all tables",
        "Full English & Urdu bilingual translation",
        "Unlimited scans & zero commissions",
        "High-speed static hosting on Cloudflare",
        "Self-service JSON configuration guide",
      ],
      ctaText: "Launch Starter Menu",
      ctaLink: "https://wa.me/923001234567?text=Hi%2C%20I%20want%20to%20order%20the%20Starter%20Launch%20plan%20for%20my%20restaurant.",
    },
    {
      name: "Pro Growth",
      tagline: "For busy restaurants needing frequent updates.",
      price: "Rs 4,999",
      billing: "per month (+ Rs 19,999 initial setup)",
      popular: true,
      features: [
        "Everything in Starter Launch",
        "Monthly menu, item & pricing updates",
        "Seasonal specials & promotional banners",
        "Sold-out item toggling on demand",
        "High-priority WhatsApp support line",
        "Laminated QR table cards template pack",
        "Performance & order analytics report",
      ],
      ctaText: "Choose Pro Growth",
      ctaLink: "https://wa.me/923001234567?text=Hi%2C%20I%20want%20to%20order%20the%20Pro%20Growth%20plan%20for%20my%20restaurant.",
    },
    {
      name: "Enterprise Multi-Branch",
      tagline: "For restaurant groups & franchises.",
      price: "Custom",
      billing: "Volume based pricing",
      popular: false,
      features: [
        "Multiple branches with independent WhatsApp numbers",
        "Custom branded subdomains (menu.yourbrand.com)",
        "Unified brand asset management",
        "Dedicated account manager",
        "Staff training on WhatsApp order fulfillment",
        "SLA guaranteed 99.99% uptime",
      ],
      ctaText: "Contact for Enterprise",
      ctaLink: "https://wa.me/923001234567?text=Hi%2C%20I%20want%20to%20discuss%20the%20Enterprise%20plan%20for%20my%20restaurant%20chain.",
    },
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C]">
          Simple, Transparent Pricing
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
          Pay Once or Subscribe for Hassle-Free Updates
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
          No monthly subscription traps. No commission per order. You keep 100% of your earnings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`relative rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 ${
              p.popular
                ? "border-[#C8553D] dark:border-[#D4A24C] bg-white dark:bg-zinc-900 shadow-2xl scale-[1.03]"
                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C8553D] text-white shadow-md flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Most Popular
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {p.name}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-6">
                {p.tagline}
              </p>

              <div className="mb-6">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white font-mono">
                  {p.price}
                </span>
                <span className="block text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  {p.billing}
                </span>
              </div>

              <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                {p.features.map((f, fi) => (
                  <div key={fi} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href={p.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm text-center transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm ${
                p.popular
                  ? "bg-[#C8553D] hover:bg-[#B04630] text-white"
                  : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{p.ctaText}</span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
