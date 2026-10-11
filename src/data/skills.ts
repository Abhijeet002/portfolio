export type SkillGroupId = "languages" | "frontend" | "backend" | "databases" | "cloud" | "cs";

export type SkillGroup = {
  id: SkillGroupId;
  name: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  { id: "languages", name: "Languages", items: ["JavaScript", "TypeScript", "Python", "C++", "SQL"] },
  {
    id: "frontend",
    name: "Frontend",
    items: ["React.js", "Next.js", "Zustand", "TanStack Query", "Tailwind CSS"],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Microservices", "Socket.io"],
  },
  { id: "databases", name: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { id: "cloud", name: "Cloud & Tools", items: ["AWS (S3)", "Git", "GitHub", "Postman", "VS Code"] },
  {
    id: "cs",
    name: "Computer Science",
    items: ["Data Structures & Algorithms", "Object-Oriented Programming", "Software Design Principles"],
  },
];
