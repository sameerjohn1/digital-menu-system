"use client";

import { MapPin, Clock, Phone, ExternalLink, Globe, Sparkles } from "lucide-react";
import { RestaurantConfig } from "@/lib/menu-schema";
import { Language, translations } from "@/lib/i18n";
import Link from "next/link";

interface RestaurantFooterProps {
  restaurant: RestaurantConfig;
  lang: Language;
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function RestaurantFooter({ restaurant, lang }: RestaurantFooterProps) {
  const t = translations[lang];

  return (
    <footer
      className="w-full border-t mt-12 py-10 px-4 transition-colors"
      style={{
        backgroundColor: restaurant.theme.surface,
        borderColor: restaurant.theme.border,
      }}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Brand statement */}
        <div className="space-y-2">
          <h3
            className="text-lg font-bold"
            style={{ color: restaurant.theme.text }}
          >
            {restaurant.name[lang]}
          </h3>
          <p
            className="text-xs sm:text-sm leading-relaxed"
            style={{ color: restaurant.theme.textMuted }}
          >
            {restaurant.tagline[lang]}
          </p>
          <p
            className="text-xs leading-relaxed"
            style={{ color: restaurant.theme.textMuted }}
          >
            {restaurant.description[lang]}
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
          {/* Address */}
          <div className="space-y-1.5">
            <div
              className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
              style={{ color: restaurant.theme.text }}
            >
              <MapPin className="w-3.5 h-3.5" style={{ color: restaurant.theme.primary }} />
              <span>{t.address}</span>
            </div>
            <p style={{ color: restaurant.theme.textMuted }} className="leading-relaxed">
              {restaurant.address[lang]}
            </p>
            <a
              href={restaurant.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold hover:underline mt-1"
              style={{ color: restaurant.theme.primary }}
            >
              <span>{t.getDirections}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Opening Hours */}
          <div className="space-y-1.5">
            <div
              className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
              style={{ color: restaurant.theme.text }}
            >
              <Clock className="w-3.5 h-3.5" style={{ color: restaurant.theme.primary }} />
              <span>{t.openingHours}</span>
            </div>
            <p style={{ color: restaurant.theme.textMuted }}>
              {restaurant.openingHours.days[lang]}
            </p>
            <p className="font-semibold font-mono" style={{ color: restaurant.theme.text }}>
              {restaurant.openingHours.open} — {restaurant.openingHours.close}
            </p>
          </div>
        </div>

        {/* Socials & WhatsApp */}
        <div
          className="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: restaurant.theme.border }}
        >
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${restaurant.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{
                backgroundColor: restaurant.theme.cardBg,
                borderColor: restaurant.theme.border,
                color: restaurant.theme.text,
              }}
            >
              <Phone className="w-3.5 h-3.5" style={{ color: "#25D366" }} />
              <span>WhatsApp</span>
            </a>

            {restaurant.socialLinks?.instagram && (
              <a
                href={restaurant.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border transition-colors"
                style={{
                  backgroundColor: restaurant.theme.cardBg,
                  borderColor: restaurant.theme.border,
                  color: restaurant.theme.textMuted,
                }}
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            )}

            {restaurant.socialLinks?.facebook && (
              <a
                href={restaurant.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border transition-colors"
                style={{
                  backgroundColor: restaurant.theme.cardBg,
                  borderColor: restaurant.theme.border,
                  color: restaurant.theme.textMuted,
                }}
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            )}

            {restaurant.socialLinks?.website && (
              <a
                href={restaurant.socialLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border transition-colors"
                style={{
                  backgroundColor: restaurant.theme.cardBg,
                  borderColor: restaurant.theme.border,
                  color: restaurant.theme.textMuted,
                }}
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Platform Attribution */}
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80"
            style={{ color: restaurant.theme.textMuted }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: restaurant.theme.primary }} />
            <span>{t.poweredBy}</span>
            <span className="font-bold underline decoration-dotted" style={{ color: restaurant.theme.text }}>
              {t.platformName}
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
