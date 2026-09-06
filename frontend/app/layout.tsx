import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// English display face — headings only.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

// English UI/body face — self-hosted, per the brief's licensed font files.
const manrope = localFont({
  src: [
    { path: "../public/fonts/manrope-regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/manrope-medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/manrope-semibold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/manrope-bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  fallback: ["sans-serif"],
});

// Persian face — self-hosted, per the brief's licensed font files.
const peyda = localFont({
  src: [
    { path: "../public/fonts/Peyda-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Peyda-Medium.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/Peyda-SemiBold.woff2", weight: "600", style: "normal" },
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
    <html
      lang="fa"
      dir="rtl"
      className={`${playfair.variable} ${manrope.variable} ${peyda.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
