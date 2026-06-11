const navItems = [
  { label: "Dashboard", active: false },
  { label: "AI Agents", active: true },
  { label: "Leads", active: false },
  { label: "Email", active: false },
  { label: "Analytics", active: false },
];

const agents = [
  { name: "Justin AI Widget", model: "claude", status: "live", statusColor: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10" },
  { name: "Lead Qualifier", model: "gemini", status: "active", statusColor: "text-violet-300 border-violet-400/40 bg-violet-400/10" },
  { name: "Email Composer", model: "mistral", status: "active", statusColor: "text-violet-300 border-violet-400/40 bg-violet-400/10" },
];

export function LeadHubPreview() {
  return (
    <div className="absolute inset-0 bg-[#0a0a12] flex select-none">
      {/* Sidebar */}
      <div className="w-24 md:w-28 border-r border-white/5 flex flex-col flex-shrink-0">
        <div className="px-3 py-2.5 border-b border-white/5">
          <span className="text-[10px] font-bold text-white">
            Lead<span className="text-violet-400">Hub</span>
          </span>
        </div>
        <div className="py-2 px-2 space-y-0.5">
          {navItems.map(({ label, active }) => (
            <div
              key={label}
              className={`px-2 py-1 rounded text-[8px] md:text-[9px] font-medium ${
                active ? "bg-violet-600/80 text-white" : "text-zinc-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="mt-auto px-3 py-2 border-t border-white/5">
          <span className="text-[7px] text-zinc-600 font-mono">48+ edge functions</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-3 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-white">AI Agents</span>
          <span className="px-1.5 py-0.5 rounded-full border border-white/10 text-zinc-400 text-[8px]">
            4 providers
          </span>
        </div>

        {/* Agent cards */}
        <div className="space-y-1.5 mb-2">
          {agents.map((agent) => (
            <div
              key={agent.name}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1.5"
            >
              <div className="min-w-0">
                <div className="text-[9px] md:text-[10px] font-medium text-zinc-200 truncate">
                  {agent.name}
                </div>
                <div className="text-[7px] md:text-[8px] text-zinc-600 font-mono">
                  {agent.model}
                </div>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded-full border text-[7px] md:text-[8px] font-semibold uppercase flex-shrink-0 ${agent.statusColor}`}
              >
                {agent.status}
              </span>
            </div>
          ))}
        </div>

        {/* Chat snippet */}
        <div className="mt-auto rounded-lg border border-white/5 bg-white/[0.02] p-2">
          <div className="text-[7px] text-zinc-600 mb-1 font-mono">
            justinengelberts.dev · live conversation
          </div>
          <div className="flex justify-end mb-1">
            <div className="bg-violet-600/70 rounded-lg rounded-br-sm px-2 py-1 text-[8px] text-white max-w-[75%]">
              What did Justin build with AWS?
            </div>
          </div>
          <div className="flex">
            <div className="bg-white/[0.06] rounded-lg rounded-bl-sm px-2 py-1 text-[8px] text-zinc-300 max-w-[80%]">
              He built a private-by-default media pipeline with S3 + CloudFront…
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
