// Faithful mini-mockup of the real WebModern CMS site editor (cms.webmodern.nl):
// light theme, ink #0F1F3D, primary #0C378E, magenta #EC1380 for draft status.
export function WebModernPreview() {
  return (
    <div className="absolute inset-0 bg-[#F8F9FB] flex flex-col select-none">
      {/* Browser chrome */}
      <div className="bg-[#1e1e24] px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-1.5 h-1.5 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-white/10 rounded text-[8px] text-white/40 px-3 py-0.5 text-center font-mono max-w-[180px] mx-auto">
          cms.webmodern.nl
        </div>
      </div>

      {/* Top nav */}
      <div className="bg-white border-b border-[#E0E4EB] px-3 py-1.5 flex items-center justify-between flex-shrink-0">
        <span className="text-[9px] font-semibold tracking-tight text-[#0F1F3D]">
          WebModern <span className="font-normal text-[#626D84]">CMS</span>
        </span>
        <div className="flex gap-2.5 text-[7px] font-medium text-[#626D84]">
          <span>Beheer</span>
          <span>Uitloggen</span>
        </div>
      </div>

      {/* Site editor */}
      <div className="flex-1 px-4 py-2 min-h-0 overflow-hidden">
        <div className="text-[6.5px] text-[#626D84] mb-0.5">← Alle websites</div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-bold tracking-tight text-[#0F1F3D]">
            Bakkerij De Korenbloem
          </span>
          <span className="text-[6.5px] font-medium text-[#0F1F3D] border border-[#E0E4EB] bg-white rounded px-1.5 py-0.5">
            ✎ Visueel bewerken
          </span>
        </div>

        <div className="text-[6px] font-semibold uppercase tracking-wider text-[#626D84] mb-1">
          Hero
        </div>
        <div className="bg-white border border-[#E0E4EB] rounded-lg divide-y divide-[#E0E4EB]">
          <div className="px-2.5 py-1.5">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[7px] font-medium text-[#0F1F3D]">Hero titel</span>
              <span className="text-[6px] font-medium text-[#0C378E]">✓ Opgeslagen</span>
            </div>
            <div className="border border-[#E0E4EB] rounded px-1.5 py-0.5 text-[7px] text-[#0F1F3D] bg-white truncate">
              Vers brood, elke *ochtend* gebakken
            </div>
          </div>
          <div className="px-2.5 py-1.5">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[7px] font-medium text-[#0F1F3D]">Hero subtitel</span>
              <span className="flex items-center gap-1 text-[6px] font-medium text-[#EC1380]">
                <span className="w-1 h-1 rounded-full bg-[#EC1380]" />
                Concept — niet gepubliceerd
              </span>
            </div>
            <div className="border border-[#0C378E] ring-1 ring-[#0C378E]/20 rounded px-1.5 py-0.5 text-[7px] text-[#0F1F3D] bg-white truncate">
              Ambachtelijk sinds 1962, nu ook online te bestellen
            </div>
          </div>
        </div>
      </div>

      {/* Publish bar */}
      <div className="bg-white/95 border-t border-[#E0E4EB] px-4 py-1.5 flex items-center justify-between flex-shrink-0">
        <span className="flex items-center gap-1.5 text-[6.5px] text-[#0F1F3D]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC1380]" />
          2 wijzigingen nog niet gepubliceerd
        </span>
        <span className="bg-[#0C378E] text-white text-[6.5px] font-semibold rounded px-2 py-0.5">
          Publiceer
        </span>
      </div>
    </div>
  );
}
