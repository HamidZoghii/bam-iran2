"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { getPropertyBySlug } from "@/lib/properties";

// No backend is wired up yet — see backend/ for the Laravel API scaffold.
// Once it's deployed, replace handleSubmit's local setSubmitted(true) with a
// real POST to /api/leads (intent=consult) or /api/visit-requests (intent=visit).
//
// property/intent come from the URL (?property=slug&intent=consult|visit),
// read client-side via useSearchParams since static export has no server to
// read query params with.
export default function ContactForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);

  const propertySlug = searchParams.get("property") ?? undefined;
  const property = propertySlug ? getPropertyBySlug(propertySlug) : undefined;
  const intent: "consult" | "visit" = searchParams.get("intent") === "visit" ? "visit" : "consult";

  if (submitted) {
    return (
      <div className="border border-gold/40 bg-gold/5 p-6 text-sm text-ink">
        {t.forms.submitted}
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-4"
    >
      {property && (
        <p className="text-sm text-body/60">
          {locale === "fa" ? "ملک انتخابی: " : "Selected property: "}
          <span className="text-ink">{locale === "fa" ? property.title_fa : property.title_en}</span>
        </p>
      )}

      {propertySlug && <input type="hidden" name="property" value={propertySlug} />}
      <input type="hidden" name="intent" value={intent} />

      <div>
        <label className="mb-1 block text-xs text-body/60">{t.forms.name}</label>
        <input required name="name" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
      </div>

      <div>
        <label className="mb-1 block text-xs text-body/60">{t.forms.phone}</label>
        <input required name="phone" type="tel" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs text-body/60">{t.forms.budget}</label>
          <input name="budget" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-body/60">{t.forms.area}</label>
          <input name="area" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
        </div>
      </div>

      {intent === "visit" ? (
        <div>
          <label className="mb-1 block text-xs text-body/60">{t.forms.preferredTime}</label>
          <input name="preferredTime" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
        </div>
      ) : (
        <div>
          <label className="mb-1 block text-xs text-body/60">{t.forms.purpose}</label>
          <input name="purpose" className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
        </div>
      )}

      <div>
        <label className="mb-1 block text-xs text-body/60">{t.forms.message}</label>
        <textarea name="message" rows={4} className="w-full border border-ink/15 bg-white/70 px-4 py-3 text-sm focus:border-ink focus:outline-none" />
      </div>

      <button type="submit" className="mt-2 bg-ink px-6 py-3 text-sm text-paper transition hover:bg-ink/90">
        {intent === "visit" ? t.forms.submitVisit : t.forms.submitConsult}
      </button>
    </form>
  );
}
