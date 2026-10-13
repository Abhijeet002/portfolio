/**
 * Site-wide constants. Anything that identifies the owner or links off-site lives here,
 * so a change (new email, new handle) is a one-line edit instead of a search-and-replace.
 */

/**
 * Absolute site URL, used to build share-preview (Open Graph) links. An explicit
 * NEXT_PUBLIC_SITE_URL wins; otherwise use the production domain Vercel injects at build time,
 * so previews never point at localhost in production.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const SITE = {
  name: "Abhijeet Sachan",
  shortName: "Abhijeet",
  role: "Software Engineer",
  tagline: "Software engineer building large-scale, full-stack web apps with React, Next.js and Node.js.",
  location: "Noida, India",
  email: "abhijeetsachanwork@gmail.com",
  resumePath: "/Abhijeet_Resume.pdf",
  url: resolveSiteUrl(),
  /** dev.to username, used to pull published articles into /blog. */
  devToUsername: "abhijeet_sachan_34f5d10dc",
} as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/Abhijeet002",
  linkedin: "https://www.linkedin.com/in/abhijeet-sachan/",
  devTo: `https://dev.to/${SITE.devToUsername}`,
} as const;

export type NavItem = { href: string; label: string };

export const NAV_ITEMS: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
