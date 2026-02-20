import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundParticles } from "@/components/BackgroundParticles";
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
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden bg-background text-foreground"
    >
      <BackgroundParticles />
      <a
        href="#app-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <div aria-hidden className="h-[var(--header-height)]" />
      <main id="app-main" className="relative flex-1">
        <AppRoutes />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}

export default App;
