import Link from "next/link";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
  return (
    <PageShell width="4xl">
      <PageHeader
        eyebrow="404"
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
      >
        <Link
          href="/"
          className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-indigo-500 hover:to-purple-500"
        >
          Back to home
        </Link>
      </PageHeader>
    </PageShell>
  );
}
