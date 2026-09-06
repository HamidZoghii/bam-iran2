"use client";

import { useSearchParams } from "next/navigation";
import type { Locale, PropertyType, PurposeFit } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { properties } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";

// Reads the query string via useSearchParams (client-side only — static
// export has no server to read it on) and filters the already-bundled
// `properties` array. Must be rendered inside a <Suspense> boundary by its
// caller — Next.js requires that for any static route using this hook.
function matchesBudget(price: number, budget: string | null) {
  if (!budget) return true;
  const [minStr, maxStr] = budget.split("-");
  const min = Number(minStr || 0) * 1_000_000_000;
  const max = maxStr ? Number(maxStr) * 1_000_000_000 : Infinity;
  return price >= min && price <= max;
}

export default function PropertiesContent({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const location = searchParams.get("location");
  const budget = searchParams.get("budget");
  const purpose = searchParams.get("purpose");

  const filtered = properties.filter((p) => {
    const propLocation = locale === "fa" ? p.location_fa : p.location_en;
    const typeOk = !type || p.type === (type as PropertyType);
    const locationOk = !location || propLocation === location;
    const budgetOk = p.priceOnRequest ? true : matchesBudget(p.price, budget);
    const purposeOk = !purpose || p.purposeFit === (purpose as PurposeFit) || p.purposeFit === "both";
    return typeOk && locationOk && budgetOk && purposeOk;
  });

  return (
    <div className="container-page py-16">
      <h1 className="font-heading text-3xl text-ink md:text-4xl">{t.nav.properties}</h1>

      <div className="mt-8 border border-ink/10 bg-white/40 p-5 md:p-6">
        <PropertyFilters
          locale={locale}
          action={`/${locale}/properties`}
          values={{
            type: type ?? undefined,
            location: location ?? undefined,
            budget: budget ?? undefined,
            purpose: purpose ?? undefined,
          }}
        />
      </div>

      <p className="mt-8 text-sm text-body/50">
        {locale === "fa" ? `${filtered.length} ملک یافت شد` : `${filtered.length} properties found`}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.slug} property={property} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-dashed border-ink/20 p-12 text-center text-body/60">
          {locale === "fa"
            ? "با این فیلترها ملکی پیدا نشد. فیلترها را تغییر دهید یا با مشاوران بام ایران تماس بگیرید."
            : "No properties match these filters. Adjust them, or speak with a Bam Iran consultant directly."}
        </div>
      )}
    </div>
  );
}
