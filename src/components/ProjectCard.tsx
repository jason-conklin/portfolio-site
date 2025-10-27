import { useMemo, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/Tag";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  slug: string;
  summary: string;
  highlights: readonly string[];
  tech: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  statusNote?: string;
  gallery?: readonly {
    title: string;
    description: string;
    image?: string;
  }[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    summary,
    highlights,
    tech,
    githubUrl,
    liveUrl,
    featured,
    statusNote,
    gallery,
  } = project;
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  const animation = useMemo<MotionProps>(
    () =>
      prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, translateY: 24 },
            whileInView: { opacity: 1, translateY: 0 },
            viewport: { once: true, amount: 0.4 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          },
    [prefersReducedMotion],
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.article
          {...animation}
          className={cn(
            "group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur transition all duration-300",
            "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-within:border-primary/60 focus-within:shadow-lg",
          )}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
              {featured ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Featured
                </span>
              ) : null}
            </div>
            <p className="text-sm text-muted-foreground">{summary}</p>
            <div className="flex flex-wrap gap-2">
              {tech.map((stack) => (
                <Tag key={stack}>{stack}</Tag>
              ))}
            </div>
          </div>
          <footer className="mt-6 flex flex-col gap-3">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setOpen(true);
                }}
              >
                View details
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              {githubUrl ? (
                <Button
                  asChild
                  variant="secondary"
                  className="w-full"
                  onClick={(event) => event.stopPropagation()}
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Code
                  </a>
                </Button>
              ) : null}
            </div>
            {liveUrl ? (
              <Button
                asChild
                className="w-full"
                onClick={(event) => event.stopPropagation()}
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 inline h-4 w-4" aria-hidden="true" />
                  Live site
                </a>
              </Button>
            ) : (
              <Button className="w-full" variant="outline" disabled>
                <ExternalLink className="mr-2 inline h-4 w-4" aria-hidden="true" />
                Live site (coming soon)
              </Button>
            )}
            {statusNote ? (
              <Badge variant="outline" className="w-full justify-center rounded-xl">
                {statusNote}
              </Badge>
            ) : null}
          </footer>
        </motion.article>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{summary}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          {gallery && gallery.length ? (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Screenshots
              </h4>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {gallery.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="space-y-3">
                    <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/70 bg-muted/40">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Image coming soon
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Highlights
            </h4>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-foreground">
              {highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tech
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {tech.map((stack) => (
                <Tag key={stack}>{stack}</Tag>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {githubUrl ? (
              <Button asChild className="w-full">
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                  View repository
                </a>
              </Button>
            ) : null}
            {liveUrl ? (
              <Button asChild variant="secondary" className="w-full">
                <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                  Open live site
                </a>
              </Button>
            ) : (
              <Button className="w-full" variant="outline" disabled>
                <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
                Live link coming soon
              </Button>
            )}
          </div>
          {statusNote ? (
            <p className="text-sm text-muted-foreground">{statusNote}</p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
