import type { Metadata } from "next";
import { Github } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/data/projects";
import { SOCIAL_LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Full stack and frontend projects built with React, Next.js, Node.js and real-time technologies.",
};

export default function ProjectsPage() {
  return (
    <PageShell width="7xl">
      <PageHeader
        eyebrow="Selected work"
        title="Projects"
        description="Things I've designed and built end to end, from real-time apps to content platforms."
      />

      {PROJECTS.length > 0 ? (
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} as="li" delay={Math.min(index, 5) * 0.06}>
              <ProjectCard project={project} headingLevel="h2" priority={index < 3} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">Projects are on their way. Check back soon.</p>
      )}

      <div className="mt-16 text-center">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-indigo-400 hover:bg-indigo-500/10"
        >
          <Github aria-hidden="true" className="h-5 w-5" />
          More on GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </PageShell>
  );
}
