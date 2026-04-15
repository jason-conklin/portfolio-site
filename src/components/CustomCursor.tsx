import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const HIDDEN_POSITION = -100;
// Temporary latency A/B mode.
// When enabled, the browser cursor stays visible and the custom cursor is offset
// so both can be compared on-screen at the same time.
const CURSOR_DEBUG_SHOW_NATIVE = true;
const CURSOR_DEBUG_OFFSET_X = 20;
const CURSOR_DEBUG_OFFSET_Y = 20;
const CURSOR_DEBUG_LOG_EVENTS = false;

type CursorVariant = "default" | "hover";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function setShellPosition(node: HTMLDivElement | null, x: number, y: number) {
  if (!node) return;
  node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
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
  const lastDebugLogAtRef = useRef(0);

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

  const hideCursor = useCallback(() => {
    setVisibleState(false);
    setVariantState("default");
    hasPositionRef.current = false;
    setShellPosition(shellRef.current, HIDDEN_POSITION, HIDDEN_POSITION);
  }, [setVariantState, setVisibleState]);

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

    if (enabled && !CURSOR_DEBUG_SHOW_NATIVE) {
      root.classList.add("has-custom-cursor");
    } else {
      root.classList.remove("has-custom-cursor");
      if (!enabled) {
        hideCursor();
      }
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

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      // Pointer coordinates are sampled here. Movement stays out of React state.
      const renderX = event.clientX + (CURSOR_DEBUG_SHOW_NATIVE ? CURSOR_DEBUG_OFFSET_X : 0);
      const renderY = event.clientY + (CURSOR_DEBUG_SHOW_NATIVE ? CURSOR_DEBUG_OFFSET_Y : 0);

      // This is the only movement write: one transform update on the fixed shell.
      setShellPosition(shellRef.current, renderX, renderY);

      if (CURSOR_DEBUG_LOG_EVENTS) {
        const now = performance.now();
        if (now - lastDebugLogAtRef.current > 250) {
          lastDebugLogAtRef.current = now;
          console.debug("[CustomCursor]", {
            pointerType: event.pointerType || "mouse",
            inputX: event.clientX,
            inputY: event.clientY,
            renderX,
            renderY,
            eventTs: event.timeStamp,
          });
        }
      }

      hasPositionRef.current = true;

      if (!visibleRef.current) {
        setVisibleState(true);
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
  }, [enabled, hideCursor, setVariantState, setVisibleState]);

  if (!enabled || !portalTarget) {
    return null;
  }

  return createPortal(
    <div aria-hidden="true" className="custom-cursor-layer">
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
