# Portfolio Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four new project case studies (WebModern Platform, ContentTool, Angular 21 SSR rebuild, LeadHub), replace the Three.js hero shader with a lightweight mouse-following comet canvas, lazy-load heavy components, and polish the UI within the existing dark style.

**Architecture:** A new shared `CaseStudyPage` component renders all new project pages from a typed bilingual content object (DRY — the existing pages duplicate ~600 lines each; new pages won't). The hero background becomes a dependency-free Canvas 2D effect. Heavy previews mount via a reusable `LazyMount` IntersectionObserver wrapper. All carousel/project copy lives in `lib/translations.ts` (existing pattern: EN + NL parallel objects).

**Tech Stack:** Next.js 16.1.6 (App Router), React 19, TypeScript 5, Tailwind CSS 4, Framer Motion, Canvas 2D (no Three.js after this plan).

**Verification model:** This repo has no test framework, and adding one for a content portfolio is YAGNI. Each task verifies with `npx tsc --noEmit` (fast type check) and the final task runs `npm run build` + a visual QA pass in both languages. Commit after every task.

**Spec:** `docs/superpowers/specs/2026-06-11-portfolio-update-design.md`

**Deliberate deviations from the spec (decided during planning):**
1. *"Server components where possible for static sections"* — dropped. Every section (including the footer) consumes the client-side `useLanguage` context; converting them requires reworking the language system around server-side cookie reads, a refactor with low payoff for the bundle size involved. Out of scope.
2. *Contrast fixes* — audit result: `zinc-400` on black measures ≈ 8:1, comfortably WCAG AA. No body-text contrast changes needed; UI polish narrows to keyboard focus states (Task 11) plus the visual QA pass (Task 12).
3. *Bio/hero copy updates* — hero copy already reflects the AI-native positioning; the new context lands in the marquee (Task 10) and project content instead. Hero text unchanged.

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `components/CometBackground.tsx` | Create | Canvas 2D comet hero background with mouse follow + perf guards |
| `components/ShaderBackground.tsx` | Delete | Old Three.js shader |
| `components/animated-shader-background.tsx` | Delete | Unused duplicate Three.js shader (AnoAI) |
| `components/LazyMount.tsx` | Create | IntersectionObserver mount-when-near-viewport wrapper |
| `components/case-study/CaseStudyPage.tsx` | Create | Shared case-study page layout (typed bilingual content) |
| `components/WebModernPreview.tsx` | Create | Static AWS architecture diagram preview |
| `components/ContentToolPreview.tsx` | Create | Static pipeline-log preview |
| `components/AdhocWebsitePreview.tsx` | Create | Static browser-mock preview |
| `components/LeadHubPreview.tsx` | Create | Static command-center dashboard preview |
| `app/projects/webmodern-platform/page.tsx` | Create | WebModern case study (content + CaseStudyPage) |
| `app/projects/contenttool/page.tsx` | Create | ContentTool case study |
| `app/projects/adhoc-website/page.tsx` | Create | Angular 21 SSR rebuild case study |
| `app/projects/leadhub/page.tsx` | Create | LeadHub case study |
| `components/ui/animated-hero.tsx` | Modify | Swap ShaderBackground → CometBackground |
| `components/FeaturedProjects.tsx` | Modify | Slug-based lazy preview map, new tech colors |
| `components/TechStackMarquee.tsx` | Modify | Pause RAF when off-screen, new tech colors |
| `components/ImageCompareSlider.tsx` | Modify | `<img>` → `next/image` |
| `app/projects/adhoc-selectietool/page.tsx` | Modify | Pass width/height to ImageCompareSlider |
| `lib/translations.ts` | Modify | 4 new carousel items (EN+NL), marquee tech list |
| `app/globals.css` | Modify | Global `:focus-visible` style |
| `package.json` | Modify | Remove `three`, `@types/three` |

Existing pages (refundely, crewvee-crm, adhoc-selectietool) are NOT migrated to CaseStudyPage — out of scope, they work.

---

### Task 1: Commit pre-existing line-ending normalization

The working tree has 18 modified files that are 100% CRLF↔LF line-ending changes (verified: `git diff --stat` shows insertions == deletions == 18,179, and per-file diffs show identical content). Commit them separately so later content diffs stay clean.

**Files:** all currently modified files (no content change).

- [ ] **Step 1: Verify nothing but line endings changed**

Run: `git diff --ignore-all-space --stat`
Expected: empty output (or only whitespace-level noise). If ANY file shows real content changes, STOP and report — do not proceed with a blanket commit.

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "chore: normalize line endings"
```

---

### Task 2: Comet hero background, remove Three.js

**Files:**
- Create: `components/CometBackground.tsx`
- Modify: `components/ui/animated-hero.tsx:6,39`
- Delete: `components/ShaderBackground.tsx`, `components/animated-shader-background.tsx`
- Modify: `package.json` (via npm uninstall)

- [ ] **Step 1: Create `components/CometBackground.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

type Comet = {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  hue: number;
  depth: number; // 0.3–1: scales glow and how strongly it follows the pointer
};

export function CometBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let comets: Comet[] = [];
    let rafId = 0;
    let running = false;
    let inView = true;

    // Pointer position is normalized (0–1) and lerped each frame for the
    // sleek trailing follow effect. Mouse only — touch gets ambient drift.
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: false };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnComets = () => {
      const count = width < 768 ? 26 : 48;
      comets = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.PI * 0.12 + (Math.random() - 0.5) * 0.4,
        speed: 0.4 + Math.random() * 1.1,
        size: 0.6 + Math.random() * 1.4,
        hue: 190 + Math.random() * 90, // cyan → violet, matches aurora palette
        depth: 0.3 + Math.random() * 0.7,
      }));
    };

    // Static fallback for prefers-reduced-motion: soft aurora-toned glows.
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < 6; i++) {
        const x = (i * 0.17 + 0.08) * width;
        const y = ((i % 3) * 0.28 + 0.22) * height;
        const g = ctx.createRadialGradient(x, y, 0, x, y, height * 0.35);
        g.addColorStop(0, `hsla(${195 + i * 15}, 85%, 65%, 0.08)`);
        g.addColorStop(1, "hsla(220, 85%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawFrame = () => {
      // Fade the previous frame instead of clearing — this is what creates
      // the comet tails. Higher alpha = shorter tails.
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.16)";
      ctx.fillRect(0, 0, width, height);

      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;

      ctx.globalCompositeOperation = "lighter";

      for (const c of comets) {
        if (pointer.active) {
          // Steer gently toward the pointer; wrap the angle difference to
          // [-PI, PI] so comets always turn the short way around.
          const dx = pointer.x * width - c.x;
          const dy = pointer.y * height - c.y;
          const target = Math.atan2(dy, dx);
          let diff = target - c.angle;
          diff = Math.atan2(Math.sin(diff), Math.cos(diff));
          c.angle += diff * 0.012 * c.depth;
        }

        c.x += Math.cos(c.angle) * c.speed;
        c.y += Math.sin(c.angle) * c.speed;

        if (c.x < -24) c.x = width + 24;
        else if (c.x > width + 24) c.x = -24;
        if (c.y < -24) c.y = height + 24;
        else if (c.y > height + 24) c.y = -24;

        const r = c.size * 6;
        const glow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r);
        glow.addColorStop(0, `hsla(${c.hue}, 90%, 75%, ${0.5 * c.depth})`);
        glow.addColorStop(1, `hsla(${c.hue}, 90%, 60%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      rafId = requestAnimationFrame(drawFrame);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    // Single gate for both visibility signals.
    const update = () => {
      if (inView && !document.hidden) start();
      else stop();
    };

    resize();
    spawnComets();
    if (reducedMotion) drawStatic();

    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) drawStatic();
    });
    ro.observe(parent);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(canvas);

    const onVisibility = () => update();
    document.addEventListener("visibilitychange", onVisibility);

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
      pointer.active = true;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    update();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 2: Swap the import in `components/ui/animated-hero.tsx`**

Replace line 6:
```tsx
import { ShaderBackground } from "@/components/ShaderBackground";
```
with:
```tsx
import { CometBackground } from "@/components/CometBackground";
```
Replace line 39 `<ShaderBackground />` with `<CometBackground />`.

- [ ] **Step 3: Delete old shader files and uninstall Three.js**

```bash
git rm components/ShaderBackground.tsx components/animated-shader-background.tsx
npm uninstall three @types/three
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Run: `Get-ChildItem -Recurse -Include *.tsx,*.ts app,components,lib | Select-String "three"` (or `grep -ri "from .three" app components lib`) — expected: no matches.

- [ ] **Step 5: Manual check (dev server)**

Run `npm run dev`, open http://localhost:3000. Expected: comets drift on the hero, curve subtly toward the mouse, hero text/buttons still clickable (canvas is pointer-events-none). Scroll the hero out of view → CPU drops (check via devtools performance monitor if in doubt).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: replace Three.js shader with lightweight comet canvas background"
```

---

### Task 3: LazyMount wrapper + pause marquee off-screen

**Files:**
- Create: `components/LazyMount.tsx`
- Modify: `components/TechStackMarquee.tsx`

- [ ] **Step 1: Create `components/LazyMount.tsx`**

```tsx
"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** How far outside the viewport mounting starts. */
  rootMargin?: string;
  className?: string;
}

/** Mounts children only once the wrapper scrolls near the viewport. */
export function LazyMount({
  children,
  rootMargin = "200px",
  className = "h-full w-full",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
```

- [ ] **Step 2: Pause the marquee when off-screen**

In `components/TechStackMarquee.tsx`:

Change line 4 to add `useInView`:
```tsx
import { motion, useMotionValue, useAnimationFrame, useInView } from "framer-motion";
```

After `const x = useMotionValue(0);` (line 37) add:
```tsx
const inView = useInView(containerRef, { margin: "100px" });
```

At the top of the `useAnimationFrame` callback (line 97), before the existing checks, add:
```tsx
if (!inView) return;
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/LazyMount.tsx components/TechStackMarquee.tsx
git commit -m "perf: add LazyMount wrapper and pause marquee animation off-screen"
```

---

### Task 4: ImageCompareSlider → next/image

**Files:**
- Modify: `components/ImageCompareSlider.tsx`
- Modify: `app/projects/adhoc-selectietool/page.tsx:638-646`

The slider's height derives from the "after" image's intrinsic aspect ratio, so the component needs explicit dimensions. `/projects/adhoc/After.jpg` is **1769×903**, `Before.jpg` is 1626×708 (the before image already renders with `object-contain` inside the clipped overlay, so only the after image's dimensions matter for layout).

- [ ] **Step 1: Update the component**

In `components/ImageCompareSlider.tsx`:

Add import at the top (after the framer-motion import):
```tsx
import Image from "next/image";
```

Extend the props interface:
```tsx
interface ImageCompareSliderProps {
  beforeImage: string;
  afterImage: string;
  /** Intrinsic dimensions of the AFTER image — it sets the container height. */
  width: number;
  height: number;
  beforeLabel?: string;
  afterLabel?: string;
  beforeAlt?: string;
  afterAlt?: string;
  dragHint?: string;
}
```
and add `width, height,` to the destructured params.

Replace the after `<img>` (lines 89–94) with:
```tsx
<Image
  src={afterImage}
  alt={afterAlt}
  width={width}
  height={height}
  sizes="(max-width: 896px) 100vw, 896px"
  className="w-full h-auto block"
  draggable={false}
/>
```

Replace the before `<img>` (lines 101–106) with:
```tsx
<Image
  src={beforeImage}
  alt={beforeAlt}
  fill
  sizes="(max-width: 896px) 100vw, 896px"
  className="object-contain"
  draggable={false}
/>
```

- [ ] **Step 2: Pass dimensions at the call site**

In `app/projects/adhoc-selectietool/page.tsx` (~line 638), add to the `<ImageCompareSlider>` props:
```tsx
width={1769}
height={903}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: open `/projects/adhoc-selectietool`, scroll to the before/after slider. Expected: identical layout, drag still works, images load via `/_next/image`.

- [ ] **Step 4: Commit**

```bash
git add components/ImageCompareSlider.tsx app/projects/adhoc-selectietool/page.tsx
git commit -m "perf: serve compare-slider images through next/image"
```

---

### Task 5: Shared CaseStudyPage component

**Files:**
- Create: `components/case-study/CaseStudyPage.tsx`

This mirrors the structure of `app/projects/refundely/page.tsx` (header → hero → preview → stats → overview → challenge → solution → features → results → footer CTA) but driven by a typed content object. Tailwind cannot resolve dynamically-built class names, so accent colors use explicit lookup maps.

- [ ] **Step 1: Create `components/case-study/CaseStudyPage.tsx`**

```tsx
"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ExternalLink, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/lib/language-context";

export type Accent =
  | "emerald"
  | "violet"
  | "sky"
  | "amber"
  | "orange"
  | "cyan"
  | "rose";

const accentText: Record<Accent, string> = {
  emerald: "text-emerald-400",
  violet: "text-violet-400",
  sky: "text-sky-400",
  amber: "text-amber-400",
  orange: "text-orange-400",
  cyan: "text-cyan-400",
  rose: "text-rose-400",
};

const accentBadge: Record<Accent, string> = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  sky: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  orange: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  rose: "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudySolutionPoint {
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface CaseStudyContent {
  backToProjects: string;
  title: string;
  subtitle: string;
  badge?: string;
  ctaLabel?: string;
  stats: CaseStudyStat[];
  overviewTitle: string;
  overviewText: string;
  challengeTitle: string;
  challengeText: string;
  solutionTitle: string;
  solutionPoints: CaseStudySolutionPoint[];
  featuresTitle: string;
  features: CaseStudyFeature[];
  resultsTitle: string;
  resultsPoints: string[];
}

export interface CaseStudyPageProps {
  accent: Accent;
  content: { en: CaseStudyContent; nl: CaseStudyContent };
  techStack: { name: string; color: string }[];
  preview: ReactNode;
  ctaHref?: string;
}

export function CaseStudyPage({
  accent,
  content,
  techStack,
  preview,
  ctaHref,
}: CaseStudyPageProps) {
  const { language } = useLanguage();
  const t = content[language];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToProjects}
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <h1 className="text-4xl md:text-5xl font-bold">{t.title}</h1>
              {t.badge ? (
                <span
                  className={`px-3 py-1 text-xs font-semibold border rounded-full ${accentBadge[accent]}`}
                >
                  {t.badge}
                </span>
              ) : null}
            </div>
            <p className="text-xl text-zinc-400 mb-6">{t.subtitle}</p>

            {ctaHref && t.ctaLabel ? (
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 mb-8 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
              >
                {t.ctaLabel}
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}

            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className={`px-3 py-1 text-sm font-medium rounded-full border ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl overflow-hidden border border-white/10 aspect-video relative"
          >
            {preview}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {t.stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-white/5 border border-white/10 rounded-xl text-center"
              >
                <div
                  className={`text-2xl md:text-3xl font-bold mb-1 ${accentText[accent]}`}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{t.overviewTitle}</h2>
            <p className="text-zinc-400 leading-relaxed">{t.overviewText}</p>
          </motion.div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{t.challengeTitle}</h2>
            <p className="text-zinc-400 leading-relaxed">{t.challengeText}</p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.solutionTitle}</h2>
            <div className="grid gap-6">
              {t.solutionPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-xl"
                >
                  <h3 className={`text-lg font-medium mb-2 ${accentText[accent]}`}>
                    {point.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {point.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white/5">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.featuresTitle}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-black/50 border border-white/10 rounded-xl"
                >
                  <feature.icon
                    className={`w-8 h-8 mb-4 ${accentText[accent]}`}
                  />
                  <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-8">{t.resultsTitle}</h2>
            <div className="grid gap-4">
              {t.resultsPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2
                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${accentText[accent]}`}
                  />
                  <p className="text-zinc-300">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.backToProjects}
          </Link>
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit` — expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/case-study/CaseStudyPage.tsx
git commit -m "feat: add shared CaseStudyPage component for project pages"
```

---

### Task 6: WebModern Platform case study (+ FeaturedProjects refactor)

**Files:**
- Create: `components/WebModernPreview.tsx`
- Create: `app/projects/webmodern-platform/page.tsx`
- Modify: `lib/translations.ts` (add item to `en.projects.items` and `nl.projects.items`)
- Modify: `components/FeaturedProjects.tsx` (slug-based lazy preview map + new tech colors)

- [ ] **Step 1: Create `components/WebModernPreview.tsx`**

A static AWS architecture diagram in the dark style. No animation, no deps.

```tsx
const flowSteps = [
  { label: "Browser", sub: "CMS upload", color: "border-sky-400/40 text-sky-300" },
  { label: "S3", sub: "private bucket", color: "border-amber-400/40 text-amber-300" },
  { label: "CloudFront", sub: "OAC only", color: "border-violet-400/40 text-violet-300" },
  { label: "Visitor", sub: "public URL", color: "border-emerald-400/40 text-emerald-300" },
];

const guarantees = [
  "IAM: PutObject only",
  "Secrets Manager",
  "eu-central-1",
];

export function WebModernPreview() {
  return (
    <div className="absolute inset-0 bg-[#0b1120] p-4 md:p-5 flex flex-col select-none">
      {/* Title bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] md:text-xs text-white/70">
          infra/webmodern-media-stack.ts
        </span>
        <span className="px-2 py-0.5 rounded-full border border-orange-400/40 bg-orange-400/10 text-orange-300 text-[9px] md:text-[10px] font-semibold tracking-wide">
          AWS CDK
        </span>
      </div>

      {/* Flow diagram */}
      <div className="flex-1 flex items-center">
        <div className="w-full flex items-center justify-between gap-1 md:gap-2">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              <div
                className={`flex-1 min-w-0 rounded-lg border bg-white/[0.04] px-2 py-2 md:px-3 md:py-3 text-center ${step.color}`}
              >
                <div className="text-[10px] md:text-xs font-semibold truncate">
                  {step.label}
                </div>
                <div className="text-[8px] md:text-[10px] text-zinc-500 truncate">
                  {step.sub}
                </div>
              </div>
              {i < flowSteps.length - 1 ? (
                <div className="px-1 md:px-1.5 text-zinc-600 text-[10px] md:text-xs flex-shrink-0">
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Annotations */}
      <div className="flex items-center justify-between mt-4">
        <div className="font-mono text-[8px] md:text-[9px] text-zinc-500">
          presigned PUT · no credentials in browser
        </div>
        <div className="flex gap-1.5">
          {guarantees.map((g) => (
            <span
              key={g}
              className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-zinc-400 text-[8px] md:text-[9px] whitespace-nowrap"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/projects/webmodern-platform/page.tsx`**

```tsx
"use client";

import {
  Cloud,
  Lock,
  Upload,
  Package,
  GitFork,
  Pencil,
} from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { WebModernPreview } from "@/components/WebModernPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "WebModern Platform",
    subtitle:
      "Multi-tenant CMS with a security-hardened AWS media pipeline for Dutch SMB websites",
    badge: "SaaS Platform",
    stats: [
      { value: "0", label: "Public S3 access" },
      { value: "1", label: "IAM permission (PutObject)" },
      { value: "100%", label: "Infra as code (CDK)" },
      { value: "v0.4", label: "SDK on npm" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "WebModern Platform lets non-technical small business owners edit the content of their custom-designed websites without touching code. An admin dashboard (cms.webmodern.nl) connects to a network of client sites that fetch and render content in real time. Every client site is its own repository forked from a shared template, while a published npm SDK (@webmodern/cms-sdk) keeps all sites compatible with the CMS backend.",
    challengeTitle: "The Challenge",
    challengeText:
      "Client image uploads needed to be fast, cheap, and above all secure: no AWS credentials in the browser, no publicly readable storage, and no shared failure modes between client sites. At the same time, each client needed full design freedom and isolated deployments — a classic multi-tenancy trade-off that a dynamic site router would not solve cleanly.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Private-by-default AWS media pipeline",
        description:
          "Built with AWS CDK (TypeScript): a fully private S3 bucket that blocks all public access, fronted by CloudFront with Origin Access Control as the only entity allowed to read it. The CDN is the single public endpoint for every image URL. Deployed to eu-central-1, reproducible from code.",
      },
      {
        title: "Presigned uploads, least-privilege IAM",
        description:
          "The CMS generates temporary presigned PUT URLs so the browser uploads directly to S3 — credentials never leave the server. The uploader IAM user has exactly one permission: s3:PutObject on the sites/* prefix. It cannot read, delete, or modify anything. Its secret key lives in AWS Secrets Manager.",
      },
      {
        title: "SDK-first architecture",
        description:
          "A published npm package (@webmodern/cms-sdk) is the single contract between the CMS, the site template, and every forked client site. Editable content flows through <Editable> and <EditableImage> components keyed by (siteId, blockId), with mandatory canonical blocks enforced at build time.",
      },
      {
        title: "Visual editing with realtime preview",
        description:
          "Client sites load inside the CMS in an iframe with ?edit=1, activating a visual editor overlay. Changes broadcast to the preview over Supabase Realtime channels per site. Clients mark accent words with *asterisks* — the site controls the styling, the client only marks the words.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Cloud,
        title: "S3 + CloudFront OAC",
        description:
          "Private bucket, CDN-only reads — a textbook secure media setup",
      },
      {
        icon: Lock,
        title: "Least-Privilege IAM",
        description:
          "Single PutObject permission, secrets in AWS Secrets Manager",
      },
      {
        icon: Upload,
        title: "Presigned Uploads",
        description:
          "Browser uploads straight to S3 without exposing credentials",
      },
      {
        icon: GitFork,
        title: "Fork-per-Client",
        description:
          "Every client site is an isolated repo with its own deploys",
      },
      {
        icon: Package,
        title: "npm SDK",
        description:
          "@webmodern/cms-sdk: one stable contract for all client sites",
      },
      {
        icon: Pencil,
        title: "Visual Editor",
        description:
          "Iframe edit mode with instant preview via Supabase Realtime",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Image upload pipeline live in production — presigned flow verified end-to-end",
      "Zero AWS credentials in the browser, zero public bucket access",
      "Entire infrastructure reproducible from a single CDK stack",
      "Clients edit content with magic-link login — no passwords, no code",
      "Complete deploy isolation: one client's issue never affects another",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "WebModern Platform",
    subtitle:
      "Multi-tenant CMS met een security-hardened AWS media pipeline voor Nederlandse MKB-websites",
    badge: "SaaS Platform",
    stats: [
      { value: "0", label: "Publieke S3-toegang" },
      { value: "1", label: "IAM-permissie (PutObject)" },
      { value: "100%", label: "Infra as code (CDK)" },
      { value: "v0.4", label: "SDK op npm" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "Met WebModern Platform kunnen niet-technische ondernemers de content van hun op maat ontworpen website aanpassen zonder code aan te raken. Een admin dashboard (cms.webmodern.nl) is verbonden met een netwerk van klantsites die content realtime ophalen en renderen. Elke klantsite is een eigen repository, geforkt vanaf een gedeeld template, terwijl een gepubliceerde npm SDK (@webmodern/cms-sdk) alle sites compatibel houdt met de CMS-backend.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Afbeeldingen uploaden moest snel, goedkoop en vooral veilig: geen AWS-credentials in de browser, geen publiek leesbare storage, en geen gedeelde failure modes tussen klantsites. Tegelijkertijd had elke klant volledige designvrijheid en geïsoleerde deployments nodig — een klassieke multi-tenancy afweging die een dynamische site-router niet netjes oplost.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Private-by-default AWS media pipeline",
        description:
          "Gebouwd met AWS CDK (TypeScript): een volledig private S3-bucket die alle publieke toegang blokkeert, met CloudFront via Origin Access Control als enige partij die mag lezen. De CDN is het enige publieke endpoint voor elke afbeeldings-URL. Gedeployed naar eu-central-1, reproduceerbaar vanuit code.",
      },
      {
        title: "Presigned uploads, least-privilege IAM",
        description:
          "Het CMS genereert tijdelijke presigned PUT URLs zodat de browser direct naar S3 uploadt — credentials verlaten de server nooit. De uploader IAM-user heeft precies één permissie: s3:PutObject op het sites/* prefix. Lezen, verwijderen of aanpassen kan niet. De secret key staat in AWS Secrets Manager.",
      },
      {
        title: "SDK-first architectuur",
        description:
          "Een gepubliceerd npm-package (@webmodern/cms-sdk) is hét contract tussen het CMS, het site-template en elke geforkte klantsite. Bewerkbare content loopt via <Editable> en <EditableImage> componenten op basis van (siteId, blockId), met verplichte canonical blocks die bij build-time worden afgedwongen.",
      },
      {
        title: "Visueel bewerken met realtime preview",
        description:
          "Klantsites laden in het CMS in een iframe met ?edit=1, wat een visuele editor-overlay activeert. Wijzigingen worden via Supabase Realtime channels per site naar de preview gebroadcast. Klanten markeren accentwoorden met *sterretjes* — de site bepaalt de styling, de klant alleen de woorden.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Cloud,
        title: "S3 + CloudFront OAC",
        description:
          "Private bucket, alleen CDN-reads — een schoolvoorbeeld van veilige media",
      },
      {
        icon: Lock,
        title: "Least-Privilege IAM",
        description:
          "Eén PutObject-permissie, secrets in AWS Secrets Manager",
      },
      {
        icon: Upload,
        title: "Presigned Uploads",
        description:
          "Browser uploadt direct naar S3 zonder credentials bloot te stellen",
      },
      {
        icon: GitFork,
        title: "Fork-per-Klant",
        description:
          "Elke klantsite is een geïsoleerde repo met eigen deploys",
      },
      {
        icon: Package,
        title: "npm SDK",
        description:
          "@webmodern/cms-sdk: één stabiel contract voor alle klantsites",
      },
      {
        icon: Pencil,
        title: "Visuele Editor",
        description:
          "Iframe edit-modus met directe preview via Supabase Realtime",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Image upload pipeline live in productie — presigned flow end-to-end geverifieerd",
      "Nul AWS-credentials in de browser, nul publieke bucket-toegang",
      "Volledige infrastructuur reproduceerbaar vanuit één CDK-stack",
      "Klanten bewerken content met magic-link login — geen wachtwoorden, geen code",
      "Volledige deploy-isolatie: een probleem bij één klant raakt nooit een andere",
    ],
  },
};

const techStack = [
  { name: "Next.js 16", color: "bg-white/15 text-zinc-200 border-white/20" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "AWS CDK", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "S3", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { name: "CloudFront", color: "bg-violet-500/20 text-violet-300 border-violet-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Drizzle", color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
];

export default function WebModernPlatformPage() {
  return (
    <CaseStudyPage
      accent="orange"
      content={content}
      techStack={techStack}
      preview={<WebModernPreview />}
    />
  );
}
```

- [ ] **Step 3: Add the carousel item to `lib/translations.ts`**

Append to `en.projects.items` (after the `adhoc-selectietool` item):

```ts
{
  slug: "webmodern-platform",
  title: "WebModern Platform",
  description:
    "Multi-tenant CMS that lets non-technical business owners edit their custom websites. Built on a security-hardened AWS media pipeline: a fully private S3 bucket behind CloudFront Origin Access Control, presigned browser uploads, and least-privilege IAM — all defined as code with AWS CDK. A published npm SDK keeps every forked client site compatible.",
  techStack: ["Next.js", "TypeScript", "AWS CDK", "S3", "CloudFront", "Supabase", "Drizzle"],
},
```

Append to `nl.projects.items` (same position):

```ts
{
  slug: "webmodern-platform",
  title: "WebModern Platform",
  description:
    "Multi-tenant CMS waarmee niet-technische ondernemers hun op maat gemaakte website zelf bewerken. Gebouwd op een security-hardened AWS media pipeline: een volledig private S3-bucket achter CloudFront Origin Access Control, presigned browser-uploads en least-privilege IAM — volledig als code gedefinieerd met AWS CDK. Een gepubliceerde npm SDK houdt elke geforkte klantsite compatibel.",
  techStack: ["Next.js", "TypeScript", "AWS CDK", "S3", "CloudFront", "Supabase", "Drizzle"],
},
```

- [ ] **Step 4: Refactor `components/FeaturedProjects.tsx` to a slug-based lazy preview map**

Replace lines 8–10 (the three preview imports) with:

```tsx
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { LazyMount } from "./LazyMount";

const RefundelyPreview = dynamic(() =>
  import("./RefundelyPreview").then((m) => ({ default: m.RefundelyPreview }))
);
const CrewVeeCRMPreview = dynamic(() =>
  import("./CrewVeeCRMPreview").then((m) => ({ default: m.CrewVeeCRMPreview }))
);
const BelgiumMapPreview = dynamic(() =>
  import("./BelgiumMapPreview").then((m) => ({ default: m.BelgiumMapPreview }))
);
const WebModernPreview = dynamic(() =>
  import("./WebModernPreview").then((m) => ({ default: m.WebModernPreview }))
);

const previews: Record<string, ComponentType> = {
  refundely: RefundelyPreview,
  "crewvee-crm": CrewVeeCRMPreview,
  "adhoc-selectietool": BelgiumMapPreview,
  "webmodern-platform": WebModernPreview,
};
```

Replace the `getPreview` function (lines 37–42) with:

```tsx
function getPreview(slug: string) {
  const Preview = previews[slug];
  if (!Preview) return null;
  return (
    <LazyMount rootMargin="300px">
      <Preview />
    </LazyMount>
  );
}
```

Change the call site (line 173) from `{getPreview(index)}` to `{getPreview(project.slug)}`.

Add to the `techColors` map (after the existing entries):

```ts
"Next.js": "bg-white/15 text-zinc-200 border-white/20",
"AWS CDK": "bg-orange-500/20 text-orange-300 border-orange-500/30",
"S3": "bg-amber-500/20 text-amber-300 border-amber-500/30",
"CloudFront": "bg-violet-500/20 text-violet-300 border-violet-500/30",
"Drizzle": "bg-lime-500/20 text-lime-300 border-lime-500/30",
"Python": "bg-sky-600/20 text-sky-300 border-sky-600/30",
"FastAPI": "bg-teal-500/20 text-teal-300 border-teal-500/30",
"SvelteKit": "bg-orange-600/20 text-orange-300 border-orange-600/30",
"Gemini": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
"GitHub Actions": "bg-blue-400/20 text-blue-300 border-blue-400/30",
"Angular 21": "bg-red-500/20 text-red-300 border-red-500/30",
"SSR": "bg-zinc-400/20 text-zinc-300 border-zinc-400/30",
"Playwright": "bg-green-600/20 text-green-300 border-green-600/30",
"pgvector": "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
"Stripe": "bg-purple-600/20 text-purple-300 border-purple-600/30",
"HubSpot": "bg-orange-500/20 text-orange-300 border-orange-500/30",
```

(The colors for projects added in Tasks 7–9 are included here once so later tasks only touch translations + their own files.)

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: homepage carousel shows 4 cards; `/projects/webmodern-platform` renders in both NL and EN (toggle the language switcher).

- [ ] **Step 6: Commit**

```bash
git add components/WebModernPreview.tsx app/projects/webmodern-platform components/FeaturedProjects.tsx lib/translations.ts
git commit -m "feat: add WebModern Platform AWS case study and lazy slug-based previews"
```

---

### Task 7: ContentTool case study

**Files:**
- Create: `components/ContentToolPreview.tsx`
- Create: `app/projects/contenttool/page.tsx`
- Modify: `lib/translations.ts`
- Modify: `components/FeaturedProjects.tsx` (one dynamic import + one map entry)

- [ ] **Step 1: Create `components/ContentToolPreview.tsx`**

A pipeline-log visual styled like a CI run.

```tsx
const steps = [
  { status: "done", label: "scrape 14 industry sources", meta: "httpx · playwright" },
  { status: "done", label: "score 38 inspiration items", meta: "gemini" },
  { status: "done", label: "match CBS open-data statistics", meta: "angles + hooks" },
  { status: "active", label: "draft 3 social posts + 1 blog", meta: "gemini" },
  { status: "todo", label: "schedule on content calendar", meta: "weekly cadence" },
];

export function ContentToolPreview() {
  return (
    <div className="absolute inset-0 bg-[#0d1117] p-4 md:p-5 flex flex-col font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] md:text-xs text-white/70">
            contenttool · daily pipeline
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-[9px] md:text-[10px] font-semibold">
          GitHub Actions cron
        </span>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center gap-1.5 md:gap-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 md:gap-3">
            <span
              className={`text-[10px] md:text-xs w-3 text-center flex-shrink-0 ${
                step.status === "done"
                  ? "text-emerald-400"
                  : step.status === "active"
                    ? "text-amber-400"
                    : "text-zinc-600"
              }`}
            >
              {step.status === "done" ? "✓" : step.status === "active" ? "›" : "·"}
            </span>
            <span
              className={`text-[9px] md:text-[11px] truncate ${
                step.status === "todo" ? "text-zinc-600" : "text-zinc-300"
              }`}
            >
              {step.label}
            </span>
            <span className="ml-auto text-[8px] md:text-[9px] text-zinc-600 flex-shrink-0">
              {step.meta}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-[8px] md:text-[9px] text-zinc-600">
        <span>python 3.12 · fastapi · sqlalchemy</span>
        <span>sveltekit dashboard</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/projects/contenttool/page.tsx`**

```tsx
"use client";

import { Bot, Rss, BarChart3, CalendarDays, Mail, Workflow } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { ContentToolPreview } from "@/components/ContentToolPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "ContentTool",
    subtitle:
      "Agentic AI content engine that plans, writes, and schedules a company's full marketing cadence",
    badge: "Internal Tool",
    stats: [
      { value: "3/wk", label: "Social posts" },
      { value: "1/wk", label: "Blog article" },
      { value: "1/mo", label: "Newsletter" },
      { value: "Daily", label: "Scrape & score run" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "ContentTool is a full-stack agentic system I built at Ad Hoc Data to run the company's content marketing on autopilot. Every day it scrapes industry sources into an inspiration pool, scores each item with Gemini, enriches promising angles with CBS open-data statistics, and drafts posts onto a content calendar — three social posts a week, a weekly blog, and a monthly newsletter.",
    challengeTitle: "The Challenge",
    challengeText:
      "Consistent, relevant B2B content takes hours of recurring manual work: finding inspiration, validating it against real data, writing in the company's voice, and keeping a steady cadence. Generic AI writing tools produce generic output because they lack the company's data context. The system needed to generate content that is grounded in actual market statistics and runs without anyone remembering to trigger it.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Daily scrape-and-score pipeline",
        description:
          "A GitHub Actions cron triggers the daily run: httpx, BeautifulSoup and feedparser collect from industry sources (Playwright handles JS-rendered pages), then Gemini scores every item for relevance and freshness before it enters the inspiration pool.",
      },
      {
        title: "Data-grounded drafting",
        description:
          "Promising inspiration is matched against CBS open-data statistics, so generated angles and hooks reference real numbers instead of generic claims. Gemini drafts the posts; the content calendar enforces the publishing cadence.",
      },
      {
        title: "FastAPI backend, SvelteKit dashboard",
        description:
          "Python 3.12 with FastAPI and SQLAlchemy 2.0 (Alembic migrations) powers the pipeline; a typed SvelteKit + Tailwind dashboard gives the marketing team review-and-edit control before anything ships.",
      },
      {
        title: "Newsletter delivery via Brevo",
        description:
          "The monthly newsletter is assembled from the month's best-performing content and delivered through Brevo — the whole loop from inspiration to inbox is automated.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Rss,
        title: "Daily Scraping",
        description: "httpx + BeautifulSoup + Playwright for JS-heavy sources",
      },
      {
        icon: BarChart3,
        title: "Gemini Scoring",
        description: "Every inspiration item scored for relevance before use",
      },
      {
        icon: Bot,
        title: "Agentic Drafting",
        description: "Angles, hooks, and full drafts generated from scored input",
      },
      {
        icon: CalendarDays,
        title: "Content Calendar",
        description: "Steady cadence: 3 socials, weekly blog, monthly newsletter",
      },
      {
        icon: Workflow,
        title: "CI-Driven",
        description: "GitHub Actions cron runs migrate → seed → scrape → score",
      },
      {
        icon: Mail,
        title: "Brevo Delivery",
        description: "Automated newsletter assembly and sending",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Live and operational for Ad Hoc Data's marketing",
      "Full weekly content cadence maintained without manual planning",
      "Content grounded in CBS statistics instead of generic AI claims",
      "Human review built in: the team approves drafts from the dashboard",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "ContentTool",
    subtitle:
      "Agentic AI content engine die de volledige marketingcadans van een bedrijf plant, schrijft en inplant",
    badge: "Internal Tool",
    stats: [
      { value: "3/wk", label: "Social posts" },
      { value: "1/wk", label: "Blogartikel" },
      { value: "1/mnd", label: "Nieuwsbrief" },
      { value: "Dagelijks", label: "Scrape & score run" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "ContentTool is een full-stack agentic systeem dat ik bij Ad Hoc Data bouwde om de contentmarketing op de automatische piloot te laten draaien. Elke dag scrapet het industriebronnen naar een inspiratiepool, scoort elk item met Gemini, verrijkt kansrijke invalshoeken met CBS open data, en zet concepten op een contentkalender — drie social posts per week, een wekelijkse blog en een maandelijkse nieuwsbrief.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Consistente, relevante B2B-content kost uren terugkerend handwerk: inspiratie vinden, toetsen aan echte data, schrijven in de tone of voice van het bedrijf, en een vast ritme aanhouden. Generieke AI-schrijftools leveren generieke output omdat ze de datacontext van het bedrijf missen. Het systeem moest content genereren die is onderbouwd met echte marktstatistieken en draaien zonder dat iemand eraan hoeft te denken.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Dagelijkse scrape-en-score pipeline",
        description:
          "Een GitHub Actions cron start de dagelijkse run: httpx, BeautifulSoup en feedparser verzamelen uit industriebronnen (Playwright voor JS-gerenderde pagina's), waarna Gemini elk item scoort op relevantie en versheid voordat het de inspiratiepool in gaat.",
      },
      {
        title: "Data-onderbouwd schrijven",
        description:
          "Kansrijke inspiratie wordt gematcht met CBS open-datastatistieken, zodat gegenereerde invalshoeken en hooks naar echte cijfers verwijzen in plaats van generieke claims. Gemini schrijft de concepten; de contentkalender bewaakt de publicatiecadans.",
      },
      {
        title: "FastAPI backend, SvelteKit dashboard",
        description:
          "Python 3.12 met FastAPI en SQLAlchemy 2.0 (Alembic-migraties) drijft de pipeline aan; een getypeerd SvelteKit + Tailwind dashboard geeft het marketingteam review- en bewerkcontrole voordat iets live gaat.",
      },
      {
        title: "Nieuwsbrief via Brevo",
        description:
          "De maandelijkse nieuwsbrief wordt samengesteld uit de best presterende content van die maand en verstuurd via Brevo — de hele loop van inspiratie tot inbox is geautomatiseerd.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Rss,
        title: "Dagelijks Scrapen",
        description: "httpx + BeautifulSoup + Playwright voor JS-zware bronnen",
      },
      {
        icon: BarChart3,
        title: "Gemini Scoring",
        description: "Elk inspiratie-item gescoord op relevantie vóór gebruik",
      },
      {
        icon: Bot,
        title: "Agentic Schrijven",
        description: "Invalshoeken, hooks en volledige concepten uit gescoorde input",
      },
      {
        icon: CalendarDays,
        title: "Contentkalender",
        description: "Vast ritme: 3 socials, wekelijkse blog, maandelijkse nieuwsbrief",
      },
      {
        icon: Workflow,
        title: "CI-Gedreven",
        description: "GitHub Actions cron draait migrate → seed → scrape → score",
      },
      {
        icon: Mail,
        title: "Brevo Verzending",
        description: "Geautomatiseerde samenstelling en verzending van de nieuwsbrief",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Live en operationeel voor de marketing van Ad Hoc Data",
      "Volledige wekelijkse contentcadans zonder handmatige planning",
      "Content onderbouwd met CBS-statistieken in plaats van generieke AI-claims",
      "Menselijke review ingebouwd: het team keurt concepten goed vanuit het dashboard",
    ],
  },
};

const techStack = [
  { name: "Python", color: "bg-sky-600/20 text-sky-300 border-sky-600/30" },
  { name: "FastAPI", color: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  { name: "SvelteKit", color: "bg-orange-600/20 text-orange-300 border-orange-600/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Gemini", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30" },
  { name: "GitHub Actions", color: "bg-blue-400/20 text-blue-300 border-blue-400/30" },
];

export default function ContentToolPage() {
  return (
    <CaseStudyPage
      accent="sky"
      content={content}
      techStack={techStack}
      preview={<ContentToolPreview />}
    />
  );
}
```

- [ ] **Step 3: Add the carousel item to `lib/translations.ts`**

Append to `en.projects.items`:

```ts
{
  slug: "contenttool",
  title: "ContentTool",
  description:
    "Agentic AI content engine built for Ad Hoc Data's marketing: a daily GitHub Actions pipeline scrapes industry sources, scores inspiration with Gemini, matches it against CBS open-data statistics, and drafts a full content calendar — three social posts a week, a weekly blog, and a monthly newsletter.",
  techStack: ["Python", "FastAPI", "SvelteKit", "TypeScript", "Gemini", "GitHub Actions"],
},
```

Append to `nl.projects.items`:

```ts
{
  slug: "contenttool",
  title: "ContentTool",
  description:
    "Agentic AI content engine gebouwd voor de marketing van Ad Hoc Data: een dagelijkse GitHub Actions pipeline scrapet industriebronnen, scoort inspiratie met Gemini, matcht met CBS open data, en vult een complete contentkalender — drie social posts per week, een wekelijkse blog en een maandelijkse nieuwsbrief.",
  techStack: ["Python", "FastAPI", "SvelteKit", "TypeScript", "Gemini", "GitHub Actions"],
},
```

- [ ] **Step 4: Register the preview in `components/FeaturedProjects.tsx`**

Add below the `WebModernPreview` dynamic import:

```tsx
const ContentToolPreview = dynamic(() =>
  import("./ContentToolPreview").then((m) => ({ default: m.ContentToolPreview }))
);
```

Add to the `previews` map:

```tsx
contenttool: ContentToolPreview,
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: `/projects/contenttool` renders NL + EN; carousel shows 5 cards.

- [ ] **Step 6: Commit**

```bash
git add components/ContentToolPreview.tsx app/projects/contenttool components/FeaturedProjects.tsx lib/translations.ts
git commit -m "feat: add ContentTool case study"
```

---

### Task 8: Angular 21 SSR rebuild case study

**Files:**
- Create: `components/AdhocWebsitePreview.tsx`
- Create: `app/projects/adhoc-website/page.tsx`
- Modify: `lib/translations.ts`
- Modify: `components/FeaturedProjects.tsx`

- [ ] **Step 1: Create `components/AdhocWebsitePreview.tsx`**

Browser-chrome mock of the rebuilt marketing site.

```tsx
export function AdhocWebsitePreview() {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col select-none">
      {/* Browser chrome */}
      <div className="bg-[#1e1e24] px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1.5">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-white/10 rounded text-[9px] text-white/40 px-3 py-0.5 text-center font-mono max-w-[200px] mx-auto">
          adhocdata.nl
        </div>
        <span className="px-1.5 py-0.5 rounded border border-red-400/40 text-red-300 text-[8px] font-semibold">
          Angular 21 SSR
        </span>
      </div>

      {/* Site mock */}
      <div className="flex-1 bg-white flex flex-col min-h-0">
        {/* Nav */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-100 flex-shrink-0">
          <span className="text-[10px] font-bold text-zinc-800">
            Ad Hoc <span className="text-blue-600">Data</span>
          </span>
          <div className="flex gap-3">
            {["Data", "Sectoren", "Prijzen", "Contact"].map((item) => (
              <span key={item} className="text-[8px] text-zinc-500 font-medium">
                {item}
              </span>
            ))}
            <span className="text-[8px] px-1.5 rounded bg-zinc-100 text-zinc-500 font-semibold">
              NL · EN
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="text-[13px] md:text-base font-bold text-zinc-900 leading-tight">
            B2B leadlijsten op maat
          </div>
          <div className="text-[8px] md:text-[9px] text-zinc-400 mt-1 max-w-[260px]">
            Live search door de volledige SBI-2025 taxonomie
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[8px] px-2.5 py-1 rounded-full bg-blue-600 text-white font-semibold">
              Start selectie
            </span>
            <span className="text-[8px] px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-500 font-semibold">
              Bekijk sectoren
            </span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-zinc-100 px-4 py-2 grid grid-cols-4 gap-2 flex-shrink-0">
          {[
            { v: "137", l: "components" },
            { v: "50+", l: "routes" },
            { v: "10", l: "viewports tested" },
            { v: "SSR", l: "+ hreflang SEO" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-[10px] font-bold text-zinc-800">{s.v}</div>
              <div className="text-[7px] text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/projects/adhoc-website/page.tsx`**

```tsx
"use client";

import { Server, Search, Globe, Gauge, Map, FlaskConical } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { AdhocWebsitePreview } from "@/components/AdhocWebsitePreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "Ad Hoc Data Website",
    subtitle:
      "Full rewrite of a legacy AngularJS marketing site to Angular 21 with server-side rendering",
    badge: "Production Rebuild",
    stats: [
      { value: "137", label: "Components" },
      { value: "50+", label: "Routes" },
      { value: "2", label: "Languages (hreflang)" },
      { value: "10", label: "Viewports tested" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "Ad Hoc Data's marketing website ran on legacy AngularJS — unmaintainable, slow, and invisible to modern SEO. I rebuilt it from scratch as an Angular 21 application with server-side rendering: 137 components across 50+ routes, a custom design system, full Dutch/English localization, and live search across the complete SBI-2025 industry taxonomy.",
    challengeTitle: "The Challenge",
    challengeText:
      "The legacy site rendered everything client-side, so search engines saw empty pages and Core Web Vitals suffered. The rebuild had to ship a modern stack without losing existing rankings: correct hreflang pairs for NL/EN, structured data, canonical tags, and image optimization — while also adding product features like live industry search and geographic filtering by province and postcode.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Angular 21 with SSR",
        description:
          "A Node/Express SSR server renders every route server-side for crawlers and first paint, with Angular hydrating on the client. Drizzle ORM on PostgreSQL backs the dynamic content.",
      },
      {
        title: "SEO architecture",
        description:
          "Dual-language NL/EN with hreflang tags, JSON-LD structured data with deduplication, Open Graph metadata, and canonical tags on every route. Sharp generates optimized WebP images at build time.",
      },
      {
        title: "Live search across SBI-2025",
        description:
          "Visitors search the full SBI-2025 industry taxonomy with instant results, plus location filtering by province and postcode — the marketing site doubles as a product entry point.",
      },
      {
        title: "Own design system + motion",
        description:
          "A custom component library with consistent tokens, and IntersectionObserver-driven animation directives that only animate elements as they enter the viewport.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Server,
        title: "Server-Side Rendering",
        description: "Node/Express SSR for crawlable pages and fast first paint",
      },
      {
        icon: Globe,
        title: "NL/EN Localization",
        description: "Full dual-language routing with hreflang pairs",
      },
      {
        icon: Search,
        title: "Live SBI Search",
        description: "Instant search across the SBI-2025 industry taxonomy",
      },
      {
        icon: Map,
        title: "MapLibre Maps",
        description: "Province and postcode-based location filtering",
      },
      {
        icon: Gauge,
        title: "WebP Optimization",
        description: "Sharp-generated responsive images at build time",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Automated checks across 10 viewport sizes",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "Legacy AngularJS fully replaced by a maintainable Angular 21 SSR codebase",
      "Every route server-rendered and indexable, with structured data and hreflang",
      "137 components and 50+ routes built on a single custom design system",
      "Regression safety through Playwright tests across 10 viewports",
      "Deployed on Railway with a PostgreSQL + Drizzle backend",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "Ad Hoc Data Website",
    subtitle:
      "Volledige rewrite van een legacy AngularJS marketingsite naar Angular 21 met server-side rendering",
    badge: "Production Rebuild",
    stats: [
      { value: "137", label: "Componenten" },
      { value: "50+", label: "Routes" },
      { value: "2", label: "Talen (hreflang)" },
      { value: "10", label: "Geteste viewports" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "De marketingwebsite van Ad Hoc Data draaide op legacy AngularJS — niet te onderhouden, traag en onzichtbaar voor moderne SEO. Ik bouwde hem vanaf nul opnieuw als Angular 21-applicatie met server-side rendering: 137 componenten over 50+ routes, een eigen design system, volledige NL/EN-lokalisatie en live search door de complete SBI-2025 bedrijfstakkenstructuur.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "De oude site renderde alles client-side, waardoor zoekmachines lege pagina's zagen en de Core Web Vitals leden. De rebuild moest een moderne stack opleveren zonder bestaande rankings te verliezen: correcte hreflang-paren voor NL/EN, structured data, canonical tags en afbeeldingsoptimalisatie — en tegelijk productfeatures toevoegen zoals live branchezoeken en geografisch filteren op provincie en postcode.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Angular 21 met SSR",
        description:
          "Een Node/Express SSR-server rendert elke route server-side voor crawlers en first paint, waarna Angular hydrateert op de client. Drizzle ORM op PostgreSQL ondersteunt de dynamische content.",
      },
      {
        title: "SEO-architectuur",
        description:
          "Tweetalig NL/EN met hreflang-tags, JSON-LD structured data met deduplicatie, Open Graph-metadata en canonical tags op elke route. Sharp genereert geoptimaliseerde WebP-afbeeldingen tijdens de build.",
      },
      {
        title: "Live search door SBI-2025",
        description:
          "Bezoekers doorzoeken de volledige SBI-2025 bedrijfstakkenstructuur met directe resultaten, plus locatiefilters op provincie en postcode — de marketingsite is meteen een product-instappunt.",
      },
      {
        title: "Eigen design system + motion",
        description:
          "Een eigen componentenbibliotheek met consistente tokens, en IntersectionObserver-gedreven animatiedirectives die elementen pas animeren zodra ze in beeld komen.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Server,
        title: "Server-Side Rendering",
        description: "Node/Express SSR voor crawlbare pagina's en snelle first paint",
      },
      {
        icon: Globe,
        title: "NL/EN Lokalisatie",
        description: "Volledig tweetalige routing met hreflang-paren",
      },
      {
        icon: Search,
        title: "Live SBI Search",
        description: "Direct zoeken door de SBI-2025 bedrijfstakkenstructuur",
      },
      {
        icon: Map,
        title: "MapLibre Kaarten",
        description: "Locatiefilters op provincie en postcode",
      },
      {
        icon: Gauge,
        title: "WebP Optimalisatie",
        description: "Door Sharp gegenereerde responsive afbeeldingen bij de build",
      },
      {
        icon: FlaskConical,
        title: "Playwright Testing",
        description: "Geautomatiseerde checks op 10 viewport-formaten",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "Legacy AngularJS volledig vervangen door een onderhoudbare Angular 21 SSR-codebase",
      "Elke route server-gerenderd en indexeerbaar, met structured data en hreflang",
      "137 componenten en 50+ routes op één eigen design system",
      "Regressieveiligheid door Playwright-tests op 10 viewports",
      "Gedeployed op Railway met een PostgreSQL + Drizzle backend",
    ],
  },
};

const techStack = [
  { name: "Angular 21", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  { name: "SSR", color: "bg-zinc-400/20 text-zinc-300 border-zinc-400/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "PostgreSQL", color: "bg-blue-600/20 text-blue-300 border-blue-600/30" },
  { name: "Drizzle", color: "bg-lime-500/20 text-lime-300 border-lime-500/30" },
  { name: "MapLibre", color: "bg-sky-500/20 text-sky-300 border-sky-500/30" },
  { name: "Playwright", color: "bg-green-600/20 text-green-300 border-green-600/30" },
];

export default function AdhocWebsitePage() {
  return (
    <CaseStudyPage
      accent="rose"
      content={content}
      techStack={techStack}
      preview={<AdhocWebsitePreview />}
    />
  );
}
```

- [ ] **Step 3: Add the carousel item to `lib/translations.ts`**

Append to `en.projects.items`:

```ts
{
  slug: "adhoc-website",
  title: "Ad Hoc Data Website Rebuild",
  description:
    "Full rewrite of Ad Hoc Data's marketing site from legacy AngularJS to Angular 21 with server-side rendering: 137 components, 50+ routes, dual-language NL/EN with hreflang, JSON-LD structured data, live search across the SBI-2025 industry taxonomy, and Playwright testing across 10 viewports.",
  techStack: ["Angular 21", "SSR", "TypeScript", "PostgreSQL", "Drizzle", "MapLibre", "Playwright"],
},
```

Append to `nl.projects.items`:

```ts
{
  slug: "adhoc-website",
  title: "Ad Hoc Data Website Rebuild",
  description:
    "Volledige rewrite van de marketingsite van Ad Hoc Data van legacy AngularJS naar Angular 21 met server-side rendering: 137 componenten, 50+ routes, tweetalig NL/EN met hreflang, JSON-LD structured data, live search door de SBI-2025 bedrijfstakkenstructuur en Playwright-tests op 10 viewports.",
  techStack: ["Angular 21", "SSR", "TypeScript", "PostgreSQL", "Drizzle", "MapLibre", "Playwright"],
},
```

- [ ] **Step 4: Register the preview in `components/FeaturedProjects.tsx`**

Add dynamic import:

```tsx
const AdhocWebsitePreview = dynamic(() =>
  import("./AdhocWebsitePreview").then((m) => ({ default: m.AdhocWebsitePreview }))
);
```

Add to the `previews` map:

```tsx
"adhoc-website": AdhocWebsitePreview,
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: `/projects/adhoc-website` renders NL + EN; carousel shows 6 cards.

- [ ] **Step 6: Commit**

```bash
git add components/AdhocWebsitePreview.tsx app/projects/adhoc-website components/FeaturedProjects.tsx lib/translations.ts
git commit -m "feat: add Angular 21 SSR website rebuild case study"
```

---

### Task 9: LeadHub case study

Framing rule (from the spec): present LeadHub as a **personal AI command center / agent platform**. Focus on platform engineering (edge functions, agent runtime, integrations). The sollicitatie-widget is mentioned as the public showcase (it runs live on this very site); do NOT describe job-search tactics, vacancy scraping, or networking automation.

**Files:**
- Create: `components/LeadHubPreview.tsx`
- Create: `app/projects/leadhub/page.tsx`
- Modify: `lib/translations.ts`
- Modify: `components/FeaturedProjects.tsx`

- [ ] **Step 1: Create `components/LeadHubPreview.tsx`**

```tsx
const navItems = [
  { label: "Dashboard", active: false },
  { label: "AI Agents", active: true },
  { label: "Leads", active: false },
  { label: "Email", active: false },
  { label: "Analytics", active: false },
];

const agents = [
  { name: "Justin AI Widget", model: "claude", status: "live", statusColor: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10" },
  { name: "Lead Qualifier", model: "gemini", status: "active", statusColor: "text-violet-300 border-violet-400/40 bg-violet-400/10" },
  { name: "Email Composer", model: "mistral", status: "active", statusColor: "text-violet-300 border-violet-400/40 bg-violet-400/10" },
];

export function LeadHubPreview() {
  return (
    <div className="absolute inset-0 bg-[#0a0a12] flex select-none">
      {/* Sidebar */}
      <div className="w-24 md:w-28 border-r border-white/5 flex flex-col flex-shrink-0">
        <div className="px-3 py-2.5 border-b border-white/5">
          <span className="text-[10px] font-bold text-white">
            Lead<span className="text-violet-400">Hub</span>
          </span>
        </div>
        <div className="py-2 px-2 space-y-0.5">
          {navItems.map(({ label, active }) => (
            <div
              key={label}
              className={`px-2 py-1 rounded text-[8px] md:text-[9px] font-medium ${
                active ? "bg-violet-600/80 text-white" : "text-zinc-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="mt-auto px-3 py-2 border-t border-white/5">
          <span className="text-[7px] text-zinc-600 font-mono">48+ edge functions</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-3 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-white">AI Agents</span>
          <span className="px-1.5 py-0.5 rounded-full border border-white/10 text-zinc-400 text-[8px]">
            4 providers
          </span>
        </div>

        {/* Agent cards */}
        <div className="space-y-1.5 mb-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5"
            >
              <div className="min-w-0">
                <div className="text-[9px] md:text-[10px] font-medium text-zinc-200 truncate">
                  {agent.name}
                </div>
                <div className="text-[7px] md:text-[8px] text-zinc-600 font-mono">
                  {agent.model}
                </div>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded-full border text-[7px] md:text-[8px] font-semibold uppercase flex-shrink-0 ${agent.statusColor}`}
              >
                {agent.status}
              </span>
            </div>
          ))}
        </div>

        {/* Chat snippet */}
        <div className="mt-auto rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <div className="text-[7px] text-zinc-600 mb-1 font-mono">
            justinengelberts.dev · live conversation
          </div>
          <div className="flex justify-end mb-1">
            <div className="bg-violet-600/70 rounded-lg rounded-br-sm px-2 py-1 text-[8px] text-white max-w-[75%]">
              What did Justin build with AWS?
            </div>
          </div>
          <div className="flex">
            <div className="bg-white/[0.06] rounded-lg rounded-bl-sm px-2 py-1 text-[8px] text-zinc-300 max-w-[80%]">
              He built a private-by-default media pipeline with S3 + CloudFront…
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/projects/leadhub/page.tsx`**

```tsx
"use client";

import { Bot, Plug, BarChart3, Send, CreditCard, Database } from "lucide-react";
import {
  CaseStudyPage,
  type CaseStudyContent,
} from "@/components/case-study/CaseStudyPage";
import { LeadHubPreview } from "@/components/LeadHubPreview";

const content: { en: CaseStudyContent; nl: CaseStudyContent } = {
  en: {
    backToProjects: "Back to Projects",
    title: "LeadHub",
    subtitle:
      "Personal AI command center: agent platform, CRM, and analytics cockpit on one serverless backend",
    badge: "AI Platform",
    stats: [
      { value: "48+", label: "Edge functions" },
      { value: "4", label: "AI providers" },
      { value: "3", label: "Sites on one backend" },
      { value: "24/7", label: "Agents online" },
    ],
    overviewTitle: "Overview",
    overviewText:
      "LeadHub is the platform that powers my personal AI infrastructure: a React 19 + Supabase application running 48+ production edge functions for AI agents, lead management, email automation, billing, and analytics. Its most visible component is the Justin AI widget — the chat agent running live on this website, answering questions about my work and booking appointments in real time.",
    challengeTitle: "The Challenge",
    challengeText:
      "Running multiple AI agents in production raises hard platform questions: how to switch between AI providers per agent without rewrites, how to keep long domain-specific system prompts fast and affordable, how to hand a conversation to a human mid-session, and how to connect agent output to external CRMs. Off-the-shelf automation tools solve none of this with enough control — so I built the platform myself.",
    solutionTitle: "The Solution",
    solutionPoints: [
      {
        title: "Multi-provider agent runtime",
        description:
          "Each agent is configured with its own provider (Gemini, Claude, Mistral, or OpenAI), system prompt, and fallback chain. Domain-specific prompts run 650+ lines, with caching strategies to keep response cost and latency down.",
      },
      {
        title: "The Justin AI widget",
        description:
          "An embeddable chat widget — live on this site — combining canned Q&A, free AI conversation, and real-time appointment booking. Conversations stream through Supabase Edge Functions with proactive nudge triggers and a dark theme matching the host site.",
      },
      {
        title: "HubSpot OAuth2 platform app",
        description:
          "A verified HubSpot app (platform 2025.2) with a CRM Record Card that shows AI conversation transcripts and sync status inside HubSpot itself, including live staff takeover of an ongoing agent conversation.",
      },
      {
        title: "Analytics cockpit",
        description:
          "Google Search Console, GA4, and Microsoft Clarity wired into one dashboard with real-time KPIs and anomaly alerts — one place to watch every property I run.",
      },
    ],
    featuresTitle: "Key Features",
    features: [
      {
        icon: Bot,
        title: "Agent Runtime",
        description: "Per-agent provider config with multi-model fallback",
      },
      {
        icon: Plug,
        title: "HubSpot App",
        description: "OAuth2 platform app with CRM Record Card integration",
      },
      {
        icon: Database,
        title: "RAG on pgvector",
        description: "Knowledge bases ground every agent's answers",
      },
      {
        icon: Send,
        title: "Email Automation",
        description: "Postmark-driven flows triggered by lead lifecycle",
      },
      {
        icon: CreditCard,
        title: "Stripe Billing",
        description: "Subscription and checkout handling on edge functions",
      },
      {
        icon: BarChart3,
        title: "Analytics Cockpit",
        description: "GSC + GA4 + Clarity unified with anomaly alerts",
      },
    ],
    resultsTitle: "Results",
    resultsPoints: [
      "48+ Supabase Edge Functions running in production",
      "One Supabase backend serves three sites: this portfolio, crewvee.com, and LeadHub itself",
      "The Justin AI widget answers visitors on this site 24/7 — try it",
      "HubSpot integration verified end-to-end, including live human takeover",
      "Four AI providers orchestrated behind one agent configuration model",
    ],
  },
  nl: {
    backToProjects: "Terug naar Projecten",
    title: "LeadHub",
    subtitle:
      "Persoonlijk AI command center: agent-platform, CRM en analytics-cockpit op één serverless backend",
    badge: "AI Platform",
    stats: [
      { value: "48+", label: "Edge functions" },
      { value: "4", label: "AI-providers" },
      { value: "3", label: "Sites op één backend" },
      { value: "24/7", label: "Agents online" },
    ],
    overviewTitle: "Overzicht",
    overviewText:
      "LeadHub is het platform achter mijn persoonlijke AI-infrastructuur: een React 19 + Supabase applicatie met 48+ productie edge functions voor AI-agents, leadbeheer, e-mailautomatisering, facturering en analytics. Het meest zichtbare onderdeel is de Justin AI widget — de chatagent die live op deze website draait, vragen over mijn werk beantwoordt en realtime afspraken inplant.",
    challengeTitle: "De Uitdaging",
    challengeText:
      "Meerdere AI-agents in productie draaien levert lastige platformvragen op: hoe wissel je per agent van AI-provider zonder herbouw, hoe houd je lange domeinspecifieke system prompts snel en betaalbaar, hoe neemt een mens een gesprek halverwege over, en hoe koppel je agent-output aan externe CRM's? Kant-en-klare automatiseringstools lossen dit niet met genoeg controle op — dus bouwde ik het platform zelf.",
    solutionTitle: "De Oplossing",
    solutionPoints: [
      {
        title: "Multi-provider agent runtime",
        description:
          "Elke agent heeft een eigen provider (Gemini, Claude, Mistral of OpenAI), system prompt en fallback-keten. Domeinspecifieke prompts beslaan 650+ regels, met caching-strategieën om kosten en latency laag te houden.",
      },
      {
        title: "De Justin AI widget",
        description:
          "Een embedbare chatwidget — live op deze site — die voorgedefinieerde Q&A, vrije AI-conversatie en realtime afspraakplanning combineert. Gesprekken streamen via Supabase Edge Functions, met proactieve nudge-triggers en een dark theme dat meekleurt met de hostsite.",
      },
      {
        title: "HubSpot OAuth2 platform-app",
        description:
          "Een geverifieerde HubSpot-app (platform 2025.2) met een CRM Record Card die AI-gesprekstranscripten en sync-status in HubSpot zelf toont, inclusief live overname van een lopend agentgesprek door een medewerker.",
      },
      {
        title: "Analytics-cockpit",
        description:
          "Google Search Console, GA4 en Microsoft Clarity samengebracht in één dashboard met realtime KPI's en anomaliemeldingen — één plek om elke property die ik beheer in de gaten te houden.",
      },
    ],
    featuresTitle: "Belangrijkste Features",
    features: [
      {
        icon: Bot,
        title: "Agent Runtime",
        description: "Provider-configuratie per agent met multi-model fallback",
      },
      {
        icon: Plug,
        title: "HubSpot App",
        description: "OAuth2 platform-app met CRM Record Card integratie",
      },
      {
        icon: Database,
        title: "RAG op pgvector",
        description: "Kennisbanken onderbouwen de antwoorden van elke agent",
      },
      {
        icon: Send,
        title: "E-mailautomatisering",
        description: "Postmark-flows getriggerd door de lead-lifecycle",
      },
      {
        icon: CreditCard,
        title: "Stripe Facturering",
        description: "Abonnementen en checkout op edge functions",
      },
      {
        icon: BarChart3,
        title: "Analytics-Cockpit",
        description: "GSC + GA4 + Clarity verenigd met anomaliemeldingen",
      },
    ],
    resultsTitle: "Resultaten",
    resultsPoints: [
      "48+ Supabase Edge Functions in productie",
      "Eén Supabase-backend bedient drie sites: dit portfolio, crewvee.com en LeadHub zelf",
      "De Justin AI widget beantwoordt bezoekers op deze site 24/7 — probeer maar",
      "HubSpot-integratie end-to-end geverifieerd, inclusief live menselijke overname",
      "Vier AI-providers georkestreerd achter één agent-configuratiemodel",
    ],
  },
};

const techStack = [
  { name: "React", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  { name: "TypeScript", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  { name: "Supabase", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  { name: "Edge Functions", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  { name: "pgvector", color: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30" },
  { name: "Stripe", color: "bg-purple-600/20 text-purple-300 border-purple-600/30" },
  { name: "HubSpot", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
];

export default function LeadHubPage() {
  return (
    <CaseStudyPage
      accent="violet"
      content={content}
      techStack={techStack}
      preview={<LeadHubPreview />}
    />
  );
}
```

- [ ] **Step 3: Add the carousel item to `lib/translations.ts`**

Append to `en.projects.items`:

```ts
{
  slug: "leadhub",
  title: "LeadHub",
  description:
    "My personal AI command center: an agent platform running 48+ Supabase Edge Functions with multi-provider AI (Gemini, Claude, Mistral, OpenAI), RAG knowledge bases on pgvector, a HubSpot OAuth2 app, and an analytics cockpit. Its public face is the Justin AI chat widget — running live on this site right now.",
  techStack: ["React", "TypeScript", "Supabase", "Edge Functions", "pgvector", "Stripe", "HubSpot"],
},
```

Append to `nl.projects.items`:

```ts
{
  slug: "leadhub",
  title: "LeadHub",
  description:
    "Mijn persoonlijke AI command center: een agent-platform met 48+ Supabase Edge Functions, multi-provider AI (Gemini, Claude, Mistral, OpenAI), RAG-kennisbanken op pgvector, een HubSpot OAuth2-app en een analytics-cockpit. Het publieke gezicht is de Justin AI chatwidget — die nu live op deze site draait.",
  techStack: ["React", "TypeScript", "Supabase", "Edge Functions", "pgvector", "Stripe", "HubSpot"],
},
```

- [ ] **Step 4: Register the preview in `components/FeaturedProjects.tsx`**

Add dynamic import:

```tsx
const LeadHubPreview = dynamic(() =>
  import("./LeadHubPreview").then((m) => ({ default: m.LeadHubPreview }))
);
```

Add to the `previews` map:

```tsx
leadhub: LeadHubPreview,
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: `/projects/leadhub` renders NL + EN; carousel shows all 7 cards; dot indicators show 7 dots.

- [ ] **Step 6: Commit**

```bash
git add components/LeadHubPreview.tsx app/projects/leadhub components/FeaturedProjects.tsx lib/translations.ts
git commit -m "feat: add LeadHub AI command center case study"
```

---

### Task 10: Update tech stack marquee

**Files:**
- Modify: `lib/translations.ts` (both `en.techStack.technologies` and `nl.techStack.technologies`)
- Modify: `components/TechStackMarquee.tsx` (techColors)

- [ ] **Step 1: Update both `technologies` arrays in `lib/translations.ts`**

Replace BOTH the `en.techStack.technologies` and `nl.techStack.technologies` arrays (they are identical) with:

```ts
technologies: [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "AWS",
  "CloudFront",
  "Python",
  "FastAPI",
  "Angular",
  "SvelteKit",
  "Mistral AI",
  "Gemini",
  "Claude Code",
  "Edge Functions",
  "Node.js",
  "Playwright",
  "Turf.js",
  "Leaflet",
],
```

- [ ] **Step 2: Add missing colors to `techColors` in `components/TechStackMarquee.tsx`**

Add to the map (entries for Next.js, TypeScript, etc. already exist):

```ts
"AWS": "bg-[#FF9900]",
"CloudFront": "bg-[#8C4FFF]",
"Python": "bg-[#3776AB]",
"FastAPI": "bg-[#009688]",
"SvelteKit": "bg-[#FF3E00]",
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit` — expected: no errors.
Dev check: marquee shows the new technologies with colored dots (no gray fallback dots except intentionally).

- [ ] **Step 4: Commit**

```bash
git add lib/translations.ts components/TechStackMarquee.tsx
git commit -m "feat: refresh tech stack marquee with AWS, Python, and new stack"
```

---

### Task 11: UI polish — focus states

**Files:**
- Modify: `app/globals.css`

The site has no visible keyboard focus indicators on its custom-styled buttons and pill links. One global rule fixes this consistently without touching every component.

- [ ] **Step 1: Add a global focus-visible style**

In `app/globals.css`, append at the end:

```css
/* Visible keyboard focus on all interactive elements (dark theme) */
:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
  border-radius: 4px;
}
```

(If the file already contains a `:focus-visible` rule, update it instead of duplicating.)

- [ ] **Step 2: Verify**

Dev check: Tab through the homepage — hero CTAs, nav, carousel arrows, dot indicators, and card links all show a visible outline. Mouse clicks show no outline (that's the `:focus-visible` behavior).

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "fix: visible keyboard focus states across the site"
```

---

### Task 12: Final verification & visual QA

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds. Check the route output table — all 9 routes present (`/`, `/privacy`, 7 project pages). Confirm no chunk pulls in `three` (it's uninstalled, so the build would fail if referenced).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no new errors (pre-existing warnings acceptable).

- [ ] **Step 3: Visual QA checklist (dev server, both languages)**

Use the language toggle to check NL and EN for each item:

- [ ] Hero: comets render, follow mouse smoothly, text readable, CTAs clickable
- [ ] Hero with DevTools → Rendering → "prefers-reduced-motion: reduce": static gradient, no animation
- [ ] Marquee: scrolls, new tech names present, pauses when scrolled past (check CPU in performance monitor)
- [ ] Carousel: 7 cards, drag works, arrows + dots work, previews appear when scrolled into view
- [ ] All 4 new project pages render fully in NL and EN (no missing strings, no layout breaks)
- [ ] `/projects/adhoc-selectietool`: compare slider drags correctly, images sharp
- [ ] Mobile widths 375px and 768px: hero, carousel, project pages have no horizontal overflow
- [ ] Keyboard: tab order sensible, focus visible

- [ ] **Step 4: Fix anything found, commit**

```bash
git add -A
git commit -m "fix: visual QA fixes for portfolio update"
```

(Skip the commit if QA found nothing.)

- [ ] **Step 5: Done — do NOT push**

Leave pushing/deploying to Justin (Vercel auto-deploys from main).
