import { Link, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { ArrowRight, ExternalLink, FileText, Rocket } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { ThemedIconCSS } from "@/components/ThemedIconCSS";
import { PageSEO } from "@/app/seo";
import { hero, homeContent, liveProjects, projects } from "@/data/profile";
import peopleIconLight from "@/assets/people_icon_light.png";
import peopleIconDark from "@/assets/people_icon_dark.png";

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
const homeFeaturedProjects = (() => {
  const selected: (typeof projects)[number][] = [];
  const seen = new Set<string>();
  const aiInterviewCoachSlug = "ai-interview-coach";
  const flowGuardSlug = "flowguard-monitor";

  const pushProject = (project?: (typeof projects)[number]) => {
    if (!project || seen.has(project.slug)) return;
    seen.add(project.slug);
    selected.push(project);
  };

  for (const spotlight of homeContent.spotlightProjects) {
    pushProject(projectsBySlug.get(spotlight.slug));
  }

  for (const project of projects) {
    if (!project.featured) continue;
    pushProject(project);
  }

  for (const project of projects) {
    pushProject(project);
  }

  const aiInterviewCoachIndex = selected.findIndex((project) => project.slug === aiInterviewCoachSlug);
  const flowGuardIndex = selected.findIndex((project) => project.slug === flowGuardSlug);

  if (aiInterviewCoachIndex !== -1 && flowGuardIndex !== -1) {
    const [flowGuardProject] = selected.splice(flowGuardIndex, 1);
    selected.splice(aiInterviewCoachIndex, 1, flowGuardProject);
  }

  return selected.slice(0, 6);
})();

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

function getTeamSizeLabel(slug?: string) {
  const teamSize = slug
    ? projects.find((project) => project.slug === slug)?.teamSize
    : undefined;
  if (typeof teamSize !== "number" || teamSize <= 1) return "Solo";
  return `Team of ${teamSize}`;
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
      <section
        id="home"
        className="relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(59,130,246,0.12)_0,rgba(59,130,246,0.06)_30%,rgba(59,130,246,0)_56%)]" />
          <div className="absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.16)_0,rgba(59,130,246,0.08)_220px,rgba(59,130,246,0.03)_360px,rgba(59,130,246,0)_520px)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto max-w-4xl space-y-4 sm:space-y-5"
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
                className="relative overflow-hidden rounded-2xl border border-border/65 bg-background/55 p-4 shadow-lg shadow-black/[0.06] ring-1 ring-border/60 backdrop-blur-md dark:bg-background/35 dark:shadow-black/25 sm:p-5"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
                />
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/90">
                  <Rocket className="h-3.5 w-3.5 text-primary/90" aria-hidden="true" />
                  Deployed Products
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">Live in production.</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-3">
                  {liveProjects.map((project) => (
                    <li
                      key={project.name}
                      className="group relative rounded-xl border border-border/45 bg-background/60 p-3 shadow-sm ring-1 ring-border/55 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20 focus-within:ring-2 focus-within:ring-primary/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <div className="space-y-3">
                        <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/70 px-3 py-2.5">
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-primary/[0.08] to-transparent dark:from-primary/[0.12]"
                          />
                          <div className="relative flex min-w-0 items-start gap-2.5">
                            {project.icon ? (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background/60 p-1 sm:h-11 sm:w-11 sm:p-1.5">
                                <img
                                  src={project.icon}
                                  alt={`${project.name} logo`}
                                  className="h-full w-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            ) : null}
                            <div className="min-w-0 flex-1">
                              <p className="min-w-0 text-sm font-semibold tracking-tight text-foreground">
                                {project.name}
                              </p>
                              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                                <ThemedIconCSS
                                  lightThemeSrc={peopleIconDark}
                                  darkThemeSrc={peopleIconLight}
                                  alt=""
                                  className="h-3.5 w-3.5 opacity-80 dark:opacity-90"
                                />
                                <span>{getTeamSizeLabel(project.slug)}</span>
                              </div>
                              <p className="mt-1 inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                                <span
                                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/75"
                                  aria-hidden="true"
                                />
                                <span>Live</span>
                              </p>
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 block truncate text-xs text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                              >
                                {getProjectDomain(project.liveUrl)}
                              </a>
                            </div>
                          </div>
                          <div aria-hidden="true" className="relative mt-2 border-t border-border/45" />
                        </div>

                        <p className="text-xs leading-relaxed text-muted-foreground">
                          {project.blurb}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <Button
                            asChild
                            variant="soft"
                            size="sm"
                            className="h-8 min-h-8 rounded-full px-2.5 text-xs shadow-none"
                          >
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                              Live
                            </a>
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => openProjectCaseStudy(project.slug)}
                            className="h-8 min-h-8 rounded-full px-2.5 text-xs shadow-none"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Details
                          </Button>
                        </div>
                      </div>
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
        </div>
      </section>

      <Section
        id="featured-projects"
        title="Featured Projects"
        description="A quick look at a few builds — see Projects for the full list."
      >
        <div className="space-y-8">
          <ProjectsGrid projects={homeFeaturedProjects} />
          <div className="flex justify-start sm:justify-end">
            <Button asChild variant="link" className="min-h-0 px-0 py-0 text-base">
              <Link to="/projects" className="inline-flex items-center gap-1.5">
                View all projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}

export default HomePage;
