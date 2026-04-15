import type { ComponentProps, ReactNode } from "react";

import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

type Project = ComponentProps<typeof ProjectCard>["project"];
type ProjectCardVariant = ComponentProps<typeof ProjectCard>["variant"];

interface ProjectsGridProps {
  projects: readonly Project[];
  className?: string;
  emptyState?: ReactNode;
  variant?: ProjectCardVariant;
}

const defaultEmptyState = (
  <p className="rounded-2xl border border-dashed border-border bg-muted/40 p-10 text-center text-sm text-muted-foreground">
    No projects matched those filters just yet — try a different keyword or filter.
  </p>
);

export function ProjectsGrid({
  projects,
  className,
  emptyState,
  variant = "default",
}: ProjectsGridProps) {
  if (!projects.length) {
    return <>{emptyState ?? defaultEmptyState}</>;
  }

  return (
    <div
      className={cn(
        variant === "compact"
          ? "grid grid-cols-1 gap-5 lg:grid-cols-2"
          : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} variant={variant} />
      ))}
    </div>
  );
}
