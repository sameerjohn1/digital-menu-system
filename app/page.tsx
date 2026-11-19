import type { Metadata } from "next";
import { LandingNav } from "@/components/landing/LandingNav";
import { LandingHero } from "@/components/landing/LandingHero";
import { InteractiveMockup } from "@/components/landing/InteractiveMockup";
import { QrScannerSection } from "@/components/landing/QrScannerSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeatureHighlights } from "@/components/landing/FeatureHighlights";
import { SavingsCalculator } from "@/components/landing/SavingsCalculator";
import { PricingSection } from "@/components/landing/PricingSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export const metadata: Metadata = {
  title: "Animated Digital Menu Platform | Next-Gen WhatsApp QR Menus",
  description:
    "Turn dining tables into instant WhatsApp orders. High-speed animated QR menus for restaurants, cafés, and bakeries with 0% commission.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0C0C0D] text-zinc-900 dark:text-zinc-100 antialiased selection:bg-[#C8553D] selection:text-white">
      <LandingNav />
      <main>
        <LandingHero />
        <InteractiveMockup />
        <QrScannerSection />
        <HowItWorks />
        <FeatureHighlights />
        <SavingsCalculator />
        <PricingSection />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
}
