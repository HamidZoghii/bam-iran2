import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { getAgentBySlug, getPropertyBySlug, getSimilarProperties, properties } from "@/lib/properties";
import { formatArea, formatCount, formatPrice } from "@/lib/format";
import PropertyCard from "@/components/PropertyCard";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export default function PropertyDetailsPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const t = getDictionary(locale);
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const agent = getAgentBySlug(property.agentSlug);
  const similar = getSimilarProperties(property);

  const title = locale === "fa" ? property.title_fa : property.title_en;
  const location = locale === "fa" ? property.location_fa : property.location_en;
  const description = locale === "fa" ? property.description_fa : property.description_en;
  const amenities = locale === "fa" ? property.amenities_fa : property.amenities_en;
  const documentStatus = locale === "fa" ? property.documentStatus_fa : property.documentStatus_en;
  const architecturalNotes =
    locale === "fa" ? property.architecturalNotes_fa : property.architecturalNotes_en;

  const facts: [string, string][] = [
    [t.property.priceFrom, formatPrice(property, locale)],
    [t.property.areaLabel, formatArea(property.areaSqm, locale)],
    [t.property.bedroomsLabel, formatCount(property.bedrooms, locale)],
    [t.property.parkingLabel, formatCount(property.parkingSpaces, locale)],
    ...(property.floor !== undefined
      ? ([[t.property.floorLabel, formatCount(property.floor, locale)]] as [string, string][])
      : []),
    ...(property.yearBuilt
      ? ([[t.property.yearLabel, formatCount(property.yearBuilt, locale)]] as [string, string][])
      : []),
    [t.property.documentLabel, documentStatus],
  ];

  return (
    <div>
      {/* Gallery */}
      <section className="container-page pt-10">
        <p className="text-sm text-body/50">{location}</p>
        <h1 className="mt-1 font-display text-3xl text-ink md:text-4xl">{title}</h1>

        <div className="mt-8 grid gap-2 md:grid-cols-3 md:grid-rows-2">
          <div className="relative aspect-[4/3] overflow-hidden md:col-span-2 md:row-span-2">
            <Image src={property.images[0]} alt={title} fill className="object-cover" priority />
          </div>
          {property.images.slice(1, 3).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-14 grid gap-16 lg:grid-cols-[1fr_360px]">
        {/* Main column */}
        <div>
          <dl className="grid grid-cols-2 gap-y-5 border-y border-ink/10 py-6 sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-body/50">{label}</dt>
                <dd className="mt-1 text-sm text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">{t.property.aboutTitle}</h2>
            <p className="mt-4 max-w-prose text-base leading-8 text-body/80">{description}</p>
            {architecturalNotes && (
              <p className="mt-4 max-w-prose text-sm leading-7 text-body/60">{architecturalNotes}</p>
            )}
          </div>

          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">{t.property.amenitiesTitle}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-body/80 sm:grid-cols-3">
              {amenities.map((a) => (
                <li key={a} className="border-s border-gold/60 ps-3">{a}</li>
              ))}
            </ul>
          </div>

          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-xl text-ink">{t.property.similarTitle}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((p) => (
                  <PropertyCard key={p.slug} property={p} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — agent + CTAs */}
        <aside className="h-fit border border-ink/10 p-6">
          {agent && (
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-full">
                <Image
                  src={agent.photo}
                  alt={locale === "fa" ? agent.name_fa : agent.name_en}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-body/50">{t.property.agentTitle}</p>
                <p className="font-display text-base text-ink">
                  {locale === "fa" ? agent.name_fa : agent.name_en}
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-3">
            <Link
              href={`/${locale}/contact?property=${property.slug}&intent=consult`}
              className="block bg-ink px-5 py-3 text-center text-sm text-paper transition hover:bg-ink/90"
            >
              {t.cta.requestConsult}
            </Link>
            <Link
              href={`/${locale}/contact?property=${property.slug}&intent=visit`}
              className="block border border-ink px-5 py-3 text-center text-sm text-ink transition hover:bg-ink hover:text-paper"
            >
              {t.cta.requestVisit}
            </Link>
            {agent && (
              <a
                href={`https://wa.me/${agent.whatsapp.replace(/[^0-9]/g, "")}`}
                className="block text-center text-sm text-body/60 hover:text-ink"
              >
                {t.cta.whatsapp} · {agent.whatsapp}
              </a>
            )}
          </div>
        </aside>
      </section>
    </div>
  );
}
