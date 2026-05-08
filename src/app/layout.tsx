import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutModeGate } from "./components/LayoutModeGate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Veeya Bhanushali — AI Engineer & Builder",
  description:
    "Builder at the intersection of AI and decisions that matter. Shipping Bridge, leading Applied Engineering @ SJSU, building for Bloom Energy.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <LayoutModeGate />
        {children}
      </body>
    </html>
  );
}
