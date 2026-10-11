"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/devto/parse";

/** Search and tag filtering only pay off once there is enough to filter. */
const MIN_ARTICLES_FOR_FILTERS = 4;

function matchesQuery(article: Article, query: string) {
  if (!query) return true;
  const haystack = `${article.title} ${article.description} ${article.tags.join(" ")}`.toLowerCase();
  // Every word must match, in any order: "react hooks" finds "Hooks in React".
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export default function BlogExplorer({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim());

  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const article of articles) {
      for (const tag of article.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([tag]) => tag);
  }, [articles]);

  const filtered = useMemo(
    () =>
      articles.filter(
        (article) => (!activeTag || article.tags.includes(activeTag)) && matchesQuery(article, deferredQuery),
      ),
    [articles, activeTag, deferredQuery],
  );

  const showFilters = articles.length >= MIN_ARTICLES_FOR_FILTERS;
  const isFiltering = Boolean(deferredQuery || activeTag);
  // Feature the newest post only on the unfiltered view; filtered results read better as a uniform grid.
  const featured = isFiltering ? undefined : filtered[0];
  const rest = featured ? filtered.slice(1) : filtered;

  const clearFilters = () => {
    setQuery("");
    setActiveTag(null);
  };

  return (
    <div>
      {showFilters && (
        <div className="mb-10 space-y-5">
          <div className="relative mx-auto max-w-xl">
            <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles…"
              autoComplete="off"
              className="w-full rounded-xl border border-white/10 bg-gray-900/60 py-3 pl-12 pr-4 text-gray-100 placeholder:text-gray-500 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
            />
          </div>

          {tags.length > 1 && (
            <div role="group" aria-label="Filter by tag" className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTag(null)}
                aria-pressed={activeTag === null}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeTag === null ? "bg-indigo-600 text-white" : "border border-white/10 bg-white/5 text-gray-300 hover:text-white"
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag((current) => (current === tag ? null : tag))}
                  aria-pressed={activeTag === tag}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeTag === tag ? "bg-indigo-600 text-white" : "border border-white/10 bg-white/5 text-gray-300 hover:text-white"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <p role="status" className="sr-only">
        {isFiltering ? `${filtered.length} ${filtered.length === 1 ? "article" : "articles"} found` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center">
          <p className="text-lg text-gray-300">No articles match your search.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-indigo-400"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {featured && <ArticleCard article={featured} featured headingLevel="h2" priority />}
          {rest.length > 0 && (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} headingLevel="h2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
