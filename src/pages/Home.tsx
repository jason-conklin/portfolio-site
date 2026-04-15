import { useCallback, useEffect, useRef, useState } from "react";
import { Github, LayoutGrid, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import { PageSEO } from "@/app/seo";
import { CinematicEnergyBackground } from "@/components/CinematicEnergyBackground";
import { HomeRailNav } from "@/components/HomeRailNav";
import { LiveDeploymentsStage } from "@/components/LiveDeploymentsStage";
import { PortfolioAboutSection } from "@/components/PortfolioAboutSection";
import { PortfolioContactSection } from "@/components/PortfolioContactSection";
import { PortfolioWorksSection } from "@/components/PortfolioWorksSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { hero, liveProjects, projects, site } from "@/data/profile";

const heroLead = "Full-stack engineer building and deploying production-grade web systems.";
const heroSupporting =
  "Applied AI, secure product architecture, and clean delivery for systems intended to hold up in production.";

const sectionIds = ["home", "works", "about", "contact"] as const;

type HomeSectionId = (typeof sectionIds)[number];

function HomePage() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSection, setActiveSection] = useState<HomeSectionId>("home");
  const openedProjectRef = useRef<string | null>(null);

  const openProjectCaseStudy = useCallback((slug?: string) => {
    if (!slug) return;

    const projectCard = document.querySelector<HTMLElement>(`[data-project-slug="${slug}"]`);
    const worksSection = document.getElementById("works");

    if (!projectCard) {
      worksSection?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    projectCard.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      projectCard.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }, 140);
  }, []);

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;
      const anchorLine = window.innerHeight * 0.32;
      let nextSection: HomeSectionId = "home";
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const containsAnchor = rect.top <= anchorLine && rect.bottom >= anchorLine;
        if (containsAnchor) {
          nextSection = sectionId;
          bestDistance = -1;
          continue;
        }

        if (bestDistance === -1) continue;

        const distance = Math.abs(rect.top - anchorLine);
        if (distance < bestDistance) {
          bestDistance = distance;
          nextSection = sectionId;
        }
      }

      setActiveSection(nextSection);
    };

    const scheduleActiveSectionUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    scheduleActiveSectionUpdate();
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveSectionUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
    };
  }, []);

  useEffect(() => {
    const projectSlug = new URLSearchParams(location.search).get("project");

    if (!projectSlug) {
      openedProjectRef.current = null;
      return;
    }

    if (openedProjectRef.current === projectSlug) return;

    const frameId = window.requestAnimationFrame(() => {
      openedProjectRef.current = projectSlug;
      openProjectCaseStudy(projectSlug);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [location.search, openProjectCaseStudy]);

  return (
    <>
      <PageSEO path="/" />
      <div className="home-cinematic-page cinematic-page relative isolate overflow-hidden">
        <CinematicEnergyBackground />
        <HomeRailNav activeSection={activeSection} />

        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-28 lg:block"
          style={{ background: "var(--cinematic-top-fade)" }}
        />
        <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden text-[0.7rem] uppercase tracking-[0.22em] cinematic-text-quaternary lg:block">
          © Jason Conklin
        </div>

        <div className="pointer-events-none fixed right-4 top-16 z-40 flex items-center gap-2 sm:right-6 sm:top-16 lg:top-6">
          <div className="pointer-events-auto flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="cinematic-btn-ghost hidden h-9 min-h-9 rounded-full px-3.5 text-xs font-medium uppercase tracking-[0.16em] sm:inline-flex"
            >
              <Link to={site.links.resume}>Resume</Link>
            </Button>
            <ThemeToggle
              compact
              className="cinematic-btn-ghost h-9 min-h-9 rounded-full px-3.5"
              labelClassName="cinematic-text-tertiary uppercase tracking-[0.16em]"
            />
          </div>
        </div>

        <main className="relative z-10">
          <section
            id="home"
            className="scroll-mt-[var(--section-scroll-offset)] px-6 pb-8 pt-20 sm:px-8 sm:pb-10 sm:pt-22 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:px-14 lg:pb-6 lg:pl-[12rem] lg:pr-16 lg:pt-4 xl:pl-[14rem]"
          >
            <div className="mx-auto flex w-full max-w-[92rem] flex-col gap-4 sm:gap-5 lg:flex-1 lg:justify-center lg:gap-4">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.72, ease: "easeOut" }}
                className="pt-4 sm:pt-6 lg:pt-0"
              >
                <div className="cinematic-chip inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.24em] backdrop-blur-xl">
                  <MapPin
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color: "var(--cinematic-text-tertiary)" }}
                    aria-hidden="true"
                  />
                  <span className="truncate">{hero.location}</span>
                </div>

                <motion.h1
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.06, ease: "easeOut" }}
                  className="mt-4 text-[clamp(3.05rem,7.7vw,6.1rem)] font-[300] uppercase leading-[0.9] tracking-[0.09em] cinematic-text-primary sm:tracking-[0.12em] lg:whitespace-nowrap"
                >
                  {hero.name}
                </motion.h1>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.68, delay: 0.16, ease: "easeOut" }}
                  className="mt-4"
                >
                  <p className="text-[0.95rem] font-normal uppercase tracking-[0.08em] cinematic-text-secondary sm:text-[1rem] lg:whitespace-nowrap">
                    {heroLead}
                  </p>
                  <p className="mt-2.5 text-[0.94rem] leading-6 cinematic-text-tertiary sm:text-[0.98rem] sm:leading-7 lg:whitespace-nowrap">
                    {heroSupporting}
                  </p>
                </motion.div>

                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
                  className="mt-4 flex flex-wrap items-center gap-2"
                >
                  <Button
                    asChild
                    className="cinematic-btn-primary h-9 min-h-9 rounded-full px-4 text-[0.88rem] font-medium hover:-translate-y-px"
                  >
                    <a href="#works" className="inline-flex items-center gap-2 whitespace-nowrap">
                      <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                      View Works
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="cinematic-btn-ghost h-9 min-h-9 rounded-full px-4 text-[0.88rem] font-medium hover:-translate-y-px"
                  >
                    <a href="#contact" className="inline-flex items-center gap-2 whitespace-nowrap">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Get in Touch
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="cinematic-btn-ghost h-9 min-h-9 rounded-full px-4 text-[0.88rem] font-medium hover:-translate-y-px"
                  >
                    <a
                      href={site.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 whitespace-nowrap"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              <div className="cinematic-panel-strong relative overflow-hidden rounded-[2rem] px-5 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 8% 0%, var(--cinematic-band-accent-a), transparent 22%), radial-gradient(circle at 100% 100%, var(--cinematic-band-accent-b), transparent 28%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="cinematic-divider pointer-events-none absolute inset-x-0 top-0 h-px"
                />

                <div className="relative z-10">
                  <LiveDeploymentsStage
                    projects={liveProjects}
                    onOpenProject={openProjectCaseStudy}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </div>
              </div>
            </div>
          </section>

          <PortfolioWorksSection
            projects={projects}
          />
          <PortfolioAboutSection />
          <PortfolioContactSection />
        </main>
      </div>
    </>
  );
}

export default HomePage;
