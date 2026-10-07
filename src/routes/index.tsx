import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/lib/theme";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { BackToTop } from "@/components/common/BackToTop";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AmbientBackground } from "@/components/common/AmbientBackground";
import { PageTransition } from "@/components/common/PageTransition";

// Below-the-fold sections are code-split so the initial JS payload only ships
// Navbar + Hero + About. Reserved fallback heights prevent layout shift.
const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects })),
);
const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({ default: m.Experience })),
);
const Education = lazy(() =>
  import("@/components/sections/Education").then((m) => ({ default: m.Education })),
);
const Certifications = lazy(() =>
  import("@/components/sections/Certifications").then((m) => ({ default: m.Certifications })),
);
const Achievements = lazy(() =>
  import("@/components/sections/Achievements").then((m) => ({ default: m.Achievements })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer })),
);

/** Reserved-height placeholder — keeps layout stable while a lazy chunk loads. */
function SectionFallback({ minHeight }: { minHeight: string }) {
  return <div aria-hidden style={{ minHeight }} />;
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishnu Kumar — AI & Data Science Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Vishnu Kumar, final-year B.Tech student in Artificial Intelligence & Data Science. Projects, experience, and selected work.",
      },
      { property: "og:title", content: "Vishnu Kumar — AI & Data Science Engineer" },
      {
        property: "og:description",
        content:
          "Final-year B.Tech student in AI & Data Science — React frontends and applied machine learning.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  return (
    <ThemeProvider>
      <PageTransition />
      <AmbientBackground />
      <div className="relative">
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Suspense fallback={<SectionFallback minHeight="100vh" />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="80vh" />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <Experience />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="50vh" />}>
            <Education />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="70vh" />}>
            <Certifications />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60vh" />}>
            <Achievements />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="70vh" />}>
            <Contact />
          </Suspense>
          <Suspense fallback={<SectionFallback minHeight="60px" />}>
            <Footer />
          </Suspense>
        </main>
        <BackToTop />
        <Toaster position="top-center" richColors />
      </div>
    </ThemeProvider>
  );
}
