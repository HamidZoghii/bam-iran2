// Data model mirrors the "final brief" data model section (Property, Agent,
// InvestmentOpportunity). Bilingual fields carry an _fa and _en suffix so a
// future API can serve either language from the same record.

export type Locale = "fa" | "en";

export type PropertyType =
  | "villa"
  | "penthouse"
  | "apartment"
  | "tower"
  | "residential-complex";

export type ProjectStatus = "ready" | "under-construction";

export type PurposeFit = "residence" | "investment" | "both";

export interface Agent {
  slug: string;
  name_fa: string;
  name_en: string;
  title_fa: string;
  title_en: string;
  bio_fa: string;
  bio_en: string;
  photo: string;
  phone: string;
  whatsapp: string;
}

export interface Property {
  slug: string;
  title_fa: string;
  title_en: string;
  type: PropertyType;
  location_fa: string;
  location_en: string;
  price: number; // Toman, approximate — displayed with "شروع قیمت از" framing
  priceOnRequest?: boolean;
  areaSqm: number;
  bedrooms: number;
  parkingSpaces: number;
  floor?: number;
  yearBuilt?: number;
  amenities_fa: string[];
  amenities_en: string[];
  documentStatus_fa: string;
  documentStatus_en: string;
  projectStatus: ProjectStatus;
  purposeFit: PurposeFit;
  featured: boolean;
  architecturalNotes_fa?: string;
  architecturalNotes_en?: string;
  description_fa: string;
  description_en: string;
  images: string[];
  agentSlug: string;
  lat?: number;
  lng?: number;
}

export interface InvestmentOpportunity {
  slug: string;
  title_fa: string;
  title_en: string;
  summary_fa: string;
  summary_en: string;
  tag_fa: string; // e.g. "فرصت ویژه" — never "حراج"/"تخفیف"
  tag_en: string;
  relatedPropertySlug?: string;
  image: string;
}
