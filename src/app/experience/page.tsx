import type { Metadata } from "next";
import { Download } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { EXPERIENCE } from "@/data/experience";
import { SITE } from "@/config/site";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Abhijeet Sachan's professional experience: Software Engineer at Stack-IT building Nestys, and Associate Web Developer at Srstha Tech Solutions.",
};

export default function ExperiencePage() {
  return (
    <PageShell width="5xl">
      <PageHeader
        eyebrow="Career"
        title="Experience Journey"
        description="My professional journey and the experiences that shaped my expertise."
      >
        <a
          href={SITE.resumePath}
          download
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-purple-500"
        >
          <Download aria-hidden="true" className="h-5 w-5" />
          Download resume
        </a>
      </PageHeader>

      <ExperienceTimeline items={EXPERIENCE} headingLevel="h2" />
    </PageShell>
  );
}
