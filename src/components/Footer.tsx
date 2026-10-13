import Link from "next/link";
import { Github, Linkedin, Mail, PenLine } from "lucide-react";
import BackToTop from "./BackToTop";
import LogoMark from "./brand/Logo";
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from "@/config/site";

const SOCIALS = [
  { href: SOCIAL_LINKS.github, label: "GitHub", icon: Github, external: true },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: SOCIAL_LINKS.devTo, label: "dev.to", icon: PenLine, external: true },
  { href: `mailto:${SITE.email}`, label: "Email", icon: Mail, external: false },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gray-950 text-gray-300">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
      />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 rounded-lg" aria-label={`${SITE.name}, home`}>
            <LogoMark size={36} />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              {SITE.name}
            </span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-gray-400">{SITE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Pages</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-gray-400 transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-200">Connect</h2>
          <ul className="flex flex-wrap gap-3">
            {SOCIALS.map(({ href, label, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  title={label}
                  className="inline-flex rounded-full border border-white/10 bg-white/5 p-3 text-gray-300 transition-all hover:-translate-y-0.5 hover:border-indigo-500/50 hover:text-white"
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <p className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-gray-500 lg:px-8">
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>

      <BackToTop />
    </footer>
  );
}
