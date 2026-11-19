"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { RestaurantConfig } from "@/lib/menu-schema";
import { Language } from "@/lib/i18n";

interface SplashScreenProps {
  restaurant: RestaurantConfig;
  lang: Language;
}

export function SplashScreen({ restaurant, lang }: SplashScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem(`splash_seen_${restaurant.slug}`);
    if (seen) {
      const frame = requestAnimationFrame(() => setShow(false));
      return () => cancelAnimationFrame(frame);
    }

    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(`splash_seen_${restaurant.slug}`, "true");
    }, 1400);

    return () => clearTimeout(timer);
  }, [restaurant.slug]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6"
          style={{ backgroundColor: restaurant.theme.background }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="relative w-24 h-24 mb-6 rounded-3xl overflow-hidden shadow-2xl p-1 border"
              style={{
                borderColor: restaurant.theme.border,
                backgroundColor: restaurant.theme.surface,
              }}
            >
              <Image
                src={restaurant.logo}
                alt={restaurant.name[lang]}
                fill
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl font-bold tracking-tight mb-2"
              style={{ color: restaurant.theme.text }}
            >
              {restaurant.name[lang]}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-sm max-w-xs"
              style={{ color: restaurant.theme.textMuted }}
            >
              {restaurant.tagline[lang]}
            </motion.p>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
              className="h-1 rounded-full mt-6"
              style={{ backgroundColor: restaurant.theme.primary }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
