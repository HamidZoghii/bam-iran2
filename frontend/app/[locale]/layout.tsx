import { notFound } from "next/navigation";
import type { Locale } from "@/types/property";
import { dir, isLocale, locales } from "@/lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;

  // Playfair Display has no Persian/Arabic glyphs, and Manrope wasn't built
  // with Persian in mind either — so which physical font backs "heading"
  // and "body" depends on locale. Peyda covers both roles in Persian (per
  // the brief); English splits the two the way the brief specifies.
  const fontVars =
    locale === "fa"
      ? { "--font-heading": "var(--font-peyda)", "--font-body": "var(--font-peyda)" }
      : { "--font-heading": "var(--font-playfair)", "--font-body": "var(--font-sans)" };

  return (
    <div
      dir={dir(locale)}
      lang={locale}
      style={fontVars as React.CSSProperties}
      className="flex min-h-screen flex-col font-body"
    >
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
