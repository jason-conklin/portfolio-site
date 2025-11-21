import { Link } from "react-router-dom";
import { useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollCue } from "@/components/ScrollCue";
import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { hero, projects, liveProjects } from "@/data/profile";
import { cn } from "@/lib/utils";

const featuredProjects = projects.filter((project) => project.featured);

function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  const openLiveProjectDetails = useCallback((slug?: string) => {
    if (!slug) return;
    const card = document.querySelector<HTMLElement>(`[data-project-slug="${slug}"]`);
    if (!card) {
      window.location.hash = "featured";
      return;
    }
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      card.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }, 350);
  }, []);

  return (
    <>
      <PageSEO path="/" />
      <div className="relative overflow-hidden">
        <HeroParallax intensity={1}>
          <div className="absolute inset-0 -z-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]
          bg-[linear-gradient(to_bottom,rgba(59,130,246,0.28)_0,rgba(59,130,246,0.14)_220px,rgba(59,130,246,0.06)_360px,rgba(59,130,246,0)_520px)]" />
          </div>
        </HeroParallax>
        <Section
          id="home"
          minHeight="hero"
          className="relative flex flex-col justify-center py-20"
          headingClassName="text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 40 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            <p className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              {hero.location}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              {hero.name}
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              {hero.tagline}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link to={hero.cta.primary.href}>{hero.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to={hero.cta.secondary.href}>
                  {hero.cta.secondary.label}
                </Link>
              </Button>
            </div>
            <ScrollCue />
            {liveProjects.length ? (
              <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 text-sm text-muted-foreground shadow-sm backdrop-blur">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase tracking-wide text-[11px] text-primary">
                    Deployed live
                  </span>
                  <p className="text-sm text-muted-foreground">
                    Projects currently running in production.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {liveProjects.map((project) => (
                    <div
                      key={project.name}
                      className="flex flex-col gap-3 rounded-xl border border-border/70 bg-card/70 p-3 shadow-soft sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          {project.icon ? (
                            <img
                              src={project.icon}
                              alt={`${project.name} logo`}
                              className="h-14 w-14 rounded-lg border border-border/70 bg-background/70 p-1 shadow-sm"
                              loading="lazy"
                            />
                          ) : null}
                          <div>
                            <p className="text-base font-semibold text-foreground">{project.name}</p>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-nowrap items-center gap-2 sm:self-start">
                        <Button
                          className="min-w-[130px] rounded-full bg-[#d0e8ff] text-[#0b1220] hover:bg-[#bcdcff] whitespace-nowrap dark:bg-[#1b3d66] dark:text-[#e7f1ff] dark:hover:bg-[#28507f]"
                          onClick={() => openLiveProjectDetails(project.slug)}
                        >
                          View details
                        </Button>
                        <Button asChild className="min-w-[110px] rounded-full whitespace-nowrap">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            View live
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        </Section>
      </div>
      <Section
        id="featured"
        title="Featured projects"
        description="Highlights of my recent full-stack and AI-integrated projects currently live or in deployment."
      >
        <div className={cn("grid gap-6 md:grid-cols-2")}>
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default HomePage;
