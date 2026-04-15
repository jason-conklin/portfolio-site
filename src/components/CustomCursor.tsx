import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const CURSOR_SIZE = 36;
const CURSOR_OFFSET = CURSOR_SIZE / 2;
const TRAIL_SIZE = 24;
const TRAIL_OFFSET = TRAIL_SIZE / 2;
const OFFSCREEN_POSITION = -9999;

const PRIMARY_WRITE_EPSILON = 0.04;
const TRAIL_WRITE_EPSILON = 0.08;
const TRAIL_OPACITY_EPSILON = 0.01;
const TRAIL_SCALE_EPSILON = 0.01;

const TRAIL_FOLLOW_ALPHA = 0.18;
const TRAIL_OPACITY_ALPHA = 0.2;
const TRAIL_SCALE_ALPHA = 0.18;

type CursorVariant = "default" | "hover";

type Point = {
  x: number;
  y: number;
};

type TrailRender = {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  visible: boolean;
};

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function getFrameAlpha(base: number, deltaMs: number) {
  return 1 - Math.pow(1 - base, deltaMs / 16.667);
}

function approximatelyEqual(a: number, b: number, epsilon: number) {
  return Math.abs(a - b) <= epsilon;
}

function setTranslate(node: HTMLElement, x: number, y: number) {
  node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function setTrailTransform(node: HTMLElement, x: number, y: number, scale: number) {
  node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
}

function hideNode(node: HTMLElement | null) {
  if (!node) return;
  node.style.transform = `translate3d(${OFFSCREEN_POSITION}px, ${OFFSCREEN_POSITION}px, 0)`;
}

function hideTrailNode(node: HTMLElement | null) {
  if (!node) return;
  node.style.opacity = "0";
  node.style.transform = `translate3d(${OFFSCREEN_POSITION}px, ${OFFSCREEN_POSITION}px, 0) scale(0.82)`;
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [enabled, setEnabled] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const layerRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const positionerRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLSpanElement | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const frameTimeRef = useRef<number | null>(null);
  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const pointerInitializedRef = useRef(false);

  const targetRef = useRef<Point>({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION });
  const renderedPrimaryRef = useRef<Point>({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION });
  const lastPointerFrameRef = useRef<Point>({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION });
  const trailRenderRef = useRef<TrailRender>({
    x: OFFSCREEN_POSITION,
    y: OFFSCREEN_POSITION,
    opacity: 0,
    scale: 0.82,
    visible: false,
  });
  const trailAppliedRef = useRef<TrailRender>({
    x: OFFSCREEN_POSITION,
    y: OFFSCREEN_POSITION,
    opacity: 0,
    scale: 0.82,
    visible: false,
  });

  const setLayerVisible = useCallback((nextVisible: boolean) => {
    if (visibleRef.current === nextVisible) return;
    visibleRef.current = nextVisible;
    if (layerRef.current) {
      layerRef.current.dataset.visible = nextVisible ? "true" : "false";
    }
  }, []);

  const setCursorVariant = useCallback((nextVariant: CursorVariant) => {
    if (variantRef.current === nextVariant) return;
    variantRef.current = nextVariant;
    if (coreRef.current) {
      coreRef.current.dataset.variant = nextVariant;
    }
  }, []);

  const resetTrail = useCallback(() => {
    trailRenderRef.current = {
      x: OFFSCREEN_POSITION,
      y: OFFSCREEN_POSITION,
      opacity: 0,
      scale: 0.82,
      visible: false,
    };
    trailAppliedRef.current = {
      x: OFFSCREEN_POSITION,
      y: OFFSCREEN_POSITION,
      opacity: 0,
      scale: 0.82,
      visible: false,
    };
    hideTrailNode(trailRef.current);
  }, []);

  const hideCursor = useCallback(() => {
    setLayerVisible(false);
    setCursorVariant("default");
    pointerInitializedRef.current = false;
    frameTimeRef.current = null;
    targetRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION };
    renderedPrimaryRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION };
    lastPointerFrameRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION };
    hideNode(positionerRef.current);
    resetTrail();
  }, [resetTrail, setCursorVariant, setLayerVisible]);

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
    if (!enabled) return;

    const frame = (now: number) => {
      rafIdRef.current = window.requestAnimationFrame(frame);

      if (!pointerInitializedRef.current) {
        return;
      }

      const previousFrameTime = frameTimeRef.current ?? now - 16.667;
      const deltaMs = Math.min(now - previousFrameTime, 34);
      frameTimeRef.current = now;

      const targetX = targetRef.current.x;
      const targetY = targetRef.current.y;

      // The primary shell is intentionally immediate. Pointer events only update refs,
      // and RAF applies the actual DOM transform once per frame.
      if (
        positionerRef.current &&
        (!approximatelyEqual(targetX, renderedPrimaryRef.current.x, PRIMARY_WRITE_EPSILON) ||
          !approximatelyEqual(targetY, renderedPrimaryRef.current.y, PRIMARY_WRITE_EPSILON))
      ) {
        setTranslate(positionerRef.current, targetX, targetY);
        renderedPrimaryRef.current = { x: targetX, y: targetY };
      }

      if (prefersReducedMotion || !visibleRef.current || !trailRef.current) {
        return;
      }

      const dx = targetX - lastPointerFrameRef.current.x;
      const dy = targetY - lastPointerFrameRef.current.y;
      const speed = Math.hypot(dx, dy) / Math.max(deltaMs, 1);
      lastPointerFrameRef.current = { x: targetX, y: targetY };

      const trailFollowAlpha = getFrameAlpha(TRAIL_FOLLOW_ALPHA, deltaMs);
      const trailOpacityAlpha = getFrameAlpha(TRAIL_OPACITY_ALPHA, deltaMs);
      const trailScaleAlpha = getFrameAlpha(TRAIL_SCALE_ALPHA, deltaMs);

      const trailTargetX = targetX + CURSOR_OFFSET - TRAIL_OFFSET;
      const trailTargetY = targetY + CURSOR_OFFSET - TRAIL_OFFSET;
      const targetOpacity = Math.min(0.16, Math.max(0, (speed - 0.06) * 0.14));
      const targetScale = 0.84 + Math.min(speed * 0.1, 0.12);

      trailRenderRef.current.x += (trailTargetX - trailRenderRef.current.x) * trailFollowAlpha;
      trailRenderRef.current.y += (trailTargetY - trailRenderRef.current.y) * trailFollowAlpha;
      trailRenderRef.current.opacity +=
        (targetOpacity - trailRenderRef.current.opacity) * trailOpacityAlpha;
      trailRenderRef.current.scale +=
        (targetScale - trailRenderRef.current.scale) * trailScaleAlpha;

      const trailShouldBeVisible = trailRenderRef.current.opacity > 0.012;

      // Skip writes unless the visual delta is meaningful. The trail is secondary polish,
      // so it should never dominate the frame loop.
      if (!trailShouldBeVisible) {
        if (trailRenderRef.current.visible) {
          trailRenderRef.current.visible = false;
          trailAppliedRef.current.visible = false;
          trailAppliedRef.current.opacity = 0;
          hideTrailNode(trailRef.current);
        }
        return;
      }

      const shouldUpdateTransform =
        !approximatelyEqual(trailRenderRef.current.x, trailAppliedRef.current.x, TRAIL_WRITE_EPSILON) ||
        !approximatelyEqual(trailRenderRef.current.y, trailAppliedRef.current.y, TRAIL_WRITE_EPSILON) ||
        !approximatelyEqual(trailRenderRef.current.scale, trailAppliedRef.current.scale, TRAIL_SCALE_EPSILON);

      if (!trailRenderRef.current.visible) {
        trailRenderRef.current.visible = true;
      }

      if (!approximatelyEqual(trailAppliedRef.current.opacity, trailRenderRef.current.opacity, TRAIL_OPACITY_EPSILON)) {
        trailRef.current.style.opacity = trailRenderRef.current.opacity.toFixed(3);
        trailAppliedRef.current.opacity = trailRenderRef.current.opacity;
      }

      if (shouldUpdateTransform) {
        setTrailTransform(
          trailRef.current,
          trailRenderRef.current.x,
          trailRenderRef.current.y,
          trailRenderRef.current.scale,
        );
        trailAppliedRef.current.x = trailRenderRef.current.x;
        trailAppliedRef.current.y = trailRenderRef.current.y;
        trailAppliedRef.current.scale = trailRenderRef.current.scale;
      }
    };

    rafIdRef.current = window.requestAnimationFrame(frame);

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      frameTimeRef.current = null;
      resetTrail();
    };
  }, [enabled, prefersReducedMotion, resetTrail]);

  useEffect(() => {
    if (prefersReducedMotion) {
      resetTrail();
    }
  }, [prefersReducedMotion, resetTrail]);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const syncInteractiveState = (target: EventTarget | null) => {
      setCursorVariant(getInteractiveTarget(target) ? "hover" : "default");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const nextX = event.clientX - CURSOR_OFFSET;
      const nextY = event.clientY - CURSOR_OFFSET;
      targetRef.current = { x: nextX, y: nextY };

      if (!pointerInitializedRef.current) {
        pointerInitializedRef.current = true;
        renderedPrimaryRef.current = { x: nextX, y: nextY };
        lastPointerFrameRef.current = { x: nextX, y: nextY };
        if (positionerRef.current) {
          setTranslate(positionerRef.current, nextX, nextY);
        }
      }

      if (!visibleRef.current) {
        setLayerVisible(true);
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      syncInteractiveState(event.target);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      syncInteractiveState(event.relatedTarget);
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
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.documentElement.addEventListener("mouseleave", hideCursor);
    window.addEventListener("blur", hideCursor);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, hideCursor, setCursorVariant, setLayerVisible]);

  if (!enabled || !portalTarget) {
    return null;
  }

  return createPortal(
    <div
      ref={layerRef}
      aria-hidden="true"
      className="custom-cursor-layer"
      data-visible="false"
    >
      {!prefersReducedMotion ? <span ref={trailRef} className="custom-cursor-trail" /> : null}

      <div ref={positionerRef} className="custom-cursor-positioner">
        <div ref={coreRef} className="custom-cursor-core" data-variant="default">
          <span className="custom-cursor-fill" />
          <span className="custom-cursor-ring" />
        </div>
      </div>
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
