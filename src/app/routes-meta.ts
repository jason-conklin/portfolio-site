export interface RouteMeta {
  path: string;
  metaKey: string;
  includeInSitemap?: boolean;
}

export const routesMeta: RouteMeta[] = [
  { path: "/", metaKey: "/" },
  { path: "/about", metaKey: "/about" },
  { path: "/projects", metaKey: "/projects" },
  { path: "/skills", metaKey: "/skills" },
  { path: "/contact", metaKey: "/contact" },
  { path: "*", metaKey: "/404", includeInSitemap: false },
];
