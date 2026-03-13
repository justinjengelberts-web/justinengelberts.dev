"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { BelgiumMapPreview } from "./BelgiumMapPreview";
import { RefundelyPreview } from "./RefundelyPreview";
import { CrewVeeCRMPreview } from "./CrewVeeCRMPreview";

const techColors: Record<string, string> = {
  "React": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "TypeScript": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Supabase": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "PostgreSQL": "bg-blue-600/20 text-blue-300 border-blue-600/30",
  "Mistral AI": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Claude AI": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "OpenAI": "bg-zinc-400/20 text-zinc-300 border-zinc-400/30",
  "React Query": "bg-red-600/20 text-red-300 border-red-600/30",
  "Vite": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "Edge Functions": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Tailwind CSS": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "JavaScript": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Angular": "bg-red-500/20 text-red-300 border-red-500/30",
  "GeoJSON": "bg-green-500/20 text-green-300 border-green-500/30",
  "Turf.js": "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "MapLibre": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "HTML": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "LESS": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  "AES-256-GCM": "bg-rose-500/20 text-rose-300 border-rose-500/30",
};

const getColorForTech = (tech: string) =>
  techColors[tech] || "bg-white/10 text-zinc-300 border-white/10";

function getPreview(index: number) {
  if (index === 0) return <RefundelyPreview />;
  if (index === 1) return <CrewVeeCRMPreview />;
  if (index === 2) return <BelgiumMapPreview />;
  return null;
}

export function FeaturedProjects() {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      dragStartX.current = e.pageX;
      scrollStartLeft.current = el.scrollLeft;
      el.style.cursor = "grabbing";
      el.style.userSelect = "none";
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.pageX - dragStartX.current;
      el.scrollLeft = scrollStartLeft.current - dx;
    };

    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
      el.style.userSelect = "";
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  const getCardWidth = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !container.firstElementChild) return 0;
    return (container.firstElementChild as HTMLElement).offsetWidth;
  }, []);

  const scrollTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    container.scrollTo({ left: index * (cardWidth + 24), behavior: "smooth" });
  }, [getCardWidth]);

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = getCardWidth();
    if (!cardWidth) return;
    const index = Math.round(container.scrollLeft / (cardWidth + 24));
    setActiveIndex(Math.max(0, Math.min(index, t.projects.items.length - 1)));
  }, [getCardWidth, t.projects.items.length]);

  return (
    <section id="projects" className="py-20 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-3">
              {t.projects.title}
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Desktop arrow nav */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex >= t.projects.items.length - 1}
              aria-label="Next project"
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel track */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {t.projects.items.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.2) }}
                className="snap-start flex-shrink-0 w-[80%] md:w-[44%] flex flex-col"
              >
                <div className="group flex flex-col h-full bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:shadow-black/40">

                  {/* Preview area */}
                  <div className="aspect-video bg-zinc-900 relative overflow-hidden flex-shrink-0">
                    {getPreview(index)}
                    {/* Project number badge */}
                    <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono font-medium text-white/30 tabular-nums leading-none">
                      {String(index + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(t.projects.items.length).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">

                    {/* Title row */}
                    <div className="mb-3">
                      {project.slug === "crewvee-crm" ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-semibold text-white">CrewVee CRM</h3>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-[10px] font-medium tracking-wide uppercase">
                            <Lock className="w-2.5 h-2.5" />
                            Internal
                          </span>
                        </div>
                      ) : project.slug === "refundely" ? (
                        <Link href={`/projects/${project.slug}`} className="inline-block">
                          <span className="inline-block bg-white/90 px-4 py-2 rounded-xl border border-white/50 shadow-lg shadow-emerald-500/10 hover:bg-white hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer">
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                              Re<span className="text-emerald-600">fundely</span>
                            </span>
                          </span>
                        </Link>
                      ) : (
                        <Link href={`/projects/${project.slug}`}>
                          <h3 className="text-xl font-semibold text-white hover:text-zinc-300 transition-colors cursor-pointer">
                            {project.title}
                          </h3>
                        </Link>
                      )}
                    </div>

                    {/* Description — flex-1 pushes tech + CTA to bottom */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-5 flex-1 line-clamp-4">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${getColorForTech(tech)}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-white/5">
                      <a
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors group/link"
                      >
                        {t.projects.viewCaseStudy}
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                      {project.slug === "refundely" && (
                        <a
                          href="https://refundely.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400/80 hover:text-emerald-400 transition-colors"
                        >
                          Refundely.com
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right fade hint */}
          <div className="absolute right-0 top-0 bottom-2 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none rounded-r-2xl" />
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-6">
          {t.projects.items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
