import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import GlowingCard from "./GlowingCard";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  /** Heading level for the title, so cards nest correctly under the page outline. */
  headingLevel?: "h2" | "h3";
  /** Load the image eagerly when the card is above the fold. */
  priority?: boolean;
};

export default function ProjectCard({ project, headingLevel = "h3", priority = false }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <GlowingCard className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-xl">
        <div className="relative aspect-[16/9] overflow-hidden bg-gray-800">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <Heading className="mb-2 text-xl font-bold text-white">{project.title}</Heading>
          <p className="mb-5 text-sm leading-relaxed text-gray-300">{project.description}</p>

          <ul aria-label="Technologies" className="mb-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-1 text-xs text-indigo-200"
              >
                {tech}
              </li>
            ))}
          </ul>

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-auto flex flex-wrap gap-4 border-t border-white/10 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo (opens in a new tab)`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-300 transition-colors hover:text-white"
                >
                  <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  Live demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                >
                  <Github aria-hidden="true" className="h-4 w-4" />
                  Source code
                </a>
              )}
            </div>
          )}
        </div>
      </article>
    </GlowingCard>
  );
}
