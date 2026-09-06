import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { properties, investmentOpportunities } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);
  const featured = properties.filter((p) => p.featured).slice(0, 6);

  return (
    <div>
      {/* Hero — one cinematic moment, not a template of stacked effects */}
      <section className="relative flex min-h-[86vh] items-end overflow-hidden bg-ink">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <div className="container-page relative pb-16 pt-40 text-paper">
          <p className="text-sm text-gold">{t.home.heroKicker}</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight md:text-6xl">
            {t.home.heroHeadline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-paper/75">{t.home.heroSub}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-paper px-7 py-3 text-sm text-ink transition hover:bg-gold hover:text-ink"
            >
              {t.cta.primaryConsult}
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="text-sm text-paper underline underline-offset-4 hover:text-gold"
            >
              {t.cta.secondaryBrowse}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick search — overlaps the hero/body seam */}
      <section className="container-page -mt-10 relative z-10">
        <div className="border border-ink/10 bg-paper p-5 shadow-[0_1px_0_rgba(17,24,39,0.05)] md:p-6">
          <p className="mb-3 text-sm text-body/60">{t.home.searchTitle}</p>
          <PropertyFilters locale={locale} action={`/${locale}/properties`} compact />
        </div>
      </section>

      {/* Featured properties */}
      <section className="container-page mt-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl text-ink md:text-3xl">{t.home.featuredTitle}</h2>
          <Link href={`/${locale}/properties`} className="text-sm text-body/60 hover:text-ink">
            {t.cta.viewAll}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <PropertyCard key={property.slug} property={property} locale={locale} />
          ))}
        </div>
      </section>

      {/* Why Bam Iran — editorial two-column, not an icon-feature grid */}
      <section className="container-page mt-28 grid gap-12 md:grid-cols-2 md:gap-20">
        <h2 className="font-display text-3xl leading-snug text-ink md:text-4xl">
          {t.home.whyTitle}
        </h2>
        <div>
          <p className="max-w-prose text-base leading-8 text-body/80">{t.home.whyBody}</p>
        </div>
      </section>

      {/* Investment preview */}
      <section className="container-page mt-28">
        <h2 className="mb-8 font-display text-2xl text-ink md:text-3xl">
          {t.home.investmentTitle}
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {investmentOpportunities.map((op) => {
            const title = locale === "fa" ? op.title_fa : op.title_en;
            const summary = locale === "fa" ? op.summary_fa : op.summary_en;
            const tag = locale === "fa" ? op.tag_fa : op.tag_en;
            return (
              <Link
                key={op.slug}
                href={`/${locale}/investment`}
                className="group grid grid-cols-[minmax(0,120px)_1fr] gap-5 border border-ink/10 p-5 transition hover:border-ink/30 sm:grid-cols-[160px_1fr]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={op.image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="text-xs text-gold">{tag}</p>
                  <p className="mt-1 font-display text-lg text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-7 text-body/70">{summary}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="container-page my-28">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-ink/10 pt-12 md:flex-row md:items-end">
          <p className="max-w-md font-display text-2xl text-ink">{t.tagline}</p>
          <Link
            href={`/${locale}/contact`}
            className="bg-ink px-7 py-3 text-sm text-paper transition hover:bg-ink/90"
          >
            {t.cta.primaryConsult}
          </Link>
        </div>
      </section>
    </div>
  );
}
