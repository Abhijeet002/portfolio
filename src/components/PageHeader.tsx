type PageHeaderProps = {
  /** Small label above the title, e.g. "Writing". */
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  /** Optional actions (buttons, links) rendered below the description. */
  children?: React.ReactNode;
};

/** The one h1 for an inner page. Pairs with PageShell for spacing below the fixed navbar. */
export default function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="mx-auto mb-14 max-w-3xl text-center md:mb-16">
      {eyebrow && (
        <p className="mb-4 inline-flex rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      {description && <p className="mt-6 text-lg leading-relaxed text-gray-300 md:text-xl">{description}</p>}
      {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>}
    </header>
  );
}
