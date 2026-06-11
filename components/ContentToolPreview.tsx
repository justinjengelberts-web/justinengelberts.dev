// Faithful mini-mockup of the real Content Tool dashboard: cream #f8f5f2,
// navy #292c61, orange #f76300, sidebar with Dutch menu, workflow screen.
const menuItems = [
  { label: "Workflow", active: true },
  { label: "Inspiratie", active: false },
  { label: "Archief", active: false },
  { label: "Evaluatie", active: false },
  { label: "Bronnen", active: false },
  { label: "Kalender", active: false },
];

export function ContentToolPreview() {
  return (
    <div className="absolute inset-0 bg-[#f8f5f2] flex select-none">
      {/* Sidebar */}
      <div className="w-[84px] md:w-24 border-r border-[#0a0e27]/10 flex flex-col flex-shrink-0 px-1.5 py-2">
        <div className="flex items-center gap-1 mb-2 px-1">
          <div className="w-4 h-4 rounded bg-[#292c61] flex items-center justify-center text-white text-[8px] font-bold flex-shrink-0">
            A
          </div>
          <div className="leading-tight min-w-0">
            <div className="text-[6.5px] font-semibold text-[#0a0e27] tracking-tight truncate">
              Ad Hoc Data
            </div>
            <div className="text-[5px] uppercase tracking-wide text-[#475569]">Content</div>
          </div>
        </div>
        <div className="space-y-px">
          {menuItems.map(({ label, active }) => (
            <div
              key={label}
              className={`px-1.5 py-0.5 rounded text-[6px] font-medium ${
                active
                  ? "border border-[#0a0e27]/10 bg-white text-[#0a0e27] shadow-sm"
                  : "text-[#475569]"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="mt-auto px-1.5 text-[4.5px] uppercase tracking-wide text-[#475569]">
          Versie 0.1.0 · MVP
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-2.5 min-w-0 flex flex-col">
        <div className="text-[5px] uppercase tracking-[0.16em] text-[#475569]">Workflow</div>
        <div className="text-[10px] font-semibold text-[#0a0e27] tracking-tight mb-1.5">
          Maak je volgende contentstuk
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-1.5">
          <span className="bg-[#0a0e27] text-[#f8f5f2] text-[6px] font-medium rounded px-1.5 py-0.5">
            Social posts
          </span>
          <span className="border border-[#0a0e27]/10 bg-white text-[#475569] text-[6px] font-medium rounded px-1.5 py-0.5">
            Blogs
          </span>
          <span className="border border-[#0a0e27]/10 bg-white text-[#475569] text-[6px] font-medium rounded px-1.5 py-0.5">
            Nieuwsbrieven
          </span>
        </div>

        {/* LinkedIn post card */}
        <div className="bg-white border border-[#0a0e27]/10 rounded-lg p-2 mb-1.5">
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[7px] font-semibold text-[#0a0e27]">LinkedIn</span>
            <span className="bg-[#c97a14]/15 text-[#c97a14] text-[5.5px] font-medium rounded px-1 py-0.5">
              Ingepland
            </span>
          </div>
          <div className="text-[6.5px] font-medium text-[#0a0e27] truncate">
            Kunstmatige intelligentie en de toekomst van werk
          </div>
          <div className="text-[5.5px] text-[#475569] truncate">
            De snelle evolutie van AI stelt organisaties voor nieuwe uitdagingen…
          </div>
          <div className="text-[5.5px] text-[#292c61] mt-0.5">#AI #Werk #Toekomst #Innovatie</div>
        </div>

        {/* Inspiration suggestion */}
        <div className="bg-white border border-[#0a0e27]/10 rounded-lg p-1.5 flex items-center gap-1.5 mt-auto">
          <div className="bg-[#f0ebe3] rounded px-1.5 py-1 text-[8px] font-mono font-bold text-[#0a0e27] flex-shrink-0">
            78
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[6px] font-medium text-[#0a0e27] truncate">
              AI-boom sluit miljarden arbeidsplaatsen buiten
            </div>
            <div className="text-[5px] text-[#475569] truncate">Telegraaf · 2 dagen geleden</div>
          </div>
          <span className="bg-[#f76300]/10 text-[#f76300] text-[5px] font-medium rounded px-1 py-0.5 flex-shrink-0">
            Opinie
          </span>
          <span className="bg-[#f76300] text-white text-[5.5px] font-semibold rounded px-1.5 py-0.5 flex-shrink-0">
            Kies
          </span>
        </div>
      </div>
    </div>
  );
}
