import {
  Sparkles,
  Percent,
  Languages,
  Layers,
  Zap,
  Sliders,
} from "lucide-react";

export function FeatureHighlights() {
  const features = [
    {
      icon: Sparkles,
      title: "Interactive Bottom Sheets & Animations",
      desc: "Butter-smooth Framer Motion bottom sheet for variants, sizes, and extra toppings. Feels like a high-end native iOS/Android app.",
    },
    {
      icon: Percent,
      title: "0% Commission, Direct Profits",
      desc: "Stop sacrificing 25%–35% of your margins to third-party delivery aggregators. Orders flow straight into your own WhatsApp.",
    },
    {
      icon: Languages,
      title: "Bilingual English & Urdu RTL Support",
      desc: "Native Noto Nastaliq Urdu typography with mirrored layout and natural translations. Reach every customer effortlessly.",
    },
    {
      icon: Sliders,
      title: "Variants, Add-ons & Badges",
      desc: "Upsell premium toppings, extra cheese, sizes, or iced versions. Mark items as Popular, Spicy, Veg, or Sold-Out with one click.",
    },
    {
      icon: Layers,
      title: "Platform QR & Dine-in / Takeaway / Delivery",
      desc: "One QR per platform opens the right menu instantly. A manual ?table=5 link still tags the order for your waitstaff and kitchen.",
    },
    {
      icon: Zap,
      title: "Sub-Second Static Loading",
      desc: "Hosted on Cloudflare Pages edge network. No database latency or server crashes during busy weekend peak hours.",
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C]">
            Enterprise-Grade Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
            Built to Maximize Table Turnover & Revenue
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
            Every feature is engineered to speed up ordering, reduce staff load, and delight your guests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-[#C8553D]/50 dark:hover:border-[#D4A24C]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-[#C8553D] dark:text-[#D4A24C] mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
