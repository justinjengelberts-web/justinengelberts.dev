"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

export function TechStackMarquee() {
  const { t } = useLanguage();
  const technologies = t.techStack.technologies;

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Track mouse state
  const [isHovering, setIsHovering] = useState(false);
  const mouseVelocity = useRef(0);
  const lastMouseX = useRef(0);
  const contentWidth = useRef(0);

  // Measure content width on mount
  useEffect(() => {
    if (marqueeRef.current) {
      // Width of one set of items (half the total since we duplicate)
      contentWidth.current = marqueeRef.current.scrollWidth / 2;
    }
  }, [technologies]);

  // Handle mouse move to calculate velocity
  const handleMouseMove = (e: React.MouseEvent) => {
    const currentX = e.clientX;
    const velocity = currentX - lastMouseX.current;
    // Smooth the velocity a bit
    mouseVelocity.current = mouseVelocity.current * 0.7 + velocity * 0.3;
    lastMouseX.current = currentX;
  };

  // Animation loop
  useAnimationFrame(() => {
    if (contentWidth.current === 0) return;

    let speed: number;

    if (isHovering) {
      // "Push" logic: mouse right (positive velocity) → text goes left (negative x)
      // Multiply by -1 for push effect, scale for sensitivity
      speed = -mouseVelocity.current * 0.5;

      // Add small base drift when hovering but not moving mouse
      if (Math.abs(mouseVelocity.current) < 0.5) {
        speed = -0.5; // Slow default drift left
      }

      // Decay velocity when not actively moving
      mouseVelocity.current *= 0.95;
    } else {
      // Default: slow drift to the left
      speed = -1;
    }

    // Update position
    let newX = x.get() + speed;

    // Seamless loop: wrap around when we've scrolled one full content width
    if (newX <= -contentWidth.current) {
      newX += contentWidth.current;
    } else if (newX >= 0) {
      newX -= contentWidth.current;
    }

    x.set(newX);
  });

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div
        ref={containerRef}
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          mouseVelocity.current = 0;
        }}
        onMouseMove={handleMouseMove}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <motion.div
          ref={marqueeRef}
          className="flex gap-8 whitespace-nowrap"
          style={{ x }}
        >
          {/* Double the items for seamless loop */}
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex items-center gap-3 px-6 py-3"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-zinc-400 text-lg font-medium">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
