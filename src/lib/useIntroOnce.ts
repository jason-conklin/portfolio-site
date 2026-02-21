import { useState } from "react";

export function useIntroOnce(storageKey: string, enabled: boolean) {
  const [shouldAnimate] = useState(() => {
    if (!enabled || typeof window === "undefined") return false;

    try {
      const hasSeenIntro = window.sessionStorage.getItem(storageKey);
      if (hasSeenIntro) return false;
      window.sessionStorage.setItem(storageKey, "1");
      return true;
    } catch {
      return false;
    }
  });

  return shouldAnimate;
}
