import { Routes, Route, useLocation } from "react-router-dom";

import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ProjectsPage from "../pages/Projects";
import SkillsPage from "../pages/Skills";
import ContactPage from "../pages/Contact";
import NotFoundPage from "../pages/NotFound";
import ResumePage from "../pages/Resume";
import { routesMeta, type RouteMeta } from "./routes-meta";

export interface RouteConfig extends RouteMeta {
  element: JSX.Element;
}

const routeElements: Record<string, JSX.Element> = {
  "/": <HomePage />,
  "/about": <AboutPage />,
  "/projects": <ProjectsPage />,
  "/skills": <SkillsPage />,
  "/contact": <ContactPage />,
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
