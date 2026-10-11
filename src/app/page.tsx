import HomeView from "@/components/home/HomeView";
import LatestArticles from "@/components/home/LatestArticles";
import { getDevToArticles } from "@/lib/devto/client";
import { SITE } from "@/config/site";

// Matches the dev.to cache window so the "Latest articles" teaser stays fresh.
export const revalidate = 3600;

export default async function HomePage() {
  const result = await getDevToArticles(SITE.devToUsername);
  // The home page degrades quietly: if dev.to is unavailable the section is simply omitted.
  const articles = result.ok ? result.articles : [];

  return <HomeView latestArticles={<LatestArticles articles={articles} />} />;
}
