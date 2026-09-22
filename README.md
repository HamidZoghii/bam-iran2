# بام ایران — Bam Iran website

This is a monorepo: a Next.js frontend (static export, deploys automatically to GitHub Pages) and a Laravel API scaffold — just source code for now, since GitHub can't run PHP. That half goes live somewhere else later.

```
.
├── .github/workflows/deploy-pages.yml   # builds + deploys frontend/ on every push to main
├── frontend/                            # Next.js — this is what goes live
└── backend/                             # Laravel scaffold — reference code, not deployed here
```

## Getting it live on GitHub Pages

1. Push this repo to GitHub (main branch).
2. In the repo's Settings → Pages, set Source to "GitHub Actions" (not "Deploy from a branch").
3. That's it. `.github/workflows/deploy-pages.yml` builds `frontend/` as a static export and deploys it on every push to `main`. Check the Actions tab if you want to watch the build — your URL ends up being `https://<your-username>.github.io/<repo-name>/`.

The workflow figures out your repo name for the URL on its own, so there's nothing to edit there. If you move to a custom domain later, add a repository variable called `BASE_PATH` set to an empty string (Settings → Secrets and variables → Actions → Variables) — a custom domain doesn't need the `/repo-name/` prefix.

## A note on what I could actually build here

I put this together in a sandbox with no outbound access to npm's registry or Packagist, and no PHP installed. So here's where things actually stand:

`frontend/` is real, complete Next.js/TypeScript/Tailwind code — every page and component is genuine, adapted for static hosting (`output: "export"` in `next.config.js`, client-side query filtering instead of server-side, a client-side redirect on `/` instead of a server `redirect()`). I couldn't run or build it here — `npm install` wasn't possible — but every file passed a TypeScript syntax check. Before your first push, run this locally once to catch anything the syntax check would've missed (real type errors, a missing import) and to generate `package-lock.json`:

```bash
cd frontend
npm install
npm run build   # should produce a frontend/out/ folder with no errors
```

`backend/` is complete Laravel-style PHP — migrations, models, controllers, routes, seeders — but it's a scaffold meant to be dropped into a real Laravel install, not a running API, and it's not part of the GitHub Pages deploy. Check `backend/README.md`. Right now the frontend runs entirely on mock data (`frontend/lib/properties.ts`); wiring it to a real API is the obvious next step once `backend/` is deployed somewhere with PHP.

## What's different running static (vs. a Node server)

GitHub Pages only serves static files, so a few things in `frontend/` behave a bit differently than they would on Vercel or a Node server:

| Feature | Node server | Static export (this repo) |
|---|---|---|
| `/` → `/fa` redirect | Server `redirect()` | Client-side `router.replace()` + fallback link |
| Property search filters | Server reads `?type=...` | Client reads it via `useSearchParams()` |
| Consultation/visit form prefill (`?property=&intent=`) | Server reads it | Client reads it via `useSearchParams()` |
| Property images | Next.js Image Optimization | `unoptimized: true` — served as-is |
| 404 page | Dynamic | Pre-built `404.html`, served automatically by GitHub Pages |

None of it changes what the site looks or feels like to a visitor — same UI, just resolved in the browser instead of on a server, because that's what static hosting requires.

## What's left

- Wire the mock data over to the real API once `backend/` is deployed (swap the static imports in `lib/properties.ts` for `fetch()` calls)
- Admin CMS panel (Sanctum-authenticated) for managing properties
- Peyda font files — licensed, couldn't fetch them automatically (see `frontend/public/fonts/README.md`)
- WhatsApp/SMS notification queue jobs — stubbed as a TODO in `backend/app/Http/Controllers/Api/LeadController.php`
