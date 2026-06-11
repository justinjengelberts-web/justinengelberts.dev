const steps = [
  { status: "done", label: "scrape 14 industry sources", meta: "httpx · playwright" },
  { status: "done", label: "score 38 inspiration items", meta: "gemini" },
  { status: "done", label: "match CBS open-data statistics", meta: "angles + hooks" },
  { status: "active", label: "draft 3 social posts + 1 blog", meta: "gemini" },
  { status: "todo", label: "schedule on content calendar", meta: "weekly cadence" },
];

export function ContentToolPreview() {
  return (
    <div className="absolute inset-0 bg-[#0d1117] p-4 md:p-5 flex flex-col font-mono select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] md:text-xs text-white/70">
            contenttool · daily pipeline
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full border border-blue-400/40 bg-blue-400/10 text-blue-300 text-[9px] md:text-[10px] font-semibold">
          GitHub Actions cron
        </span>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col justify-center gap-1.5 md:gap-2">
        {steps.map((step) => (
          <div key={step.label} className="flex items-center gap-2 md:gap-3">
            <span
              className={`text-[10px] md:text-xs w-3 text-center flex-shrink-0 ${
                step.status === "done"
                  ? "text-emerald-400"
                  : step.status === "active"
                    ? "text-amber-400"
                    : "text-zinc-600"
              }`}
            >
              {step.status === "done" ? "✓" : step.status === "active" ? "›" : "·"}
            </span>
            <span
              className={`text-[9px] md:text-[11px] truncate ${
                step.status === "todo" ? "text-zinc-600" : "text-zinc-300"
              }`}
            >
              {step.label}
            </span>
            <span className="ml-auto text-[8px] md:text-[9px] text-zinc-600 flex-shrink-0">
              {step.meta}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-white/5 flex justify-between text-[8px] md:text-[9px] text-zinc-600">
        <span>python 3.12 · fastapi · sqlalchemy</span>
        <span>sveltekit dashboard</span>
      </div>
    </div>
  );
}
