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

  // Track mouse/touch state
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const singleSetWidth = useRef(0);
  const momentumDecay = useRef(0.95);

  // Measure content width on mount
  useEffect(() => {
    if (marqueeRef.current) {
      // Width of one set of items (we have 4 copies, so divide by 4)
      singleSetWidth.current = marqueeRef.current.scrollWidth / 4;
    }
  }, [technologies]);

  // Handle mouse move to calculate velocity
  const handleMouseMove = (e: React.MouseEvent) => {
    const currentX = e.clientX;
    const delta = currentX - lastX.current;
    velocity.current = velocity.current * 0.7 + delta * 0.3;
    lastX.current = currentX;
  };

  // Touch handlers for mobile swipe/throw
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    lastX.current = e.touches[0].clientX;
    velocity.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - lastX.current;

    // Direct drag: move marquee with finger
    let newX = x.get() + delta;

    // Seamless loop
    if (newX <= -singleSetWidth.current) {
      newX += singleSetWidth.current;
    } else if (newX >= 0) {
      newX -= singleSetWidth.current;
    }
    x.set(newX);

    // Track velocity for momentum
    velocity.current = velocity.current * 0.5 + delta * 0.5;
    lastX.current = currentX;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Velocity is preserved for momentum effect
  };

  // Animation loop
  useAnimationFrame(() => {
    if (singleSetWidth.current === 0) return;

    // Skip animation during touch drag - touch move handles position directly
    if (isDragging) return;

    let speed: number;

    // Check if we have momentum from a swipe
    if (Math.abs(velocity.current) > 0.5) {
      // Apply momentum
      speed = velocity.current;
      // Decay the velocity
      velocity.current *= momentumDecay.current;
    } else if (isHovering) {
      // "Push" logic: mouse right (positive velocity) → text goes left (negative x)
      speed = -velocity.current * 0.5;

      // Add small base drift when hovering but not moving mouse
      if (Math.abs(velocity.current) < 0.5) {
        speed = -0.5;
      }

      velocity.current *= 0.95;
    } else {
      // Default: slow drift to the left
      speed = -1;
    }

    // Update position
    let newX = x.get() + speed;

    // Seamless loop: wrap around when we've scrolled one full set width
    if (newX <= -singleSetWidth.current) {
      newX += singleSetWidth.current;
    } else if (newX >= 0) {
      newX -= singleSetWidth.current;
    }

    x.set(newX);
  });

  // Create 4 copies for seamless infinite scroll
  const repeatedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies];

  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div
        ref={containerRef}
        className="relative touch-pan-y"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          velocity.current = 0;
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Marquee */}
        <motion.div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {repeatedTechnologies.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex items-center gap-3 px-6 py-3 flex-shrink-0"
            >
              <div className="w-2 h-2 rounded-full bg-zinc-600 flex-shrink-0" />
              <span className="text-zinc-400 text-lg font-medium">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
