import type { Metadata } from "next";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import { EXPERIENCE } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience | Abhijeet",
  description:
    "Abhijeet Sachan's professional experience: Frontend Developer at Stack-It building Nestys, and Web Developer at Srstha Tech Solutions.",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <section aria-labelledby="experience-heading" className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        <header className="text-center mb-16">
          <h1 id="experience-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Experience Journey
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My professional journey and the experiences that shaped my expertise.
          </p>
        </header>

        <ExperienceTimeline items={EXPERIENCE} />
      </section>
    </div>
  );
}
