import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const TRAIL_MAX = 3;
const TRAIL_LIFETIME_MS = 220;
const TRAIL_SPAWN_INTERVAL_MS = 46;
const TRAIL_MIN_DISTANCE = 14;
const CURSOR_SIZE = 36;
const CURSOR_OFFSET = CURSOR_SIZE / 2;
const TRAIL_SIZE = 24;
const TRAIL_OFFSET = TRAIL_SIZE / 2;
const CURSOR_SMOOTHING = 0.82;
const TRAIL_EASE_POWER = 1.45;
const OFFSCREEN_POSITION = -9999;

type CursorVariant = "default" | "hover";
type DisplayVariant = CursorVariant | "hidden";

type TrailState = {
  x: number;
  y: number;
  life: number;
  duration: number;
  startOpacity: number;
  startScale: number;
  endScale: number;
  active: boolean;
};

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function getFrameAlpha(deltaMs: number) {
  return 1 - Math.pow(1 - CURSOR_SMOOTHING, deltaMs / 16.667);
}

function hideTrailNode(node: HTMLSpanElement | null) {
  if (!node) return;
  node.style.opacity = "0";
  node.style.transform = `translate3d(${OFFSCREEN_POSITION}px, ${OFFSCREEN_POSITION}px, 0) scale(0.82)`;
}

function hideCursorNode(node: HTMLDivElement | null) {
  if (!node) return;
  node.style.transform = `translate3d(${OFFSCREEN_POSITION}px, ${OFFSCREEN_POSITION}px, 0)`;
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion() ?? false;

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const pointerInitializedRef = useRef(false);
  const cursorPositionRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafIdRef = useRef<number | null>(null);
  const frameTimeRef = useRef<number | null>(null);
  const targetRef = useRef({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION });
  const currentRef = useRef({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION });
  const trailIndexRef = useRef(0);
  const lastTrailSpawnRef = useRef({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION, time: 0 });
  const lastTrailSampleRef = useRef({ x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION, time: 0 });
  const trailStatesRef = useRef<TrailState[]>(
    Array.from({ length: TRAIL_MAX }, () => ({
      x: OFFSCREEN_POSITION,
      y: OFFSCREEN_POSITION,
      life: 0,
      duration: TRAIL_LIFETIME_MS,
      startOpacity: 0,
      startScale: 0.82,
      endScale: 1,
      active: false,
    })),
  );

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

  const resetTrailNodes = useCallback(() => {
    trailIndexRef.current = 0;
    lastTrailSpawnRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION, time: 0 };
    lastTrailSampleRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION, time: 0 };

    for (let index = 0; index < TRAIL_MAX; index += 1) {
      const state = trailStatesRef.current[index];
      state.x = OFFSCREEN_POSITION;
      state.y = OFFSCREEN_POSITION;
      state.life = 0;
      state.duration = TRAIL_LIFETIME_MS;
      state.startOpacity = 0;
      state.startScale = 0.82;
      state.endScale = 1;
      state.active = false;
      hideTrailNode(trailRefs.current[index]);
    }
  }, []);

  const hideCursor = useCallback(() => {
    setVisibleState(false);
    setVariantState("default");
    pointerInitializedRef.current = false;
    frameTimeRef.current = null;
    targetRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION };
    currentRef.current = { x: OFFSCREEN_POSITION, y: OFFSCREEN_POSITION };
    hideCursorNode(cursorPositionRef.current);
    resetTrailNodes();
  }, [resetTrailNodes, setVariantState, setVisibleState]);

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

    const spawnTrail = (x: number, y: number, now: number, speedFactor: number) => {
      const index = trailIndexRef.current % TRAIL_MAX;
      trailIndexRef.current += 1;

      const state = trailStatesRef.current[index];
      const startOpacity = 0.12 + speedFactor * 0.14;
      const startScale = 0.84 + speedFactor * 0.08;

      state.x = x;
      state.y = y;
      state.life = TRAIL_LIFETIME_MS;
      state.duration = TRAIL_LIFETIME_MS;
      state.startOpacity = startOpacity;
      state.startScale = startScale;
      state.endScale = startScale + 0.2;
      state.active = true;

      const node = trailRefs.current[index];
      if (node) {
        node.style.opacity = startOpacity.toFixed(3);
        node.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${startScale.toFixed(3)})`;
      }

      lastTrailSpawnRef.current = { x, y, time: now };
    };

    const updateTrailNodes = (deltaMs: number, now: number) => {
      const cursorCenterX = currentRef.current.x + CURSOR_OFFSET - TRAIL_OFFSET;
      const cursorCenterY = currentRef.current.y + CURSOR_OFFSET - TRAIL_OFFSET;

      const lastSample = lastTrailSampleRef.current;
      const distanceSinceSample =
        lastSample.time <= 0
          ? 0
          : Math.hypot(cursorCenterX - lastSample.x, cursorCenterY - lastSample.y);
      const speedFactor =
        lastSample.time <= 0
          ? 0
          : Math.min(distanceSinceSample / Math.max(deltaMs, 1) / 0.8, 1);

      if (
        pointerInitializedRef.current &&
        visibleRef.current &&
        Math.hypot(
          cursorCenterX - lastTrailSpawnRef.current.x,
          cursorCenterY - lastTrailSpawnRef.current.y,
        ) >= TRAIL_MIN_DISTANCE &&
        now - lastTrailSpawnRef.current.time >= TRAIL_SPAWN_INTERVAL_MS
      ) {
        spawnTrail(cursorCenterX, cursorCenterY, now, speedFactor);
      }

      lastTrailSampleRef.current = { x: cursorCenterX, y: cursorCenterY, time: now };

      for (let index = 0; index < TRAIL_MAX; index += 1) {
        const node = trailRefs.current[index];
        const state = trailStatesRef.current[index];

        if (!state.active || !node) {
          continue;
        }

        state.life = Math.max(0, state.life - deltaMs);

        if (state.life <= 0) {
          state.active = false;
          hideTrailNode(node);
          continue;
        }

        const progress = 1 - state.life / state.duration;
        const opacity = state.startOpacity * Math.pow(1 - progress, TRAIL_EASE_POWER);
        const scale = state.startScale + (state.endScale - state.startScale) * progress;

        node.style.opacity = opacity.toFixed(3);
        node.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) scale(${scale.toFixed(3)})`;
      }
    };

    const frame = (now: number) => {
      if (!pointerInitializedRef.current) {
        rafIdRef.current = window.requestAnimationFrame(frame);
        return;
      }

      const previousFrameTime = frameTimeRef.current ?? now - 16.667;
      const deltaMs = Math.min(now - previousFrameTime, 34);
      frameTimeRef.current = now;

      const alpha = getFrameAlpha(deltaMs);
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * alpha;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * alpha;

      if (cursorPositionRef.current) {
        cursorPositionRef.current.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0)`;
      }

      if (!prefersReducedMotion && visibleRef.current) {
        updateTrailNodes(deltaMs, now);
      }

      rafIdRef.current = window.requestAnimationFrame(frame);
    };

    rafIdRef.current = window.requestAnimationFrame(frame);

    return () => {
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      frameTimeRef.current = null;
      resetTrailNodes();
    };
  }, [enabled, prefersReducedMotion, resetTrailNodes]);

  useEffect(() => {
    if (prefersReducedMotion) {
      resetTrailNodes();
    }
  }, [prefersReducedMotion, resetTrailNodes]);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const syncInteractiveState = (target: EventTarget | null) => {
      setVariantState(getInteractiveTarget(target) ? "hover" : "default");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const nextX = event.clientX - CURSOR_OFFSET;
      const nextY = event.clientY - CURSOR_OFFSET;
      targetRef.current = { x: nextX, y: nextY };

      if (!visibleRef.current) {
        setVisibleState(true);
      }

      if (!pointerInitializedRef.current) {
        pointerInitializedRef.current = true;
        currentRef.current = { x: nextX, y: nextY };
        if (cursorPositionRef.current) {
          cursorPositionRef.current.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
        }

        const trailX = event.clientX - TRAIL_OFFSET;
        const trailY = event.clientY - TRAIL_OFFSET;
        lastTrailSpawnRef.current = { x: trailX, y: trailY, time: event.timeStamp };
        lastTrailSampleRef.current = { x: trailX, y: trailY, time: event.timeStamp };
      }
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      setVisibleState(true);
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
  }, [enabled, hideCursor, setVariantState, setVisibleState]);

  if (!enabled || !portalTarget) {
    return null;
  }

  const displayVariant: DisplayVariant = visible ? variant : "hidden";

  return createPortal(
    <div aria-hidden="true" className="custom-cursor-layer" data-visible={visible ? "true" : "false"}>
      {!prefersReducedMotion
        ? Array.from({ length: TRAIL_MAX }).map((_, index) => (
            <span
              key={index}
              ref={(node) => {
                trailRefs.current[index] = node;
              }}
              className="custom-cursor-trail"
            />
          ))
        : null}

      <div ref={cursorPositionRef} className="custom-cursor-positioner">
        <motion.div
          className="custom-cursor-core"
          initial={false}
          animate={visible ? "visible" : "hidden"}
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.72,
              transition: { duration: 0.12, ease: [0.16, 1, 0.3, 1] },
            },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.14, ease: [0.16, 1, 0.3, 1] },
            },
          }}
        >
          <motion.span
            className="custom-cursor-fill"
            data-variant={displayVariant}
            initial={false}
            animate={displayVariant}
            variants={{
              hidden: { opacity: 0, scale: 0.38 },
              default: { opacity: 0, scale: 0.5, transition: { duration: 0.16, ease: "easeOut" } },
              hover: { opacity: 1, scale: 1.05, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] } },
            }}
          />
          <motion.span
            className="custom-cursor-ring"
            data-variant={displayVariant}
            initial={false}
            animate={displayVariant}
            variants={{
              hidden: { opacity: 0, scale: 0.62 },
              default: { opacity: 1, scale: 1, transition: { duration: 0.16, ease: "easeOut" } },
              hover: { opacity: 1, scale: 1.62, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
            }}
          />
        </motion.div>
      </div>
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
