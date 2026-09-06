import Link from "next/link";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <footer className="mt-24 border-t border-ink/10 bg-ink text-paper/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg text-paper">{t.brand}</p>
          <p className="mt-3 max-w-xs text-sm leading-7 text-paper/60">{t.tagline}</p>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-paper/50">{t.nav.properties}</p>
          <ul className="space-y-2">
            <li><Link href={`/${locale}/properties`} className="hover:text-gold">{t.nav.properties}</Link></li>
            <li><Link href={`/${locale}/investment`} className="hover:text-gold">{t.nav.investment}</Link></li>
            <li><Link href={`/${locale}/about`} className="hover:text-gold">{t.nav.about}</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="mb-3 text-paper/50">{t.nav.contact}</p>
          <ul className="space-y-2 text-paper/70">
            <li>{t.contact.hours}</li>
            <li><Link href={`/${locale}/contact`} className="hover:text-gold">{t.cta.requestConsult}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 py-6 text-center text-xs text-paper/40">
        {t.footer.rights}
      </div>
    </footer>
  );
}
