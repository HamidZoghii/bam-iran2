import Image from "next/image";
import type { Locale } from "@/types/property";
import { getDictionary } from "@/lib/dictionaries";
import { agents } from "@/lib/properties";

export default function AboutPage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl text-ink md:text-4xl">{t.about.title}</h1>
      <p className="mt-6 max-w-prose text-base leading-8 text-body/80">{t.about.lead}</p>

      <h2 className="mt-20 font-display text-2xl text-ink">{t.about.teamTitle}</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <div key={agent.slug} className="border border-ink/10 p-6">
            <div className="relative h-16 w-16 overflow-hidden rounded-full">
              <Image
                src={agent.photo}
                alt={locale === "fa" ? agent.name_fa : agent.name_en}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-4 font-display text-lg text-ink">
              {locale === "fa" ? agent.name_fa : agent.name_en}
            </p>
            <p className="text-sm text-gold">{locale === "fa" ? agent.title_fa : agent.title_en}</p>
            <p className="mt-3 text-sm leading-7 text-body/70">
              {locale === "fa" ? agent.bio_fa : agent.bio_en}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
