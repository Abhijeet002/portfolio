import { ArrowUpRight, PenLine, WifiOff } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/site";

type BlogFallbackProps = {
  variant: "empty" | "error";
};

const COPY = {
  empty: {
    icon: PenLine,
    title: "No articles yet",
    body: "I haven't published anything on dev.to yet. New posts will show up here automatically.",
  },
  error: {
    icon: WifiOff,
    title: "Articles are taking a break",
    body: "I couldn't load my latest posts from dev.to right now. You can still read them all there.",
  },
} as const;

/** Shown when dev.to has no posts or can't be reached, so the page never looks broken. */
export default function BlogFallback({ variant }: BlogFallbackProps) {
  const { icon: Icon, title, body } = COPY[variant];

  return (
    <div role={variant === "error" ? "alert" : undefined} className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
      <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300">
        <Icon aria-hidden="true" className="h-7 w-7" />
      </span>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-gray-400">{body}</p>
      <a
        href={SOCIAL_LINKS.devTo}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500"
      >
        Visit my dev.to profile
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}
