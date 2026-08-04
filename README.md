# Portfolio

A personal portfolio site for showcasing both design and software projects, built to mirror the interaction patterns of native-feeling web apps: a Netflix-style grid, an Instagram-style modal-over-grid detail view with shareable URLs, and a fully custom admin for content management — no headless CMS, no third-party dashboard.

**Live:** _add production URL once deployed_
**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · Supabase · Framer Motion

---

## What this project demonstrates

This isn't a template with content dropped in — most of the interesting engineering is in how the pieces fit together:

- **Intercepting + parallel routes done right.** Clicking a project card opens a modal over the grid with its own shareable URL (`/design/[slug]`); visiting that URL directly (shared link, refresh, a crawler) renders the same content as a full page with its own metadata — no client-side routing hack, no duplicated data-fetching logic. Grid card and modal panel share one `layoutId` so Framer Motion animates between them natively.
- **i18n as a first-class routing concern**, not an afterthought bolted on later — every route is locale-prefixed (`/pt/...`, `/en/...`) from the App Router structure itself, via `next-intl`.
- **RLS as the actual authorization boundary**, not just a defense-in-depth checkbox. Every table's write policy checks the caller's JWT against a single admin email; the app's middleware and layout-level checks are a second, redundant layer on top of that, not the only layer.
- **A schema that avoids the "one column per feature" trap.** Project links (GitHub, live site, Instagram, ebook, …) live in a single dynamic `project_links` table instead of a wide `projects` table with a nullable column per link type — so adding a new link type is a data change, not a migration.
- **Debugged and worked around a real Next.js 16 dev-server bug**, rather than papering over it: Turbopack's dev server throws on this route structure (`[locale]` + multiple sibling intercepted routes), confirmed via reading Next's own source, confirmed that production builds are unaffected, and shipped a documented workaround (`next dev --webpack`) instead of restructuring the app around a dev-only bug.

## Features

- **Three views, one data source.** `/design` and `/code` are filtered queries; `/all` is never a separate table or curation — it's always the union of the other two, ordered by the same global `position` field.
- **Bilingual (PT/EN)** across every route, with locale-aware fallback for any field left blank in one language.
- **Dark/light theme** with no flash-of-wrong-theme on load.
- **Touch-aware interaction**: hover-driven card scaling on desktop degrades to direct tap-to-detail on touch devices, detected via `matchMedia`, not user-agent sniffing.
- **Full admin CRUD**: create/edit/delete projects, upload cover/banner/gallery images straight to Supabase Storage, manage tags (create-on-the-fly) and an arbitrary number of links per project, and reorder projects via drag-and-drop (`dnd-kit`) that persists instantly.
- **SEO baseline**: per-project `generateMetadata` (title/description/OG image), a generated `sitemap.xml`, and `robots.txt`.

## Stack

| Layer       | Choice                                                 |
| ----------- | ------------------------------------------------------ |
| Framework   | Next.js 16 (App Router, Server Components by default)  |
| Language    | TypeScript (`strict: true`)                            |
| Styling     | Tailwind CSS v4                                        |
| Animation   | Framer Motion (shared `layoutId` transitions)          |
| Data & Auth | Supabase (Postgres, Row Level Security, Storage, Auth) |
| Drag & drop | dnd-kit                                                |
| i18n        | next-intl                                              |
| Validation  | zod                                                    |
| Deploy      | Vercel                                                 |

## Architecture notes

```
app/[locale]/
  layout.tsx              # <html>, theme provider, i18n provider, renders {children} + {modal}
  design/
    page.tsx               # grid
    [slug]/page.tsx         # full page (direct access / shared link / SEO)
  code/                     # same shape
  all/                      # same shape — always design ∪ code, never its own table
  @modal/
    default.tsx             # renders null on hard navigation (no modal on refresh/direct link)
    design/(.)[slug]/page.tsx  # intercepted route → renders as a modal instead
    code/(.)[slug]/page.tsx
    all/(.)[slug]/page.tsx
  admin/
    login/
    (dashboard)/            # route group: shared auth-gated layout, excludes /login
      page.tsx              # sortable project list
      projects/new/
      projects/[id]/edit/
```

Every `/admin` route is re-checked for a valid, single-admin session **on the server** — both in `proxy.ts` (the Next 16 rename of `middleware.ts`) and again in the dashboard's layout — so there's no path where admin data renders without an authenticated request reaching Supabase.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** `npm run dev` runs with `--webpack` instead of Next 16's default Turbopack dev server. Turbopack's dev server has a reproducible bug resolving interception routes on this specific structure ( `[locale]` + multiple sibling intercepted routes under one `@modal` slot) — confirmed by reading Next's own source, and confirmed **not** to affect production (`next build && next start`, which is what Vercel runs). Worth revisiting once upstream ships a fix.

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm run start` — production build and server
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier

## Data model (Supabase)

- **`projects`** — bilingual title/description, slug, `type` (`design` | `code`), cover/banner image URLs, `published`, and a global `position` for manual ordering.
- **`project_images`** — gallery, 1:N with `projects`.
- **`project_links`** — dynamic links (GitHub, live site, Instagram, ebook, etc.), 1:N with `projects`. Deliberately not one column per link type.
- **`tags`** / **`project_tags`** — N:N tagging.

Full spec and rationale for these decisions in [CLAUDE.md](./CLAUDE.md).

## About

Built end-to-end — schema design, RLS policies, route architecture, animation system, and admin tooling — as a personal portfolio and a demonstration of shipping a non-trivial Next.js app beyond CRUD-with-a-UI-on-top.
