import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import BlogExplorer from "@/components/blog/BlogExplorer";
import BlogFallback from "@/components/blog/BlogFallback";
import { getDevToArticles } from "@/lib/devto/client";
import { SITE, SOCIAL_LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles by ${SITE.name} on web development, React, Next.js and full stack engineering, published on dev.to.`,
};

// Rebuild in the background at most once an hour so new dev.to posts appear without a redeploy.
export const revalidate = 3600;

export default async function BlogPage() {
  const result = await getDevToArticles(SITE.devToUsername);

  return (
    <PageShell width="7xl">
      <PageHeader
        eyebrow="Writing"
        title="Blog"
        description="Notes and deep dives on web development, published on dev.to."
      >
        <a
          href={SOCIAL_LINKS.devTo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-indigo-400 hover:bg-indigo-500/10"
        >
          Follow on dev.to
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </PageHeader>

      {!result.ok ? (
        <BlogFallback variant="error" />
      ) : result.articles.length === 0 ? (
        <BlogFallback variant="empty" />
      ) : (
        <BlogExplorer articles={result.articles} />
      )}
    </PageShell>
  );
}
