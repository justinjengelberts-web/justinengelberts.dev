"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, Circle, useMapEvents, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import type { FeatureCollection, Feature, Polygon, MultiPolygon } from "geojson";
import type { Layer, PathOptions } from "leaflet";

// Skeleton placeholder component
function MapSkeleton() {
  return (
    <div className="absolute inset-0 z-[500] bg-slate-100 animate-pulse flex items-center justify-center">
      <div className="text-center">
        {/* Belgium shape silhouette */}
        <svg
          viewBox="0 0 100 80"
          className="w-32 h-24 mx-auto mb-3 text-slate-300"
          fill="currentColor"
        >
          <path d="M20,10 Q25,5 35,8 L50,5 Q65,3 75,10 L85,15 Q90,20 88,30 L90,45 Q88,55 80,60 L70,65 Q60,70 50,68 L35,72 Q25,70 18,60 L12,45 Q10,30 15,20 Z" />
        </svg>
        <div className="text-sm text-slate-400 font-medium">Loading map...</div>
      </div>
    </div>
  );
}

// Color palette for arrondissements
const ARRONDISSEMENT_COLORS = [
  "#22c55e", // green
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // purple
  "#14b8a6", // teal
  "#f97316", // orange
  "#06b6d4", // cyan
  "#ef4444", // red
  "#84cc16", // lime
];

// Radius in kilometers
const SEARCH_RADIUS_KM = 25;

// Company density per region - calibrated for ~1.2M total across 43 arrondissements
// Average ~28k per arrondissement, but heavily skewed to urban areas
const getCompanyDensity = (lat: number, lng: number): number => {
  // Brussels region - highest density (capital)
  if (lat > 50.8 && lat < 50.9 && lng > 4.3 && lng < 4.45) {
    return Math.floor(Math.random() * 20000) + 160000; // 160k-180k
  }
  // Antwerp city area - very high density
  if (lat > 51.1 && lat < 51.3 && lng > 4.3 && lng < 4.5) {
    return Math.floor(Math.random() * 20000) + 95000; // 95k-115k
  }
  // Ghent area
  if (lat > 50.9 && lat < 51.1 && lng > 3.6 && lng < 3.85) {
    return Math.floor(Math.random() * 15000) + 50000; // 50k-65k
  }
  // Other Flemish urban arrondissements (Leuven, Mechelen, etc.)
  if (lat > 50.8 && lng > 3.5 && lng < 5.5) {
    return Math.floor(Math.random() * 15000) + 30000; // 30k-45k
  }
  // Flanders general - medium-high density
  if (lat > 50.7) {
    return Math.floor(Math.random() * 10000) + 22000; // 22k-32k
  }
  // Wallonia major cities (Liège, Charleroi, Namur area)
  if (lat > 50.3 && lat < 50.7 && lng > 4.3 && lng < 5.8) {
    return Math.floor(Math.random() * 12000) + 25000; // 25k-37k
  }
  // Wallonia medium - medium density
  if (lat > 50.0 && lat < 50.7) {
    return Math.floor(Math.random() * 8000) + 12000; // 12k-20k
  }
  // Wallonia south (Luxembourg province, Ardennes) - lowest density
  return Math.floor(Math.random() * 5000) + 6000; // 6k-11k
};

// Component to handle map clicks
function MapClickHandler({
  onMapClick,
}: {
  onMapClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function BelgiumMapLeaflet() {
  const [allArrondissements, setAllArrondissements] = useState<FeatureCollection | null>(null);
  const [belgiumFill, setBelgiumFill] = useState<Feature | null>(null);
  const [belgiumOutline, setBelgiumOutline] = useState<Feature | null>(null);
  const [selectedArrondissements, setSelectedArrondissements] = useState<FeatureCollection | null>(null);
  const [clickPoint, setClickPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [companyCount, setCompanyCount] = useState<number | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load GeoJSON on mount - using pre-computed files for performance
  useEffect(() => {
    // Load all GeoJSON files in parallel for faster loading
    Promise.all([
      fetch("/belgium-arrondissements.geojson").then((res) => res.json()),
      fetch("/belgium-outline.geojson").then((res) => res.json()),
      fetch("/belgium-fill.geojson").then((res) => res.json()),
    ])
      .then(([arrondissements, outline, fill]) => {
        setAllArrondissements(arrondissements);
        setBelgiumOutline(outline);
        setBelgiumFill(fill);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load GeoJSON:", err);
        setIsLoading(false);
      });
  }, []);

  // Handle map click - find arrondissements within radius
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (!allArrondissements) return;

      setClickPoint({ lat, lng });

      // Create a circle polygon for intersection testing
      const centerPoint = turf.point([lng, lat]);
      const searchCircle = turf.circle(centerPoint, SEARCH_RADIUS_KM, { units: "kilometers" });

      // Find all arrondissements that intersect with the search circle
      const intersecting: Feature[] = [];

      for (const feature of allArrondissements.features) {
        try {
          if (turf.booleanIntersects(searchCircle, feature)) {
            intersecting.push(feature);
          }
        } catch (e) {
          // Skip problematic features
        }
      }

      if (intersecting.length > 0) {
        setSelectedArrondissements({
          type: "FeatureCollection",
          features: intersecting,
        });
        // Calculate company count based on location density
        let totalCompanies = 0;
        for (const feature of intersecting) {
          const centroid = turf.centroid(feature);
          const [cLng, cLat] = centroid.geometry.coordinates;
          totalCompanies += getCompanyDensity(cLat, cLng);
        }
        setCompanyCount(totalCompanies);
      } else {
        setSelectedArrondissements(null);
        setCompanyCount(null);
      }
    },
    [allArrondissements]
  );


  return (
    <div className="relative w-full h-full">
      {/* Show skeleton while loading */}
      {isLoading && <MapSkeleton />}

      <style jsx global>{`
        .arrondissement-tooltip {
          background: rgba(0, 0, 0, 0.8) !important;
          border: none !important;
          border-radius: 4px !important;
          color: white !important;
          font-size: 11px !important;
          font-weight: 500 !important;
          padding: 4px 8px !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
        }
        .arrondissement-tooltip::before {
          border-top-color: rgba(0, 0, 0, 0.8) !important;
        }
      `}</style>
      <MapContainer
        center={[50.5, 4.5]}
        zoom={7}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      {/* Belgium fill overlay - no stroke to avoid internal lines */}
      {belgiumFill && (
        <GeoJSON
          data={belgiumFill}
          style={{
            fillColor: "#0ea5e9",
            fillOpacity: 0.08,
            weight: 0,
          }}
        />
      )}

      {/* Belgium outer border - only the exterior ring, no internal lines */}
      {belgiumOutline && (
        <GeoJSON
          data={belgiumOutline}
          style={{
            fill: false,
            color: "#0ea5e9",
            weight: 2.5,
            opacity: 0.9,
          }}
        />
      )}

      {/* Selected arrondissements with individual colors and tooltips */}
      {selectedArrondissements && (
        <GeoJSON
          key={`selected-${clickPoint?.lat}-${clickPoint?.lng}`}
          data={selectedArrondissements}
          style={(feature) => {
            const index = selectedArrondissements.features.indexOf(feature as Feature);
            const color = ARRONDISSEMENT_COLORS[index % ARRONDISSEMENT_COLORS.length];
            return {
              fillColor: color,
              fillOpacity: 0.45,
              color: color,
              weight: 2.5,
              opacity: 1,
            };
          }}
          onEachFeature={(feature, layer) => {
            const name = feature.properties?.name_nl ||
                        feature.properties?.name_fr ||
                        feature.properties?.name ||
                        "Arrondissement";
            layer.bindTooltip(name, {
              permanent: false,
              direction: "center",
              className: "arrondissement-tooltip",
            });
          }}
        />
      )}

      {/* Search radius circle */}
      {clickPoint && (
        <Circle
          center={[clickPoint.lat, clickPoint.lng]}
          radius={SEARCH_RADIUS_KM * 1000} // Convert to meters
          pathOptions={{
            color: "#f97316",
            weight: 2,
            fillColor: "#f97316",
            fillOpacity: 0.1,
            dashArray: "5, 5",
          }}
        />
      )}

      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>

      {/* Company count overlay with export button - OUTSIDE MapContainer */}
      {companyCount && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-200">
          <div className="text-lg font-bold text-blue-600">
            {companyCount.toLocaleString("nl-BE")}
          </div>
          <div className="text-[10px] text-slate-500 mb-2">bedrijven in selectie</div>
          <button
            onClick={() => setShowExportDialog(true)}
            className="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-medium rounded flex items-center justify-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exporteer .csv
          </button>
        </div>
      )}

      {/* Export dialog modal - OUTSIDE MapContainer */}
      {showExportDialog && (
        <div className="absolute inset-0 z-[1001] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="bg-white rounded-xl shadow-2xl p-5 mx-4 max-w-[280px] text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">Dit is een demo</h3>
            <p className="text-[11px] text-slate-600 mb-4 leading-relaxed">
              Benieuwd naar de echte data? Bezoek Ad Hoc Data om {companyCount?.toLocaleString("nl-BE")}+ bedrijven te exporteren naar CSV, Excel of direct in je CRM.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowExportDialog(false)}
                className="flex-1 px-3 py-1.5 text-[10px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Sluiten
              </button>
              <a
                href="https://www.adhocdata.be"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-1.5 text-[10px] font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-center"
              >
                Naar Ad Hoc Data
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Click hint - OUTSIDE MapContainer */}
      {!clickPoint && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-[10px] text-white">Klik om te selecteren</div>
        </div>
      )}
    </div>
  );
}
