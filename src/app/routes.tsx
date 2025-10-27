import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/Home";
import AboutPage from "../pages/About";
import ProjectsPage from "../pages/Projects";
import SkillsPage from "../pages/Skills";
import ContactPage from "../pages/Contact";
import NotFoundPage from "../pages/NotFound";
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
  "*": <NotFoundPage />,
};

export const routeConfig: RouteConfig[] = routesMeta.map((route) => ({
  ...route,
  element: routeElements[route.path] ?? <NotFoundPage />,
}));

export function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
