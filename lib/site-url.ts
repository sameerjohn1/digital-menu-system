import siteConfig from "@/config/site.json";

function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/+$/, "");
}

export const DEFAULT_SITE_URL = normalizeBaseUrl(siteConfig.productionUrl);

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_MENU_BASE_URL?.trim();
  return normalizeBaseUrl(configured || siteConfig.productionUrl);
}

export function getMenuUrl(slug: string, table?: number | string): string {
  const base = `${getSiteUrl()}/`;
  const url = new URL(`menu/${slug}`, base);

  if (table !== undefined && String(table).trim() !== "") {
    url.searchParams.set("table", String(table));
  }

  return url.toString();
}
