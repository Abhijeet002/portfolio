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
    role: "Frontend Developer",
    organization: "Stack-It",
    product: "Nestys",
    location: "Noida, India",
    start: "2025-09",
    summary:
      "Building the frontend of Nestys, a large-scale platform that unifies social networking, professional collaboration and business discovery in one ecosystem.",
    highlights: [
      "Sole frontend engineer, owning the entire UI end to end from design through implementation, with a focus on usability and professional UX.",
      "Built responsive, scalable interfaces for profile management, content discovery feeds and interactive social features with audio and video support.",
      "Implemented efficient data fetching and state management, integrating backend APIs for performance, reliability and maintainability.",
      "Partner with product and backend teams to ship a secure, high-quality user experience using modern frontend best practices.",
    ],
  },
  {
    id: "srstha",
    kind: "work",
    role: "Web Developer",
    organization: "Srstha Tech Solutions",
    location: "Hyderabad, India",
    start: "2024-04",
    end: "2024-07",
    highlights: [
      "Improved web application performance and shipped user-friendly features using React.js, Node.js and Express.js.",
      "Troubleshot backend issues, analyzed bugs and resolved them to keep the application running smoothly.",
      "Designed dynamic, responsive interfaces that increased user retention by 30%.",
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
      "Graduated with a CGPA of 8.32/10.",
      "Built 5+ web projects alongside coursework using React, Node.js and MongoDB.",
    ],
  },
];

export const WORK_EXPERIENCE = EXPERIENCE.filter((entry) => entry.kind === "work");

/** The role with no end date, if any. */
export const CURRENT_ROLE = WORK_EXPERIENCE.find((entry) => !entry.end);
