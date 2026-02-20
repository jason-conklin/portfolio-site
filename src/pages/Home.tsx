import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SpotlightProject } from "@/components/SpotlightProject";
import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { hero, homeContent, liveProjects, projects } from "@/data/profile";

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
const spotlightProjects = homeContent.spotlightProjects
  .map((spotlight) => {
    const project = projectsBySlug.get(spotlight.slug);
    if (!project) return null;
    return { ...spotlight, project };
  })
  .filter((spotlight): spotlight is (typeof homeContent.spotlightProjects)[number] & {
    project: (typeof projects)[number];
  } => spotlight !== null)
  .slice(0, 3);

function getProjectDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url
      .replace(/^https?:\/\//, "")
      .replace(/^www\./, "")
      .replace(/\/.*$/, "");
  }
}

function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  const openProjectCaseStudy = useCallback(
    (slug?: string) => {
      if (!slug) return;
      navigate(`/projects#${slug}`);
    },
    [navigate],
  );

  return (
    <>
      <PageSEO path="/" />
      <div className="relative overflow-hidden">
        <HeroParallax intensity={1}>
          <div className="absolute inset-0 -z-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(59,130,246,0.12)_0,rgba(59,130,246,0.06)_30%,rgba(59,130,246,0)_56%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.16)_0,rgba(59,130,246,0.08)_220px,rgba(59,130,246,0.03)_360px,rgba(59,130,246,0)_520px)]" />
          </div>
        </HeroParallax>

        <Section id="home" className="relative py-14 sm:py-16 lg:py-16">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-4xl space-y-5 sm:space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {hero.location}
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              {hero.name}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {hero.statement}
            </p>

            {liveProjects.length ? (
              <section
                aria-label="Deployed products"
                className="rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm backdrop-blur sm:p-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/90">
                  Deployed Products
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Live in production.</p>
                <ul className="mt-3 space-y-2 sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0">
                  {liveProjects.map((project) => (
                    <li
                      key={project.name}
                      className="flex flex-wrap items-center gap-x-1.5 text-sm text-foreground/95"
                    >
                      <span className="font-semibold">{project.name}</span>
                      <span aria-hidden className="text-muted-foreground">
                        ·
                      </span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      >
                        {getProjectDomain(project.liveUrl)}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button asChild size="lg">
                <Link to={hero.cta.primary.href}>{hero.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="soft" size="lg">
                <Link to={hero.cta.secondary.href}>{hero.cta.secondary.label}</Link>
              </Button>
              {hero.cta.tertiary ? (
                <Button asChild variant="link" className="min-h-0 px-2 py-1 text-sm sm:text-base">
                  {hero.cta.tertiary.external ? (
                    <a href={hero.cta.tertiary.href} target="_blank" rel="noopener noreferrer">
                      {hero.cta.tertiary.label}
                    </a>
                  ) : (
                    <Link to={hero.cta.tertiary.href}>{hero.cta.tertiary.label}</Link>
                  )}
                </Button>
              ) : null}
            </div>
          </motion.div>
        </Section>
      </div>

      <Section
        id="featured"
        title="Spotlight projects"
        description="Curated builds that best represent my production engineering, applied AI, and data platform work."
        className="py-24"
      >
        {spotlightProjects.length ? (
          <div className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-12">
              {spotlightProjects[0] ? (
                <SpotlightProject
                  project={spotlightProjects[0].project}
                  outcome={spotlightProjects[0].outcome}
                  highlights={spotlightProjects[0].highlights}
                  tech={spotlightProjects[0].tech}
                  prominence="primary"
                  className="lg:col-span-7"
                  onOpenCaseStudy={openProjectCaseStudy}
                />
              ) : null}
              <div className="space-y-6 lg:col-span-5">
                {spotlightProjects.slice(1).map((spotlight) => (
                  <SpotlightProject
                    key={spotlight.slug}
                    project={spotlight.project}
                    outcome={spotlight.outcome}
                    highlights={spotlight.highlights}
                    tech={spotlight.tech}
                    onOpenCaseStudy={openProjectCaseStudy}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-start sm:justify-end">
              <Button asChild variant="link" className="min-h-0 px-0 py-0 text-base">
                <Link to="/projects" className="inline-flex items-center gap-1.5">
                  View all projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-sm text-muted-foreground">
            Spotlight projects are being curated.
          </p>
        )}
      </Section>

      <Section
        id="engineering-focus"
        title="Engineering Focus"
        description="Core capabilities I apply across production web products and AI-enabled systems."
        className="pt-0 pb-24"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {homeContent.engineeringFocus.map((capability) => (
            <article
              key={capability.title}
              className="rounded-2xl bg-card/60 p-6 shadow-sm ring-1 ring-border/45 transition-colors duration-200 hover:bg-card/80"
            >
              <h3 className="text-lg font-semibold tracking-tight">{capability.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

export default HomePage;
