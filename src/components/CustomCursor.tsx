import { useEffect, useState } from "react";

import { useTheme } from "@/lib/theme";

const ENABLED_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";
const INTERACTIVE_SELECTOR = "[data-cursor-interactive]";
const ROOT_ENABLED_CLASS = "has-native-circle-cursor";
const ROOT_HOVER_CLASS = "has-native-circle-cursor-hover";
const ROOT_LIGHT_CLASS = "has-native-circle-cursor-light";
const ROOT_DARK_CLASS = "has-native-circle-cursor-dark";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element ? target.closest(INTERACTIVE_SELECTOR) : null;
}

function clearCursorClasses(root: HTMLElement) {
  root.classList.remove(
    ROOT_ENABLED_CLASS,
    ROOT_HOVER_CLASS,
    ROOT_LIGHT_CLASS,
    ROOT_DARK_CLASS,
  );
}

export function CustomCursor() {
  const { resolvedTheme } = useTheme();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(ENABLED_MEDIA_QUERY);
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => {
      mediaQuery.removeEventListener("change", syncEnabled);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    if (!enabled) {
      clearCursorClasses(root);
      return;
    }

    root.classList.add(ROOT_ENABLED_CLASS);
    root.classList.toggle(ROOT_LIGHT_CLASS, resolvedTheme === "light");
    root.classList.toggle(ROOT_DARK_CLASS, resolvedTheme === "dark");

    const syncInteractiveState = (target: EventTarget | null) => {
      root.classList.toggle(ROOT_HOVER_CLASS, Boolean(getInteractiveTarget(target)));
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

    const resetHoverState = () => {
      root.classList.remove(ROOT_HOVER_CLASS);
    };

    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", resetHoverState);
    document.addEventListener("mouseleave", resetHoverState);
    window.addEventListener("blur", resetHoverState);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", resetHoverState);
      document.removeEventListener("mouseleave", resetHoverState);
      window.removeEventListener("blur", resetHoverState);
      clearCursorClasses(root);
    };
  }, [enabled, resolvedTheme]);

  return null;
}

export default CustomCursor;
