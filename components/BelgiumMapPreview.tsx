"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

export type ViewMode = "arrondissements" | "provinces";

// Dynamically import Leaflet components to avoid SSR issues
const MapWithNoSSR = dynamic(() => import("./BelgiumMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
      <div className="text-slate-500 text-sm">Loading map...</div>
    </div>
  ),
});

export function BelgiumMapPreview() {
  const [viewMode, setViewMode] = useState<ViewMode>("arrondissements");

  return (
    <div className="relative w-full h-full overflow-hidden">
      <MapWithNoSSR viewMode={viewMode} />

      {/* View mode toggle - top center (hidden on mobile) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 md:top-3 z-[1000] hidden md:flex bg-black/70 backdrop-blur-sm rounded-full p-0.5 shadow-lg">
        <button
          onClick={() => setViewMode("arrondissements")}
          className={`px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[10px] font-semibold rounded-full transition-all ${
            viewMode === "arrondissements"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Arrondissementen
        </button>
        <button
          onClick={() => setViewMode("provinces")}
          className={`px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[10px] font-semibold rounded-full transition-all ${
            viewMode === "provinces"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          Provincies
        </button>
      </div>

      {/* UI Overlay - Tool label - below toggle on desktop, top on mobile */}
      <div className="absolute top-2 left-2 md:top-12 md:left-3 z-[1000] bg-indigo-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
        <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="text-[10px] md:text-xs font-semibold">Geografisch Zoeken</span>
      </div>

      {/* Stats badges - left side */}
      <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1 items-start">
        <div className="px-2 py-0.5 bg-amber-500/90 backdrop-blur-sm rounded text-[9px] text-white font-medium shadow-sm">
          1.2M+ BE bedrijven
        </div>
        <div className="px-2 py-0.5 bg-blue-500/90 backdrop-blur-sm rounded text-[9px] text-white font-medium shadow-sm">
          Legacy Refactor
        </div>
        <div className="px-2 py-0.5 bg-emerald-500/90 backdrop-blur-sm rounded text-[9px] text-white font-medium shadow-sm">
          GeoJSON polygons
        </div>
      </div>

      {/* KBO badge */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center gap-1">
        <div className="px-2.5 py-1 bg-orange-500 rounded text-[11px] font-bold text-white shadow-sm">
          KBO
        </div>
      </div>
    </div>
  );
}
