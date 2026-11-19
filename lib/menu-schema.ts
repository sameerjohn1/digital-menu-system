import { z } from "zod";

export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  ur: z.string().min(1),
});

export const VariantSchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  price: z.number().nonnegative(),
});

export const AddOnSchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  price: z.number().nonnegative(),
});

export const FoodItemSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: LocalizedTextSchema,
  description: LocalizedTextSchema,
  price: z.number().nonnegative(),
  image: z.string(),
  isPopular: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  isNew: z.boolean().optional(),
  isVeg: z.boolean().optional(),
  isSoldOut: z.boolean().optional(),
  variants: z.array(VariantSchema).optional(),
  addOns: z.array(AddOnSchema).optional(),
});

export const CategorySchema = z.object({
  id: z.string(),
  name: LocalizedTextSchema,
  icon: z.string().optional(),
  description: LocalizedTextSchema.optional(),
});

export const RestaurantThemeSchema = z.object({
  primary: z.string(),
  primaryHover: z.string().optional(),
  accent: z.string(),
  background: z.string(),
  surface: z.string(),
  text: z.string(),
  textMuted: z.string(),
  cardBg: z.string(),
  border: z.string(),
  mode: z.enum(["light", "dark"]).default("light"),
  fontHeading: z.string().optional(),
});

export const OpeningHoursSchema = z.object({
  days: LocalizedTextSchema,
  open: z.string(), // "11:00" in 24h format
  close: z.string(), // "23:30" in 24h format
});

export const PromoBannerSchema = z.object({
  active: z.boolean(),
  text: LocalizedTextSchema,
  code: z.string().optional(),
});

export const RestaurantConfigSchema = z.object({
  slug: z.string(),
  name: LocalizedTextSchema,
  tagline: LocalizedTextSchema,
  description: LocalizedTextSchema,
  whatsappNumber: z.string().regex(/^\d+$/, "WhatsApp number must contain only digits including country code"),
  currency: z.object({
    code: z.string(),
    symbol: z.string(),
    symbolUr: z.string(),
  }),
  logo: z.string(),
  coverImage: z.string(),
  theme: RestaurantThemeSchema,
  openingHours: OpeningHoursSchema,
  address: LocalizedTextSchema,
  googleMapsUrl: z.string().url(),
  socialLinks: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
  }).optional(),
  promoBanner: PromoBannerSchema.optional(),
  tables: z.array(z.number().int().positive()).default([]),
  categories: z.array(CategorySchema).min(1),
  items: z.array(FoodItemSchema).min(1),
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;
export type Variant = z.infer<typeof VariantSchema>;
export type AddOn = z.infer<typeof AddOnSchema>;
export type FoodItem = z.infer<typeof FoodItemSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type RestaurantTheme = z.infer<typeof RestaurantThemeSchema>;
export type OpeningHours = z.infer<typeof OpeningHoursSchema>;
export type PromoBanner = z.infer<typeof PromoBannerSchema>;
export type RestaurantConfig = z.infer<typeof RestaurantConfigSchema>;
