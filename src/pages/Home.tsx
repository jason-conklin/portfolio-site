import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  MapPin,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { useIntroOnce } from "@/lib/useIntroOnce";
import { hero, homeContent, liveProjects, projects } from "@/data/profile";
import NameLightImage from "@/assets/name-light.png";
import NameDarkImage from "@/assets/name-dark.png";

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
const HOME_INTRO_SESSION_KEY = "home_intro_seen";
const heroTaglinePrimary = "shipping production web systems.";
const heroTaglineSecondary = "Applied AI, measurable evaluation, and clean architecture.";

const heroSequenceVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.02,
    },
  },
};

const locationVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] },
  },
};

const titleRevealVariants: Variants = {
  hidden: { opacity: 0.2, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
  },
};

const subheadlineVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
  },
};

const proofPanelVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.33, ease: [0.22, 1, 0.36, 1] },
  },
};

const ctaRowVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

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
  const shouldPlayIntro = useIntroOnce(HOME_INTRO_SESSION_KEY, !prefersReducedMotion);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lightImage = new window.Image();
    lightImage.src = NameLightImage;

    const darkImage = new window.Image();
    darkImage.src = NameDarkImage;
  }, []);

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
        className="relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden py-4 sm:py-6"
      >
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.2)_0,rgba(59,130,246,0.08)_32%,rgba(59,130,246,0)_62%)]" />
          <div className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.2)_0,rgba(59,130,246,0.1)_240px,rgba(59,130,246,0.04)_420px,rgba(59,130,246,0)_560px)]" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div
            variants={heroSequenceVariants}
            initial={shouldPlayIntro ? "hidden" : false}
            animate="show"
            className="mx-auto max-w-4xl space-y-3 sm:space-y-4"
          >
            <motion.p
              variants={locationVariants}
              className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm"
            >
              <MapPin
                className="h-3.5 w-3.5 shrink-0 opacity-80"
                aria-hidden="true"
              />
              <span>{hero.location}</span>
            </motion.p>
            <div className="mx-auto max-w-3xl text-center">
              <div className="relative">
                {shouldPlayIntro ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-1 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-primary/25 to-transparent blur-xl"
                    initial={{ x: "-120%", opacity: 0 }}
                    animate={{ x: "240%", opacity: [0, 0.5, 0] }}
                    transition={{ duration: 0.75, ease: "easeInOut", delay: 0.14 }}
                  />
                ) : null}
                <motion.h1
                  variants={titleRevealVariants}
                  className="mx-auto w-full max-w-[min(90vw,900px)] leading-[0.95]"
                >
                  <span className="sr-only">{hero.name}</span>
                  <span aria-hidden="true" className="relative block w-full aspect-[1104/358]">
                    <img
                      src={NameLightImage}
                      alt=""
                      aria-hidden="true"
                      width={1091}
                      height={319}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain opacity-100 transition-opacity duration-300 ease-out motion-reduce:transition-none dark:opacity-0"
                    />
                    <img
                      src={NameDarkImage}
                      alt=""
                      aria-hidden="true"
                      width={1104}
                      height={358}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none dark:opacity-100"
                    />
                  </span>
                </motion.h1>
              </div>
              <motion.p
                variants={subheadlineVariants}
                className="mx-auto mt-4 max-w-3xl text-center sm:mt-5"
              >
                <span className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  <span className="font-bold">Full-stack engineer</span>{" "}
                  {heroTaglinePrimary}
                </span>
                <span className="mt-2 block text-base text-muted-foreground sm:text-lg">
                  {heroTaglineSecondary}
                </span>
              </motion.p>
            </div>

            {liveProjects.length ? (
              <motion.section
                variants={proofPanelVariants}
                aria-label="Proof of work live systems"
                className="relative overflow-hidden rounded-3xl bg-background/70 p-5 shadow-[0_16px_40px_-22px_rgba(0,0,0,0.35)] ring-1 ring-border/60 backdrop-blur-xl before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-primary/35 before:via-primary/10 before:to-transparent dark:bg-background/25 dark:shadow-[0_18px_50px_-28px_rgba(0,0,0,0.65)] sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="inline-flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/95">
                      <Workflow className="h-3.5 w-3.5 text-primary/90" aria-hidden="true" />
                      Live Systems
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Deployed products running in production.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/50">
                      3 live deployments
                    </span>
                    <span className="rounded-full bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/50">
                      Vercel + Supabase
                    </span>
                    <span className="rounded-full bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground ring-1 ring-border/50">
                      Solo-built
                    </span>
                  </div>
                </div>
                <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                  {liveProjects.map((project) => (
                    <li
                      key={project.name}
                      className="group relative rounded-2xl border border-border/50 bg-background/55 p-3.5 shadow-sm ring-1 ring-border/60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/20 focus-within:ring-2 focus-within:ring-primary/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <div className="space-y-2.5">
                        <div className="relative overflow-hidden rounded-xl bg-muted/35 px-3 py-2.5 ring-1 ring-border/60 dark:bg-muted/20">
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
                              <p className="mt-1 inline-flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                <span
                                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/75"
                                  aria-hidden="true"
                                />
                                <span>Live</span>
                                <span aria-hidden>·</span>
                                <span className="truncate max-w-[120px]">{getProjectDomain(project.liveUrl)}</span>
                                <span aria-hidden>·</span>
                                <span>{getTeamSizeLabel(project.slug)}</span>
                              </p>
                            </div>
                          </div>
                          <div aria-hidden="true" className="relative mt-2 border-t border-border/45" />
                        </div>

                        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {project.blurb}
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary/12 px-3 text-xs font-medium text-primary ring-1 ring-primary/20 transition hover:bg-primary/18 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            Live
                          </a>
                          <button
                            type="button"
                            onClick={() => openProjectCaseStudy(project.slug)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            Details
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>
            ) : null}

            <motion.div variants={ctaRowVariants} className="flex flex-wrap items-center gap-3 pt-1">
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
            </motion.div>
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
