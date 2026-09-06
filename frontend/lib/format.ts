import type { Locale, Property } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";

const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toPersianDigits(value: number | string) {
  return String(value).replace(/[0-9]/g, (d) => persianDigits[Number(d)]);
}

// Prices are stored in Toman. Luxury real estate is conventionally quoted in
// billions ("میلیارد تومان"), so that's the unit shown — never the raw integer.
export function formatPrice(property: Property, locale: Locale) {
  const t = getDictionary(locale);
  if (property.priceOnRequest) return t.property.priceOnRequest;

  const billions = Math.round((property.price / 1_000_000_000) * 10) / 10;
  return locale === "fa"
    ? `${toPersianDigits(billions)} میلیارد تومان`
    : `${billions}B Toman`;
}

export function formatArea(areaSqm: number, locale: Locale) {
  return locale === "fa" ? `${toPersianDigits(areaSqm)} متر` : `${areaSqm} m²`;
}

export function formatCount(value: number, locale: Locale) {
  return locale === "fa" ? toPersianDigits(value) : String(value);
}
