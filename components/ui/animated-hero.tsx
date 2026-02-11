"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { ShaderBackground } from "@/components/ShaderBackground";

const words = ["scalable", "intelligent", "intuitive", "AI-powered"];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-black min-h-screen flex items-center justify-center overflow-hidden">
      <ShaderBackground />
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tight text-center font-medium text-white leading-tight">
              <span className="block">I build things that are</span>
              <span className="block relative h-[80px] md:h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-zinc-400 max-w-2xl text-center">
              Stop building at yesterday&apos;s speed. I combine full-stack engineering
              with AI-native workflows to ship high-end SaaS solutions and complex
              data tools faster than ever.
            </p>
          </div>

          <div className="flex flex-row gap-6 items-center">
            <a
              href="#work"
              className="px-6 py-3 rounded-full border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition-colors"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium"
            >
              Let&apos;s talk <MoveRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
