/**
 * Site-wide constants. Anything that identifies the owner or links off-site lives here,
 * so a change (new email, new handle) is a one-line edit instead of a search-and-replace.
 */

export const SITE = {
  name: "Abhijeet Sachan",
  shortName: "Abhijeet",
  role: "Software Engineer",
  tagline: "Software engineer building large-scale, full-stack web apps with React, Next.js and Node.js.",
  location: "Noida, India",
  email: "abhijeetsachanwork@gmail.com",
  resumePath: "/Abhijeet_Resume.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
