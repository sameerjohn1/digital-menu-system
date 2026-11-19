"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { RestaurantConfig, FoodItem } from "@/lib/menu-schema";
import { Language } from "@/lib/i18n";
import { useCartStore } from "@/lib/cart-store";
import { SplashScreen } from "./SplashScreen";
import { MenuHeader } from "./MenuHeader";
import { HeroBanner } from "./HeroBanner";
import { CategoryNav } from "./CategoryNav";
import { FoodCard } from "./FoodCard";
import { ItemDetailSheet } from "./ItemDetailSheet";
import { SearchModal } from "./SearchModal";
import { CartBar } from "./CartBar";
import { CartSheet } from "./CartSheet";
import { RestaurantFooter } from "./RestaurantFooter";

interface ClientMenuWrapperProps {
  restaurant: RestaurantConfig;
}

export function ClientMenuWrapper({ restaurant }: ClientMenuWrapperProps) {
  const searchParams = useSearchParams();
  const rawTableParam = searchParams.get("table");
  const tableParam =
    rawTableParam && /^\d+$/.test(rawTableParam) ? rawTableParam : undefined;

  const [lang, setLang] = useState<Language>("en");
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    restaurant.categories[0]?.id || ""
  );
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const setTableNumber = useCartStore((state) => state.setTableNumber);

  useEffect(() => {
    setTableNumber(restaurant.slug, tableParam ?? "");
  }, [tableParam, restaurant.slug, setTableNumber]);

  // Scroll spy to detect active category
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = restaurant.categories.length - 1; i >= 0; i--) {
        const cat = restaurant.categories[i];
        const sectionEl = document.getElementById(`category-${cat.id}`);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveCategoryId(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [restaurant.categories]);

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryId(categoryId);
    const target = document.getElementById(`category-${categoryId}`);
    if (target) {
      const offsetTop = target.offsetTop - 110;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      dir={lang === "ur" ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-200 ${
        lang === "ur" ? "font-urdu" : ""
      }`}
      style={{
        backgroundColor: restaurant.theme.background,
        color: restaurant.theme.text,
      }}
    >
      {/* 1. Splash Screen */}
      <SplashScreen restaurant={restaurant} lang={lang} />

      {/* 2. Sticky Header */}
      <MenuHeader
        restaurant={restaurant}
        lang={lang}
        onLanguageChange={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
        tableNumber={tableParam}
      />

      <main className="pb-24">
        {/* 3. Hero Cover & Profile */}
        <HeroBanner restaurant={restaurant} lang={lang} />

        {/* 4. Sticky Category Navigation */}
        <div className="mt-6">
          <CategoryNav
            categories={restaurant.categories}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
            theme={restaurant.theme}
            lang={lang}
          />
        </div>

        {/* 5. Food Categories & Items */}
        <div className="max-w-2xl mx-auto px-4 mt-6 space-y-10">
          {restaurant.categories.map((category) => {
            const categoryItems = restaurant.items.filter(
              (item) => item.categoryId === category.id
            );

            if (categoryItems.length === 0) return null;

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className="scroll-mt-28 space-y-3.5"
              >
                <div className="flex items-center justify-between pb-1">
                  <h3
                    className="text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: restaurant.theme.text }}
                  >
                    {category.name[lang]}
                  </h3>
                  <span
                    className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${restaurant.theme.primary}15`,
                      color: restaurant.theme.primary,
                    }}
                  >
                    {categoryItems.length}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3.5">
                  {categoryItems.map((item) => (
                    <FoodCard
                      key={item.id}
                      item={item}
                      clientSlug={restaurant.slug}
                      theme={restaurant.theme}
                      currencySymbol={restaurant.currency.symbol}
                      lang={lang}
                      onOpenDetail={(it) => setSelectedItem(it)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* 6. Footer info */}
        <RestaurantFooter restaurant={restaurant} lang={lang} />
      </main>

      {/* 7. Floating Cart Bar */}
      <CartBar
        clientSlug={restaurant.slug}
        theme={restaurant.theme}
        currencySymbol={restaurant.currency.symbol}
        lang={lang}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* 8. Item Detail Bottom Sheet */}
      <ItemDetailSheet
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        clientSlug={restaurant.slug}
        theme={restaurant.theme}
        currencySymbol={restaurant.currency.symbol}
        lang={lang}
      />

      {/* 9. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        items={restaurant.items}
        categories={restaurant.categories}
        theme={restaurant.theme}
        currencySymbol={restaurant.currency.symbol}
        lang={lang}
        onSelectItem={(item) => setSelectedItem(item)}
      />

      {/* 10. Cart Drawer / Sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        restaurant={restaurant}
        lang={lang}
      />
    </div>
  );
}
