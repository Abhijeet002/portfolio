type PageShellProps = {
  children: React.ReactNode;
  /** Max content width. Defaults to the standard 6xl reading column. */
  width?: "4xl" | "5xl" | "6xl" | "7xl";
};

const WIDTH_CLASS: Record<NonNullable<PageShellProps["width"]>, string> = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
};

/**
 * Shared frame for inner pages: the brand background, ambient glow, and top padding that
 * clears the fixed navbar so page titles are never hidden behind it.
 */
export default function PageShell({ children, width = "6xl" }: PageShellProps) {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[880px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
      </div>
      <div
        className={`mx-auto ${WIDTH_CLASS[width]} px-6 pb-24 pt-[calc(var(--nav-height)+3.5rem)] md:pt-[calc(var(--nav-height)+5rem)]`}
      >
        {children}
      </div>
    </div>
  );
}
