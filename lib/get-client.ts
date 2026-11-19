import { RestaurantConfig, RestaurantConfigSchema } from "./menu-schema";
import demoCafeData from "@/data/clients/demo-cafe.json";
import royalBbqData from "@/data/clients/royal-bbq.json";
import firestonePizzaData from "@/data/clients/firestone-pizza.json";
import darkBistroData from "@/data/clients/dark-bistro.json";

const clientsRegistry: Record<string, unknown> = {
  "demo-cafe": demoCafeData,
  "royal-bbq": royalBbqData,
  "firestone-pizza": firestonePizzaData,
  "dark-bistro": darkBistroData,
};

export function getAllClientSlugs(): string[] {
  return Object.keys(clientsRegistry);
}

export function getAllClients(): RestaurantConfig[] {
  return Object.entries(clientsRegistry)
    .map(([slug, rawData]) => {
      const result = RestaurantConfigSchema.safeParse(rawData);
      if (!result.success) {
        console.error(`[Zod Error in getAllClients] ${slug}:`, result.error.format());
        return null;
      }
      return result.data;
    })
    .filter((c): c is RestaurantConfig => c !== null);
}

export function getClientConfig(slug: string): RestaurantConfig | null {
  const rawData = clientsRegistry[slug];
  if (!rawData) {
    return null;
  }

  const result = RestaurantConfigSchema.safeParse(rawData);
  if (!result.success) {
    console.error(`[Zod Validation Error] Invalid configuration for client "${slug}":`, result.error.format());
    return null;
  }

  return result.data;
}
