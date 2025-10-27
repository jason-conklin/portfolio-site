# Jason Conklin — Portfolio

Professional developer portfolio for Jason Conklin, built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui. The site highlights AI-enabled and full-stack projects while staying fast, accessible, and deployment-ready for Render static hosting.

## Tech stack

- React 18 + Vite + TypeScript
- Tailwind CSS with shadcn/ui components
- React Router + react-helmet-async for routing & SEO
- Framer Motion with prefers-reduced-motion safeguards

## Getting started

```bash
npm ci
npm run dev
```

Visit `http://localhost:5173` and you’ll be auto-routed thanks to Vite’s dev server.

### Additional scripts

- `npm run build` – Type-checks, builds the app, and emits `dist/`
- `npm run preview` – Serves the built site locally
- `npm run lint` – ESLint across `src`
- `npm run format` – Prettier format sweep
- `npm run typecheck` – Isolated TypeScript check

## Deployment (Render static site)

1. Push the repository to GitHub.
2. In Render, pick **Static Site** and connect the repo.
3. Configure:
   - **Build command**: `npm ci && npm run build`
   - **Publish directory**: `dist`
4. Deploy. After the first deploy, update `site.baseUrl` in `src/data/profile.ts` with the Render URL and redeploy.

See `DEPLOY.md` for custom domain notes.

## Quick customization checklist

- [ ] Update the short bio & location in `src/data/profile.ts`
- [ ] Swap in live project links (`githubUrl`, `liveUrl`) when ready
- [ ] Set `site.baseUrl` once your Render URL (or custom domain) is live
- [ ] Replace `about.resumeUrl` with a hosted résumé PDF
- [ ] Refresh the OG image at `src/assets/og-image.png` if you want custom artwork

## Project structure

```
src/
  app/         # Routing and SEO helpers
  components/  # UI primitives + layout components
  data/        # Single source of truth for site content
  pages/       # Route components
  lib/         # Utilities (theme, class helpers)
  assets/      # Static assets (OG image)
public/        # Static public assets (favicon)
scripts/       # Build-time sitemap/robots generator
```

## Accessibility & performance

- Skip link, semantic landmarks, and consistent focus outlines
- Reduced-motion aware animations and lazy DOM rendering
- Color contrast tuned for light/dark themes (WCAG AA focus)
- Automated sitemap/robots generation for SEO hygiene

## Updating content

All profile content (links, projects, skills, education, meta descriptions) lives in `src/data/profile.ts`. Updating that file will propagate through the site automatically.
