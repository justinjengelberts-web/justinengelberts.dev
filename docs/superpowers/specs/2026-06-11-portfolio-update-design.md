# Portfolio Update: Content, Performance & UI Refinement

**Date:** 2026-06-11
**Status:** Approved by Justin

## Goal

Update justinengelberts.dev with four new project case studies, fix the main
performance bottlenecks, and refine the UI within the existing dark/aurora
design language. Replace the hero background with a lightweight comet effect
that subtly follows the mouse (Google Antigravity-style).

## 1. Content — four new case studies

All copy bilingual (NL + EN) in `lib/translations.ts`, following the existing
project structure. Each project gets a page under `app/projects/<slug>/` and a
card in the homepage carousel (`components/FeaturedProjects.tsx`).

### WebModern Platform (`/projects/webmodern-platform`) — the AWS showcase
- Multi-tenant CMS for Dutch SMBs; fork-per-client model with a shared npm SDK
  (`@webmodern/cms-sdk`), visual editor with iframe preview + Supabase Realtime.
- **Lead story: AWS media pipeline (CDK, infra-as-code):** private S3 bucket
  (public access fully blocked) → CloudFront with Origin Access Control as the
  only reader → presigned PUT uploads from the browser → least-privilege IAM
  uploader (`s3:PutObject` on `sites/*` only) → Secrets Manager for credentials.
  Deployed to eu-central-1. Phase 3 (image upload) is live.
- Tech: Next.js 16, TypeScript strict, Bun workspaces, Supabase, Drizzle,
  Tailwind 4, shadcn/ui, AWS CDK 2.x, S3, CloudFront, IAM, Secrets Manager.

### ContentTool (`/projects/contenttool`)
- Internal agentic content engine at Ad Hoc Data: plans, writes and edits
  marketing content (3 socials/week, weekly blog, monthly newsletter) from a
  daily-scraped inspiration pool.
- Pipeline: scrape industry sources → Gemini scoring → match against CBS open
  data → angle/hook generation → drafts → content calendar. GitHub Actions cron
  runs the daily migrate/seed/scrape/score pipeline.
- Tech: Python 3.12 + FastAPI, SQLAlchemy 2.0 + Alembic, SvelteKit +
  TypeScript, Tailwind, Gemini, Playwright scraping, Brevo.

### Angular 21 SSR rebuild (`/projects/adhoc-website`)
- Separate case next to the existing Selectietool (same employer, different
  project): full rewrite of Ad Hoc Data's marketing site from legacy AngularJS
  to Angular 21 SSR.
- 137 components, 50+ routes, NL/EN with hreflang, own design system, JSON-LD
  + Open Graph SEO, live search across the SBI-2025 taxonomy, MapLibre maps,
  Playwright testing across 10 viewports, Railway deploy.

### LeadHub (`/projects/leadhub`)
- Positioned as **personal AI command center / agent platform** — framing on
  platform engineering, not job-search tactics. The sollicitatie-widget
  (already live on this site) is its public face.
- Highlights: 48+ Supabase Edge Functions, multi-provider AI (Gemini, Claude,
  Mistral, OpenAI), HubSpot OAuth2 platform app with CRM Record Card, analytics
  cockpit (GSC + GA4 + Clarity), Stripe + Postmark integrations.
- Tech: React 19, TypeScript, Vite, Tailwind 4, Supabase, pgvector.

### Previews
Light, static-but-polished preview visuals per project (e.g. AWS architecture
diagram for WebModern, pipeline visual for ContentTool) — no heavy interactive
mockups like the existing ones, to keep the bundle small. Below-the-fold
previews are dynamically imported.

### Bio/hero copy
Minor updates where the new context warrants it (founder Refundely, AI-native
engineering approach). No structural hero changes beyond the background swap.

## 2. Performance

1. **Remove Three.js (~650KB):** replace `ShaderBackground` with a single
   Canvas 2D comet effect (see §3). Delete the `three` dependency.
2. **Lazy-load Leaflet maps:** IntersectionObserver + `next/dynamic`; maps only
   mount when scrolled near the viewport.
3. **Dynamic imports** for below-the-fold preview components
   (CrewVeeCRMPreview, RefundelyPreview, NaceSearchPreview, new previews).
4. **`next/image`** for raw `<img>` usage (ImageCompareSlider, project pages),
   with proper `sizes` to avoid CLS.
5. **Pause continuous animations off-screen:** TechStackMarquee and the hero
   canvas stop their RAF loops via IntersectionObserver and
   `visibilitychange`.
6. **Server components** where possible for static sections (footer, static
   page shells); keep interactive sections client-side.

## 3. Hero: comet effect with mouse follow

Replace the Three.js aurora shader with a dependency-free Canvas 2D effect:

- Comet-like streaks (short particle trails, additive blending via
  `globalCompositeOperation: 'lighter'`), low particle count (~40–60).
- Subtle pointer interaction: particles ease toward/parallax with the mouse
  position (lerped, sleek — Antigravity-style), never snapping.
- **Performance guards:** devicePixelRatio capped at 2; RAF paused when the
  hero is off-screen (IntersectionObserver) or the tab is hidden
  (`visibilitychange`); no pointer tracking on touch devices (gentle ambient
  drift instead); `prefers-reduced-motion` renders a static gradient instead.
- Visual language stays within the current dark/aurora palette.

## 4. UI refinement (within current style)

Audit with `redesign-existing-projects` + `high-end-visual-design` skills, then
targeted fixes:

- Consistent typography scale and spacing rhythm across sections.
- Contrast fixes (zinc-400 on black is borderline; ensure WCAG AA for body
  text).
- Hover/focus states on all interactive elements (keyboard focus visible).
- Mobile polish: nav, carousel touch behaviour, section padding.
- Uniform card system across all 7 project cards.

## 5. Verification

- `next build` passes.
- Visual check of every page in both NL and EN.
- Mobile breakpoint check (375px, 768px, 1280px).
- Confirm `three` removed from the bundle; spot-check bundle output.

## Out of scope

- Light mode, CMS-driven content, blog, structural redesign of the hero/layout.
