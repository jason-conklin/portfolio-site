import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const HIDDEN_POSITION = -100;
const TRAIL_BASE_SCALE = 0.72;
const TRAIL_MAX_SCALE = 0.9;
const TRAIL_MAX_OPACITY = 0.18;
const TRAIL_FOLLOW_FACTOR = 0.24;
const TRAIL_STOP_DISTANCE = 0.35;
const TRAIL_FADE_MS = 170;
const TRAIL_POSITION_EPSILON = 0.2;
const TRAIL_VISUAL_EPSILON = 0.015;

type CursorVariant = "default" | "hover";
type Point = { x: number; y: number };
type TrailRenderState = Point & { opacity: number; scale: number };

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function setShellPosition(node: HTMLDivElement | null, x: number, y: number) {
  if (!node) return;
  node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function setTrailVisual(node: HTMLSpanElement | null, scale: number, opacity: number) {
  if (!node) return;
  node.style.transform = `scale(${scale})`;
  node.style.opacity = opacity.toFixed(3);
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const hasPositionRef = useRef(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const trailShellRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLSpanElement | null>(null);
  const trailFrameRef = useRef<number | null>(null);
  const targetPositionRef = useRef<Point>({ x: HIDDEN_POSITION, y: HIDDEN_POSITION });
  const trailPositionRef = useRef<Point>({ x: HIDDEN_POSITION, y: HIDDEN_POSITION });
  const lastPointerMoveAtRef = useRef(0);
  const lastTrailRenderRef = useRef<TrailRenderState>({
    x: HIDDEN_POSITION,
    y: HIDDEN_POSITION,
    opacity: 0,
    scale: TRAIL_BASE_SCALE,
  });

  const setVisibleState = useCallback((nextVisible: boolean) => {
    if (visibleRef.current === nextVisible) return;
    visibleRef.current = nextVisible;
    setVisible(nextVisible);
  }, []);

  const setVariantState = useCallback((nextVariant: CursorVariant) => {
    if (variantRef.current === nextVariant) return;
    variantRef.current = nextVariant;
    setVariant(nextVariant);
  }, []);

  const stopTrailLoop = useCallback(() => {
    if (trailFrameRef.current !== null) {
      window.cancelAnimationFrame(trailFrameRef.current);
      trailFrameRef.current = null;
    }
  }, []);

  const hideCursor = useCallback(() => {
    setVisibleState(false);
    setVariantState("default");
    hasPositionRef.current = false;
    targetPositionRef.current.x = HIDDEN_POSITION;
    targetPositionRef.current.y = HIDDEN_POSITION;
    trailPositionRef.current.x = HIDDEN_POSITION;
    trailPositionRef.current.y = HIDDEN_POSITION;
    lastTrailRenderRef.current = {
      x: HIDDEN_POSITION,
      y: HIDDEN_POSITION,
      opacity: 0,
      scale: TRAIL_BASE_SCALE,
    };
    stopTrailLoop();
    setShellPosition(shellRef.current, HIDDEN_POSITION, HIDDEN_POSITION);
    setShellPosition(trailShellRef.current, HIDDEN_POSITION, HIDDEN_POSITION);
    setTrailVisual(trailRef.current, TRAIL_BASE_SCALE, 0);
  }, [setVariantState, setVisibleState, stopTrailLoop]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(ENABLED_MEDIA_QUERY);
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => mediaQuery.removeEventListener("change", syncEnabled);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (enabled) {
      root.classList.add("has-custom-cursor");
    } else {
      root.classList.remove("has-custom-cursor");
      hideCursor();
    }

    return () => {
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled, hideCursor]);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const syncInteractiveState = (target: EventTarget | null) => {
      setVariantState(getInteractiveTarget(target) ? "hover" : "default");
    };

    function scheduleTrailLoop() {
      if (prefersReducedMotion || trailFrameRef.current !== null) return;
      trailFrameRef.current = window.requestAnimationFrame(stepTrail);
    }

    function stepTrail(timestamp: number) {
      trailFrameRef.current = null;

      if (
        prefersReducedMotion ||
        !visibleRef.current ||
        !hasPositionRef.current ||
        !trailShellRef.current ||
        !trailRef.current
      ) {
        return;
      }

      const target = targetPositionRef.current;
      const trailPosition = trailPositionRef.current;
      const dx = target.x - trailPosition.x;
      const dy = target.y - trailPosition.y;
      const distance = Math.hypot(dx, dy);

      trailPosition.x += dx * TRAIL_FOLLOW_FACTOR;
      trailPosition.y += dy * TRAIL_FOLLOW_FACTOR;

      const age = timestamp - lastPointerMoveAtRef.current;
      const fadeProgress = age >= TRAIL_FADE_MS ? 0 : 1 - age / TRAIL_FADE_MS;
      const distanceBias = Math.min(1, distance / 22);
      const opacity = Math.min(
        TRAIL_MAX_OPACITY,
        (0.06 + distanceBias * 0.14) * fadeProgress,
      );
      const scale =
        TRAIL_BASE_SCALE +
        Math.min(TRAIL_MAX_SCALE - TRAIL_BASE_SCALE, distanceBias * 0.18);

      const lastRender = lastTrailRenderRef.current;

      if (
        Math.abs(lastRender.x - trailPosition.x) > TRAIL_POSITION_EPSILON ||
        Math.abs(lastRender.y - trailPosition.y) > TRAIL_POSITION_EPSILON
      ) {
        setShellPosition(trailShellRef.current, trailPosition.x, trailPosition.y);
        lastRender.x = trailPosition.x;
        lastRender.y = trailPosition.y;
      }

      if (
        Math.abs(lastRender.scale - scale) > TRAIL_VISUAL_EPSILON ||
        Math.abs(lastRender.opacity - opacity) > TRAIL_VISUAL_EPSILON
      ) {
        setTrailVisual(trailRef.current, scale, opacity);
        lastRender.scale = scale;
        lastRender.opacity = opacity;
      }

      if (distance > TRAIL_STOP_DISTANCE || opacity > 0.01) {
        scheduleTrailLoop();
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      setShellPosition(shellRef.current, event.clientX, event.clientY);
      targetPositionRef.current.x = event.clientX;
      targetPositionRef.current.y = event.clientY;
      lastPointerMoveAtRef.current = performance.now();

      if (!hasPositionRef.current) {
        trailPositionRef.current.x = event.clientX;
        trailPositionRef.current.y = event.clientY;
        lastTrailRenderRef.current = {
          x: event.clientX,
          y: event.clientY,
          opacity: 0,
          scale: TRAIL_BASE_SCALE,
        };
        setShellPosition(trailShellRef.current, event.clientX, event.clientY);
        setTrailVisual(trailRef.current, TRAIL_BASE_SCALE, 0);
      }

      hasPositionRef.current = true;

      if (!visibleRef.current) {
        setVisibleState(true);
      }

      scheduleTrailLoop();
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      syncInteractiveState(event.target);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      syncInteractiveState(event.relatedTarget);
    };

    const handleMouseEnter = () => {
      if (hasPositionRef.current) {
        setVisibleState(true);
      }
    };

    const handleFocusIn = (event: FocusEvent) => {
      syncInteractiveState(event.target);
    };

    const handleFocusOut = (event: FocusEvent) => {
      syncInteractiveState(event.relatedTarget);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hideCursor();
      }
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hideCursor);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", hideCursor);
    };
  }, [enabled, hideCursor, prefersReducedMotion, setVariantState, setVisibleState]);

  if (!enabled || !portalTarget) {
    return null;
  }

  return createPortal(
    <div aria-hidden="true" className="custom-cursor-layer">
      {!prefersReducedMotion ? (
        <div ref={trailShellRef} className="custom-cursor-trail-shell">
          <span ref={trailRef} className="custom-cursor-trail" />
        </div>
      ) : null}
      <div ref={shellRef} className="custom-cursor-shell">
        <motion.div
          className="custom-cursor-core"
          data-variant={variant}
          initial={false}
          animate={visible ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, scale: 0.72 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.14, ease: [0.16, 1, 0.3, 1] as const }
          }
        >
          <span className="custom-cursor-fill" />
          <span className="custom-cursor-ring" />
        </motion.div>
      </div>
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
