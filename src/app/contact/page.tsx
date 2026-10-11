import type { Metadata } from "next";
import { Github, Linkedin, Mail, MapPin, PenLine } from "lucide-react";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import CopyButton from "@/components/CopyButton";
import GlowingCard from "@/components/GlowingCard";
import Reveal from "@/components/Reveal";
import { SITE, SOCIAL_LINKS } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name} about frontend and full stack roles or collaborations.`,
};

const PROFILES = [
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", handle: "in/abhijeet-sachan", icon: Linkedin },
  { href: SOCIAL_LINKS.github, label: "GitHub", handle: "Abhijeet002", icon: Github },
  { href: SOCIAL_LINKS.devTo, label: "dev.to", handle: "Articles & notes", icon: PenLine },
] as const;

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Have a role, project or idea in mind? I usually reply within a day or two."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal as="section" className="space-y-4">
          <h2 className="sr-only">Contact details</h2>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex items-center gap-3 text-indigo-300">
              <Mail aria-hidden="true" className="h-5 w-5" />
              <span className="text-sm font-medium">Email</span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <a href={`mailto:${SITE.email}`} className="break-all text-lg font-semibold text-white hover:text-indigo-200">
                {SITE.email}
              </a>
              <CopyButton value={SITE.email} label="Copy email address" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-3 flex items-center gap-3 text-indigo-300">
              <MapPin aria-hidden="true" className="h-5 w-5" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="text-lg font-semibold text-white">{SITE.location}</p>
            <p className="mt-1 text-sm text-gray-400">Open to remote and hybrid roles.</p>
          </div>

          <ul className="space-y-3">
            {PROFILES.map(({ href, label, handle, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/5"
                >
                  <span className="rounded-xl bg-white/5 p-3 text-gray-200 transition-colors group-hover:text-white">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-white">{label}</span>
                    <span className="text-sm text-gray-400">{handle}</span>
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" delay={0.1}>
          <GlowingCard interactive={false}>
            <div className="p-6 md:p-8">
              <h2 className="mb-6 text-2xl font-bold text-white">Send a message</h2>
              <ContactForm to={SITE.email} />
            </div>
          </GlowingCard>
        </Reveal>
      </div>
    </PageShell>
  );
}
