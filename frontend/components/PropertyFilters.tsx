import type { Locale, PropertyType, PurposeFit } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { properties } from "@/lib/properties";

// Server-rendered GET form — filtering works via the URL's query string
// (?type=&location=&budget=&purpose=), so results are filterable and
// shareable without any client-side JavaScript.
export default function PropertyFilters({
  locale,
  action,
  values,
  compact = false,
}: {
  locale: Locale;
  action: string;
  values?: { type?: string; location?: string; budget?: string; purpose?: string };
  compact?: boolean;
}) {
  const t = getDictionary(locale);

  const types: PropertyType[] = ["villa", "penthouse", "apartment", "tower", "residential-complex"];
  const locations = Array.from(
    new Set(properties.map((p) => (locale === "fa" ? p.location_fa : p.location_en)))
  );
  const purposes: { value: PurposeFit | ""; label: string }[] = [
    { value: "", label: t.filters.anyPurpose },
    { value: "residence", label: t.filters.residence },
    { value: "investment", label: t.filters.investment },
  ];
  const budgets = [
    { value: "", label: t.filters.anyBudget },
    { value: "0-150", label: locale === "fa" ? "تا ۱۵۰ میلیارد" : "Up to 150B" },
    { value: "150-300", label: locale === "fa" ? "۱۵۰ تا ۳۰۰ میلیارد" : "150B – 300B" },
    { value: "300-", label: locale === "fa" ? "بیش از ۳۰۰ میلیارد" : "300B and above" },
  ];

  const fieldClass =
    "w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none";

  return (
    <form
      action={action}
      method="GET"
      className={`grid gap-3 ${compact ? "grid-cols-2 md:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"}`}
    >
      <select name="type" defaultValue={values?.type ?? ""} className={fieldClass} aria-label={t.filters.type}>
        <option value="">{t.filters.allTypes}</option>
        {types.map((type) => (
          <option key={type} value={type}>{t.propertyTypes[type]}</option>
        ))}
      </select>

      <select name="location" defaultValue={values?.location ?? ""} className={fieldClass} aria-label={t.filters.location}>
        <option value="">{t.filters.allLocations}</option>
        {locations.map((location) => (
          <option key={location} value={location}>{location}</option>
        ))}
      </select>

      <select name="budget" defaultValue={values?.budget ?? ""} className={fieldClass} aria-label={t.filters.budget}>
        {budgets.map((b) => (
          <option key={b.value} value={b.value}>{b.label}</option>
        ))}
      </select>

      <select name="purpose" defaultValue={values?.purpose ?? ""} className={fieldClass} aria-label={t.filters.purpose}>
        {purposes.map((p) => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-ink px-6 py-3 text-sm text-paper transition hover:bg-ink/90"
      >
        {t.filters.search}
      </button>
    </form>
  );
}
