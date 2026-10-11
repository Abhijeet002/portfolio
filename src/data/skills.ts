export type SkillGroupId = "frontend" | "backend" | "tools";

export type SkillGroup = {
  id: SkillGroupId;
  name: string;
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  { id: "frontend", name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  {
    id: "backend",
    name: "Backend",
    items: ["Node.js", "Express.js", "Python", "PostgreSQL", "MongoDB", "Socket.io"],
  },
  { id: "tools", name: "Tools", items: ["Git", "Azure", "Figma"] },
];
