export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  /** Path under /public. */
  image: string;
  /** Deployed app. Omit when there is no public deployment; never use "#". */
  liveUrl?: string;
  repoUrl?: string;
  /** Shown on the home page "Featured" grid. */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: "echoes-and-edits",
    title: "Echoes & Edits",
    description:
      "A modern blog platform with real-time collaboration features and AI-powered content suggestions.",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    image: "/projects/echoesandedits.jpg",
    liveUrl: "https://blog-app-three-topaz.vercel.app/",
    repoUrl: "https://github.com/Abhijeet002/Blog-app",
    featured: true,
  },
  {
    id: "helpme",
    title: "HelpMe – Support Ticket System",
    description:
      "A role-based support ticket system with real-time messaging, file uploads and AI-driven ticket categorization.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    image: "/projects/helpme.jpg",
    repoUrl: "https://github.com/Abhijeet002/HelpMe-AI-Powered-Support-Ticket-System",
    featured: true,
  },
  {
    id: "virtuale",
    title: "Virtuale",
    description:
      "Virtual reality meeting platform with spatial audio and immersive collaboration tools.",
    tech: ["Three.js", "WebRTC", "Node.js", "Socket.io"],
    image: "/projects/virtuale.jpg",
    liveUrl: "https://virtuale-xi.vercel.app/",
    repoUrl: "https://github.com/Abhijeet002/Virtuale--Video-calling-app",
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
