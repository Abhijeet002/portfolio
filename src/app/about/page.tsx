import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Briefcase, Code2, Download, GraduationCap, MapPin, Palette, Wrench } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import GlowingCard from "@/components/GlowingCard";
import Reveal from "@/components/Reveal";
import { SITE } from "@/config/site";
import { CURRENT_ROLE, EXPERIENCE, WORK_EXPERIENCE } from "@/data/experience";
import { SKILL_GROUPS, type SkillGroupId } from "@/data/skills";
import { CERTIFICATIONS } from "@/data/certifications";
import { formatDuration, monthsInRange } from "@/lib/date";

export const metadata: Metadata = {
  title: "About",
  description: `About ${SITE.name}: ${SITE.tagline}`,
};

// Experience length is derived from today's date, so re-render the static page daily.
export const revalidate = 86400;

const SKILL_ICON: Record<SkillGroupId, typeof Palette> = {
  frontend: Palette,
  backend: Code2,
  tools: Wrench,
};

const PRINCIPLES = [
  {
    title: "User-centric design",
    body: "Clean, usable interfaces that feel professional and get out of the user's way.",
  },
  {
    title: "Full-cycle ownership",
    body: "Comfortable across the stack, from UI and state management to APIs and databases.",
  },
  {
    title: "Data-driven decisions",
    body: "Measure what matters, from performance to engagement, and let it guide the next iteration.",
  },
];

export default function AboutPage() {
  const totalWorkMonths = WORK_EXPERIENCE.reduce(
    (sum, entry) => sum + monthsInRange(entry.start, entry.end),
    0,
  );
  const education = EXPERIENCE.find((entry) => entry.kind === "education");

  const facts = [
    CURRENT_ROLE && {
      icon: Briefcase,
      label: "Currently",
      value: `${CURRENT_ROLE.role} at ${CURRENT_ROLE.organization}${CURRENT_ROLE.product ? ` (${CURRENT_ROLE.product})` : ""}`,
    },
    { icon: Award, label: "Experience", value: `${formatDuration(totalWorkMonths)} professional` },
    education && { icon: GraduationCap, label: "Education", value: `${education.role}, ${education.organization}` },
    { icon: MapPin, label: "Based in", value: SITE.location },
  ].filter((fact): fact is { icon: typeof Briefcase; label: string; value: string } => Boolean(fact));

  return (
    <PageShell>
      <PageHeader eyebrow="About me" title="Hi, I'm Abhijeet" description={SITE.tagline} />

      <section aria-labelledby="story-heading" className="grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <Reveal className="mx-auto">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-xl"
            />
            <Image
              src="/Profile.jpg"
              alt={`Portrait of ${SITE.name}`}
              width={360}
              height={360}
              priority
              className="relative h-64 w-64 rounded-[2rem] object-cover ring-1 ring-white/15 sm:h-80 sm:w-80"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-gray-300">
          <h2 id="story-heading" className="text-3xl font-bold text-white">
            My story
          </h2>
          <p>
            I&apos;m a self-driven full stack developer with a strong focus on the frontend. I enjoy building
            scalable, real-world applications with React, Next.js, Node.js, PostgreSQL and MongoDB, and I care
            about the details that make a product feel fast and effortless to use.
          </p>
          <p>
            {CURRENT_ROLE ? (
              <>
                Right now I&apos;m the frontend developer behind{" "}
                <span className="font-semibold text-white">{CURRENT_ROLE.product ?? CURRENT_ROLE.organization}</span>{" "}
                at {CURRENT_ROLE.organization}, a platform that brings social networking, professional collaboration
                and business discovery into one ecosystem.
              </>
            ) : (
              <>I&apos;m currently open to new frontend and full stack roles.</>
            )}{" "}
            Outside of work I build side projects like a blog platform, a real-time support ticket system and a
            video calling app, and I write about what I learn.
          </p>
          <p>
            I studied Electronics and Communication Engineering at Manipal University Jaipur, which gave me a solid
            foundation in problem-solving that I now apply to the web.
          </p>
        </Reveal>
      </section>

      <section aria-label="Quick facts" className="mt-20">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }, index) => (
            <Reveal key={label} delay={index * 0.05}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <dt className="mb-2 flex items-center gap-2 text-sm font-medium text-indigo-300">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </dt>
                <dd className="text-gray-100">{value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section aria-labelledby="principles-heading" className="mt-24">
        <h2 id="principles-heading" className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
          How I work
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.title} as="li" delay={index * 0.08}>
              <GlowingCard className="h-full">
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">{principle.title}</h3>
                  <p className="text-gray-400">{principle.body}</p>
                </div>
              </GlowingCard>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="skills-heading" className="mt-24">
        <h2 id="skills-heading" className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
          Skills &amp; tools
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          {SKILL_GROUPS.map((group, index) => {
            const Icon = SKILL_ICON[group.id];
            return (
              <Reveal key={group.id} as="li" delay={index * 0.08}>
                <GlowingCard className="h-full">
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="rounded-lg bg-indigo-500/15 p-2 text-indigo-300">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h3 className="text-lg font-semibold text-white">{group.name}</h3>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-gray-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowingCard>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {CERTIFICATIONS.length > 0 && (
        <section aria-labelledby="certs-heading" className="mt-24">
          <h2 id="certs-heading" className="mb-10 text-center text-3xl font-bold text-white md:text-4xl">
            Certifications
          </h2>
          <ul className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {CERTIFICATIONS.map((cert) => (
              <li
                key={cert.title}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5"
              >
                <Award aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-purple-300" />
                <div>
                  <p className="font-medium text-gray-100">{cert.title}</p>
                  {cert.issuer && <p className="text-sm text-gray-400">{cert.issuer}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="cta-heading"
        className="mt-24 rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent p-8 text-center md:p-12"
      >
        <h2 id="cta-heading" className="text-2xl font-bold text-white md:text-3xl">
          Let&apos;s build something together
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-300">
          I&apos;m open to frontend and full stack opportunities and interesting collaborations.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-purple-500"
          >
            Get in touch
          </Link>
          <a
            href={SITE.resumePath}
            download
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 font-semibold text-white transition-colors hover:border-indigo-400 hover:bg-indigo-500/10"
          >
            <Download aria-hidden="true" className="h-5 w-5" />
            Download resume
          </a>
        </div>
      </section>
    </PageShell>
  );
}
