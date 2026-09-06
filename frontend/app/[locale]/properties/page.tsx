import { Suspense } from "react";
import type { Locale } from "@/types/property";
import PropertiesContent from "@/components/PropertiesContent";

// PropertiesContent uses useSearchParams (client-side query reading, needed
// since static export has no server). Next.js requires that hook's nearest
// static route to wrap it in Suspense — otherwise the build fails under
// `output: "export"`.
export default function PropertiesPage({ params }: { params: { locale: Locale } }) {
  return (
    <Suspense fallback={<div className="container-page py-16 text-sm text-body/50">…</div>}>
      <PropertiesContent locale={params.locale} />
    </Suspense>
  );
}
