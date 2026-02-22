import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  LayoutGrid,
  Mail,
  MapPin,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { hero, homeContent, liveProjects, projects } from "@/data/profile";
import { useTheme } from "@/lib/theme";
import NameLightLogo from "@/assets/name-light.svg";
import NameDarkLogo from "@/assets/name-dark.svg";

const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));
const heroTaglinePrimary = "building and deploying production-grade web systems.";
const heroTaglineSecondary = "Specializing in applied AI, evaluation pipelines, and scalable system architecture.";

const heroSequenceVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const backgroundWakeVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const locationVariants: Variants = {
  hidden: { opacity: 0, y: -14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const titleRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10, clipPath: "inset(0 100% 0 0)" },
  show: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const subheadlineVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const proofPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.985,
    clipPath: "inset(0 0 100% 0 round 1.5rem)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    clipPath: "inset(0 0 0% 0 round 1.5rem)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const deploymentGridVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.14,
    },
  },
};

const deploymentTileVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const ctaRowVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
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
  const { resolvedTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lightImage = new window.Image();
    lightImage.src = NameLightLogo;

    const darkImage = new window.Image();
    darkImage.src = NameDarkLogo;
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
        className="hero-short-viewport relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center overflow-x-hidden py-[clamp(0.7rem,1.8vh,1.4rem)] max-[height:820px]:py-[0.55rem] max-[height:760px]:py-[0.35rem] sm:py-[clamp(0.85rem,2.2vh,1.6rem)]"
      >
        <motion.div
          variants={backgroundWakeVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate="show"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.2)_0,rgba(59,130,246,0.08)_32%,rgba(59,130,246,0)_62%)]" />
          <div className="absolute inset-x-0 top-0 h-[560px] bg-[linear-gradient(to_bottom,rgba(59,130,246,0.2)_0,rgba(59,130,246,0.1)_240px,rgba(59,130,246,0.04)_420px,rgba(59,130,246,0)_560px)]" />
        </motion.div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <motion.div
            variants={heroSequenceVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="show"
            className="hero-content mx-auto flex w-full max-w-[min(70rem,100%)] flex-col gap-[clamp(0.5rem,1.35vh,0.9rem)] max-[height:820px]:gap-[0.44rem] max-[height:760px]:gap-[0.34rem]"
          >
            <motion.p
              variants={locationVariants}
              className="hero-location-pill mx-auto inline-flex w-auto max-w-[min(520px,92vw)] min-w-0 items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-1 font-display text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-sm"
            >
              <MapPin
                className="h-3.5 w-3.5 shrink-0 opacity-80"
                aria-hidden="true"
              />
              <span className="truncate whitespace-nowrap">{hero.location}</span>
            </motion.p>
            <div className="hero-title-block mx-auto max-w-3xl text-center">
              <div className="relative">
                {!prefersReducedMotion ? (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-2 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent mix-blend-soft-light blur-xl dark:via-white/20"
                    initial={{ x: "-110%", opacity: 0 }}
                    animate={{ x: "235%", opacity: [0, 0.4, 0] }}
                    transition={{ duration: 0.62, ease: "easeInOut", delay: 0.2 }}
                  />
                ) : null}
                <motion.h1
                  variants={titleRevealVariants}
                  className="mx-auto w-full max-w-[min(94vw,980px)] leading-[0.95]"
                >
                  <span className="sr-only">{hero.name}</span>
                  <span
                    aria-hidden="true"
                    className="hero-name-frame pointer-events-none relative mx-auto block h-[clamp(108px,25svh,232px)] w-[min(980px,94vw)] max-h-[28svh] max-w-full select-none max-[height:820px]:w-[min(840px,92vw)] max-[height:820px]:max-h-[24svh] max-[height:760px]:w-[min(760px,92vw)] max-[height:760px]:max-h-[21svh]"
                  >
                    <img
                      src={NameLightLogo}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className={`hero-name-image pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                        resolvedTheme === "dark" ? "opacity-0" : "opacity-100"
                      }`}
                    />
                    <img
                      src={NameDarkLogo}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      onDragStart={(event) => event.preventDefault()}
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      className={`hero-name-image pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity duration-300 ease-out motion-reduce:transition-none ${
                        resolvedTheme === "dark" ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </span>
                </motion.h1>
              </div>
              <motion.p
                variants={subheadlineVariants}
                className="hero-tagline mx-auto mt-[clamp(0.65rem,1.6vh,1.25rem)] max-w-3xl text-center max-[height:820px]:mt-2 max-[height:760px]:mt-1.5"
              >
                <span className="hero-tagline-primary text-[clamp(1.05rem,2.1vw,1.5rem)] font-semibold tracking-tight text-foreground">
                  <span className="font-bold">Full-stack engineer</span>{" "}
                  {heroTaglinePrimary}
                </span>
                <span className="hero-tagline-secondary mt-2 block text-[clamp(0.92rem,1.25vw,1.1rem)] text-muted-foreground">
                  {heroTaglineSecondary}
                </span>
              </motion.p>
            </div>

            {liveProjects.length ? (
              <motion.section
                variants={proofPanelVariants}
                aria-label="Live systems"
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, -5, 0],
                          scale: [1, 1.008, 1],
                          boxShadow: [
                            "0 10px 30px rgba(0,0,0,0.25)",
                            "0 20px 50px rgba(0,0,0,0.35)",
                            "0 10px 30px rgba(0,0,0,0.25)",
                          ],
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="hero-live-panel relative overflow-hidden rounded-3xl shadow-[0_22px_60px_-45px_rgba(15,23,42,0.45)] before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-primary/35 before:via-primary/10 before:to-transparent dark:shadow-[0_26px_70px_-55px_rgba(0,0,0,0.85)]"
                >
                  <div className="hero-live-panel-inner relative m-px rounded-[calc(1.5rem-1px)] bg-background/65 p-[clamp(0.9rem,1.5vw,1.3rem)] ring-1 ring-border/60 backdrop-blur-xl max-[height:820px]:p-[0.8rem] max-[height:760px]:p-[0.65rem] dark:bg-background/20">
                    <header className="flex flex-wrap items-start justify-between gap-3 max-[height:820px]:gap-2">
                      <div className="space-y-1">
                        <p className="inline-flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/95">
                          <Workflow className="h-3.5 w-3.5 text-primary/90" aria-hidden="true" />
                          Live Systems
                        </p>
                      <p className="text-sm text-muted-foreground">
                        Real-world systems deployed and publicly accessible.
                      </p>
                      </div>
                      <div className="hero-live-header-chips flex flex-wrap gap-1.5 max-[height:820px]:hidden">
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
                    </header>
                    <div
                      aria-hidden="true"
                      className="mt-3 h-px bg-gradient-to-r from-border/70 via-border/30 to-transparent max-[height:820px]:mt-2"
                    />
                    <motion.ul variants={deploymentGridVariants} className="mt-[clamp(0.6rem,1.3vh,1rem)] grid gap-3 max-[height:820px]:mt-[0.56rem] max-[height:820px]:gap-2.5 max-[height:760px]:gap-2 sm:grid-cols-3 sm:gap-3.5">
                    {liveProjects.map((project) => (
                      <motion.li
                        key={project.name}
                        variants={deploymentTileVariants}
                        role="button"
                        tabIndex={0}
                        aria-label={`View details for ${project.name}`}
                        onClick={(event) => {
                          const target = event.target as HTMLElement;
                          if (target.closest("a,button")) return;
                          openProjectCaseStudy(project.slug);
                        }}
                        onKeyDown={(event) => {
                          const target = event.target as HTMLElement;
                          if (target.closest("a,button")) return;
                          if (event.key !== "Enter" && event.key !== " ") return;
                          event.preventDefault();
                          openProjectCaseStudy(project.slug);
                        }}
                        className="hero-live-tile group relative cursor-pointer overflow-hidden rounded-2xl border border-border/55 bg-background/55 p-2.5 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-border/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background max-[height:820px]:p-2 max-[height:760px]:p-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:bg-background/18 sm:p-3"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-primary/35 dark:bg-primary/25"
                        />
                        <div className="space-y-2.5 pl-1 max-[height:760px]:space-y-2">
                          <div className="hero-live-tile-header relative rounded-2xl bg-muted/35 p-2.5 ring-1 ring-border/60 transition-colors duration-200 group-hover:bg-muted/45 max-[height:820px]:p-2 max-[height:760px]:p-1.5 dark:bg-muted/15 dark:group-hover:bg-muted/22">
                            <div className="flex min-w-0 items-start gap-2.5">
                              {project.icon ? (
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-background/65 p-1 sm:h-11 sm:w-11 sm:p-1.5">
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
                                <p className="mt-1 flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                  <span
                                    className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/80 motion-safe:animate-pulse motion-reduce:animate-none"
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
                          </div>
                          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {project.blurb}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <Button
                              asChild
                              variant="soft"
                              size="sm"
                              className="h-8 rounded-full px-2.5 text-xs shadow-none transition-transform duration-200 hover:-translate-y-px max-[height:820px]:h-8 max-[height:820px]:px-2 max-[height:760px]:h-7 max-[height:760px]:px-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                                Open live
                              </a>
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => openProjectCaseStudy(project.slug)}
                              className="h-8 rounded-full px-2.5 text-xs text-muted-foreground transition-transform duration-200 hover:-translate-y-px hover:text-foreground max-[height:820px]:h-8 max-[height:820px]:px-2 max-[height:760px]:h-7 max-[height:760px]:px-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                            >
                              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                    </motion.ul>
                  </div>
                </motion.div>
              </motion.section>
            ) : null}

            <motion.div variants={ctaRowVariants} className="hero-cta-row mt-[clamp(0.18rem,0.8vh,0.5rem)] flex flex-wrap items-center gap-2.5 max-[height:820px]:mt-1 max-[height:820px]:gap-2 max-[height:760px]:mt-0.5 max-[height:760px]:gap-1.5">
              <Button asChild size="lg" className="max-[height:820px]:h-9 max-[height:820px]:min-h-9 max-[height:820px]:px-3.5 max-[height:760px]:h-8 max-[height:760px]:min-h-8 max-[height:760px]:px-3">
                <Link to={hero.cta.primary.href} className="group inline-flex items-center gap-2 whitespace-nowrap">
                  <LayoutGrid className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  {hero.cta.primary.label}
                </Link>
              </Button>
              <Button asChild variant="soft" size="lg" className="max-[height:820px]:h-9 max-[height:820px]:min-h-9 max-[height:820px]:px-3.5 max-[height:760px]:h-8 max-[height:760px]:min-h-8 max-[height:760px]:px-3">
                <Link to={hero.cta.secondary.href} className="group inline-flex items-center gap-2 whitespace-nowrap">
                  <Mail className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  {hero.cta.secondary.label}
                </Link>
              </Button>
              {hero.cta.tertiary ? (
                <Button asChild variant="ghost" size="md" className="h-10 min-h-10 rounded-full px-3.5 text-sm transition-transform duration-200 hover:-translate-y-[1px] hover:border-primary/25 hover:shadow-sm max-[height:820px]:h-9 max-[height:820px]:min-h-9 max-[height:820px]:px-3 max-[height:760px]:h-8 max-[height:760px]:min-h-8 max-[height:760px]:px-2.5">
                  {hero.cta.tertiary.external ? (
                    <a href={hero.cta.tertiary.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 whitespace-nowrap">
                      <Github className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                      {hero.cta.tertiary.label}
                    </a>
                  ) : (
                    <Link to={hero.cta.tertiary.href} className="group inline-flex items-center gap-2 whitespace-nowrap">
                      <Github className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                      {hero.cta.tertiary.label}
                    </Link>
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
