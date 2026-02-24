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
import NameLightImage from "@/assets/name-light.png";
import NameDarkImage from "@/assets/name-dark.png";

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
        className="hero-short-viewport relative z-10 flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden py-[clamp(0.7rem,1.8vh,1.4rem)] max-[height:820px]:py-[0.55rem] max-[height:760px]:py-[0.35rem] sm:py-[clamp(0.85rem,2.2vh,1.6rem)]"
      >
        <div
          aria-hidden="true"
          className="hero-page-gradient pointer-events-none absolute inset-0 z-0"
        />
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
                      src={NameLightImage}
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
                      src={NameDarkImage}
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
                className="hero-tagline mx-auto mt-[clamp(0.65rem,1.6vh,1.25rem)] max-w-4xl text-center max-[height:820px]:mt-2 max-[height:760px]:mt-1.5"
              >
                <span className="hero-tagline-primary block text-[clamp(1rem,1.75vw,1.4rem)] font-semibold tracking-tight text-foreground sm:whitespace-nowrap">
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
                className="live-systems-band-wrap relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-3 sm:px-6 lg:px-8"
              >
                <motion.div
                  animate={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: [0, -4, 0],
                          scale: [1, 1.004, 1],
                          boxShadow: [
                            "0 18px 48px -36px rgba(15,23,42,0.38)",
                            "0 24px 56px -38px rgba(15,23,42,0.48)",
                            "0 18px 48px -36px rgba(15,23,42,0.38)",
                          ],
                        }
                  }
                  transition={
                    prefersReducedMotion
                      ? undefined
                      : {
                          duration: 3.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                  }
                  className="live-systems-band-shell relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem]"
                >
                  <div className="live-systems-band-inner relative px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                    <header className="live-systems-header flex flex-col gap-4 pb-4 sm:gap-5 sm:pb-5 lg:flex-row lg:items-end lg:justify-between">
                      <div className="space-y-1.5">
                        <p className="inline-flex items-center gap-1.5 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/95">
                          <Workflow className="h-3.5 w-3.5 text-primary/90" aria-hidden="true" />
                          Live Systems
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                          Production Deployments
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Real-world systems deployed and publicly accessible.
                        </p>
                      </div>
                      <div className="live-systems-header-chips flex flex-wrap gap-1.5 lg:justify-end">
                        <span className="live-systems-chip">3 live deployments</span>
                        <span className="live-systems-chip">Vercel + Supabase</span>
                        <span className="live-systems-chip">Solo-built</span>
                      </div>
                    </header>
                    <motion.ul
                      variants={deploymentGridVariants}
                      className="live-systems-grid mt-4 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3"
                    >
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
                          className="live-systems-tile group relative h-full cursor-pointer overflow-hidden p-3.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-primary/35 dark:bg-primary/25"
                          />
                          <div className="flex h-full flex-col gap-3 pl-1">
                            <div className="live-systems-tile-header relative p-2.5">
                              <div className="flex min-w-0 items-start gap-2.5">
                                {project.icon ? (
                                  <div className="live-systems-tile-logo flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden p-1 sm:h-11 sm:w-11 sm:p-1.5">
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
                                  <p className="live-systems-tile-meta mt-1 flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
                                    <span
                                      className="h-2 w-2 shrink-0 rounded-full bg-emerald-500/80 motion-safe:animate-pulse motion-reduce:animate-none"
                                      aria-hidden="true"
                                    />
                                    <span>Live</span>
                                    <span aria-hidden>·</span>
                                    <span className="truncate max-w-[140px]">{getProjectDomain(project.liveUrl)}</span>
                                    <span aria-hidden>·</span>
                                    <span>{getTeamSizeLabel(project.slug)}</span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              {project.blurb}
                            </p>
                            <div className="live-systems-actions mt-auto flex flex-wrap items-center gap-2">
                              <Button
                                asChild
                                variant="soft"
                                size="sm"
                                className="h-8 rounded-full px-3 text-xs shadow-none transition-transform duration-200 hover:-translate-y-px motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
                                className="h-8 rounded-full px-3 text-xs text-muted-foreground transition-transform duration-200 hover:-translate-y-px hover:text-foreground motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
            <motion.div
              variants={ctaRowVariants}
              className="hero-cta-row mt-[clamp(0.35rem,1vh,0.65rem)] flex flex-wrap items-center gap-2.5"
            >
              <Button asChild size="lg">
                <Link to={hero.cta.primary.href} className="group inline-flex items-center gap-2 whitespace-nowrap">
                  <LayoutGrid className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  {hero.cta.primary.label}
                </Link>
              </Button>
              <Button asChild variant="soft" size="lg">
                <Link to={hero.cta.secondary.href} className="group inline-flex items-center gap-2 whitespace-nowrap">
                  <Mail className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" aria-hidden="true" />
                  {hero.cta.secondary.label}
                </Link>
              </Button>
              {hero.cta.tertiary ? (
                <Button asChild variant="ghost" size="md" className="h-10 min-h-10 rounded-full px-3.5 text-sm transition-transform duration-200 hover:-translate-y-[1px] hover:border-primary/25 hover:shadow-sm">
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
