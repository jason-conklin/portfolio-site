import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import {
  ArrowRight,
  BarChart3,
  Cpu,
  Database,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SpotlightProject } from "@/components/SpotlightProject";
import { ScrollCue } from "@/components/ScrollCue";
import { HeroParallax } from "@/components/HeroParallax";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { hero, homeContent, liveProjects, projects } from "@/data/profile";

const proofIcons = {
  rocket: Rocket,
  sparkles: Sparkles,
  shield: ShieldCheck,
  database: Database,
} satisfies Record<string, LucideIcon>;

const focusIcons = {
  server: ServerCog,
  cpu: Cpu,
  barChart: BarChart3,
} satisfies Record<string, LucideIcon>;

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
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(59,130,246,0.16)_0,rgba(59,130,246,0.08)_30%,rgba(59,130,246,0)_58%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.22)_0,rgba(59,130,246,0.11)_220px,rgba(59,130,246,0.04)_360px,rgba(59,130,246,0)_520px)]" />
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
            className="max-w-4xl space-y-6"
          >
            <p className="inline-flex items-center rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              {hero.location}
            </p>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
              {hero.name}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {hero.headline}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {hero.subtitle}
            </p>

            <ul className="grid gap-3 sm:grid-cols-2" aria-label="Proof of engineering focus">
              {homeContent.proofStrip.map((proof) => {
                const Icon = proofIcons[proof.icon] ?? Sparkles;
                return (
                  <li
                    key={proof.label}
                    className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 px-4 py-3 shadow-sm backdrop-blur"
                  >
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div className="space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/90">
                        {proof.label}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {proof.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to={hero.cta.primary.href}>{hero.cta.primary.label}</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
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
                            <p className="flex flex-wrap items-center gap-x-1 text-base font-semibold text-foreground">
                              <span>{project.name}</span>
                              <span
                                className="text-sm font-medium text-muted-foreground"
                                aria-hidden="true"
                              >
                                -
                              </span>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                              >
                                {getProjectDomain(project.liveUrl)}
                              </a>
                            </p>
                            <p className="text-sm text-muted-foreground">{project.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-nowrap items-center gap-2 sm:self-center">
                        <Button
                          className="min-w-[130px] whitespace-nowrap"
                          onClick={() => openProjectCaseStudy(project.slug)}
                        >
                          View details
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          className="min-w-[110px] whitespace-nowrap"
                        >
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
        title="Spotlight projects"
        description="Curated builds that best represent my production engineering, applied AI, and data platform work."
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
        id="focus"
        title="What I’m strongest at"
        description="Core engineering strengths I apply across production products."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {homeContent.focusPillars.map((pillar) => {
            const Icon = focusIcons[pillar.icon] ?? ServerCog;

            return (
              <article
                key={pillar.title}
                className="rounded-2xl border border-border/70 bg-card/75 p-6 shadow-sm backdrop-blur transition-colors duration-200 hover:border-border hover:bg-card/90"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/12 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export default HomePage;
