import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllClientSlugs, getClientConfig } from "@/lib/get-client";
import { ClientMenuWrapper } from "@/components/menu/ClientMenuWrapper";
import { MenuSkeleton } from "@/components/menu/MenuSkeleton";

interface PageProps {
  params: Promise<{
    client: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllClientSlugs();
  return slugs.map((slug) => ({
    client: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { client } = await params;
  const restaurant = getClientConfig(client);

  if (!restaurant) {
    return {
      title: "Menu Not Found",
    };
  }

  return {
    title: `${restaurant.name.en} | Digital QR Menu`,
    description: restaurant.tagline.en,
    openGraph: {
      title: restaurant.name.en,
      description: restaurant.tagline.en,
      images: [restaurant.coverImage],
    },
  };
}

export default async function MenuPage({ params }: PageProps) {
  const { client } = await params;
  const restaurant = getClientConfig(client);

  if (!restaurant) {
    notFound();
  }

  return (
    <Suspense fallback={<MenuSkeleton />}>
      <ClientMenuWrapper restaurant={restaurant} />
    </Suspense>
  );
}
