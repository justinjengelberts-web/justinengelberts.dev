const flowSteps = [
  { label: "Browser", sub: "CMS upload", color: "border-sky-400/40 text-sky-300" },
  { label: "S3", sub: "private bucket", color: "border-amber-400/40 text-amber-300" },
  { label: "CloudFront", sub: "OAC only", color: "border-violet-400/40 text-violet-300" },
  { label: "Visitor", sub: "public URL", color: "border-emerald-400/40 text-emerald-300" },
];

const guarantees = [
  "IAM: PutObject only",
  "Secrets Manager",
  "eu-central-1",
];

export function WebModernPreview() {
  return (
    <div className="absolute inset-0 bg-[#0b1120] p-4 md:p-5 flex flex-col select-none">
      {/* Title bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[10px] md:text-xs text-white/70">
          infra/webmodern-media-stack.ts
        </span>
        <span className="px-2 py-0.5 rounded-full border border-orange-400/40 bg-orange-400/10 text-orange-300 text-[9px] md:text-[10px] font-semibold tracking-wide">
          AWS CDK
        </span>
      </div>

      {/* Flow diagram */}
      <div className="flex-1 flex items-center">
        <div className="w-full flex items-center justify-between gap-1 md:gap-2">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center flex-1 min-w-0">
              <div
                className={`flex-1 min-w-0 rounded-lg border bg-white/[0.04] px-2 py-2 md:px-3 md:py-3 text-center ${step.color}`}
              >
                <div className="text-[10px] md:text-xs font-semibold truncate">
                  {step.label}
                </div>
                <div className="text-[8px] md:text-[10px] text-zinc-500 truncate">
                  {step.sub}
                </div>
              </div>
              {i < flowSteps.length - 1 ? (
                <div className="px-1 md:px-1.5 text-zinc-600 text-[10px] md:text-xs flex-shrink-0">
                  →
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Annotations */}
      <div className="flex items-center justify-between mt-4">
        <div className="font-mono text-[8px] md:text-[9px] text-zinc-500">
          presigned PUT · no credentials in browser
        </div>
        <div className="flex gap-1.5">
          {guarantees.map((g) => (
            <span
              key={g}
              className="px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-zinc-400 text-[8px] md:text-[9px] whitespace-nowrap"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
