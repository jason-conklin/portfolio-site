import { useEffect, useState } from "react";

const MOBILE_VIEWPORT_QUERY = "(max-width: 1023px)";

export function useMobileViewport() {
  const [isMobileViewport, setIsMobileViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY);
    const syncViewport = () => setIsMobileViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  return isMobileViewport;
}
