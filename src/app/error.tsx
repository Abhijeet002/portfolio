"use client";

import { useEffect } from "react";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

export default function RouteError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageShell width="4xl">
      <PageHeader
        eyebrow="Something went wrong"
        title="That didn't load"
        description="An unexpected error stopped this page from rendering. Trying again usually fixes it."
      >
        <button
          type="button"
          onClick={reset}
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-indigo-400"
        >
          Back to home
        </Link>
      </PageHeader>
    </PageShell>
  );
}
