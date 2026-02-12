"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { BelgiumMapPreview } from "./BelgiumMapPreview";

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
                <Link href={`/projects/${project.slug}`} className="block">
                  <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 relative overflow-hidden cursor-pointer">
                    {index === 1 ? (
                      <BelgiumMapPreview />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3/4 h-3/4 rounded-lg bg-zinc-800/50 border border-white/10 flex items-center justify-center">
                            <span className="text-zinc-500 text-sm">Preview</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl font-semibold text-white mb-3 hover:text-zinc-300 transition-colors cursor-pointer">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors group/link"
                  >
                    {t.projects.viewCaseStudy}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
