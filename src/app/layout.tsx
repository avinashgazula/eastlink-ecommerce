import { CartProvider } from "@/hooks/use-cart";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Eastlink Clothing | Premium Fashion from Nova Scotia",
  description: "Discover premium clothing engineered for connection. Modern design meets everyday comfort. Made in Nova Scotia.",
  keywords: "eastlink, clothing, fashion, nova scotia, premium apparel",
  openGraph: {
    title: "Eastlink Clothing",
    description: "Engineered for connection. Designed for comfort. Woven in Nova Scotia.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preload" as="font" href="https://fonts.googleapis.com" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
