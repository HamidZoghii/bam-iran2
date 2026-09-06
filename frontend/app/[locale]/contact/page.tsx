import { Suspense } from "react";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import ContactForm from "@/components/ContactForm";

// ContactForm uses useSearchParams internally (to read ?property=&intent=),
// which needs a Suspense boundary here — same reason as the properties page.
export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <div className="container-page py-16">
      <div className="grid gap-16 lg:grid-cols-[1fr_420px]">
        <div>
          <h1 className="font-display text-3xl text-ink md:text-4xl">{t.contact.title}</h1>
          <p className="mt-6 max-w-prose text-base leading-8 text-body/80">{t.contact.lead}</p>
          <p className="mt-8 text-sm text-body/50">{t.contact.hours}</p>
        </div>

        <div className="border border-ink/10 p-6">
          <Suspense fallback={<div className="text-sm text-body/50">…</div>}>
            <ContactForm locale={locale} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
