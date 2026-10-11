"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE, SOCIAL_LINKS } from "@/config/site";

const SOCIALS = [
  { href: SOCIAL_LINKS.github, label: "GitHub", icon: Github },
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", icon: Linkedin },
] as const;

const MOBILE_MENU_ID = "mobile-navigation";

/** "/" only matches exactly; other routes also match their nested paths (e.g. /blog/x). */
function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Solid background once the page scrolls, so the bar stays legible over any content.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navigating away always closes the mobile menu.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close the menu when the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // While the mobile menu is open: lock page scroll, close on Escape, move focus into the menu.
  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <header
        // backdrop-filter makes the header the containing block for its fixed children, which
        // would clip the full-screen menu backdrop, so the open menu uses an opaque bar instead.
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          isOpen
            ? "bg-gray-950 border-b border-white/10"
            : isScrolled
              ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
              : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Link href="/" className="group flex items-center gap-3 rounded-lg" aria-label={`${SITE.name}, home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30 transition-transform duration-300 group-hover:scale-105">
              A
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="text-base font-semibold text-white">{SITE.shortName}</span>
              <span className="text-xs text-gray-400">{SITE.role}</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      aria-hidden="true"
                      className="absolute inset-0 rounded-lg bg-white/10 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1 sm:gap-2">
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="hidden lg:inline-flex rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              </a>
            ))}

            <Link
              href="/contact"
              className="hidden sm:inline-flex ml-1 items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-500/30"
            >
              Let&apos;s Talk
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="lg:hidden rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {isOpen ? <X aria-hidden="true" className="h-6 w-6" /> : <Menu aria-hidden="true" className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="backdrop"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeMenu}
                className="lg:hidden fixed inset-0 top-[var(--nav-height)] bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                key="panel"
                id={MOBILE_MENU_ID}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden absolute inset-x-0 top-full border-b border-white/10 bg-gray-950 shadow-2xl shadow-black/50"
              >
                <ul className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
                  {NAV_ITEMS.map((item, index) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          ref={index === 0 ? firstMobileLinkRef : undefined}
                          href={item.href}
                          onClick={closeMenu}
                          aria-current={active ? "page" : undefined}
                          className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                            active ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border-t border-white/10 px-4 py-4 sm:px-6">
                  <div className="flex gap-2">
                    {SOCIALS.map(({ href, label, icon: Icon }) => (
                      <a
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className="rounded-lg p-2.5 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="sm:hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Let&apos;s Talk
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
