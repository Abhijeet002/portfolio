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
      "A full-stack blogging platform with JWT authentication, role-based access control and responsive design, backed by a REST API that handles 10,000+ posts with optimized queries.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "JWT"],
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
      "A real-time video conferencing platform for 50+ participants, using WebRTC for peer-to-peer calls and Socket.io for chat and signaling, with scheduling, screen sharing and personal rooms.",
    tech: ["Next.js", "TypeScript", "WebRTC", "Socket.io"],
    image: "/projects/virtuale.jpg",
    liveUrl: "https://virtuale-xi.vercel.app/",
    repoUrl: "https://github.com/Abhijeet002/Virtuale--Video-calling-app",
    featured: true,
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);
