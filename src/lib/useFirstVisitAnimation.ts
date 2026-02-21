import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const DEFAULT_COMPLETION_TIMEOUT_MS = 1400;

export function useFirstVisitAnimation(
  key: string,
  completionTimeoutMs = DEFAULT_COMPLETION_TIMEOUT_MS,
) {
  const prefersReducedMotion = useReducedMotion();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldAnimate(false);
      return;
    }

    if (typeof window === "undefined") {
      setShouldAnimate(false);
      return;
    }

    try {
      const introState = window.sessionStorage.getItem(key);
      if (introState) {
        setShouldAnimate(false);
        return;
      }

      setShouldAnimate(true);
      window.sessionStorage.setItem(key, "playing");

      const timeoutId = window.setTimeout(() => {
        window.sessionStorage.setItem(key, "true");
      }, completionTimeoutMs);

      return () => {
        window.clearTimeout(timeoutId);
        if (window.sessionStorage.getItem(key) === "playing") {
          window.sessionStorage.setItem(key, "true");
        }
      };
    } catch {
      setShouldAnimate(false);
    }
  }, [completionTimeoutMs, key, prefersReducedMotion]);

  return shouldAnimate;
}
