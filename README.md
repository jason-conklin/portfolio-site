# Jason Conklin — Portfolio
<img width="1596" height="945" alt="Screenshot 2025-10-29 193816" src="https://github.com/user-attachments/assets/31aec7e0-3691-4c5d-8e71-0a1878f962fc" />

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

## Screenshots
Screenshot 1:
About Page
<img width="1308" height="940" alt="portfolio_about" src="https://github.com/user-attachments/assets/f2128f11-aff0-4d9b-bcfb-7fe7f44aa922" />

Screenshot 2:
Projects Page
<img width="1219" height="940" alt="portfolio_projects" src="https://github.com/user-attachments/assets/c327cdff-89f9-4bd4-82f5-0e2ed8a8f78e" />

Screenshot 3:
Skills Page
<img width="1185" height="943" alt="portfolio_skills" src="https://github.com/user-attachments/assets/4124edae-8a78-4cb6-a84b-0256bac338c2" />

Screenshot 4:
Contact Page
<img width="1269" height="938" alt="portfolio_contact" src="https://github.com/user-attachments/assets/b9f31cd2-0917-4afe-8291-e70e4ea53877" />

Screenshot 5:
Resume Page
<img width="1159" height="941" alt="portfolio_resume" src="https://github.com/user-attachments/assets/fe9f8111-dadd-4baf-b4a1-90445a02917b" />
