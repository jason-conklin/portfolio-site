import { useMemo, useRef, useState } from "react";
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
  const [activeMedia, setActiveMedia] = useState<
    { title: string; description: string; image: string } | null
  >(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [transformOrigin, setTransformOrigin] = useState("50% 50%");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    isPointerDown: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    moved: false,
    activatedZoom: false,
    pointerId: undefined as number | undefined,
  });
  const ZOOM_SCALE = 2;

  const resetZoomState = () => {
    if (dragRef.current.pointerId !== undefined && containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(dragRef.current.pointerId);
      } catch {
        // no-op if pointer capture was already released
      }
    }
    setIsZoomed(false);
    setIsDragging(false);
    setTranslate({ x: 0, y: 0 });
    setTransformOrigin("50% 50%");
    const state = dragRef.current;
    state.isPointerDown = false;
    state.moved = false;
    state.activatedZoom = false;
    state.pointerId = undefined;
  };

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
    <>
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
                    {item.image ? (
                      <button
                        type="button"
                        onClick={() => {
                          resetZoomState();
                          setActiveMedia({
                            title: item.title,
                            description: item.description,
                            image: item.image!,
                          });
                        }}
                        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-muted/40 transition shadow-sm hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                        aria-label={`View ${item.title} in fullscreen`}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="pointer-events-none absolute inset-0 hidden items-center justify-center bg-black/50 text-sm font-semibold uppercase tracking-wide text-primary-foreground group-hover:flex">
                          Click to enlarge
                        </span>
                      </button>
                    ) : (
                      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border/70 bg-muted/40">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Image coming soon
                        </span>
                      </div>
                    )}
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
      <Dialog
        open={Boolean(activeMedia)}
        onOpenChange={(value) => {
          if (!value) {
            resetZoomState();
            setActiveMedia(null);
          }
        }}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-6xl bg-background/95">
          {activeMedia ? (
            <>
              <DialogHeader>
                <DialogTitle>{activeMedia.title}</DialogTitle>
                <DialogDescription>{activeMedia.description}</DialogDescription>
              </DialogHeader>
              <div
                ref={containerRef}
                className={cn(
                  "max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-muted/40",
                  isZoomed
                    ? isDragging
                      ? "cursor-grabbing"
                      : "cursor-grab"
                    : "cursor-zoom-in",
                )}
                onPointerDown={(event) => {
                  const state = dragRef.current;
                  state.pointerId = event.pointerId;
                  state.moved = false;

                  if (!isZoomed) {
                    state.activatedZoom = true;
                    if (containerRef.current) {
                      const rect = containerRef.current.getBoundingClientRect();
                      const originX = ((event.clientX - rect.left) / rect.width) * 100;
                      const originY = ((event.clientY - rect.top) / rect.height) * 100;
                      setTransformOrigin(`${originX}% ${originY}%`);
                    }
                    setTranslate({ x: 0, y: 0 });
                    setIsZoomed(true);
                  } else {
                    state.activatedZoom = false;
                    state.isPointerDown = true;
                    state.startX = event.clientX;
                    state.startY = event.clientY;
                    state.baseX = translate.x;
                    state.baseY = translate.y;
                    containerRef.current?.setPointerCapture(event.pointerId);
                    event.preventDefault();
                  }
                }}
                onPointerMove={(event) => {
                  const state = dragRef.current;
                  if (!state.isPointerDown) return;

                  const deltaX = event.clientX - state.startX;
                  const deltaY = event.clientY - state.startY;

                  if (!state.moved) {
                    if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
                      state.moved = true;
                      setIsDragging(true);
                    }
                  }

                  if (state.moved) {
                    setTranslate({
                      x: state.baseX + deltaX,
                      y: state.baseY + deltaY,
                    });
                  }

                  event.preventDefault();
                }}
                onPointerUp={() => {
                  const state = dragRef.current;
                  if (state.isPointerDown) {
                    if (state.pointerId !== undefined) {
                      containerRef.current?.releasePointerCapture(state.pointerId);
                      state.pointerId = undefined;
                    }
                    if (!state.moved) {
                      resetZoomState();
                    } else {
                      state.isPointerDown = false;
                      state.moved = false;
                      setIsDragging(false);
                    }
                    return;
                  }

                  if (state.activatedZoom) {
                    state.activatedZoom = false;
                  }
                }}
                onPointerLeave={() => {
                  const state = dragRef.current;
                  if (state.isPointerDown) {
                    state.isPointerDown = false;
                    state.moved = false;
                    setIsDragging(false);
                    if (state.pointerId !== undefined) {
                      containerRef.current?.releasePointerCapture(state.pointerId);
                    }
                    state.pointerId = undefined;
                  }
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <img
                    src={activeMedia.image}
                    alt={activeMedia.title}
                    className="select-none"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "90vh",
                      transformOrigin,
                      transform: `translate(${translate.x}px, ${translate.y}px) scale(${isZoomed ? ZOOM_SCALE : 1})`,
                      transition: isDragging ? "none" : "transform 0.3s ease",
                      cursor: isZoomed
                        ? isDragging
                          ? "grabbing"
                          : "zoom-out"
                        : "zoom-in",
                      touchAction: "none",
                    }}
                    draggable={false}
                  />
                </div>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
