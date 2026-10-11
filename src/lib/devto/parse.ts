/**
 * Runtime validation for the dev.to (Forem) articles API.
 * https://developers.forem.com/api/v1#tag/articles/operation/getArticles
 *
 * The response is external input, so nothing is trusted: each article is checked field by
 * field, malformed articles are dropped individually (one bad record never blanks the page),
 * and URLs are restricted to http(s) so a crafted value can't inject a javascript: link.
 */

export type Article = {
  id: number;
  title: string;
  description: string;
  url: string;
  coverImage: string | null;
  publishedAt: string;
  readingTimeMinutes: number;
  tags: string[];
  reactions: number;
  comments: number;
};

const MAX_TAGS = 4;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function nonNegativeInt(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

/** Returns the URL only if it is an absolute http(s) URL. */
export function safeHttpUrl(value: unknown): string | null {
  const raw = nonEmptyString(value);
  if (!raw) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/** dev.to returns tags as `tag_list: string[]` on lists and `tags: "a, b"` elsewhere; accept both. */
function parseTags(record: UnknownRecord): string[] {
  const source: unknown[] = Array.isArray(record.tag_list)
    ? record.tag_list
    : typeof record.tags === "string"
      ? record.tags.split(",")
      : [];

  const tags = source
    .map((tag) => (typeof tag === "string" ? tag.trim().toLowerCase() : ""))
    .filter((tag) => /^[a-z0-9]+$/.test(tag));

  return [...new Set(tags)].slice(0, MAX_TAGS);
}

export function parseArticle(value: unknown): Article | null {
  if (!isRecord(value)) return null;

  const id = typeof value.id === "number" && Number.isInteger(value.id) ? value.id : null;
  const title = nonEmptyString(value.title);
  const url = safeHttpUrl(value.url);
  const publishedAt = nonEmptyString(value.published_at);

  // Without these there is nothing meaningful (or safe) to render.
  if (id === null || !title || !url || !publishedAt || Number.isNaN(Date.parse(publishedAt))) {
    return null;
  }

  return {
    id,
    title,
    description: nonEmptyString(value.description) ?? "",
    url,
    coverImage: safeHttpUrl(value.cover_image) ?? safeHttpUrl(value.social_image),
    publishedAt,
    readingTimeMinutes: Math.max(1, nonNegativeInt(value.reading_time_minutes)),
    tags: parseTags(value),
    reactions: nonNegativeInt(value.public_reactions_count ?? value.positive_reactions_count),
    comments: nonNegativeInt(value.comments_count),
  };
}

/** Parses a page of articles. Throws only if the payload isn't an array at all. */
export function parseArticles(payload: unknown): Article[] {
  if (!Array.isArray(payload)) {
    throw new TypeError("Unexpected dev.to response: expected an array of articles.");
  }
  return payload.map(parseArticle).filter((article): article is Article => article !== null);
}

/** Removes duplicates (pages can overlap if a post is published mid-fetch) and sorts newest first. */
export function normalizeArticles(articles: Article[]): Article[] {
  const byId = new Map<number, Article>();
  for (const article of articles) byId.set(article.id, article);
  return [...byId.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
