import { Brain, Cloud, Code2, Database, Palette, Server, type LucideIcon } from "lucide-react";
import type { SkillGroupId } from "@/data/skills";

/** One icon per skill group, shared by the home page and /about so they never drift apart. */
export const SKILL_ICONS: Record<SkillGroupId, LucideIcon> = {
  languages: Code2,
  frontend: Palette,
  backend: Server,
  databases: Database,
  cloud: Cloud,
  cs: Brain,
};
