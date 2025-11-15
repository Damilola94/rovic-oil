import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// @ts-ignore - allow importing global CSS without type declarations
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rovic - Admin Dashboard",
  description:
    "Rovic Oil & Gas Admin Dashboard – manage business operations, monitor performance, and stay on top of key business insights.",
  keywords:
    "rovic, oil and gas, admin dashboard, analytics, management, business operations",
  authors: [{ name: "Rovic Oil & Gas" }],
  creator: "Rovic Oil & Gas",
  publisher: "Rovic Oil & Gas",
  metadataBase: new URL("https://rovic.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
      </body>
    </html>
  );
}
