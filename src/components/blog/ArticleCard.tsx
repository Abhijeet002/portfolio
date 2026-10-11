import Image from "next/image";
import { ArrowUpRight, Clock, Heart, MessageCircle } from "lucide-react";
import type { Article } from "@/lib/devto/parse";
import { formatDate } from "@/lib/date";

type ArticleCardProps = {
  article: Article;
  /** The newest post gets a wider, horizontal layout. */
  featured?: boolean;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

function Cover({ article, featured, priority }: Pick<ArticleCardProps, "article" | "featured" | "priority">) {
  if (!article.coverImage) {
    // Branded placeholder so posts without a cover still look intentional.
    return (
      <div
        aria-hidden="true"
        className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600/40 via-purple-600/30 to-pink-600/30 p-6"
      >
        <span className="line-clamp-3 text-center text-lg font-bold text-white/80">{article.title}</span>
      </div>
    );
  }

  return (
    <Image
      src={article.coverImage}
      alt=""
      fill
      // dev.to already serves resized, CDN-optimised covers, and an allow-list of their image
      // hosts would break whenever they change CDNs, so skip Next's optimiser for these.
      unoptimized
      priority={priority}
      sizes={featured ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

export default function ArticleCard({ article, featured = false, headingLevel = "h3", priority = false }: ArticleCardProps) {
  const Heading = headingLevel;
  const published = formatDate(article.publishedAt);

  return (
    <article
      className={`group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 focus-within:border-indigo-500/60 ${
        featured ? "lg:grid lg:grid-cols-2" : "flex flex-col"
      }`}
    >
      <div className={`relative overflow-hidden bg-gray-800 ${featured ? "aspect-[2/1] lg:aspect-auto lg:min-h-[320px]" : "aspect-[2/1]"}`}>
        <Cover article={article} featured={featured} priority={priority} />
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-6 md:p-8 lg:justify-center" : "p-6"}`}>
        {article.tags.length > 0 && (
          <ul aria-label="Tags" className="mb-3 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag} className="text-xs font-medium text-indigo-300">
                #{tag}
              </li>
            ))}
          </ul>
        )}

        <Heading className={`font-bold text-white ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
          {/* The stretched link makes the whole card clickable without nesting interactive elements. */}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
          >
            {article.title}
            <span className="sr-only"> (opens on dev.to in a new tab)</span>
          </a>
        </Heading>

        {article.description && (
          <p className={`mt-3 text-gray-400 ${featured ? "line-clamp-4 text-base" : "line-clamp-3 text-sm"}`}>
            {article.description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 text-sm text-gray-400">
          {published && <time dateTime={article.publishedAt}>{published}</time>}
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden="true" className="h-4 w-4" />
            {article.readingTimeMinutes} min read
          </span>
          {article.reactions > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <Heart aria-hidden="true" className="h-4 w-4" />
              {article.reactions}
              <span className="sr-only">{article.reactions === 1 ? "reaction" : "reactions"}</span>
            </span>
          )}
          {article.comments > 0 && (
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              {article.comments}
              <span className="sr-only">{article.comments === 1 ? "comment" : "comments"}</span>
            </span>
          )}
          <ArrowUpRight
            aria-hidden="true"
            className="ml-auto h-5 w-5 text-gray-500 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-300"
          />
        </div>
      </div>
    </article>
  );
}
