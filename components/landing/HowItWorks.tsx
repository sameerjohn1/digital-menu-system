import { QrCode, SlidersHorizontal, MessageSquareCode, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: QrCode,
      title: "1. Customer Scans Table QR",
      desc: "Each dining table gets a laminated, branded QR code. Guests simply scan with their native smartphone camera—no app download required.",
    },
    {
      step: "02",
      icon: SlidersHorizontal,
      title: "2. Explores & Customizes",
      desc: "Instant loading animated menu. Guests select food items, choose sizes and variants (e.g. Regular/Large), and pick delicious add-ons.",
    },
    {
      step: "03",
      icon: MessageSquareCode,
      title: "3. Order Lands on WhatsApp",
      desc: "With one tap, the full order—including Table #, items, variants, special instructions, and total sum—opens directly in your kitchen's WhatsApp.",
    },
  ];

  return (
    <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C]">
          Frictionless Experience
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
          How It Works in 3 Effortless Steps
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-3">
          Eliminate ordering delays, order-taking mistakes, and costly POS tablets.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-sm flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C8553D]/10 dark:bg-[#D4A24C]/15 flex items-center justify-center text-[#C8553D] dark:text-[#D4A24C]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 font-mono">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero technical setup for guests</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
