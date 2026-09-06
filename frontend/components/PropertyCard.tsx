import Link from "next/link";
import Image from "next/image";
import type { Locale, Property } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { formatArea, formatCount, formatPrice } from "@/lib/format";

export default function PropertyCard({
  property,
  locale,
}: {
  property: Property;
  locale: Locale;
}) {
  const t = getDictionary(locale);
  const title = locale === "fa" ? property.title_fa : property.title_en;
  const location = locale === "fa" ? property.location_fa : property.location_en;

  return (
    <Link
      href={`/${locale}/properties/${property.slug}`}
      className="group block overflow-hidden border border-ink/10 bg-white/40 transition hover:border-ink/30"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        {property.featured && (
          <span className="absolute start-4 top-4 bg-ink/90 px-3 py-1 text-xs tracking-wide text-paper">
            {t.propertyTypes[property.type]}
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs text-body/50">{location}</p>
        <h3 className="mt-1 font-heading text-lg text-ink">{title}</h3>

        <div className="mt-4 flex items-center justify-between border-t border-ink/10 pt-4 text-sm">
          <span className="text-gold">{formatPrice(property, locale)}</span>
          <span className="text-body/60">
            {formatCount(property.bedrooms, locale)} · {formatArea(property.areaSqm, locale)}
          </span>
        </div>
      </div>
    </Link>
  );
}
