// Faithful mini-mockup of the real LeadHub CRM: dark slate sidebar (#1e293b)
// with blue logo (#2563eb), light gray main area, Dutch labels, agents table.
const sidebarSections = [
  {
    title: "Werk",
    items: [
      { label: "Pipeline", active: false },
      { label: "Agenda", active: false },
    ],
  },
  {
    title: "Bedrijven",
    items: [
      { label: "Dashboard", active: true },
      { label: "Agents", active: false },
      { label: "Rapportages", active: false },
    ],
  },
];

const kpis = [
  { label: "Totaal leads", value: "47" },
  { label: "Pipeline MRR", value: "€12.450" },
  { label: "Won MRR", value: "€2.500" },
];

const agents = [
  { name: "Justin AI Widget", model: "claude-sonnet-4-6", status: "Actief", tag: "bg-[#dcfce7] text-[#166534]" },
  { name: "Planner Support", model: "gemini-2.5-flash", status: "Actief", tag: "bg-[#dcfce7] text-[#166534]" },
  { name: "Inbound Sales", model: "mistral-large-latest", status: "Gepauzeerd", tag: "bg-[#fef3c7] text-[#92400e]" },
];

export function LeadHubPreview() {
  return (
    <div className="absolute inset-0 bg-[#f8fafc] flex select-none">
      {/* Sidebar */}
      <div className="w-[84px] md:w-24 bg-[#1e293b] flex flex-col flex-shrink-0">
        <div className="flex items-center gap-1 px-2 py-2 border-b border-white/10">
          <div className="w-3.5 h-3.5 rounded bg-[#2563eb] flex items-center justify-center flex-shrink-0">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
              <path d="M7 8h10M7 12h7M7 16h10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="17" cy="12" r="2.5" fill="white" opacity="0.8" />
            </svg>
          </div>
          <span className="text-white text-[7px] font-semibold tracking-tight">LeadHub</span>
          <span className="text-[4.5px] font-semibold tracking-widest uppercase text-[#93c5fd] bg-white/10 px-0.5 rounded">
            CRM
          </span>
        </div>
        <div className="px-1.5 py-1">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <div className="text-[4.5px] uppercase tracking-wider text-white/30 px-1 pt-1 pb-0.5">
                {section.title}
              </div>
              {section.items.map(({ label, active }) => (
                <div
                  key={label}
                  className={`px-1.5 py-0.5 rounded text-[6px] font-medium ${
                    active ? "bg-[#2563eb] text-white" : "text-[#94a3b8]"
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-2.5 min-w-0 flex flex-col">
        <div className="text-[9px] font-bold text-[#0f172a] tracking-tight">Dashboard</div>
        <div className="text-[5.5px] text-[#64748b] mb-1.5">Overzicht van je pipeline</div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-1 mb-1.5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-[#e2e8f0] rounded-lg p-1.5">
              <div className="text-[8px] font-bold text-[#0f172a]">{kpi.value}</div>
              <div className="text-[5px] text-[#64748b] truncate">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Agents table */}
        <div className="bg-white border border-[#e2e8f0] rounded-lg flex-1 min-h-0 overflow-hidden flex flex-col">
          <div className="px-2 py-1 border-b border-[#f1f5f9] flex items-center justify-between flex-shrink-0">
            <span className="text-[7px] font-semibold text-[#0f172a]">Agents</span>
            <span className="text-[5px] text-[#94a3b8]">12 agents</span>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {agents.map((agent) => (
              <div key={agent.name} className="px-2 py-1 flex items-center gap-1.5">
                <div className="min-w-0 flex-1">
                  <div className="text-[6px] font-medium text-[#0f172a] truncate">
                    {agent.name}
                  </div>
                  <span className="font-mono text-[5px] text-[#475569] bg-[#f1f5f9] rounded px-0.5">
                    {agent.model}
                  </span>
                </div>
                <span className={`text-[5px] font-medium rounded-full px-1 py-0.5 flex-shrink-0 ${agent.tag}`}>
                  {agent.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
