import type { Locale } from "@/types/property";

export const locales: Locale[] = ["fa", "en"];
export const defaultLocale: Locale = "fa";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function dir(locale: Locale) {
  return locale === "fa" ? "rtl" : "ltr";
}

const dictionary = {
  fa: {
    brand: "بام ایران",
    tagline: "تعریف تازه‌ای از زندگی لوکس",
    nav: {
      home: "خانه",
      properties: "املاک",
      about: "درباره ما",
      investment: "سرمایه‌گذاری",
      contact: "تماس",
    },
    cta: {
      primaryConsult: "درخواست مشاوره اختصاصی",
      secondaryBrowse: "مشاهده املاک منتخب",
      requestVisit: "درخواست بازدید",
      requestConsult: "درخواست مشاوره",
      whatsapp: "واتساپ",
      call: "تماس مستقیم",
      viewProperty: "مشاهده ملک",
      viewAll: "مشاهده همه املاک",
    },
    home: {
      heroKicker: "املاک لوکس و فرصت‌های سرمایه‌گذاری",
      heroHeadline: "بام ایران فقط ملک نمی‌فروشد؛ تعریف تازه‌ای از زندگی لوکس ارائه می‌دهد.",
      heroSub:
        "مجموعه‌ای منتخب از املاک خاص تهران و شمال کشور، همراه با مشاوره تخصصی برای خریداران و سرمایه‌گذاران.",
      searchTitle: "ملک بعدی خود را پیدا کنید",
      featuredTitle: "املاک منتخب بام ایران",
      whyTitle: "چرا بام ایران؟",
      whyBody:
        "بام ایران فقط فهرستی از املاک ندارد؛ بلکه مجموعه‌ای منتخب از فرصت‌های ملکی را همراه با تجربه، مشاوره و نگاه سرمایه‌گذاری ارائه می‌کند.",
      investmentTitle: "فرصت‌های سرمایه‌گذاری",
    },
    filters: {
      type: "نوع ملک",
      location: "موقعیت",
      budget: "بودجه",
      purpose: "هدف",
      allTypes: "همه انواع",
      allLocations: "همه مناطق",
      anyBudget: "هر بودجه‌ای",
      anyPurpose: "سکونت یا سرمایه‌گذاری",
      residence: "سکونت",
      investment: "سرمایه‌گذاری",
      search: "جستجو",
    },
    propertyTypes: {
      villa: "ویلا",
      penthouse: "پنت‌هاوس",
      apartment: "آپارتمان لوکس",
      tower: "برج",
      "residential-complex": "مجتمع مسکونی لوکس",
    },
    property: {
      priceOnRequest: "قیمت: استعلامی",
      priceFrom: "قیمت",
      areaLabel: "متراژ",
      bedroomsLabel: "اتاق خواب",
      parkingLabel: "پارکینگ",
      floorLabel: "طبقه",
      yearLabel: "سال ساخت",
      documentLabel: "وضعیت سند",
      amenitiesTitle: "امکانات",
      aboutTitle: "درباره این ملک",
      agentTitle: "مشاور مسئول",
      similarTitle: "املاک مشابه",
      statusReady: "آماده تحویل",
      statusUnderConstruction: "در حال ساخت",
    },
    forms: {
      name: "نام و نام خانوادگی",
      phone: "شماره تماس",
      budget: "بودجه تقریبی",
      area: "منطقه موردنظر",
      purpose: "هدف از خرید",
      message: "توضیحات",
      preferredTime: "زمان پیشنهادی بازدید",
      submitConsult: "ثبت درخواست مشاوره",
      submitVisit: "ثبت درخواست بازدید",
      submitted: "درخواست شما ثبت شد. مشاور بام ایران به‌زودی با شما تماس می‌گیرد.",
    },
    about: {
      title: "درباره بام ایران",
      lead:
        "بام ایران یک مجموعه تخصصی در حوزه املاک لوکس و سرمایه‌گذاری ملکی است که با تمرکز بر انتخاب و ارائه املاک خاص، ارزشمند و متمایز فعالیت می‌کند.",
      teamTitle: "تیم مشاوران",
    },
    investment: {
      title: "فرصت‌های سرمایه‌گذاری",
      lead: "فرصت‌هایی که بام ایران پیش از عرضه عمومی و با نگاه کارشناسی انتخاب کرده است.",
    },
    contact: {
      title: "تماس با بام ایران",
      lead: "برای دریافت مشاوره اختصاصی، از طریق فرم زیر یا واتساپ با ما در ارتباط باشید.",
      hours: "ساعات پاسخگویی: شنبه تا پنجشنبه، ساعات اداری + پاسخگویی دیجیتال",
    },
    footer: {
      rights: "تمامی حقوق برای بام ایران محفوظ است.",
    },
  },
  en: {
    brand: "Bam Iran",
    tagline: "A new definition of luxury living",
    nav: {
      home: "Home",
      properties: "Properties",
      about: "About",
      investment: "Investment",
      contact: "Contact",
    },
    cta: {
      primaryConsult: "Request a private consultation",
      secondaryBrowse: "Browse curated properties",
      requestVisit: "Request a visit",
      requestConsult: "Request consultation",
      whatsapp: "WhatsApp",
      call: "Call directly",
      viewProperty: "View property",
      viewAll: "View all properties",
    },
    home: {
      heroKicker: "Luxury properties & investment opportunities",
      heroHeadline: "Bam Iran doesn't just sell property — it offers a new definition of luxury living.",
      heroSub:
        "A curated collection of distinctive properties across Tehran and northern Iran, backed by specialist advice for buyers and investors.",
      searchTitle: "Find your next property",
      featuredTitle: "Bam Iran's curated selection",
      whyTitle: "Why Bam Iran?",
      whyBody:
        "Bam Iran isn't a listings page — it's a curated set of property opportunities, delivered with experience, advice, and an investor's eye.",
      investmentTitle: "Investment opportunities",
    },
    filters: {
      type: "Property type",
      location: "Location",
      budget: "Budget",
      purpose: "Purpose",
      allTypes: "All types",
      allLocations: "All locations",
      anyBudget: "Any budget",
      anyPurpose: "Residence or investment",
      residence: "Residence",
      investment: "Investment",
      search: "Search",
    },
    propertyTypes: {
      villa: "Villa",
      penthouse: "Penthouse",
      apartment: "Luxury apartment",
      tower: "Tower",
      "residential-complex": "Luxury residential complex",
    },
    property: {
      priceOnRequest: "Price on request",
      priceFrom: "Price",
      areaLabel: "Area",
      bedroomsLabel: "Bedrooms",
      parkingLabel: "Parking",
      floorLabel: "Floor",
      yearLabel: "Year built",
      documentLabel: "Title status",
      amenitiesTitle: "Amenities",
      aboutTitle: "About this property",
      agentTitle: "Assigned consultant",
      similarTitle: "Similar properties",
      statusReady: "Ready to move in",
      statusUnderConstruction: "Under construction",
    },
    forms: {
      name: "Full name",
      phone: "Phone number",
      budget: "Approximate budget",
      area: "Preferred area",
      purpose: "Purpose of purchase",
      message: "Message",
      preferredTime: "Preferred visit time",
      submitConsult: "Submit consultation request",
      submitVisit: "Submit visit request",
      submitted: "Your request has been received. A Bam Iran consultant will contact you shortly.",
    },
    about: {
      title: "About Bam Iran",
      lead:
        "Bam Iran is a specialist luxury real estate and property investment house, focused on selecting and presenting distinctive, high-value properties.",
      teamTitle: "Our consultants",
    },
    investment: {
      title: "Investment opportunities",
      lead: "Opportunities Bam Iran has selected ahead of public release, with an investor's eye.",
    },
    contact: {
      title: "Contact Bam Iran",
      lead: "For a private consultation, reach us via the form below or WhatsApp.",
      hours: "Hours: Saturday–Thursday, business hours plus digital response",
    },
    footer: {
      rights: "All rights reserved to Bam Iran.",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export type Dictionary = ReturnType<typeof getDictionary>;
