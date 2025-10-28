import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { hero, projects } from "@/data/profile";
import { cn } from "@/lib/utils";

const featuredProjects = projects.filter((project) => project.featured);

function HomePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageSEO path="/" />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px]
          bg-[linear-gradient(to_bottom,rgba(59,130,246,0.28)_0,rgba(59,130,246,0.14)_220px,rgba(59,130,246,0.06)_360px,rgba(59,130,246,0)_520px)]" />
        </div>
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
            {hero.featuredProjectTitles.length ? (
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="font-semibold uppercase tracking-wide text-xs text-primary">
                  Deploying to Render
                </span>
                <ul className="flex flex-wrap gap-2">
                  {hero.featuredProjectTitles.map((project) => (
                    <li
                      key={project}
                      className="rounded-full border border-border/70 bg-background/60 px-3 py-1"
                    >
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </motion.div>
        </Section>
      </div>
      <Section
        id="featured"
        title="Featured projects"
        description="A quick look at my AI-enabled and full-stack work that is currently shipping or deploying to Render."
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
