import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { FilterBar } from "@/components/FilterBar";
import { ProjectCard } from "@/components/ProjectCard";
import { Section } from "@/components/Section";
import { PageSEO } from "@/app/seo";
import { projectFilters, projects } from "@/data/profile";

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter =
        activeFilter === "all" ||
        project.category.some(
          (category) =>
            category.toLowerCase() === activeFilter.toLowerCase(),
        );
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <>
      <PageSEO path="/projects" image="/og-image.png" />
      <Section
        id="projects"
        title="Projects"
        description="Select a project card to view the build details, tech stack, deployment status, and screenshots. Filters let you focus on AI, web, or tooling workstreams."
      >
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-8"
        >
          <FilterBar
            filters={projectFilters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
          {filteredProjects.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
              No projects matched those filters just yet — try a different keyword
              or filter.
            </p>
          )}
        </motion.div>
      </Section>
    </>
  );
}

export default ProjectsPage;
