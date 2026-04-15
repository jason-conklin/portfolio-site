import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const TRAIL_MAX = 4;
const TRAIL_LIFETIME_MS = 280;
const TRAIL_SPAWN_INTERVAL_MS = 42;
const TRAIL_MIN_DISTANCE = 14;
const CURSOR_SIZE = 36;
const CURSOR_OFFSET = CURSOR_SIZE / 2;
const TRAIL_SIZE = 24;
const TRAIL_OFFSET = TRAIL_SIZE / 2;

type CursorVariant = "default" | "hover";
type DisplayVariant = CursorVariant | "hidden";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const cursorX = useMotionValue(-CURSOR_SIZE * 2);
  const cursorY = useMotionValue(-CURSOR_SIZE * 2);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const trailRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const trailIndexRef = useRef(0);
  const lastSpawnRef = useRef({ x: -100, y: -100, time: 0 });
  const lastMoveTimeRef = useRef(0);

  const resetTrailNodes = () => {
    for (const node of trailRefs.current) {
      if (!node) continue;
      node.getAnimations().forEach((animation) => animation.cancel());
      node.style.opacity = "0";
      node.style.transform = "translate3d(-9999px, -9999px, 0) scale(0.8)";
    }
  };

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
      visibleRef.current = false;
      variantRef.current = "default";
      setVisible(false);
      setVariant("default");
      resetTrailNodes();
    }

    return () => {
      root.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    variantRef.current = variant;
  }, [variant]);

  useEffect(() => {
    return () => resetTrailNodes();
  }, []);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const setVisibleState = (nextVisible: boolean) => {
      if (visibleRef.current === nextVisible) return;
      visibleRef.current = nextVisible;
      setVisible(nextVisible);
    };

    const setVariantState = (nextVariant: CursorVariant) => {
      if (variantRef.current === nextVariant) return;
      variantRef.current = nextVariant;
      setVariant(nextVariant);
    };

    const hideCursor = () => {
      setVisibleState(false);
      setVariantState("default");
      resetTrailNodes();
    };

    const syncInteractiveState = (target: EventTarget | null) => {
      setVariantState(getInteractiveTarget(target) ? "hover" : "default");
    };

    const spawnTrail = (x: number, y: number, speedFactor: number) => {
      const node = trailRefs.current[trailIndexRef.current % TRAIL_MAX];
      trailIndexRef.current += 1;
      if (!node) return;

      node.getAnimations().forEach((animation) => animation.cancel());

      const startOpacity = 0.2 + speedFactor * 0.16;
      const startScale = 0.84 + speedFactor * 0.16;
      const endScale = startScale + 0.22;
      const translate = `translate3d(${x}px, ${y}px, 0)`;

      node.style.opacity = "0";
      node.style.transform = `${translate} scale(${startScale})`;

      node.animate(
        [
          {
            opacity: startOpacity,
            transform: `${translate} scale(${startScale})`,
          },
          {
            opacity: 0,
            transform: `${translate} scale(${endScale})`,
          },
        ],
        {
          duration: TRAIL_LIFETIME_MS,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "forwards",
        },
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      const cursorLeft = event.clientX - CURSOR_OFFSET;
      const cursorTop = event.clientY - CURSOR_OFFSET;
      cursorX.set(cursorLeft);
      cursorY.set(cursorTop);

      if (!visibleRef.current) {
        setVisibleState(true);
      }

      syncInteractiveState(event.target);

      if (prefersReducedMotion) {
        lastMoveTimeRef.current = event.timeStamp;
        return;
      }

      const trailLeft = event.clientX - TRAIL_OFFSET;
      const trailTop = event.clientY - TRAIL_OFFSET;
      const distance = Math.hypot(
        trailLeft - lastSpawnRef.current.x,
        trailTop - lastSpawnRef.current.y,
      );
      const deltaTime = Math.max(event.timeStamp - lastMoveTimeRef.current, 1);
      const speedFactor = Math.min(distance / deltaTime / 0.75, 1);

      if (
        distance >= TRAIL_MIN_DISTANCE &&
        event.timeStamp - lastSpawnRef.current.time >= TRAIL_SPAWN_INTERVAL_MS
      ) {
        spawnTrail(trailLeft, trailTop, speedFactor);
        lastSpawnRef.current = { x: trailLeft, y: trailTop, time: event.timeStamp };
      }

      lastMoveTimeRef.current = event.timeStamp;
    };

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;
      if (!visibleRef.current) {
        setVisibleState(true);
      }
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
      resetTrailNodes();
    };
  }, [cursorX, cursorY, enabled, prefersReducedMotion]);

  if (!enabled) {
    return null;
  }

  const displayVariant: DisplayVariant = visible ? variant : "hidden";
  if (!portalTarget) {
    return null;
  }

  return createPortal(
    <div aria-hidden="true" className="custom-cursor-layer" data-visible={visible ? "true" : "false"}>
      {!prefersReducedMotion ? (
        Array.from({ length: TRAIL_MAX }).map((_, index) => (
          <span
            key={index}
            ref={(node) => {
              trailRefs.current[index] = node;
            }}
            className="custom-cursor-trail"
          />
        ))
      ) : null}

      <motion.div
        className="custom-cursor-core"
        style={{ x: cursorX, y: cursorY }}
        animate={visible ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, scale: 0.72 },
          visible: { opacity: 1, scale: 1, transition: { duration: 0.14, ease: [0.16, 1, 0.3, 1] } },
        }}
      >
        <motion.span
          className="custom-cursor-fill"
          data-variant={displayVariant}
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
          animate={displayVariant}
          variants={{
            hidden: { opacity: 0, scale: 0.62 },
            default: { opacity: 1, scale: 1, transition: { duration: 0.16, ease: "easeOut" } },
            hover: { opacity: 1, scale: 1.62, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } },
          }}
        />
      </motion.div>
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
