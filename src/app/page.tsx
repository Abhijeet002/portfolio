"use client";

import { motion, useScroll, useTransform, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  ChevronDown, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Download,
  Code,
  Palette,
  Zap,
  Users
} from "lucide-react";

type Experience = {
  period: string;
  role: string;
  company: string;
  bullets: string[];
  icon: React.ReactNode;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  img: string;
  href: string;
  github?: string;
};

const EXPERIENCES: Experience[] = [
  {
    period: "2025 — Present",
    role: "Full-Stack Developer",
    company: "Your Current Company",
    icon: <Code className="w-5 h-5" />,
    bullets: [
      "Building end-to-end features with Next.js, Node.js, and PostgreSQL with 40% performance improvement.",
      "Collaborating with design/product teams to ship user-centric, accessible UIs reaching 10k+ users.",
    ],
  },
  {
    period: "2024",
    role: "Software Engineer Intern",
    company: "Your Previous Company",
    icon: <Zap className="w-5 h-5" />,
    bullets: [
      "Developed reusable React + Tailwind components, improving Lighthouse scores by 25%.",
      "Wrote comprehensive integration tests and refined CI workflows, reducing deployment time by 60%.",
    ],
  },
  {
    period: "2020 — 2024",
    role: "B.Tech, Electronics & Communication",
    company: "Manipal University Jaipur",
    icon: <Users className="w-5 h-5" />,
    bullets: [
      "Graduated with a strong foundation in software engineering and data analysis (CGPA: 8.5/10).",
      "Built 15+ web projects and led a team of 4 developers in hackathons with 2 winning projects.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Echoes & Edits",
    description: "A modern blog platform with real-time collaboration features and AI-powered content suggestions.",
    tech: ["Next.js", "TypeScript", "Prisma", "Supabase"],
    img: "/projects/echoesandedits.jpg",
    href: "https://blog-app-three-topaz.vercel.app/",
    github: "https://github.com/Abhijeet002/Blog-app"
  },
  {
    title: "Helpme- support ticket system",
    description: "A comprehensive support ticket system for managing customer inquiries and issues.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    img: "/projects/helpme.jpg",
    href: "#",
    github: "#"
  },
  {
    title: "Virtuale",
    description: "Virtual reality meeting platform with spatial audio and immersive collaboration tools.",
    tech: ["Three.js", "WebRTC", "Node.js", "Socket.io"],
    img: "/projects/virtuale.jpg",
    href: "#",
    github: "#"
  },
];

const SKILLS = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { name: "Tools", items: ["Git", "Docker", "AWS", "Figma"] },
];

// Custom hooks and animations


const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
          animate={{
            x: [0, Math.random() * 100, 0],
            y: [0, Math.random() * 100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

// const FloatingNavbar = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const { scrollY } = useScroll();

//   useEffect(() => {
//     return scrollY.onChange((latest) => {
//       setIsVisible(latest > 100);
//     });
//   }, [scrollY]);

//   const navItems = [
//     { href: "#about", label: "About" },
//     { href: "#projects", label: "Projects" },
//     { href: "#experience", label: "Experience" },
//     { href: "#contact", label: "Contact" },
//   ];

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <motion.nav
//           initial={{ y: -100, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           exit={{ y: -100, opacity: 0 }}
//           className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
//         >
//           <div className="flex items-center gap-1 px-6 py-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </motion.nav>
//       )}
//     </AnimatePresence>
//   );
// };

const GlowingCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
      <div className={`relative bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl ${isHovered ? 'border-indigo-500/50' : ''} transition-all duration-300`}>
        {children}
      </div>
    </motion.div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      {/* <FloatingNavbar /> */}
      <main className="scroll-smooth min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden">
        <ParticleBackground />
        
        {/* Hero Section */}
        <motion.section 
          style={{ opacity, scale }}
          className="min-h-screen  flex items-center justify-center relative"
        >
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10 px-6">
            {/* Intro Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="text-center md:text-left z-10"
            >
              <motion.div variants={fadeUp} className="mb-4">
                <span className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-sm text-indigo-300">
                  Available for new opportunities
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeUp}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <TypewriterText text="Abhijeet" delay={100} />
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeUp}
                className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed"
              >
                Full-stack developer crafting{" "}
                <span className="text-indigo-300 font-semibold">exceptional digital experiences</span>{" "}
                with modern technologies. I build scalable applications that users love.
              </motion.p>
              
              <motion.div 
                variants={fadeUp}
                className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8"
              >
                <Link
                  href="#projects"
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover:scale-105"
                >
                  View My Work
                  <ExternalLink className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="#contact"
                  className="px-8 py-4 border border-white/20 hover:border-indigo-400 hover:bg-indigo-500/10 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  Let&apos;s Talk
                </Link>
              </motion.div>

              <motion.div 
                variants={fadeUp}
                className="flex items-center justify-center md:justify-start gap-6"
              >
                {[
                  { Icon: Github, href: "#", label: "GitHub" },
                  { Icon: Linkedin, href: "#", label: "LinkedIn" },
                  { Icon: Mail, href: "mailto:youremail@example.com", label: "Email" },
                ].map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/50 rounded-xl transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Profile Image with Enhanced Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="shrink-0 relative"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-20 blur-lg"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative"
                >
                  <Image
                    src="/Profile.jpg"
                    alt="Abhijeet headshot"
                    width={320}
                    height={320}
                    priority
                    className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover ring-4 ring-white/10 shadow-2xl relative z-10"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/60"
            >
              <span className="text-sm">Scroll to explore</span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-6xl mx-auto px-6 py-20"
        >
          <div className="text-center mb-16">
            <motion.h2 
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              About Me
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              I&apos;m passionate about creating digital experiences that make a difference. 
              With expertise in modern web technologies, I focus on building applications 
              that are not just functional, but truly exceptional.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <GlowingCard className="p-8 h-full">
                  <div className="mb-6">
                    {skill.name === "Frontend" && <Palette className="w-12 h-12 mx-auto text-indigo-400" />}
                    {skill.name === "Backend" && <Code className="w-12 h-12 mx-auto text-purple-400" />}
                    {skill.name === "Tools" && <Zap className="w-12 h-12 mx-auto text-pink-400" />}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{skill.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm border border-white/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 py-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A showcase of my recent work, demonstrating technical expertise and creative problem-solving.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingCard className="h-full overflow-hidden group">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.img}
                      alt={`${project.title} screenshot`}
                      width={800}
                      height={480}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs border border-indigo-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link
                        href={project.href}
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Link>
                      {project.github && (
                        <Link
                          href={project.github}
                          className="flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          Code
                        </Link>
                      )}
                    </div>
                  </div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Roadmap */}
        <motion.section
          id="experience"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto px-6 py-20"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Experience Journey</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My professional journey and the experiences that shaped my expertise.
            </p>
          </motion.div>

          <div className="relative">
            {/* Enhanced Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="space-y-12">
              {EXPERIENCES.map((item, idx) => (
                <motion.div
                  key={`${item.period}-${idx}`}
                  variants={fadeUp}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-20"
                >
                  {/* Enhanced Node */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, delay: idx * 0.1 }}
                    className="absolute left-5 top-2 w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full ring-4 ring-indigo-500/20 shadow-lg flex items-center justify-center"
                  >
                    <div className="text-white text-xs">
                      {item.icon}
                    </div>
                  </motion.div>

                  <GlowingCard>
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <span className="inline-block px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm mb-2">
                            {item.period}
                          </span>
                          <h3 className="text-2xl font-bold text-white">{item.role}</h3>
                          <p className="text-indigo-300 font-medium">{item.company}</p>
                        </div>
                      </div>

                      <ul className="space-y-3">
                        {item.bullets.map((bullet, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: (idx * 0.1) + (i * 0.05) }}
                            className="flex items-start gap-3 text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{bullet}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </GlowingCard>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto px-6 py-20"
        >
          <div className="text-center">
            <motion.h2 
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Let&apos;s Build Something Amazing
            </motion.h2>
            <motion.p 
              variants={fadeUp}
              className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            >
              Ready to bring your ideas to life? I&apos;m always excited to work on innovative projects 
              and collaborate with passionate teams.
            </motion.p>

            <motion.div 
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a
                href="mailto:youremail@example.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 flex items-center gap-3"
              >
                <Mail className="w-5 h-5" />
                Get In Touch
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              
              <motion.a
                href="/Abhijeet_Resume.pdf"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border border-white/20 hover:border-indigo-400 hover:bg-indigo-500/10 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        
      </main>
    </>
  );
}