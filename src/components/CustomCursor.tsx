import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const HIDDEN_POSITION = -100;

// Temporary latency A/B mode.
// Keep the browser cursor visible and offset the custom cursor so both can be
// compared on-screen at the same time.
const CURSOR_DEBUG_SHOW_NATIVE = true;
const CURSOR_DEBUG_OFFSET_X = 20;
const CURSOR_DEBUG_OFFSET_Y = 20;

// Fine calibration for the custom ring itself. Keep these at 0 unless you need
// to tune the ring relative to the native cursor hotspot during debug.
const CURSOR_CALIBRATION_X = 0;
const CURSOR_CALIBRATION_Y = 0;
const CURSOR_DEBUG_LOG_EVENTS = false;

type CursorVariant = "default" | "hover";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function setCursorPosition(node: HTMLDivElement | null, x: number, y: number) {
  if (!node) return;
  node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
}

function setCursorVisible(node: HTMLDivElement | null, nextVisible: boolean) {
  if (!node) return;
  node.dataset.visible = nextVisible ? "true" : "false";
}

function setCursorVariant(node: HTMLDivElement | null, nextVariant: CursorVariant) {
  if (!node) return;
  node.dataset.variant = nextVariant;
}

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const visibleRef = useRef(false);
  const variantRef = useRef<CursorVariant>("default");
  const hasPositionRef = useRef(false);
  const lastDebugLogAtRef = useRef(0);

  const setVisibleState = useCallback((nextVisible: boolean) => {
    if (visibleRef.current === nextVisible) return;
    visibleRef.current = nextVisible;
    setCursorVisible(cursorRef.current, nextVisible);
  }, []);

  const setVariantState = useCallback((nextVariant: CursorVariant) => {
    if (variantRef.current === nextVariant) return;
    variantRef.current = nextVariant;
    setCursorVariant(cursorRef.current, nextVariant);
  }, []);

  const hideCursor = useCallback(() => {
    setVisibleState(false);
    setVariantState("default");
    hasPositionRef.current = false;
    setCursorPosition(cursorRef.current, HIDDEN_POSITION, HIDDEN_POSITION);
  }, [setVariantState, setVisibleState]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pointerMediaQuery = window.matchMedia(ENABLED_MEDIA_QUERY);
    const reducedMotionMediaQuery = window.matchMedia(REDUCED_MOTION_MEDIA_QUERY);

    const syncEnabled = () => setEnabled(pointerMediaQuery.matches);
    const syncReducedMotion = () => setPrefersReducedMotion(reducedMotionMediaQuery.matches);

    syncEnabled();
    syncReducedMotion();

    pointerMediaQuery.addEventListener("change", syncEnabled);
    reducedMotionMediaQuery.addEventListener("change", syncReducedMotion);

    return () => {
      pointerMediaQuery.removeEventListener("change", syncEnabled);
      reducedMotionMediaQuery.removeEventListener("change", syncReducedMotion);
    };
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
    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.dataset.reducedMotion = prefersReducedMotion ? "true" : "false";
    cursor.dataset.visible = "false";
    cursor.dataset.variant = "default";
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!enabled || typeof document === "undefined" || typeof window === "undefined") return;

    const syncInteractiveState = (target: EventTarget | null) => {
      setVariantState(getInteractiveTarget(target) ? "hover" : "default");
    };

    const handleMove = (event: PointerEvent | MouseEvent) => {
      if ("pointerType" in event && event.pointerType && event.pointerType !== "mouse") return;

      // Pointer coordinates are sampled here with no smoothing or follower loop.
      const renderX =
        event.clientX +
        CURSOR_CALIBRATION_X +
        (CURSOR_DEBUG_SHOW_NATIVE ? CURSOR_DEBUG_OFFSET_X : 0);
      const renderY =
        event.clientY +
        CURSOR_CALIBRATION_Y +
        (CURSOR_DEBUG_SHOW_NATIVE ? CURSOR_DEBUG_OFFSET_Y : 0);

      // The visible cursor node itself receives the transform write directly.
      setCursorPosition(cursorRef.current, renderX, renderY);

      if (CURSOR_DEBUG_LOG_EVENTS) {
        const now = performance.now();
        if (now - lastDebugLogAtRef.current > 250) {
          lastDebugLogAtRef.current = now;
          console.debug("[CustomCursor]", {
            source: "pointerType" in event ? "pointer" : "mouse",
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

    const moveEventName =
      "onpointerrawupdate" in window ? "pointerrawupdate" : "mousemove";

    window.addEventListener(moveEventName, handleMove as EventListener, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", hideCursor);
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener(moveEventName, handleMove as EventListener);
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
      <div
        ref={cursorRef}
        className="custom-cursor"
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        data-visible="false"
        data-variant="default"
      />
    </div>,
    portalTarget,
  );
}

export default CustomCursor;
