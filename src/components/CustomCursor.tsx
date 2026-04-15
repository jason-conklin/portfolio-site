import { useCallback, useEffect, useRef, useState } from "react";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const INTERACTIVE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[role='button']",
  "summary",
  "label[for]",
  "[data-cursor='interactive']",
].join(",");
const TEXT_INPUT_SELECTOR = [
  "input:not([type='hidden']):not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  "[contenteditable='true']",
].join(",");
const NATIVE_CURSOR_SELECTOR = [
  TEXT_INPUT_SELECTOR,
  ".cursor-grab",
  ".cursor-grabbing",
  ".cursor-zoom-in",
  ".cursor-zoom-out",
].join(",");

const GHOST_COUNT = 6;
const GHOST_LIFETIME_MS = 260;
const GHOST_SPAWN_INTERVAL_MS = 34;
const MOVEMENT_THRESHOLD = 10;
const FOLLOW_EASING = 0.2;

type GhostPoint = {
  x: number;
  y: number;
  bornAt: number;
  active: boolean;
};

function matchesSelector(target: EventTarget | null, selector: string) {
  return target instanceof HTMLElement ? target.closest(selector) : null;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<HTMLSpanElement[]>([]);
  const frameRef = useRef<number | null>(null);
  const lastGhostSpawnRef = useRef(0);
  const ghostWriteIndexRef = useRef(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const interactiveRef = useRef(false);
  const suppressedRef = useRef(false);
  const visibleRef = useRef(false);
  const ghostPointsRef = useRef<GhostPoint[]>(
    Array.from({ length: GHOST_COUNT }, () => ({
      x: 0,
      y: 0,
      bornAt: 0,
      active: false,
    })),
  );

  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [suppressed, setSuppressed] = useState(false);

  const shouldRender = enabled;

  const registerTrailRef = useCallback((node: HTMLSpanElement | null, index: number) => {
    if (node) {
      trailRefs.current[index] = node;
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const enabledQuery = window.matchMedia(ENABLED_MEDIA_QUERY);
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

    const syncState = () => {
      setEnabled(enabledQuery.matches);
      setReducedMotion(reducedMotionQuery.matches);
    };

    syncState();
    enabledQuery.addEventListener("change", syncState);
    reducedMotionQuery.addEventListener("change", syncState);

    return () => {
      enabledQuery.removeEventListener("change", syncState);
      reducedMotionQuery.removeEventListener("change", syncState);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add("has-custom-cursor");
    } else {
      root.classList.remove("has-custom-cursor");
      setVisible(false);
      setInteractive(false);
      setSuppressed(false);
    }

    return () => {
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    interactiveRef.current = interactive;
  }, [interactive]);

  useEffect(() => {
    suppressedRef.current = suppressed;
  }, [suppressed]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const updateInteractiveState = (target: EventTarget | null) => {
      const nextSuppressed = Boolean(matchesSelector(target, NATIVE_CURSOR_SELECTOR));
      const nextInteractive =
        !nextSuppressed && Boolean(matchesSelector(target, INTERACTIVE_SELECTOR));

      if (suppressedRef.current !== nextSuppressed) {
        suppressedRef.current = nextSuppressed;
        setSuppressed(nextSuppressed);
      }

      if (interactiveRef.current !== nextInteractive) {
        interactiveRef.current = nextInteractive;
        setInteractive(nextInteractive);
      }
    };

    const spawnGhost = (x: number, y: number, now: number) => {
      const nextGhost = ghostPointsRef.current[ghostWriteIndexRef.current];
      nextGhost.x = x;
      nextGhost.y = y;
      nextGhost.bornAt = now;
      nextGhost.active = true;

      ghostWriteIndexRef.current =
        (ghostWriteIndexRef.current + 1) % ghostPointsRef.current.length;
    };

    const animate = (now: number) => {
      frameRef.current = window.requestAnimationFrame(animate);

      const nextX =
        currentRef.current.x + (targetRef.current.x - currentRef.current.x) * FOLLOW_EASING;
      const nextY =
        currentRef.current.y + (targetRef.current.y - currentRef.current.y) * FOLLOW_EASING;

      currentRef.current.x = nextX;
      currentRef.current.y = nextY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%)`;
      }

      if (!reducedMotion) {
        ghostPointsRef.current.forEach((ghost, index) => {
          const node = trailRefs.current[index];
          if (!node) return;

          if (!ghost.active) {
            node.style.opacity = "0";
            return;
          }

          const age = now - ghost.bornAt;
          const progress = age / GHOST_LIFETIME_MS;

          if (progress >= 1) {
            ghost.active = false;
            node.style.opacity = "0";
            return;
          }

          const opacity = (1 - progress) * 0.4;
          const scale = 0.6 + progress * 0.75;

          node.style.opacity = opacity.toFixed(3);
          node.style.transform = `translate3d(${ghost.x}px, ${ghost.y}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const nextX = event.clientX;
      const nextY = event.clientY;
      const deltaX = nextX - targetRef.current.x;
      const deltaY = nextY - targetRef.current.y;
      const distance = Math.hypot(deltaX, deltaY);

      targetRef.current.x = nextX;
      targetRef.current.y = nextY;

      if (!visibleRef.current) {
        currentRef.current.x = nextX;
        currentRef.current.y = nextY;
        visibleRef.current = true;
        setVisible(true);
      }

      updateInteractiveState(event.target);

      if (
        !reducedMotion &&
        distance >= MOVEMENT_THRESHOLD &&
        event.timeStamp - lastGhostSpawnRef.current >= GHOST_SPAWN_INTERVAL_MS
      ) {
        spawnGhost(nextX, nextY, event.timeStamp);
        lastGhostSpawnRef.current = event.timeStamp;
      }
    };

    const handlePointerLeave = () => {
      interactiveRef.current = false;
      suppressedRef.current = false;
      visibleRef.current = false;
      setVisible(false);
      setInteractive(false);
      setSuppressed(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      updateInteractiveState(event.target);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisible(false);
        setInteractive(false);
        setSuppressed(false);
      }
    };

    frameRef.current = window.requestAnimationFrame(animate);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, reducedMotion]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="custom-cursor-layer"
      data-visible={visible && !suppressed ? "true" : "false"}
      data-interactive={interactive ? "true" : "false"}
      data-reduced-motion={reducedMotion ? "true" : "false"}
    >
      {!reducedMotion
        ? Array.from({ length: GHOST_COUNT }, (_, index) => (
            <span
              key={index}
              ref={(node) => registerTrailRef(node, index)}
              className="custom-cursor-trail"
            />
          ))
        : null}
      <div ref={cursorRef} className="custom-cursor-core">
        <span className="custom-cursor-fill" />
        <span className="custom-cursor-ring" />
      </div>
    </div>
  );
}

export default CustomCursor;
