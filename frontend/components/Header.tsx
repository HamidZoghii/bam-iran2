import Link from "next/link";
import type { Locale } from "@/types/property";
import { getDictionary, dir } from "@/lib/dictionaries";

export default function Header({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const otherLocale: Locale = locale === "fa" ? "en" : "fa";

  const navItems = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/properties`, label: t.nav.properties },
    { href: `/${locale}/investment`, label: t.nav.investment },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href={`/${locale}`}
          className="font-display text-xl font-semibold tracking-tightish text-ink"
        >
          {t.brand}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-body/80 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={`/${otherLocale}`}
            className="hidden text-sm text-body/60 hover:text-ink sm:inline"
            aria-label="Switch language"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-none border border-ink px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-paper"
          >
            {t.cta.primaryConsult}
          </Link>
        </div>
      </div>
    </header>
  );
}
