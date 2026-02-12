"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { ShaderBackground } from "@/components/ShaderBackground";
import { useLanguage } from "@/lib/language-context";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function Hero() {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();
  const { t } = useLanguage();

  const words = isMobile ? t.hero.mobileWords : t.hero.words;

  useEffect(() => {
    const wordsLength = words.length;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordsLength);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative w-full bg-black min-h-screen flex items-center justify-center overflow-hidden">
      <ShaderBackground />
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6">
            {/* leading-relaxed prevents descender clipping on letters like 'g' in "high-performance" */}
            <h1 className="text-5xl md:text-7xl max-w-3xl tracking-tight text-center font-medium text-white leading-relaxed">
              <span className="block">{t.hero.headline}</span>
              {/* overflow-visible + height ensures descenders are not clipped by bg-clip-text */}
              <span className="block relative h-[90px] md:h-[120px] flex items-center justify-center overflow-visible">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent pb-2 leading-normal"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
              {t.hero.wordsSuffix && (
                <span className="block font-semibold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                  {t.hero.wordsSuffix.trim()}
                </span>
              )}
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-zinc-400 max-w-2xl text-center">
              {t.hero.description}
            </p>
          </div>

          <div className="flex flex-row gap-6 items-center">
            <a
              href="#projects"
              className="px-6 py-3 rounded-full border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition-colors"
            >
              {t.hero.viewWork}
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-medium"
            >
              {t.hero.letsTalk} <MoveRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
