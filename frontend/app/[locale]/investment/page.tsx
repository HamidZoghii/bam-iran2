import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { investmentOpportunities } from "@/lib/properties";

export default function InvestmentPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <div className="container-page py-16">
      <h1 className="font-heading text-3xl text-ink md:text-4xl">{t.investment.title}</h1>
      <p className="mt-6 max-w-prose text-base leading-8 text-body/80">{t.investment.lead}</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {investmentOpportunities.map((op) => {
          const title = locale === "fa" ? op.title_fa : op.title_en;
          const summary = locale === "fa" ? op.summary_fa : op.summary_en;
          const tag = locale === "fa" ? op.tag_fa : op.tag_en;
          return (
            <div key={op.slug} className="border border-ink/10">
              <div className="relative aspect-[16/10]">
                <Image src={op.image} alt={title} fill className="object-cover" />
              </div>
              <div className="p-6">
                <p className="text-xs text-gold">{tag}</p>
                <h2 className="mt-1 font-heading text-xl text-ink">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-body/70">{summary}</p>
                {op.relatedPropertySlug && (
                  <Link
                    href={`/${locale}/properties/${op.relatedPropertySlug}`}
                    className="mt-4 inline-block text-sm text-ink underline underline-offset-4 hover:text-gold"
                  >
                    {t.cta.viewProperty}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
