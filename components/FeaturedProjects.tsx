"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { BelgiumMapPreview } from "./BelgiumMapPreview";
import { RefundelyPreview } from "./RefundelyPreview";

const techColors: Record<string, string> = {
  "React": "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  "TypeScript": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Supabase": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "PostgreSQL": "bg-blue-600/20 text-blue-300 border-blue-600/30",
  "Mistral AI": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Edge Functions": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Tailwind CSS": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "JavaScript": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Angular": "bg-red-500/20 text-red-300 border-red-500/30",
  "GeoJSON": "bg-green-500/20 text-green-300 border-green-500/30",
  "Turf.js": "bg-teal-500/20 text-teal-300 border-teal-500/30",
  "MapLibre": "bg-sky-500/20 text-sky-300 border-sky-500/30",
  "HTML": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "LESS": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

const getColorForTech = (tech: string) => {
  return techColors[tech] || "bg-white/10 text-zinc-300 border-white/10";
};

export function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-24 px-6 bg-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t.projects.title}
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {t.projects.items.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300">
                {/* Project Image/Visual */}
                <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden">
                  {index === 0 && <RefundelyPreview />}
                  {index === 1 && <BelgiumMapPreview />}
                </div>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/projects/${project.slug}`}>
                    {project.slug === "refundely" ? (
                      <span className="inline-block bg-white px-3 py-1.5 rounded-lg mb-3 hover:bg-gray-100 transition-colors cursor-pointer">
                        <span className="text-xl font-bold tracking-tight text-slate-900">
                          Re<span className="font-extrabold text-emerald-600">fundely</span>
                        </span>
                      </span>
                    ) : (
                      <h3 className="text-xl font-semibold text-white mb-3 hover:text-zinc-300 transition-colors cursor-pointer">
                        {project.title}
                      </h3>
                    )}
                  </Link>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getColorForTech(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-4">
                    <a
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group/link"
                    >
                      {t.projects.viewCaseStudy}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                    {project.slug === "refundely" && (
                      <a
                        href="https://refundely.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        Refundely.com
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
