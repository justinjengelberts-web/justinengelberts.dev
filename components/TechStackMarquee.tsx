"use client";

import { motion } from "framer-motion";

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "PostgreSQL",
  "Mistral AI",
  "Framer Motion",
  "Node.js",
  "React",
  "Vercel",
  "PostGIS",
  "Claude AI",
];

export function TechStackMarquee() {
  return (
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="relative">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Marquee */}
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
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
