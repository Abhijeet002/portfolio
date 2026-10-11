import { afterEach, describe, expect, it, vi } from "vitest";
import { getDevToArticles } from "./client";

function article(id: number) {
  return {
    id,
    title: `Post ${id}`,
    url: `https://dev.to/a/post-${id}`,
    published_at: new Date(Date.UTC(2025, 0, 1) + id * 86_400_000).toISOString(),
  };
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("getDevToArticles", () => {
  it("returns articles newest first and requests the right user", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse([article(1), article(2)]));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getDevToArticles("abhijeet_sachan");

    expect(result).toMatchObject({ ok: true });
    expect(result.ok && result.articles.map((a) => a.id)).toEqual([2, 1]);
    const url = new URL(fetchMock.mock.calls[0][0]);
    expect(url.searchParams.get("username")).toBe("abhijeet_sachan");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("follows pagination until a short page, then stops", async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => article(i + 1));
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(fullPage))
      .mockResolvedValueOnce(jsonResponse([article(500)]));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getDevToArticles("user");

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(result.ok && result.articles).toHaveLength(101);
  });

  it("caps pagination so a misbehaving API can't loop forever", async () => {
    let next = 0;
    const fetchMock = vi.fn().mockImplementation(async () =>
      jsonResponse(Array.from({ length: 100 }, () => article(++next))),
    );
    vi.stubGlobal("fetch", fetchMock);

    await getDevToArticles("user");
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("returns an empty list for users with no posts", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse([])));
    expect(await getDevToArticles("user")).toEqual({ ok: true, articles: [] });
  });

  it("reports HTTP errors with their status", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ error: "rate limited" }, 429)));
    expect(await getDevToArticles("user")).toEqual({ ok: false, error: "http", status: 429 });
  });

  it("reports network failures and timeouts", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")));
    expect(await getDevToArticles("user")).toEqual({ ok: false, error: "network" });

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new DOMException("timed out", "TimeoutError")));
    expect(await getDevToArticles("user")).toEqual({ ok: false, error: "network" });
  });

  it("reports malformed responses", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("<html>oops</html>", { status: 200 })));
    expect(await getDevToArticles("user")).toEqual({ ok: false, error: "invalid-response" });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ not: "an array" })));
    expect(await getDevToArticles("user")).toEqual({ ok: false, error: "invalid-response" });
  });

  it("keeps earlier pages if a later page fails", async () => {
    const fullPage = Array.from({ length: 100 }, (_, i) => article(i + 1));
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValueOnce(jsonResponse(fullPage)).mockRejectedValueOnce(new TypeError("fetch failed")),
    );
    const result = await getDevToArticles("user");
    expect(result.ok && result.articles).toHaveLength(100);
  });

  it("rejects malformed usernames without calling the API", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(await getDevToArticles("../admin")).toEqual({ ok: false, error: "config" });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
