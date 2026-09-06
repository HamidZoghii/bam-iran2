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

  return (
    <div dir={dir(locale)} lang={locale} className="flex min-h-screen flex-col font-peyda">
      <Header locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={locale} />
    </div>
  );
}
