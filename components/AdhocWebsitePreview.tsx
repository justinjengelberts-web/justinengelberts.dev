// Faithful mini-mockup of the real adhocdata.nl homepage (Angular 21 rebuild):
// navy #292c61 + orange #f76300 on white, cube logo, utility bar, hero carousel.
const journeySteps = [
  "Selecteer jouw bron",
  "Verfijn jouw doelgroep",
  "Download direct",
];

export function AdhocWebsitePreview() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col select-none">
      {/* Browser chrome */}
      <div className="bg-[#1e1e24] px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-1.5 h-1.5 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-white/10 rounded text-[8px] text-white/40 px-3 py-0.5 text-center font-mono max-w-[180px] mx-auto">
          adhocdata.nl
        </div>
      </div>

      {/* Utility bar */}
      <div className="bg-[#292c61] px-3 py-1 flex items-center justify-between flex-shrink-0">
        <span className="text-[5.5px] text-white/90">
          <span className="text-[#00b67a]">★</span> 4,8 op Trustpilot
        </span>
        <span className="text-[5.5px] text-white/80">070-2400862</span>
        <span className="text-[5.5px] text-white/80">Inloggen</span>
      </div>

      {/* Main nav */}
      <div className="bg-white border-b border-zinc-100 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          {/* 3-color cube logo */}
          <div className="grid grid-cols-2 gap-px w-3 h-3 flex-shrink-0">
            <div className="bg-[#D42B2B] rounded-[1px]" />
            <div className="bg-[#292c61] rounded-[1px] row-span-2" />
            <div className="bg-[#F5C563] rounded-[1px]" />
          </div>
          <span className="text-[7px] font-bold text-[#292c61] tracking-tight">
            AD HOC DATA
          </span>
        </div>
        <div className="flex items-center gap-2">
          {["Producten", "Branches", "Technologieën"].map((item) => (
            <span key={item} className="text-[5.5px] font-medium text-[#475569]">
              {item}
            </span>
          ))}
          <span className="text-[5.5px] font-semibold text-[#f76300] border border-[#f76300] rounded-full px-1.5 py-0.5">
            Probeer gratis
          </span>
          <span className="text-[5.5px] font-semibold text-white bg-[#f76300] rounded-full px-1.5 py-0.5">
            Maak selectie
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex items-center px-4 gap-3 min-h-0">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] md:text-[13px] font-semibold text-[#292c61] leading-tight">
            Direct toegang tot jouw zakelijke doelgroep{" "}
            <span className="text-[#f76300]">voor sales.</span>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="bg-[#f76300] text-white text-[6px] font-semibold rounded-full px-2 py-0.5">
              Aan de slag
            </span>
            <span className="border border-[#292c61]/20 text-[#292c61] text-[6px] font-semibold rounded-full px-2 py-0.5">
              Tarieven
            </span>
          </div>
          <div className="mt-1.5 text-[5.5px] text-[#475569]">
            Al 17.000+ bedrijven vertrouwen op onze data
          </div>
        </div>

        {/* Journey steps */}
        <div className="w-[100px] md:w-[110px] flex-shrink-0 flex flex-col gap-1">
          {journeySteps.map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-1.5 bg-white border border-[#292c61]/10 rounded-lg px-1.5 py-1 shadow-sm"
            >
              <span className="w-3 h-3 rounded-full bg-[#292c61] text-white text-[5.5px] font-bold flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-[5.5px] font-medium text-[#292c61] leading-tight">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Client marquee strip */}
      <div className="bg-[#292c61] px-3 py-1 flex items-center justify-between flex-shrink-0">
        {["PIRTEK", "SAINT-GOBAIN", "NESPRESSO", "ENGIE", "JDE"].map((logo) => (
          <span key={logo} className="text-[5px] font-semibold tracking-wider text-white/60">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
