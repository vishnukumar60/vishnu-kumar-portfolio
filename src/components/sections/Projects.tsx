import { useState, memo } from "react";
import { motion } from "motion/react";
import { Parallax } from "@/components/common/Parallax";

import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { CardCarousel } from "@/components/common/CardCarousel";
import { Card3D } from "@/components/common/Card3D";
import { cn } from "@/lib/utils";
import p1 from "@/assets/p1.webp";
import p2 from "@/assets/p2.webp";
import p3 from "@/assets/p3.webp";
import p4 from "@/assets/p4.webp";
import p5 from "@/assets/p5.webp";
import p6 from "@/assets/p6.webp";

// 1. Defined category type union
export type Cat = "All" | "AI & DS" | "Full Stack" | "Web Development";

// 2. Updated category filter options to include all distinct categories
const cats: Cat[] = ["All", "AI & DS", "Full Stack", "Web Development"];

const projects = [
  {
    title: "Expense Management System",
    desc: "Designed and developed a full-stack personal finance management application using React.js and Firebase — covering CRUD operations, data visualization, and modern web app development.",
    img: p1,
    cat: "Full Stack" as const,
    stack: ["React.js", "Firebase", "CRUD", "Data Visualization"],
    github: "https://github.com/vishnukumar60/Expense-Management-System",
    live: "https://expeno-fin.web.app/",
  },
  {
    title: "AuraFix",
    desc: "A modern daily tracking and task management application designed to organize tasks, monitor daily progress, and improve productivity through a clean, responsive, and user-friendly interface.",
    img: p5,
    cat: "Web Development" as const,
    stack: ["React.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/vishnukumar60/aurafix-daily-tracker",
    live: "https://aurafix.lovable.app/",
  },
  {
    title: "Snakes & Ladders",
    desc: "An interactive web-based Snakes & Ladders game featuring a clean, responsive interface and engaging gameplay experience.",
    img: p2,
    cat: "Web Development" as const,
    stack: ["React", "TypeScript", "JavaScript", "CSS"],
    github: "https://github.com/vishnukumar60/snake-and-ladder",
    live: "https://68af39e8b116f1cb79287efd--deluxe-gnome-b25c32.netlify.app/",
  },
  {
    title: "Freelance platform",
    desc: "A modern web freelance web platform designed for Phoenix Brothers, featuring a professional interface, responsive design, and an engaging user experience.",
    img: p3,
    cat: "Web Development" as const,
    stack: ["React.js", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/vishnukumar60/Freelance-Service-platform",
    live: "https://subtle-clafoutis-249ab1.netlify.app/",
  },
  {
    title: "Trade Management Platform",
    desc: "A modern trade management platform designed to streamline trade tracking, transaction management, portfolio monitoring, and financial activity through a responsive and intuitive interface.",
    img: p6,
    cat: "Full Stack" as const,
    stack: ["React.js", "TypeScript", "Node.js", "Database"],
    github: "https://github.com/vishnukumar60/trade-management-platform",
    live: "https://clear-file-web.lovable.app/",
  },
  {
    title: "AI-Powered Area Surveillance System for Theft Detection",
    desc: "Designed and implemented a real-time surveillance system using Python, OpenCV, and YOLOv3 — strengthening practical experience in machine learning, computer vision, and software development.",
    img: p4,
    cat: "AI & ML" as const,
    stack: ["Python", "OpenCV", "YOLOv3", "Computer Vision"],
    github: "https://github.com/vishnukumar60/AI-Powered-Area-Surveillance-System-for-Theft-Detection",
    live: "https://github.com/vishnukumar60/",
  },
];

const ProjectCard = memo(function ProjectCard({
  project,
  idx,
}: {
  project: (typeof projects)[number];
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Card3D>
        <div className="group flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={project.img}
              alt={project.title}
              loading="lazy"
              decoding="async"
              width={1280}
              height={896}
              className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
            <div className="absolute top-3 left-3 glass rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider">
              {project.cat}
            </div>
          </div>
          <div
            className="p-5 sm:p-6 flex flex-col flex-1"
            style={{ transform: "translateZ(40px)" }}
          >
            <h3 className="font-display font-semibold text-lg sm:text-xl leading-snug text-balance">
              {project.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed text-pretty">
              {project.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-mono rounded-full bg-secondary px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
            {/* Added mt-auto to anchor action buttons to the bottom regardless of card height */}
            <div className="mt-auto pt-6 flex gap-2 flex-wrap">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source code on GitHub`}
                className="inline-flex items-center gap-1.5 text-xs rounded-full border border-border px-3 py-1.5 hover:bg-secondary transition-colors"
              >
                <Github className="size-3.5" aria-hidden /> Code
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} live demo`}
                className="inline-flex items-center gap-1.5 text-xs rounded-full bg-foreground text-background px-3 py-1.5 hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="size-3.5" aria-hidden /> Live
              </a>
            </div>
          </div>
        </div>
      </Card3D>
    </motion.div>
  );
});

const MoreCard = memo(function MoreCard() {
  return (
    <motion.a
      href="https://github.com/vishnukumar60"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col items-start justify-between min-h-[220px] sm:min-h-[280px] group"
    >
      <div>
        <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">More</div>
        <h3 className="mt-3 font-display font-semibold text-xl leading-snug">
          More work on GitHub
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Coursework, experiments and smaller builds live on my GitHub — I keep pushing as I learn.
        </p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
        Visit GitHub
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
});

export function Projects() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work."
      description="A short list of things I'm proud of — built end-to-end, shipped and iterated."
    >
      <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={cn(
              "relative text-sm rounded-full px-4 py-2 transition-colors",
              active === c ? "text-background" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active === c && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      <CardCarousel gridClassName="sm:grid sm:grid-cols-2 sm:gap-6">
        {filtered.map((p, i) => (
          <ProjectCard key={p.title} project={p} idx={i} />
        ))}
        {active === "All" && (
          <Parallax distance={26} className="flex [&>a]:w-full">
            <MoreCard />
          </Parallax>
        )}
      </CardCarousel>
    </Section>
  );
}