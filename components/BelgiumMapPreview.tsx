"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

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
  return (
    <div className="relative w-full h-full overflow-hidden">
      <MapWithNoSSR />

      {/* UI Overlay - Tool label */}
      <div className="absolute top-3 left-3 z-[1000]">
        <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded text-[10px] text-white font-medium">
          Geografisch Zoeken
        </div>
      </div>

      {/* Stats badges - left side */}
      <div className="absolute bottom-3 left-3 z-[1000] flex flex-col gap-1 items-start">
        <div className="px-2 py-0.5 bg-amber-500/90 backdrop-blur-sm rounded text-[9px] text-white font-medium shadow-sm">
          1.2M+ BE bedrijven
        </div>
        <div className="px-2 py-0.5 bg-blue-500/90 backdrop-blur-sm rounded text-[9px] text-white font-medium shadow-sm">
          43 arrondissementen
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
