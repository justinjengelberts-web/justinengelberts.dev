export function AdhocWebsitePreview() {
  return (
    <div className="absolute inset-0 bg-zinc-900 flex flex-col select-none">
      {/* Browser chrome */}
      <div className="bg-[#1e1e24] px-3 py-2 flex items-center gap-2 flex-shrink-0">
        <div className="flex gap-1.5">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <div className="flex-1 bg-white/10 rounded text-[9px] text-white/40 px-3 py-0.5 text-center font-mono max-w-[200px] mx-auto">
          adhocdata.nl
        </div>
        <span className="px-1.5 py-0.5 rounded border border-red-400/40 text-red-300 text-[8px] font-semibold">
          Angular 21 SSR
        </span>
      </div>

      {/* Site mock */}
      <div className="flex-1 bg-white flex flex-col min-h-0">
        {/* Nav */}
        <div className="px-4 py-2 flex items-center justify-between border-b border-zinc-100 flex-shrink-0">
          <span className="text-[10px] font-bold text-zinc-800">
            Ad Hoc <span className="text-blue-600">Data</span>
          </span>
          <div className="flex gap-3">
            {["Data", "Sectoren", "Prijzen", "Contact"].map((item) => (
              <span key={item} className="text-[8px] text-zinc-500 font-medium">
                {item}
              </span>
            ))}
            <span className="text-[8px] px-1.5 rounded bg-zinc-100 text-zinc-500 font-semibold">
              NL · EN
            </span>
          </div>
        </div>

        {/* Hero */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="text-[13px] md:text-base font-bold text-zinc-900 leading-tight">
            B2B leadlijsten op maat
          </div>
          <div className="text-[8px] md:text-[9px] text-zinc-400 mt-1 max-w-[260px]">
            Live search door de volledige SBI-2025 taxonomie
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[8px] px-2.5 py-1 rounded-full bg-blue-600 text-white font-semibold">
              Start selectie
            </span>
            <span className="text-[8px] px-2.5 py-1 rounded-full border border-zinc-200 text-zinc-500 font-semibold">
              Bekijk sectoren
            </span>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-zinc-100 px-4 py-2 grid grid-cols-4 gap-2 flex-shrink-0">
          {[
            { v: "137", l: "components" },
            { v: "50+", l: "routes" },
            { v: "10", l: "viewports tested" },
            { v: "SSR", l: "+ hreflang SEO" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-[10px] font-bold text-zinc-800">{s.v}</div>
              <div className="text-[7px] text-zinc-400">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
