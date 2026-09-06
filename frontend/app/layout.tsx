import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// English display + UI faces come from Google Fonts.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Peyda is not on Google Fonts — it must be self-hosted. Drop the licensed
// woff2 files into public/fonts/ (see public/fonts/README.md) before build;
// Tahoma is used as a graceful fallback until then.
const peyda = localFont({
  src: [
    { path: "../public/fonts/Peyda-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Peyda-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Peyda-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-peyda",
  fallback: ["Tahoma", "sans-serif"],
});

export const metadata: Metadata = {
  title: "بام ایران | Bam Iran",
  description: "تعریف تازه‌ای از زندگی لوکس — A new definition of luxury living.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${playfair.variable} ${inter.variable} ${peyda.variable}`}>
      <body>{children}</body>
    </html>
  );
}
