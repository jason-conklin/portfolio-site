import { CheckCircle2, ExternalLink, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/utils";

interface SpotlightProjectRecord {
  slug: string;
  title: string;
  liveUrl?: string;
}

interface SpotlightProjectProps {
  project: SpotlightProjectRecord;
  outcome: string;
  highlights: readonly string[];
  tech: readonly string[];
  onOpenCaseStudy: (slug: string) => void;
  prominence?: "primary" | "secondary";
  className?: string;
}

export function SpotlightProject({
  project,
  outcome,
  highlights,
  tech,
  onOpenCaseStudy,
  prominence = "secondary",
  className,
}: SpotlightProjectProps) {
  const visibleHighlights = highlights.slice(0, 3);
  const visibleTech = tech.slice(0, 4);

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-border/70 p-6 shadow-md backdrop-blur transition-all duration-200 motion-reduce:transition-none",
        "bg-card/85 hover:border-border hover:shadow-lg hover:shadow-primary/10",
        prominence === "primary"
          ? "bg-gradient-to-br from-primary/10 via-card/90 to-card/90"
          : "bg-card/75",
        className,
      )}
    >
      <div className="space-y-5">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary/80">
            Outcome
          </p>
          <p
            className={cn(
              "leading-snug text-foreground",
              prominence === "primary" ? "text-xl font-semibold" : "text-lg font-medium",
            )}
          >
            {outcome}
          </p>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {project.title}
          </h3>
        </header>

        <ul className="space-y-2" aria-label={`${project.title} highlights`}>
          {visibleHighlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary/80" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2" aria-label={`${project.title} technology tags`}>
          {visibleTech.map((stack) => (
            <Tag key={stack}>{stack}</Tag>
          ))}
        </div>
      </div>

      <footer className="mt-6 flex flex-col gap-2 sm:flex-row">
        {project.liveUrl ? (
          <Button asChild className="w-full sm:w-auto">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              Live
            </a>
          </Button>
        ) : (
          <Button className="w-full sm:w-auto" variant="outline" disabled>
            <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
            Live (coming soon)
          </Button>
        )}
        <Button
          type="button"
          variant="soft"
          className="w-full sm:w-auto"
          onClick={() => onOpenCaseStudy(project.slug)}
        >
          <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
          Case study
        </Button>
      </footer>
    </article>
  );
}
