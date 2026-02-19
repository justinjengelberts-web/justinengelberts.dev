"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

export type ViewMode = "arrondissements" | "provinces" | "postcodes";

// Radius constants
const DEFAULT_RADIUS_KM = 25;
const MIN_RADIUS_KM = 5;
const MAX_RADIUS_KM = 100;

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
  const [searchRadius, setSearchRadius] = useState(DEFAULT_RADIUS_KM);
  const [hasSelection, setHasSelection] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col">
      {/* Map container - takes remaining space */}
      <div className="relative flex-1 min-h-0">
        <MapWithNoSSR
          viewMode={viewMode}
          searchRadius={searchRadius}
          onSearchRadiusChange={setSearchRadius}
          onSelectionChange={setHasSelection}
        />

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
          <button
            onClick={() => setViewMode("postcodes")}
            className={`px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-[10px] font-semibold rounded-full transition-all ${
              viewMode === "postcodes"
                ? "bg-white text-black"
                : "text-white/70 hover:text-white"
            }`}
          >
            Postcodes
          </button>
        </div>

        {/* UI Overlay - Tool label - top left corner, same height as KBO */}
        <div className="absolute top-3 left-3 z-[1000] bg-indigo-600 text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[10px] md:text-xs font-semibold">Geo Zoeken</span>
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

      {/* Mobile radius slider - outside map, at bottom */}
      {hasSelection && (
        <div className="md:hidden bg-slate-900 px-4 py-2 flex items-center gap-3">
          <span className="text-[10px] text-white/70">Radius</span>
          <input
            type="range"
            min={MIN_RADIUS_KM}
            max={MAX_RADIUS_KM}
            value={searchRadius}
            onChange={(e) => setSearchRadius(Number(e.target.value))}
            className="flex-1 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-[10px] font-semibold text-white min-w-[40px]">{searchRadius} km</span>
        </div>
      )}
    </div>
  );
}
