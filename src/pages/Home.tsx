import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutGrid, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { PageSEO } from "@/app/seo";
import { CinematicEnergyBackground } from "@/components/CinematicEnergyBackground";
import { HomeRailNav } from "@/components/HomeRailNav";
import { LiveDeploymentsStage } from "@/components/LiveDeploymentsStage";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { hero, liveProjects, site } from "@/data/profile";

const heroLead = "Production full-stack engineer / applied AI systems";
const heroSupporting =
  "Building secure web platforms, evaluation workflows, and polished product experiences for real-world delivery.";

function HomePage() {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [activeSection, setActiveSection] = useState<"home" | "works">("home");

  useEffect(() => {
    const deployments = document.getElementById("deployments");
    if (!deployments) return;

    const updateActiveSection = () => {
      const { top } = deployments.getBoundingClientRect();
      setActiveSection(top <= window.innerHeight * 0.48 ? "works" : "home");
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  function openProjectCaseStudy(slug?: string) {
    if (!slug) return;
    navigate(`/projects#${slug}`);
  }

  return (
    <>
      <PageSEO path="/" />
      <div className="home-cinematic-page relative isolate overflow-hidden bg-[#060607] text-white">
        <CinematicEnergyBackground />
        <HomeRailNav activeSection={activeSection} />

        <div className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden h-28 bg-gradient-to-b from-black/38 via-black/10 to-transparent lg:block" />
        <div className="pointer-events-none fixed bottom-6 left-6 z-30 hidden text-[0.7rem] uppercase tracking-[0.22em] text-white/34 lg:block">
          © Jason Conklin
        </div>

        <div className="pointer-events-none fixed right-4 top-16 z-40 flex items-center gap-2 sm:right-6 sm:top-16 lg:top-6">
          <div className="pointer-events-auto flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              className="hidden h-9 min-h-9 rounded-full border border-white/8 bg-white/[0.035] px-3.5 text-xs font-medium uppercase tracking-[0.16em] text-white/78 shadow-none transition duration-200 hover:border-white/16 hover:bg-white/[0.08] hover:text-white sm:inline-flex"
            >
              <a href={site.links.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
            <ThemeToggle
              compact
              className="h-9 min-h-9 rounded-full border border-white/8 bg-white/[0.035] px-3.5 text-white shadow-none transition duration-200 hover:border-white/16 hover:bg-white/[0.08] hover:text-white"
              labelClassName="text-white/58 uppercase tracking-[0.16em]"
            />
          </div>
        </div>

        <main className="relative z-10">
          <section
            id="home"
            className="min-h-[100svh] px-6 pb-14 pt-24 sm:px-8 lg:px-14 lg:pb-20 lg:pl-[12rem] lg:pr-16 lg:pt-10 xl:pl-[14rem]"
          >
            <div className="mx-auto flex min-h-[calc(100svh-6rem)] w-full max-w-[92rem] flex-col gap-8">
              <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,33rem)_1fr] lg:gap-12">
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="max-w-[34rem] self-start pt-6 sm:pt-10 lg:pt-14"
                >
                  <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.24em] text-white/52 backdrop-blur-xl">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-amber-200/70" aria-hidden="true" />
                    <span className="truncate">{hero.location}</span>
                  </div>

                  <motion.h1
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.78, delay: 0.08, ease: "easeOut" }}
                    className="mt-8 text-[clamp(3.1rem,7.8vw,6.35rem)] font-[300] uppercase leading-[0.9] tracking-[0.12em] text-white/96 sm:tracking-[0.145em]"
                  >
                    <span className="block">Jason</span>
                    <span className="block">Conklin</span>
                  </motion.h1>

                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
                    animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
                    className="mt-5 max-w-[28rem]"
                  >
                    <p className="text-balance text-[1rem] font-normal uppercase tracking-[0.12em] text-white/66 sm:text-[1.08rem]">
                      {heroLead}
                    </p>
                    <p className="mt-4 max-w-[27rem] text-pretty text-[0.96rem] leading-7 text-white/52">
                      {heroSupporting}
                    </p>
                  </motion.div>
                </motion.div>

                <div className="hidden lg:block" aria-hidden="true" />
              </div>

              <LiveDeploymentsStage
                projects={liveProjects}
                onOpenProject={openProjectCaseStudy}
                prefersReducedMotion={prefersReducedMotion}
              />

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.24, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-center gap-3 pb-2 pt-1"
              >
                <Button
                  asChild
                  className="h-11 min-h-11 rounded-full border border-amber-300/20 bg-[linear-gradient(135deg,rgba(255,184,79,0.18),rgba(255,114,28,0.22))] px-5 text-sm font-medium text-white shadow-[0_18px_44px_-26px_rgba(255,147,41,0.45)] transition duration-200 hover:-translate-y-px hover:border-amber-200/30 hover:shadow-[0_22px_54px_-26px_rgba(255,147,41,0.52)]"
                >
                  <Link to={hero.cta.primary.href} className="inline-flex items-center gap-2 whitespace-nowrap">
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                    {hero.cta.primary.label}
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-11 min-h-11 rounded-full border border-white/12 bg-white/[0.04] px-5 text-sm font-medium text-white shadow-none transition duration-200 hover:-translate-y-px hover:border-white/18 hover:bg-white/[0.08] hover:text-white"
                >
                  <Link to={hero.cta.secondary.href} className="inline-flex items-center gap-2 whitespace-nowrap">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {hero.cta.secondary.label}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default HomePage;
