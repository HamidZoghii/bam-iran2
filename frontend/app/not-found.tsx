import Link from "next/link";
import { defaultLocale } from "@/lib/dictionaries";

// Next's static export writes this to out/404.html — GitHub Pages serves
// that file automatically for any unmatched path, so this is the real
// 404 page visitors will see, not a generic host error page.
export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-6 text-center">
      <p className="font-display text-2xl text-ink">۴۰۴ — این صفحه پیدا نشد</p>
      <p className="text-sm text-body/60">404 — this page could not be found.</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-4 border border-ink px-5 py-2 text-sm text-ink transition hover:bg-ink hover:text-paper"
      >
        بازگشت به بام ایران
      </Link>
    </div>
  );
}
