"use client";

import { motion } from "framer-motion";
import { Terminal, Sparkles, Zap } from "lucide-react";

const codeSnippet = `// AI-assisted geospatial query optimization
async function findLocationsInPolygon(
  polygon: GeoJSON.Polygon,
  filters: QueryFilters
) {
  const optimizedQuery = await ai.optimize(\`
    SELECT l.*, ST_AsGeoJSON(l.geometry) as geojson
    FROM locations l
    WHERE ST_Within(
      l.geometry,
      ST_GeomFromGeoJSON($1)
    )
    AND l.category = ANY($2)
    ORDER BY ST_Distance(
      l.geometry,
      ST_Centroid(ST_GeomFromGeoJSON($1))
    )
    LIMIT $3
  \`);

  return db.query(optimizedQuery, [
    JSON.stringify(polygon),
    filters.categories,
    filters.limit
  ]);
}`;

export function AIWorkflow() {
  return (
    <section id="about" className="py-24 px-6 bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full">
              <Sparkles className="w-4 h-4" />
              AI-Native Development
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              Building at 3x speed with AI-powered workflows
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              I leverage Claude Code directly in my terminal to accelerate
              development without sacrificing code quality. This AI-native
              approach lets me tackle complex problems faster while maintaining
              full control over architecture decisions.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Terminal className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    Terminal-First Workflow
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    Claude Code integrated directly into my development
                    environment for seamless AI assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Zap className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    Rapid Iteration
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    From concept to production-ready code in hours, not days.
                    Complex features shipped faster.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Snippet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-zinc-500 ml-2">
                    geo-queries.ts
                  </span>
                </div>

                {/* Code */}
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {codeSnippet}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
