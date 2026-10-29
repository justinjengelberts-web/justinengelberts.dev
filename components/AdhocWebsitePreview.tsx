import type { ReactNode } from "react";

type AdhocWebsitePreviewProps = {
  variant?: "card" | "case-study";
};

const funnelSteps = [
  { label: "Alle Nederlandse bedrijven", detail: "Startpunt in Register-data", count: "3.803.179", width: "w-full" },
  { label: "Branche: Schoonmaak", detail: "Bedrijven in de schoonmaakbranche", count: "30.059", width: "w-[44%]" },
  { label: "Regio: Zuid-Holland", detail: "Alleen bedrijven in de gewenste regio", count: "8.070", width: "w-[24%]" },
  { label: "Werknemers: 1-100", detail: "Geselecteerd op bedrijfsomvang", count: "7.292", width: "w-[17%]" },
  { label: "Telefoon & e-mail", detail: "Klaar voor direct outreach", count: "448", width: "w-[14%]" },
];

const clientNames = ["PIRTEK", "Fortune Coffee", "SAINT-GOBAIN", "NESPRESSO", "ENGIE"];

function AdhocLogo({ className }: { className: string }) {
  return (
    <svg viewBox="-60 -60 636 632" aria-label="Ad Hoc Data" className={className}>
      <path fill="#D42B2B" d="M259.33.26q.08 0 .16.02l233.62 54.35a.22.22 0 0 1 .04.41L262.41 154.16a4.68 4.63 28.5 0 1-1.14.33q-.02.01-1.94.01-1.91 0-1.93-.01a4.68 4.63-28.5 0 1-1.14-.33L25.51 55.05a.22.22 0 0 1 .04-.41L259.17.28q.08-.02.16-.02Z" />
      <path fill="#E8A830" d="M235 197.41v313.36a.34.34 0 0 1-.56.26L55.42 362.28a.34.34 0 0 1-.11-.2L.36 87.11a.34.34 0 0 1 .48-.37l233.97 110.36a.34.34 0 0 1 .19.31Z" />
      <path fill="#1B2A6B" d="M281.52 510.8V197.41a.33.33 0 0 1 .19-.3L515.74 86.73a.33.33 0 0 1 .46.36l-54.98 275.02a.33.33 0 0 1-.11.18L282.06 511.05a.33.33 0 0 1-.54-.25Z" />
    </svg>
  );
}

function TrustpilotStar() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-2 w-2 fill-[#00b67a]">
      <path d="m10 1.7 2.08 5.72 6.09.15-4.79 3.77 1.64 5.87L10 13.82l-5.02 3.38 1.64-5.87-4.79-3.77 6.09-.15L10 1.7Z" />
    </svg>
  );
}

function PreviewMotion() {
  return (
    <style>{`
      @keyframes adhoc-live-pulse {
        0%, 100% { opacity: .45; transform: scale(.75); }
        50% { opacity: 1; transform: scale(1); }
      }
      @keyframes adhoc-funnel-step {
        0%, 9% { opacity: .38; transform: translateY(2px); }
        19%, 86% { opacity: 1; transform: translateY(0); }
        100% { opacity: .38; transform: translateY(2px); }
      }
      @keyframes adhoc-funnel-bar {
        0%, 9% { transform: scaleX(.1); opacity: .45; }
        21%, 86% { transform: scaleX(1); opacity: 1; }
        100% { transform: scaleX(.1); opacity: .45; }
      }
      @keyframes adhoc-client-marquee {
        from { transform: translateX(-33.333%); }
        to { transform: translateX(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .adhoc-motion-step, .adhoc-motion-bar, .adhoc-motion-live, .adhoc-client-marquee { animation: none !important; }
      }
    `}</style>
  );
}

function HeroPreview(): ReactNode {
  return (
    <div className="absolute inset-0 flex select-none flex-col overflow-hidden bg-white font-sans">
      <PreviewMotion />

      <div className="flex flex-shrink-0 items-center gap-2 bg-[#1e1e24] px-3 py-1.5">
        <div className="flex gap-1">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((color) => (
            <span key={color} className={`h-1.5 w-1.5 rounded-full ${color}`} />
          ))}
        </div>
        <span className="mx-auto max-w-[180px] flex-1 rounded bg-white/10 px-3 py-0.5 text-center font-mono text-[8px] text-white/40">
          adhocdata.nl
        </span>
      </div>

      <div className="flex flex-shrink-0 items-center justify-between border-b border-white/10 bg-[#202555] px-3 py-1 text-[5px] text-white/80">
        <span className="flex items-center gap-1"><strong className="text-white">4,8</strong><TrustpilotStar /> op Trustpilot</span>
        <span className="flex items-center gap-1.5 text-white/70"><span>070-2400862</span><i className="h-2 border-l border-white/25" /><span>NL</span><i className="h-2 border-l border-white/25" /><span>Inloggen</span></span>
      </div>

      <div className="flex flex-shrink-0 items-center justify-between border-b border-[#0a0e27]/[0.08] px-3 py-1.5">
        <div className="flex items-center gap-1.5 text-[6.5px] font-bold tracking-tight text-[#292c61]">
          <AdhocLogo className="h-4 w-4 flex-shrink-0" />
          Ad Hoc Data
        </div>
        <div className="flex items-center gap-2 text-[4.75px] font-medium text-[#475569]">
          <span>Oplossingen</span><span>Onze data</span><span>Prijzen</span><span>Branches</span>
          <span className="rounded-full bg-[#f76300] px-1.5 py-0.5 font-semibold text-white">Stel je doelgroep samen</span>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.03fr_.97fr] items-center gap-3 px-4 py-3">
        <div className="min-w-0">
          <span className="text-[4.75px] font-bold uppercase tracking-[0.11em] text-[#f76300]">Zelfbedieningsplatform voor B2B-bedrijfsdata</span>
          <h4 className="mt-1 text-[10px] font-semibold leading-[1.08] tracking-tight text-[#292c61] md:text-[12px]">Stel <span className="text-[#f76300]">zelf</span> je zakelijke doelgroep samen</h4>
          <p className="mt-1.5 max-w-[172px] text-[4.75px] leading-[1.55] text-[#475569]">Selecteer bedrijven op actuele bedrijfskenmerken, contactgegevens, regio, branche, technologie en website-informatie.</p>
          <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[4.25px] font-medium text-[#475569]">
            {["Beste prijs-kwaliteit", "130+ filters", "Actuele data", "Telefonisch advies"].map((item) => (
              <span key={item} className="flex items-center gap-0.5"><i className="h-1 w-1 rounded-full bg-[#f76300]" />{item}</span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1">
            <span className="rounded-full bg-[#f76300] px-1.5 py-0.5 text-[4.5px] font-semibold text-white">Stel je doelgroep samen</span>
            <span className="rounded-full border border-[#292c61]/35 px-1.5 py-[2px] text-[4.5px] font-semibold text-[#292c61]">Probeer 100 leads gratis</span>
          </div>
          <div className="mt-1.5 inline-flex items-center gap-0.5 rounded-full border border-[#0a0e27]/10 px-1.5 py-[2px] text-[4.1px] text-[#475569] shadow-[0_2px_7px_rgba(10,14,39,0.06)]">
            Vertrouwd door <strong className="text-[#292c61]">18.000+</strong> bedrijven <i className="mx-0.5 h-1 w-px bg-[#475569]/30" /><TrustpilotStar /><strong className="text-[#292c61]">4,8</strong>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#0a0e27]/[0.08] bg-white p-2 shadow-[0_8px_24px_rgba(10,14,39,0.12)]">
          <div className="mb-1.5 flex items-baseline justify-between border-b border-[#0a0e27]/[0.08] pb-1.5">
            <span className="text-[5.25px] font-bold text-[#0a0e27]">Voorbeeldselectie</span>
            <span className="flex items-center gap-0.75 text-[3.75px] font-semibold uppercase tracking-[0.08em] text-[#475569]"><i className="adhoc-motion-live h-1 w-1 rounded-full bg-[#f76300]" style={{ animation: "adhoc-live-pulse 1.8s ease-in-out infinite" }} />Live-telling</span>
          </div>
          <div className="space-y-1.25">
            {funnelSteps.map((step, index) => (
              <div key={step.label} className="adhoc-motion-step" style={{ animation: `adhoc-funnel-step 5.4s cubic-bezier(.16,1,.3,1) ${index * 0.36}s infinite` }}>
                <div className="mb-0.5 flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <span className={`block truncate text-[4.25px] font-semibold leading-tight ${index === 0 || index === funnelSteps.length - 1 ? "text-[#0a0e27]" : "text-[#475569]"}`}>{index > 0 ? "+ " : ""}{step.label}</span>
                    <span className="block truncate text-[3.25px] leading-tight text-[#475569]/70">{step.detail}</span>
                  </div>
                  <strong className="font-mono text-[4.5px] font-semibold tabular-nums text-[#292c61]">{step.count}</strong>
                </div>
                <div className="h-[2px] overflow-hidden rounded-full bg-[#f8f9fc]"><span className={`adhoc-motion-bar block h-full origin-left rounded-full bg-[#292c61] ${step.width}`} style={{ animation: `adhoc-funnel-bar 5.4s cubic-bezier(.16,1,.3,1) ${index * 0.36}s infinite` }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex items-center justify-between border-t border-[#0a0e27]/[0.08] pt-1.5">
            <span><small className="block text-[3.25px] font-bold uppercase tracking-[0.08em] text-[#475569]">Jouw lijst</small><strong className="text-[5px] text-[#292c61]">448 bedrijven</strong></span>
            <span className="text-[4px] font-semibold text-[#f76300]">Stel zelf samen</span>
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 overflow-hidden border-t border-[#0a0e27]/[0.06] bg-[#f8f9fc] py-1 text-[4px] font-bold tracking-[0.04em] text-[#64748b]">
        <div className="adhoc-client-marquee flex w-max flex-shrink-0 will-change-transform" style={{ animation: "adhoc-client-marquee 18s linear infinite" }}>
          {[0, 1, 2].map((set) => (
            <div key={set} className="flex min-w-[230px] flex-shrink-0 items-center justify-between pr-3">
              {clientNames.map((client) => <span key={client} className="whitespace-nowrap">{client}</span>)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdhocWebsitePreview({ variant = "card" }: AdhocWebsitePreviewProps) {
  if (variant === "case-study") {
    return (
      <div className="absolute inset-0 overflow-hidden bg-white">
        <div className="relative h-[57.15%] w-[57.15%] origin-top-left scale-[1.75]">
          <HeroPreview />
        </div>
      </div>
    );
  }

  return <HeroPreview />;
}
