import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TechnicalBlueprintBackground } from "@/components/TechnicalBlueprintBackground";
import { AppRoutes } from "@/app/routes";

function ScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <div
      id="app-root"
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <TechnicalBlueprintBackground />
      </div>
      <a
        href="#app-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="app-main" className="relative z-10 flex-1 pt-[var(--header-height)]">
        <AppRoutes />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default App;
