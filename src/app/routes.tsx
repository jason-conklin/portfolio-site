import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";
import ResumePage from "../pages/Resume";
import { routesMeta, type RouteMeta } from "./routes-meta";

export interface RouteConfig extends RouteMeta {
  element: JSX.Element;
}

function HomeSectionRedirect({
  section,
  preserveProjectHash = false,
}: {
  section: "home" | "works" | "about" | "contact";
  preserveProjectHash?: boolean;
}) {
  const location = useLocation();
  const rawHash = decodeURIComponent(location.hash.replace(/^#/, ""));
  const projectSlug = preserveProjectHash && rawHash ? rawHash : "";

  return (
    <Navigate
      replace
      to={{
        pathname: "/",
        hash: `#${section}`,
        search: projectSlug ? `?project=${encodeURIComponent(projectSlug)}` : "",
      }}
    />
  );
}

const routeElements: Record<string, JSX.Element> = {
  "/": <HomePage />,
  "/about": <HomeSectionRedirect section="about" />,
  "/projects": <HomeSectionRedirect section="works" preserveProjectHash />,
  "/skills": <HomeSectionRedirect section="about" />,
  "/contact": <HomeSectionRedirect section="contact" />,
  "/resume": <ResumePage />,
  "*": <NotFoundPage />,
};

export const routeConfig: RouteConfig[] = routesMeta.map((route) => ({
  ...route,
  element: routeElements[route.path] ?? <NotFoundPage />,
}));

export function AppRoutes() {
  const location = useLocation();

  return (
    <Routes>
      {routeConfig.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.path === "/"
              ? <HomePage key={`home-${location.key}`} />
              : route.element
          }
        />
      ))}
    </Routes>
  );
}
