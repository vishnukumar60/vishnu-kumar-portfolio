import { Section } from "@/components/common/Section";
import { Reveal } from "@/components/common/Reveal";
import { CardCarousel } from "@/components/common/CardCarousel";
import { Parallax } from "@/components/common/Parallax";
import { Code, Globe, Brain, Database, Wrench, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Asymmetric bento grid of skill categories. `span` drives the cell footprint
 * on the 4-column desktop grid (1x1, 2x1 and 1x2 cells).
 */
const categories = [
  {
    Icon: Code,
    title: "Programming",
    skills: ["Java", "Python (ML working knowledge)"],
    span: "lg:col-span-2",
  },
  {
    Icon: Globe,
    title: "Frontend",
    skills: ["React.js", "JavaScript", "HTML", "CSS"],
    span: "lg:col-span-2",
  },
  {
    Icon: Brain,
    title: "ML / Computer Vision",
    skills: [
      "OpenCV",
      "YOLOv3",
      "Predictive Analytics",
      "Data Preprocessing",
      "Feature Engineering",
    ],
    span: "lg:col-span-2 lg:row-span-2",
    feature: true,
  },
  {
    Icon: Database,
    title: "Backend / Database",
    skills: ["Postgres SQL", "MongoDB", "Firebase"],
    span: "lg:col-span-1",
  },
  {
    Icon: Wrench,
    title: "Tools & Platforms",
    skills: ["GitHub", "Git", "Power BI"],
    span: "lg:col-span-1",
  },
  {
    Icon: Users,
    title: "Core Competencies",
    skills: [
      "Agile Methodologies",
      "Team Leadership",
      "Time Management",
      "Problem-Solving",
      "Communication",
      "Quick Learner",
    ],
    span: "lg:col-span-2",
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A toolkit chosen with intent."
      description="Tools I've actually used — in coursework, internships, and my own projects."
    >
      <CardCarousel gridClassName="sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[minmax(0,1fr)] sm:gap-5">
        {categories.map((cat, i) => (
          <Parallax
            key={cat.title}
            /* Alternating float depth gives the bento grid a layered feel. */
            distance={i % 3 === 0 ? 34 : i % 3 === 1 ? -22 : 14}
            className={cn("min-w-0", cat.span, cat.feature && "sm:col-span-2")}
          >
          <Reveal delay={i * 0.07} className="h-full">
            <article
              className={cn(
                "group h-full rounded-[1.75rem] glass-panel glass-lift overflow-hidden",
                cat.feature ? "p-6 sm:p-8" : "p-5 sm:p-6",
              )}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="size-10 shrink-0 rounded-2xl bg-secondary/70 grid place-items-center text-foreground/80 transition-colors group-hover:bg-primary/25 group-hover:text-foreground">
                  <cat.Icon className="size-5" />
                </span>
                <h3
                  className={cn(
                    "min-w-0 font-display font-semibold",
                    cat.feature ? "text-lg sm:text-xl" : "text-[0.95rem] sm:text-base",
                  )}
                >
                  {cat.title}
                </h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li key={s}>
                    <span className="inline-flex items-center rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-mono text-foreground/85 transition-colors hover:border-ring/60 hover:text-foreground">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>

              {cat.feature && (
                <p className="mt-6 text-sm text-muted-foreground text-pretty">
                  My deepest focus area — real-time detection pipelines, data preparation and
                  models that hold up outside a notebook.
                </p>
              )}
            </article>
          </Reveal>
          </Parallax>
        ))}
      </CardCarousel>
    </Section>
  );
}
