/**
 * Single source of truth for the career timeline.
 * Rendered on the home page (#experience) and on /experience.
 * Keep entries in reverse chronological order and in sync with the resume / LinkedIn.
 */

export type TimelineKind = "work" | "education";

export type TimelineEntry = {
  id: string;
  kind: TimelineKind;
  role: string;
  organization: string;
  /** Product or project the role is focused on, shown next to the organization. */
  product?: string;
  location: string;
  /** ISO `YYYY-MM`, used for the machine-readable <time> element. */
  start: string;
  /** ISO `YYYY-MM`, or omitted when the role is current. */
  end?: string;
  summary?: string;
  highlights: string[];
  tech?: string[];
};

export const EXPERIENCE: TimelineEntry[] = [
  {
    id: "stack-it",
    kind: "work",
    role: "Software Engineer",
    organization: "Stack-IT",
    product: "Nestys",
    location: "Remote, Noida",
    start: "2025-09",
    summary:
      "Leading the frontend of Nestys, a large-scale social commerce platform spanning social feed, e-commerce, real-time chat, short video, wallet and community opportunities.",
    highlights: [
      "Owned end-to-end frontend architecture of Nestys across 7 modules, including social feed, e-commerce, real-time chat, short video, wallet and community opportunities.",
      "Delivered production-grade UI in React.js, Next.js and TypeScript (strict mode), applying clean architecture and single-responsibility component patterns for long-term scalability.",
      "Reduced redundant network requests by 35% through strategic caching and state management with TanStack Query and Zustand.",
      "Built real-time messaging with Socket.IO, supporting text, media, audio/video calling, delivery and read receipts, with optimistic updates for a responsive experience.",
      "Integrated AWS S3 for media uploads and Stripe and Braintree (PayPal) for in-app payments, isolating third-party dependencies behind wrapper modules for maintainability.",
      "Collaborated with product and backend teams across the full development lifecycle, from system design and API integration to testing, debugging and production delivery.",
    ],
    tech: ["React.js", "Next.js", "TypeScript", "TanStack Query", "Zustand", "Socket.IO", "AWS S3", "Stripe"],
  },
  {
    id: "srstha",
    kind: "work",
    role: "Associate Web Developer",
    organization: "Srstha Tech Solutions",
    location: "Hyderabad, India",
    start: "2024-04",
    end: "2024-07",
    highlights: [
      "Optimized web application performance using React.js, Node.js and Express.js, achieving 40% faster load times and improved scalability for 500+ concurrent users.",
      "Diagnosed and resolved 25+ critical backend issues through systematic debugging and performance analysis, reducing system downtime by 60%.",
    ],
    tech: ["React.js", "Node.js", "Express.js"],
  },
  {
    id: "manipal",
    kind: "education",
    role: "B.Tech, Electronics & Communication Engineering",
    organization: "Manipal University Jaipur",
    location: "Jaipur, India",
    start: "2020-10",
    end: "2024-10",
    highlights: [
      "Graduated with a CGPA of 8.3/10.",
      "Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems.",
    ],
  },
];

export const WORK_EXPERIENCE = EXPERIENCE.filter((entry) => entry.kind === "work");

/** The role with no end date, if any. */
export const CURRENT_ROLE = WORK_EXPERIENCE.find((entry) => !entry.end);
