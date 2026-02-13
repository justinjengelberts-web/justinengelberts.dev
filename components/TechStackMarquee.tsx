"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

// Brand colors for each technology
const techColors: Record<string, string> = {
  "Next.js": "bg-white",
  "TypeScript": "bg-[#3178C6]",
  "Tailwind CSS": "bg-[#38BDF8]",
  "Supabase": "bg-[#3ECF8E]",
  "PostgreSQL": "bg-[#336791]",
  "Mistral AI": "bg-[#FF7000]",
  "Gemini": "bg-[#8E75B2]",
  "Framer Motion": "bg-[#FF0080]",
  "Node.js": "bg-[#339933]",
  "React": "bg-[#61DAFB]",
  "Vercel": "bg-white",
  "Cloudflare": "bg-[#F38020]",
  "Claude Code": "bg-[#D97757]",
  "LESS": "bg-[#1D365D]",
  "Turf.js": "bg-[#3FB27F]",
  "Leaflet": "bg-[#199900]",
  "Playwright": "bg-[#2EAD33]",
  "Angular": "bg-[#DD0031]",
  "Edge Functions": "bg-[#F59E0B]",
  "AES-256-GCM": "bg-[#10B981]",
};

export function TechStackMarquee() {
  const { t } = useLanguage();
  const technologies = t.techStack.technologies;

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const x2 = useMotionValue(0);

  // Track mouse/touch state
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const singleSetWidth = useRef(0);
  const singleSetWidth2 = useRef(0);
  const momentumDecay = useRef(0.95);

  // Measure content width on mount
  useEffect(() => {
    if (marqueeRef.current) {
      // Width of one set of items (we have 4 copies, so divide by 4)
      singleSetWidth.current = marqueeRef.current.scrollWidth / 4;
    }
    if (marqueeRef2.current) {
      singleSetWidth2.current = marqueeRef2.current.scrollWidth / 4;
      // Start second row offset
      x2.set(-singleSetWidth2.current / 2);
    }
  }, [technologies, x2]);

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
    let newX2 = x2.get() - delta; // Opposite direction for row 2

    // Seamless loop for row 1
    if (newX <= -singleSetWidth.current) {
      newX += singleSetWidth.current;
    } else if (newX >= 0) {
      newX -= singleSetWidth.current;
    }
    x.set(newX);

    // Seamless loop for row 2
    if (singleSetWidth2.current > 0) {
      if (newX2 <= -singleSetWidth2.current) {
        newX2 += singleSetWidth2.current;
      } else if (newX2 >= 0) {
        newX2 -= singleSetWidth2.current;
      }
      x2.set(newX2);
    }

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

    // Update position for row 1
    let newX = x.get() + speed;

    // Seamless loop: wrap around when we've scrolled one full set width
    if (newX <= -singleSetWidth.current) {
      newX += singleSetWidth.current;
    } else if (newX >= 0) {
      newX -= singleSetWidth.current;
    }

    x.set(newX);

    // Update position for row 2 (opposite direction)
    if (singleSetWidth2.current > 0) {
      let newX2 = x2.get() - speed * 0.8; // Slightly slower, opposite direction

      if (newX2 <= -singleSetWidth2.current) {
        newX2 += singleSetWidth2.current;
      } else if (newX2 >= 0) {
        newX2 -= singleSetWidth2.current;
      }

      x2.set(newX2);
    }
  });

  // Create 4 copies for seamless infinite scroll
  const repeatedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies];
  // Second row uses reversed order for variety (deterministic, no hydration issues)
  const reversedTechnologies = [...technologies].reverse();
  const repeatedTechnologies2 = [...reversedTechnologies, ...reversedTechnologies, ...reversedTechnologies, ...reversedTechnologies];

  return (
    <section className="py-8 md:py-12 bg-black border-y border-white/5 overflow-hidden">
      <div
        ref={containerRef}
        className="relative touch-pan-y space-y-3"
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
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Marquee Row 1 - Left */}
        <motion.div
          ref={marqueeRef}
          className="flex whitespace-nowrap"
          style={{ x }}
        >
          {repeatedTechnologies.map((tech, index) => (
            <div
              key={`${tech}-${index}`}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 flex-shrink-0"
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${techColors[tech] || "bg-zinc-600"}`} />
              <span className="text-zinc-400 text-base md:text-lg font-medium">{tech}</span>
            </div>
          ))}
        </motion.div>

        {/* Marquee Row 2 - Right (opposite direction) */}
        <motion.div
          ref={marqueeRef2}
          className="flex whitespace-nowrap"
          style={{ x: x2 }}
        >
          {repeatedTechnologies2.map((tech, index) => (
            <div
              key={`row2-${tech}-${index}`}
              className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 flex-shrink-0"
            >
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${techColors[tech] || "bg-zinc-600"}`} />
              <span className="text-zinc-500 text-base md:text-lg font-medium">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
