import "server-only";
import { normalizeArticles, parseArticles, type Article } from "./parse";

export type { Article } from "./parse";

export type ArticlesResult =
  | { ok: true; articles: Article[] }
  | { ok: false; error: "config" | "network" | "http" | "invalid-response"; status?: number };

const API_BASE = process.env.DEVTO_API_URL ?? "https://dev.to/api";
const PER_PAGE = 100;
/** Safety cap so a misbehaving API can never send us into an unbounded loop. */
const MAX_PAGES = 5;
const TIMEOUT_MS = 8000;
/** Cache for an hour; new posts appear without a redeploy. */
export const DEVTO_REVALIDATE_SECONDS = 3600;

async function fetchPage(username: string, page: number): Promise<Article[]> {
  const url = new URL(`${API_BASE.replace(/\/$/, "")}/articles`);
  url.searchParams.set("username", username);
  url.searchParams.set("per_page", String(PER_PAGE));
  url.searchParams.set("page", String(page));

  const response = await fetch(url, {
    headers: { Accept: "application/vnd.forem.api-v1+json" },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: DEVTO_REVALIDATE_SECONDS, tags: ["devto-articles"] },
  });

  if (!response.ok) throw new HttpError(response.status);

  try {
    return parseArticles(await response.json());
  } catch (cause) {
    throw new InvalidResponseError(cause);
  }
}

class HttpError extends Error {
  constructor(readonly status: number) {
    super(`dev.to responded with HTTP ${status}`);
  }
}

class InvalidResponseError extends Error {
  constructor(cause: unknown) {
    super("dev.to returned a response we could not read", { cause });
  }
}

/**
 * Fetches every published article for a dev.to user, newest first.
 * Never throws: failures come back as a typed result so the page can show a friendly state.
 */
export async function getDevToArticles(username: string): Promise<ArticlesResult> {
  if (!/^[A-Za-z0-9_]+$/.test(username)) {
    console.error(`[devto] Invalid username "${username}" in site config.`);
    return { ok: false, error: "config" };
  }

  const articles: Article[] = [];
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const batch = await fetchPage(username, page);
      articles.push(...batch);
      if (batch.length < PER_PAGE) break;
    }
    return { ok: true, articles: normalizeArticles(articles) };
  } catch (error) {
    // Keep whatever earlier pages returned rather than showing nothing.
    if (articles.length > 0) return { ok: true, articles: normalizeArticles(articles) };

    console.error("[devto] Failed to load articles:", error);
    if (error instanceof HttpError) return { ok: false, error: "http", status: error.status };
    if (error instanceof InvalidResponseError) return { ok: false, error: "invalid-response" };
    // Anything else is a connection failure or the request timing out.
    return { ok: false, error: "network" };
  }
}
