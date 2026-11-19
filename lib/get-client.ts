import fs from "node:fs";
import path from "node:path";
import { RestaurantConfig, RestaurantConfigSchema } from "./menu-schema";

const clientsDir = path.join(process.cwd(), "data", "clients");

export function getAllClients(): RestaurantConfig[] {
  if (!fs.existsSync(clientsDir)) {
    return [];
  }

  return fs
    .readdirSync(clientsDir)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .flatMap((file) => {
      const filePath = path.join(clientsDir, file);

      try {
        const rawData: unknown = JSON.parse(fs.readFileSync(filePath, "utf8"));
        const result = RestaurantConfigSchema.safeParse(rawData);

        if (!result.success) {
          console.error(`[Config Error] Invalid business configuration in ${file}:`, result.error.format());
          return [];
        }

        const expectedSlug = path.basename(file, ".json");
        if (result.data.slug !== expectedSlug) {
          console.error(
            `[Config Error] ${file} declares slug "${result.data.slug}" but the filename expects "${expectedSlug}".`
          );
          return [];
        }

        return [result.data];
      } catch (error) {
        console.error(`[Config Error] Could not load ${file}:`, error);
        return [];
      }
    });
}

export function getAllClientSlugs(): string[] {
  return getAllClients().map((client) => client.slug);
}

export function getClientConfig(slug: string): RestaurantConfig | null {
  return getAllClients().find((client) => client.slug === slug) ?? null;
}
