# بام ایران — Bam Iran website

Monorepo: a **Next.js frontend** (static-exported, deploys automatically to
**GitHub Pages**) and a **Laravel API scaffold** (source code only — GitHub
can't run PHP, so this half deploys elsewhere later).

```
.
├── .github/workflows/deploy-pages.yml   # builds + deploys frontend/ on every push to main
├── frontend/                            # Next.js — this is what goes live
└── backend/                             # Laravel scaffold — reference code, not deployed here
```

## Go live on GitHub Pages

1. **Push this repo to GitHub** (main branch).
2. In the repo's **Settings → Pages**, set **Source** to **"GitHub Actions"**
   (not "Deploy from a branch").
3. That's it — `.github/workflows/deploy-pages.yml` builds `frontend/` as a
   static export and deploys it automatically on every push to `main`. Check
   the **Actions** tab for build progress; your URL will be
   `https://<your-username>.github.io/<repo-name>/`.

The workflow auto-detects your repo name for GitHub Pages' URL structure
(`username.github.io/repo-name/`) — you don't need to edit anything. If you
later move to a **custom domain**, add a repository variable named
`BASE_PATH` set to an empty string (Settings → Secrets and variables →
Actions → Variables), since a custom domain doesn't need the `/repo-name/`
prefix.

## ⚠️ What was actually possible to build here, and what wasn't

The sandbox this was built in has **no outbound access to npm's registry or
to Packagist, and no PHP installed**. In practice:

- **`frontend/`** is complete, real Next.js/TypeScript/Tailwind source —
  every page and component here is genuine code, adapted specifically for
  static hosting (`output: "export"` in `next.config.js`, client-side query
  filtering instead of server-side, a client-side redirect on `/` instead of
  a server `redirect()`). It has **not** been run or built here (no
  `npm install` was possible), but every file passed a TypeScript syntax
  check. **Before your first push**, run this locally once to catch
  anything a syntax check can't (real type errors, a missing import) and to
  generate `package-lock.json`:
  ```bash
  cd frontend
  npm install
  npm run build   # should produce a frontend/out/ folder with no errors
  ```
- **`backend/`** is complete Laravel-style PHP code (migrations, models,
  controllers, routes, seeders) — a **scaffold to drop into a real Laravel
  installation**, not a running API, and not part of the GitHub Pages
  deploy. See `backend/README.md`. The frontend currently runs entirely on
  its own mock data (`frontend/lib/properties.ts`); wiring it to a real API
  is the natural next step once `backend/` is deployed somewhere with PHP.

## What changed for static hosting (vs. running on a Node server)

Since GitHub Pages only serves static files, a few things in `frontend/`
work differently than they would on Vercel or a Node server:

| Feature | Node server | Static export (this repo) |
|---|---|---|
| `/` → `/fa` redirect | Server `redirect()` | Client-side `router.replace()` + fallback link |
| Property search filters | Server reads `?type=...` | Client reads it via `useSearchParams()` |
| Consultation/visit form prefill (`?property=&intent=`) | Server reads it | Client reads it via `useSearchParams()` |
| Property images | Next.js Image Optimization | `unoptimized: true` — served as-is |
| 404 page | Dynamic | Pre-built `404.html`, which GitHub Pages serves automatically |

None of this changes what the site looks like or how it behaves for a
visitor — it's the same UI, just resolved in the browser instead of on a
server, which is what static hosting requires.

## What's next (not in this pass)

- Wire the frontend's mock data over to the real API once `backend/` is
  deployed (replace the static imports in `lib/properties.ts` with
  `fetch()` calls)
- Admin CMS panel (Sanctum-authenticated) for managing properties
- Peyda font files (`frontend/public/fonts/README.md` — licensed, can't be
  fetched automatically)
- WhatsApp/SMS notification queue jobs (stubbed as a `TODO` in
  `backend/app/Http/Controllers/Api/LeadController.php`)
