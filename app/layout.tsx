import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Animated Digital Menu Platform",
  description: "Next-gen animated QR digital menu platform for restaurants and cafés with direct WhatsApp ordering.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
