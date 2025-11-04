import { Link } from "react-router-dom";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
  type RefObject,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, useReducedMotion, type MotionProps } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/Tag";
import { ThemedIconCSS } from "@/components/ThemedIconCSS";
import { cn } from "@/lib/utils";
import peopleIconLight from "@/assets/people_icon_light.png";
import peopleIconDark from "@/assets/people_icon_dark.png";
import placeholder from "@/assets/placeholder.png";


const FOCUSABLE_ELEMENTS_SELECTOR = [
  "a[href]",
  "area[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(", ");

let activeModalCount = 0;
let previousOverflow: string | null = null;
let headerDisableCount = 0;

function useModalEffects(
  open: boolean,
  options: { disableHeaderPointerEvents?: boolean } = {},
) {
  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const body = document.body;
    const root = document.getElementById("app-root");
    activeModalCount += 1;

    if (activeModalCount === 1) {
      previousOverflow = body.style.overflow || null;
      body.style.overflow = "hidden";
    }

    if (options.disableHeaderPointerEvents) {
      headerDisableCount += 1;
      if (root) {
        root.setAttribute("data-modal-open", "true");
      }
    }

    return () => {
      activeModalCount = Math.max(0, activeModalCount - 1);
      if (activeModalCount === 0) {
        if (previousOverflow !== null) {
          body.style.overflow = previousOverflow;
          previousOverflow = null;
        } else {
          body.style.removeProperty("overflow");
        }
      }

      if (options.disableHeaderPointerEvents) {
        headerDisableCount = Math.max(0, headerDisableCount - 1);
        if (headerDisableCount === 0 && root) {
          root.removeAttribute("data-modal-open");
        }
      }
    };
  }, [open, options.disableHeaderPointerEvents]);
}

function useDialogFocusTrap(
  open: boolean,
  containerRef: RefObject<HTMLElement>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement>,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    previousFocusRef.current =
      (document.activeElement as HTMLElement | null) ?? null;

    const getFocusable = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS_SELECTOR),
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true" &&
          element.tabIndex !== -1,
      );

    const focusTarget =
      initialFocusRef?.current ?? getFocusable()[0] ?? container;

    if (focusTarget) {
      focusTarget.focus({ preventScroll: true });
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!event.shiftKey) {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      } else if (active === first) {
        event.preventDefault();
        last.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const previous = previousFocusRef.current;
      if (previous && typeof previous.focus === "function") {
        previous.focus({ preventScroll: true });
      }
    };
  }, [open, containerRef, onClose, initialFocusRef]);
}

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
  teamSize?: number;
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
    teamSize,
  } = project;
  // Always ensure gallery is safe to render
  const safeGallery = gallery && gallery.length > 0 ? gallery : [{
    title: "Coming soon",
    description: "Screenshots will be added soon.",
    image: placeholder,
  }];
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);
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
  const detailDialogRef = useRef<HTMLDivElement | null>(null);
  const detailCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const screenshotDialogRef = useRef<HTMLDivElement | null>(null);
  const screenshotCloseButtonRef = useRef<HTMLButtonElement | null>(null);
  const ZOOM_SCALE = 2;
  const hasTeamSize = typeof teamSize === "number" && teamSize > 0;
  const isPrivateRepo =
    typeof githubUrl === "string" &&
    githubUrl.trim().startsWith("(Private repository");

  const resetZoomState = useCallback(() => {
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
  }, []);

  const activeMedia =
    safeGallery && activeMediaIndex !== null ? safeGallery[activeMediaIndex] : null;
  const totalMedia = safeGallery?.length ?? 0;
  const activeMediaNumber =
    activeMediaIndex !== null ? activeMediaIndex + 1 : null;
  const detailTitleId = useId();
  const detailDescriptionId = useId();
  const screenshotTitleId = useId();
  const screenshotDescriptionId = useId();

  const goToMedia = useCallback(
    (direction: number) => {
      if (!totalMedia) return;
      resetZoomState();
      setActiveMediaIndex((prev) => {
        if (prev === null) return prev;
        return (prev + direction + totalMedia) % totalMedia;
      });
    },
    [resetZoomState, totalMedia],
  );

  const openMediaAt = useCallback(
    (index: number) => {
      if (!safeGallery || !safeGallery.length) return;
      resetZoomState();
      setActiveMediaIndex(index);
    },
    [safeGallery, resetZoomState],
  );

  const renderTeamSizeBadge = useCallback(
    (className?: string) => {
      if (!hasTeamSize) return null;
      return (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/60 px-2 py-0.5 text-xs text-muted-foreground shadow-sm dark:border-border/60 dark:bg-background/40 dark:text-foreground/80",
            className,
          )}
          aria-label={`Team size: ${teamSize}`}
        >
            <span className="group/team relative inline-flex items-center">
              <ThemedIconCSS
                lightThemeSrc={peopleIconDark}
                darkThemeSrc={peopleIconLight}
                alt=""
                className="h-3.5 w-3.5 opacity-80 dark:opacity-90"
              />
            <span
              className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg border border-border/60 bg-popover/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-lg backdrop-blur transition-opacity duration-150 group-hover/team:flex group-focus-visible/team:flex"
              aria-hidden="true"
            >
              Team Size: {teamSize}
            </span>
            <span
              className="ml-1 hidden tabular-nums text-foreground transition-opacity duration-150 group-hover/team:inline group-focus-visible/team:inline"
              aria-hidden="true"
            >
              {teamSize}
            </span>
          </span>
        </span>
      );
    },
    [hasTeamSize, teamSize],
  );

  useEffect(() => {
    if (activeMediaIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToMedia(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToMedia(-1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeMediaIndex, goToMedia]);

  const animation = useMemo<MotionProps>(
    () =>
      prefersReducedMotion
        ? {}
        : {
            initial: { opacity: 0, translateY: 24 },
            whileInView: { opacity: 1, translateY: 0 },
            viewport: { once: true, amount: 0.2 },
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          },
    [prefersReducedMotion],
  );

  const closeDetailModal = useCallback(() => {
    setOpen(false);
    setActiveMediaIndex(null);
    resetZoomState();
  }, [resetZoomState]);

  const closeScreenshotModal = useCallback(() => {
    resetZoomState();
    setActiveMediaIndex(null);
  }, [resetZoomState]);

  useModalEffects(open, { disableHeaderPointerEvents: true });
  useModalEffects(Boolean(activeMedia));
  useDialogFocusTrap(open, detailDialogRef, closeDetailModal, detailCloseButtonRef);
  useDialogFocusTrap(
    Boolean(activeMedia),
    screenshotDialogRef,
    closeScreenshotModal,
    screenshotCloseButtonRef,
  );

  const handleDetailBackdropClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeDetailModal();
      }
    },
    [closeDetailModal],
  );

  const handleScreenshotBackdropClick = useCallback(
    (event: ReactMouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        closeScreenshotModal();
      }
    },
    [closeScreenshotModal],
  );


  const detailModal =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[90]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[80] bg-black/50 backdrop-blur-[2px]"
              onClick={closeDetailModal}
            />
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="absolute inset-0 z-[90] flex items-center justify-center px-4 py-6 sm:px-6"
              onMouseDown={handleDetailBackdropClick}
            >
              <div
                ref={detailDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={detailTitleId}
                aria-describedby={detailDescriptionId}
                tabIndex={-1}
                className="relative mx-auto flex max-h-[min(90vh,920px)] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-border/70 bg-background/95 text-left shadow-2xl focus:outline-none"
              >
                <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-5 sm:px-8">
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 id={detailTitleId} className="text-2xl font-semibold tracking-tight">
                        {title}
                      </h2>
                      {hasTeamSize
                        ? renderTeamSizeBadge(
                            "bg-background/70 px-3 py-1 text-xs dark:bg-background/50",
                          )
                        : null}
                    </div>
                    <p
                      id={detailDescriptionId}
                      className="text-sm text-muted-foreground"
                    >
                      {summary}
                    </p>
                  </div>
                  <button
                    ref={detailCloseButtonRef}
                    type="button"
                    onClick={closeDetailModal}
                    className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Close project details"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                  <div className="space-y-6">
                    {safeGallery && safeGallery.length ? (
                      <div>
                        <h4 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                          Screenshots
                        </h4>
                        <div className="mt-4 grid gap-6 md:grid-cols-2">
                          {safeGallery.map((item, index) => (
                            <div key={`${item.title}-${index}`} className="space-y-3">
                              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                Screenshot {index + 1}
                              </p>
                              {item.image ? (
                                <button
                                  type="button"
                                  onClick={() => openMediaAt(index)}
                                  className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl border border-border/70 bg-muted/40 shadow-sm transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                  aria-label={`View ${item.title} in fullscreen`}
                                >
                                  <img
                                    src={item.image}
                                    alt={`${index + 1}. ${item.title}`}
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
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
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
                        isPrivateRepo ? (
                          <Button asChild className="w-full text-left" variant="secondary">
                            <Link to="/contact" className="flex items-center gap-2">
                              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                              Private repository -- demo available upon request.
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild className="w-full">
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                              View repository
                            </a>
                          </Button>
                        )
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
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  const screenshotModal =
    activeMedia && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[95]">
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[82] bg-black/60 backdrop-blur-sm"
              onClick={closeScreenshotModal}
            />
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
              className="absolute inset-0 z-[95] flex items-center justify-center px-4 py-8 sm:px-8"
              onMouseDown={handleScreenshotBackdropClick}
            >
              <div
                ref={screenshotDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={screenshotTitleId}
                aria-describedby={screenshotDescriptionId}
                tabIndex={-1}
                className="relative flex max-h-[95vh] w-full max-w-6xl flex-col gap-4 rounded-2xl border border-border bg-background/95 p-4 text-left shadow-2xl focus:outline-none sm:p-6"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1">
                    {activeMediaNumber !== null && totalMedia > 0 ? (
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Screenshot {activeMediaNumber} of {totalMedia}
                      </p>
                    ) : null}
                    <h3 id={screenshotTitleId} className="text-lg font-semibold">
                      {activeMedia.title}
                    </h3>
                    <p
                      id={screenshotDescriptionId}
                      className="text-sm text-muted-foreground"
                    >
                      {activeMedia.description}
                    </p>
                  </div>
                  <button
                    ref={screenshotCloseButtonRef}
                    type="button"
                    onClick={closeScreenshotModal}
                    className="ml-auto inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground transition hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Close screenshot viewer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <div
                  ref={containerRef}
                  className={cn(
                    "relative max-h-[90vh] overflow-hidden rounded-2xl border border-border bg-muted/40",
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
                  <div className="relative flex h-full w-full items-center justify-center px-8 sm:px-12 lg:px-16">
                    {totalMedia > 1 ? (
                      <>
                        <button
                          type="button"
                          className="absolute left-2 sm:left-4 lg:left-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-border/50 bg-white/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-black/50 dark:hover:bg-black/70"
                          onClick={(event) => {
                            event.stopPropagation();
                            goToMedia(-1);
                          }}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label="View previous screenshot"
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="absolute right-2 sm:right-4 lg:right-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-border/50 bg-white/60 p-2 text-foreground shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 dark:bg-black/50 dark:hover:bg-black/70"
                          onClick={(event) => {
                            event.stopPropagation();
                            goToMedia(1);
                          }}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label="View next screenshot"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </>
                    ) : null}
                    <div
                      ref={containerRef}
                      className={cn(
                        "relative flex max-h-[90vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted/40",
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
                      {activeMedia?.image ? (
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
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <motion.article
        {...animation}
        role="button"
        tabIndex={0}
        aria-label={`Open ${title} details`}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        className={cn(
          "group flex h-full cursor-pointer flex-col justify-between rounded-2xl border border-border bg-card/80 p-6 shadow-sm backdrop-blur transition-all duration-300",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
            {(featured || hasTeamSize) ? (
              <div className="flex items-center gap-2">
                {hasTeamSize ? renderTeamSizeBadge("self-start") : null}
                {featured ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Featured
                  </span>
                ) : null}
              </div>
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
              className="w-full bg-[#d0e8ff] text-[#0b1220] hover:bg-[#bcdcff] dark:bg-[#1b3d66] dark:text-[#e7f1ff] dark:hover:bg-[#28507f]"
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
              isPrivateRepo ? (
                <Button
                  asChild
                  variant="secondary"
                  className="w-full text-left"
                >
                  <Link
                    to="/contact"
                    onClick={(event) => event.stopPropagation()}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Private repository
                  </Link>
                </Button>
              ) : (
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
              )
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
      {detailModal}
      {screenshotModal}
    </>
  );

}
