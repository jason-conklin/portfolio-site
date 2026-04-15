import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const HIDDEN_POSITION = -100;

type CursorVariant = "default" | "hover";
type DisplayVariant = CursorVariant | "hidden";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const cursorX = useMotionValue(HIDDEN_POSITION);
  const cursorY = useMotionValue(HIDDEN_POSITION);

  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const hasPositionRef = useRef(false);

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
    cursorX.set(HIDDEN_POSITION);
    cursorY.set(HIDDEN_POSITION);
  }, [cursorX, cursorY, setVariantState, setVisibleState]);

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

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", hideCursor);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", hideCursor);
    };
  }, [cursorX, cursorY, enabled, hideCursor, setVariantState, setVisibleState]);

  if (!enabled || !portalTarget) {
    return null;
  }

  const displayVariant: DisplayVariant = visible ? variant : "hidden";
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };

  return createPortal(
    <div aria-hidden="true" className="custom-cursor-layer">
      <motion.div
        className="custom-cursor-shell"
        data-variant={displayVariant}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          default: { opacity: 1, scale: 1 },
          hover: { opacity: 1, scale: 1.7 },
        }}
        animate={displayVariant}
        transition={transition}
      >
        <span className="custom-cursor-fill" />
        <span className="custom-cursor-ring" />
      </motion.div>
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
