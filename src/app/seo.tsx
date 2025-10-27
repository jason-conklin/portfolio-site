import { Helmet } from "react-helmet-async";

import { metaByRoute, site } from "@/data/profile";

type PagePath = keyof typeof metaByRoute | string;

export function getCanonicalUrl(pathname: string) {
  const base = site.baseUrl?.replace(/\/$/, "") ?? "";
  if (!base) return undefined;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function getPageMeta(pathname: PagePath) {
  return metaByRoute[pathname as keyof typeof metaByRoute] ?? {
    title: site.title,
    description: site.description,
  };
}

interface PageSEOProps {
  path: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}

export function PageSEO({
  path,
  title,
  description,
  image = "/og-image.png",
  type = "website",
}: PageSEOProps) {
  const defaultMeta = getPageMeta(path);
  const computedTitle = title ?? defaultMeta.title;
  const computedDescription = description ?? defaultMeta.description;
  const canonical = getCanonicalUrl(path);

  return (
    <Helmet prioritizeSeoTags>
      <title>{computedTitle}</title>
      <meta name="description" content={computedDescription} />
      <meta name="keywords" content={site.keywords.join(", ")} />
      <meta name="author" content={site.author} />
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={computedDescription} />
      <meta property="og:type" content={type} />
      {canonical ? <meta property="og:url" content={canonical} /> : null}
      <meta property="og:site_name" content={site.title} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={computedDescription} />
      <meta name="twitter:image" content={image} />
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </Helmet>
  );
}
