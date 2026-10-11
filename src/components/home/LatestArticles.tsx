import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleCard from "@/components/blog/ArticleCard";
import Reveal from "@/components/Reveal";
import type { Article } from "@/lib/devto/parse";

const PREVIEW_COUNT = 3;

/** Home page teaser of the newest dev.to posts. Renders nothing when there are none to show. */
export default function LatestArticles({ articles }: { articles: Article[] }) {
  const latest = articles.slice(0, PREVIEW_COUNT);
  if (latest.length === 0) return null;

  return (
    <section aria-labelledby="latest-articles-heading" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mb-12 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <h2 id="latest-articles-heading" className="mb-4 text-4xl font-bold md:text-5xl">
            Latest Articles
          </h2>
          <p className="max-w-2xl text-xl text-gray-300">What I&apos;ve been writing about on dev.to.</p>
        </div>
        <Link
          href="/blog"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 font-semibold text-white transition-colors hover:border-indigo-400 hover:bg-indigo-500/10"
        >
          View all posts
          <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Reveal>

      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {latest.map((article, index) => (
          <Reveal key={article.id} as="li" delay={index * 0.08}>
            <ArticleCard article={article} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
