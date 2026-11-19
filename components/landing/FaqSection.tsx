"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const faqs = [
    {
      q: "Do my restaurant guests need to download an app or register?",
      a: "No! Guests simply open their phone camera, point it at the platform QR code, and that platform's menu opens immediately in their mobile browser in under one second.",
    },
    {
      q: "How does my kitchen receive orders?",
      a: "When a customer completes their selection and taps 'Order on WhatsApp', WhatsApp opens on their device with an automatically formatted message detailing items, variants, special instructions, and total sum. They press send, and it arrives directly in your kitchen's WhatsApp.",
    },
    {
      q: "Do you take any commission from our food sales?",
      a: "Never. We charge a flat setup and optional maintenance fee. 100% of order revenue goes directly to your restaurant without any middleman cuts.",
    },
    {
      q: "How do platform QR codes work?",
      a: "Each platform gets exactly one printable QR code that opens its own menu directly. If a menu link is manually opened with ?table=5, that table number is also added to the guest's WhatsApp message.",
    },
    {
      q: "Can we support Urdu and English simultaneously?",
      a: "Yes! Every single item, description, and UI button has bilingual support. Guests can switch between English and Urdu with a single tap without losing their cart items.",
    },
    {
      q: "How do we update items or mark something sold out?",
      a: "Every restaurant's data is stored in a structured JSON configuration. If you are on the Pro plan, you can simply text us on WhatsApp and we update it within hours.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-[#C8553D] dark:text-[#D4A24C]">
            Got Questions?
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2">
            Everything you need to know about our Animated Digital Menu Platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-zinc-900 dark:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
