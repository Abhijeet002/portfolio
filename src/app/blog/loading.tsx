import PageShell from "@/components/PageShell";

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 ${featured ? "lg:grid lg:grid-cols-2" : ""}`}
    >
      <div className={`animate-pulse bg-white/5 ${featured ? "aspect-[2/1] lg:aspect-auto lg:min-h-[320px]" : "aspect-[2/1]"}`} />
      <div className="space-y-3 p-6">
        <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
        <div className="h-6 w-4/5 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/5" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function BlogLoading() {
  return (
    <PageShell width="7xl">
      <div role="status" aria-label="Loading articles">
        <div className="mx-auto mb-16 max-w-3xl space-y-5 text-center">
          <div className="mx-auto h-8 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="mx-auto h-14 w-48 animate-pulse rounded-xl bg-white/10" />
          <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-white/5" />
        </div>
        <div className="space-y-8">
          <SkeletonCard featured />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
