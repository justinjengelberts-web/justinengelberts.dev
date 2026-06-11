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
