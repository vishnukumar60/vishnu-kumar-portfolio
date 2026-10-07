import { motion } from "motion/react";
import { Section } from "@/components/common/Section";
import { Card3D } from "@/components/common/Card3D";
import { Parallax } from "@/components/common/Parallax";
import { Briefcase } from "lucide-react";

const roles = [
  {
    period: "Internship",
    company: "Nexitence, Trichy",
    role: "Full Stack Development Intern",
    points: [
      "Developed full-stack web applications using React.js with responsive, user-friendly interfaces.",
      "Optimized database queries to improve performance and ensure faster application execution.",
    ],
  },
  {
    period: "Internship",
    company: "Eagle Hi-Tech Softcloud Pvt Ltd., Chennai",
    role: "Machine Learning Intern",
    points: [
      "Developed machine learning models for predictive analytics using data preprocessing and feature engineering techniques.",
      "Created data visualization dashboards and reports to present insights and support data-driven decision-making.",
    ],
  },
];

export function Experience() {

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've been working."
      description="Two internships across full-stack and machine learning — each one taught me a different definition of 'done'."
    >
      <div className="relative">
        <div
          aria-hidden
          className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-border/50 -translate-x-1/2 sm:translate-x-0"
        />
        <div
          aria-hidden
          className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-px bg-foreground/60 -translate-x-1/2 sm:translate-x-0"
        />
        <ol className="space-y-8 sm:space-y-10">
          {roles.map((r, i) => (
            <motion.li
              key={r.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 ${i % 2 === 1 ? "sm:[&>div:first-child]:order-2" : ""}`}
            >
              <span className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 size-3 rounded-full bg-foreground ring-4 ring-background" />
              <div className={i % 2 === 1 ? "sm:pl-12" : "sm:pr-12 sm:text-right"}>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {r.period}
                </div>
                <h3 className="mt-2 font-display font-semibold text-lg sm:text-xl text-balance">
                  {r.company}
                </h3>
                <div className="text-sm sm:text-base text-muted-foreground">{r.role}</div>
              </div>
              <Parallax
                distance={i % 2 === 0 ? 26 : -20}
                className={i % 2 === 1 ? "sm:pr-12 sm:text-right" : "sm:pl-12"}
              >
                <Card3D intensity={6}>
                  <div className="p-5 sm:p-6" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Briefcase className="size-3.5" /> Highlights
                    </div>
                    <ul className="space-y-2 text-sm text-left">
                      {r.points.map((p) => (
                        <li key={p} className="text-foreground/90">
                          — {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card3D>
              </Parallax>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
