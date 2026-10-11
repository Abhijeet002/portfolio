"use client";

import { MotionConfig, motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import GlowingCard from "./GlowingCard";
import type { TimelineEntry, TimelineKind } from "@/data/experience";
import { formatYearMonth } from "@/lib/date";

const KIND_ICON: Record<TimelineKind, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
};

function DateRange({ start, end }: Pick<TimelineEntry, "start" | "end">) {
  return (
    <span>
      <time dateTime={start}>{formatYearMonth(start)}</time>
      {" – "}
      {end ? <time dateTime={end}>{formatYearMonth(end)}</time> : "Present"}
    </span>
  );
}

type ExperienceTimelineProps = {
  items: TimelineEntry[];
  /** Heading level for each entry's role, so the timeline nests correctly in the page outline. */
  headingLevel?: "h2" | "h3";
};

export default function ExperienceTimeline({ items, headingLevel = "h3" }: ExperienceTimelineProps) {
  const Heading = headingLevel;

  if (items.length === 0) {
    return <p className="text-center text-gray-400">Nothing to show yet.</p>;
  }

  return (
    // Respect the OS "reduce motion" setting for every animation in the timeline.
    <MotionConfig reducedMotion="user">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
        />

        <ol className="space-y-10 md:space-y-12">
          {items.map((item, idx) => {
            const Icon = KIND_ICON[item.kind];
            const isCurrent = !item.end;

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.08 }}
                className="relative pl-12 md:pl-20"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 md:left-4 top-6 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full ring-4 ring-indigo-500/20 shadow-lg flex items-center justify-center text-white"
                >
                  <Icon className="w-4 h-4" />
                </span>

                <GlowingCard>
                  <article className="p-5 md:p-6">
                    <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between mb-4">
                      <div className="min-w-0">
                        <Heading className="text-xl md:text-2xl font-bold text-white">{item.role}</Heading>
                        <p className="text-indigo-300 font-medium">
                          {item.organization}
                          {item.product && (
                            <>
                              <span aria-hidden="true" className="mx-2 text-gray-500">·</span>
                              <span className="text-purple-300">{item.product}</span>
                            </>
                          )}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm md:flex-col md:items-end md:shrink-0">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-200 rounded-full">
                          {isCurrent && (
                            <span aria-hidden="true" className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                          <DateRange start={item.start} end={item.end} />
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-gray-400">
                          <MapPin aria-hidden="true" className="w-4 h-4" />
                          {item.location}
                        </span>
                      </div>
                    </header>

                    {item.summary && <p className="text-gray-300 mb-4">{item.summary}</p>}

                    <ul className="space-y-3">
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3 text-gray-300">
                          <span aria-hidden="true" className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2.5 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {item.tech && item.tech.length > 0 && (
                      <ul aria-label="Technologies" className="flex flex-wrap gap-2 mt-5">
                        {item.tech.map((tech) => (
                          <li
                            key={tech}
                            className="px-2.5 py-1 text-xs font-medium text-indigo-200 bg-white/5 border border-white/10 rounded-md"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </GlowingCard>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </MotionConfig>
  );
}
