import { describe, expect, it } from "vitest";
import { normalizeArticles, parseArticle, parseArticles, safeHttpUrl } from "./parse";

const raw = {
  id: 101,
  title: "  Building a Portfolio with Next.js  ",
  description: "How I built it.",
  url: "https://dev.to/abhijeet/building-a-portfolio",
  cover_image: "https://media2.dev.to/dynamic/image/cover.png",
  social_image: "https://media2.dev.to/social.png",
  published_at: "2025-03-04T10:00:00Z",
  reading_time_minutes: 5,
  tag_list: ["NextJS", "react", "react", "web dev", "javascript", "css", "html"],
  public_reactions_count: 12,
  comments_count: 3,
};

describe("safeHttpUrl", () => {
  it.each([
    ["https://dev.to/x", "https://dev.to/x"],
    ["http://example.com", "http://example.com/"],
    ["javascript:alert(1)", null],
    ["data:text/html,hi", null],
    ["/relative/path", null],
    ["", null],
    [42, null],
    [null, null],
  ])("%j → %j", (input, expected) => {
    expect(safeHttpUrl(input)).toBe(expected);
  });
});

describe("parseArticle", () => {
  it("normalises a well-formed article", () => {
    expect(parseArticle(raw)).toEqual({
      id: 101,
      title: "Building a Portfolio with Next.js",
      description: "How I built it.",
      url: "https://dev.to/abhijeet/building-a-portfolio",
      coverImage: "https://media2.dev.to/dynamic/image/cover.png",
      publishedAt: "2025-03-04T10:00:00Z",
      readingTimeMinutes: 5,
      // lower-cased, de-duplicated, invalid ("web dev") dropped, capped at 4
      tags: ["nextjs", "react", "javascript", "css"],
      reactions: 12,
      comments: 3,
    });
  });

  it.each([
    ["missing id", { ...raw, id: undefined }],
    ["non-integer id", { ...raw, id: "101" }],
    ["blank title", { ...raw, title: "   " }],
    ["unsafe url", { ...raw, url: "javascript:alert(1)" }],
    ["missing date", { ...raw, published_at: null }],
    ["unparseable date", { ...raw, published_at: "yesterday" }],
  ])("drops articles with %s", (_label, value) => {
    expect(parseArticle(value)).toBeNull();
  });

  it.each([null, undefined, "article", 3, []])("drops non-object %j", (value) => {
    expect(parseArticle(value)).toBeNull();
  });

  it("falls back to the social image, then to no cover", () => {
    expect(parseArticle({ ...raw, cover_image: null })?.coverImage).toBe("https://media2.dev.to/social.png");
    expect(parseArticle({ ...raw, cover_image: null, social_image: "javascript:x" })?.coverImage).toBeNull();
  });

  it("defaults optional fields safely", () => {
    const article = parseArticle({
      id: 1,
      title: "Minimal",
      url: "https://dev.to/a/minimal",
      published_at: "2025-01-01T00:00:00Z",
      reading_time_minutes: -2,
      public_reactions_count: Number.NaN,
    });
    expect(article).toMatchObject({ description: "", coverImage: null, readingTimeMinutes: 1, tags: [], reactions: 0, comments: 0 });
  });

  it("accepts comma-separated `tags` when `tag_list` is absent", () => {
    expect(parseArticle({ ...raw, tag_list: undefined, tags: "react, nextjs" })?.tags).toEqual(["react", "nextjs"]);
  });
});

describe("parseArticles", () => {
  it("keeps valid articles and drops invalid ones", () => {
    expect(parseArticles([raw, { nope: true }, null]).map((a) => a.id)).toEqual([101]);
  });

  it("throws when the payload is not an array", () => {
    expect(() => parseArticles({ error: "not found", status: 404 })).toThrow(TypeError);
  });
});

describe("normalizeArticles", () => {
  it("de-duplicates by id and sorts newest first", () => {
    const a = parseArticle({ ...raw, id: 1, published_at: "2024-01-01T00:00:00Z" })!;
    const b = parseArticle({ ...raw, id: 2, published_at: "2025-06-01T00:00:00Z" })!;
    const c = parseArticle({ ...raw, id: 3, published_at: "2025-01-01T00:00:00Z" })!;
    expect(normalizeArticles([a, b, c, a]).map((x) => x.id)).toEqual([2, 3, 1]);
  });
});
