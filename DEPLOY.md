# Render Deployment Guide

Deploy this portfolio as a Render Static Site.

## Static site settings

- **Build command**: `npm ci && npm run build`
- **Publish directory**: `dist`

Render automatically runs the `postbuild` script which emits `sitemap.xml` and `robots.txt` into `dist/`.

## First deploy

1. Push the repository to GitHub.
2. Create a new **Static Site** on Render and connect the repo.
3. Enter the build command and publish directory above.
4. Deploy. After the site is live, update `site.baseUrl` in `src/data/profile.ts` with the Render URL and redeploy so canonical links and the sitemap reference the correct domain.

## Custom domain

1. In Render, go to **Settings → Custom Domains** and add `jasonconklin.dev`.
2. Follow Render’s DNS instructions (CNAME or A record) with your registrar.
3. Wait for DNS propagation; Render will provision SSL automatically.
4. (Optional) Set the onrender.com domain to 301 redirect once the custom domain is active.
