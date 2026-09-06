"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { defaultLocale } from "@/lib/dictionaries";

// Static export has no server to run a redirect() on, so this sends
// visitors to the default language (Persian) client-side instead. The
// visible link underneath is the no-JS/slow-JS fallback.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${defaultLocale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <Link href={`/${defaultLocale}`} className="text-sm text-paper underline">
        بام ایران →
      </Link>
    </div>
  );
}
