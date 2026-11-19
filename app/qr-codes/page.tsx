import type { Metadata } from "next";
import { QrGallery } from "@/components/qr/QrGallery";
import { getAllClients } from "@/lib/get-client";
import { getMenuUrl, getSiteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "QR Codes | Animated Digital Menu",
  description: "Download one QR code for each configured platform menu.",
};

export default function QrCodesPage() {
  const baseUrl = getSiteUrl();
  const businesses = getAllClients().map((client) => ({
    slug: client.slug,
    name: client.name.en,
    nameUr: client.name.ur,
    tagline: client.tagline.en,
    logo: client.logo,
    primaryColor: client.theme.primary,
    whatsapp: client.whatsappNumber,
    url: getMenuUrl(client.slug),
  }));

  return <QrGallery businesses={businesses} baseUrl={baseUrl} />;
}
