"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, Circle, useMapEvents, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import type { FeatureCollection, Feature, Polygon, MultiPolygon } from "geojson";
import type { Layer, PathOptions } from "leaflet";
import type { ViewMode } from "./BelgiumMapPreview";

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

// Color palette for regions (arrondissements and provinces)
const REGION_COLORS = [
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

// Default radius in kilometers
const DEFAULT_RADIUS_KM = 25;
const MIN_RADIUS_KM = 5;
const MAX_RADIUS_KM = 100;

// Company density per km² - calibrated for ~1.2M total across Belgium (~30,500 km²)
// Average ~39/km², but heavily skewed to urban areas
const getCompanyDensityPerKm2 = (lat: number, lng: number): number => {
  // Brussels region - highest density (capital) ~1000/km²
  if (lat > 50.8 && lat < 50.9 && lng > 4.3 && lng < 4.45) {
    return 900 + Math.floor(Math.random() * 200);
  }
  // Antwerp city area - very high density ~150/km²
  if (lat > 51.1 && lat < 51.3 && lng > 4.3 && lng < 4.5) {
    return 120 + Math.floor(Math.random() * 60);
  }
  // Ghent area ~100/km²
  if (lat > 50.9 && lat < 51.1 && lng > 3.6 && lng < 3.85) {
    return 80 + Math.floor(Math.random() * 40);
  }
  // Other Flemish urban areas (Leuven, Mechelen, etc.) ~70/km²
  if (lat > 50.8 && lng > 3.5 && lng < 5.5) {
    return 55 + Math.floor(Math.random() * 30);
  }
  // Flanders general - medium-high density ~50/km²
  if (lat > 50.7) {
    return 40 + Math.floor(Math.random() * 20);
  }
  // Wallonia major cities (Liège, Charleroi, Namur area) ~45/km²
  if (lat > 50.3 && lat < 50.7 && lng > 4.3 && lng < 5.8) {
    return 35 + Math.floor(Math.random() * 20);
  }
  // Wallonia medium - medium density ~20/km²
  if (lat > 50.0 && lat < 50.7) {
    return 15 + Math.floor(Math.random() * 10);
  }
  // Wallonia south (Luxembourg province, Ardennes) - lowest density ~8/km²
  return 6 + Math.floor(Math.random() * 4);
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

interface BelgiumMapLeafletProps {
  viewMode?: ViewMode;
  searchRadius: number;
  onSearchRadiusChange: (radius: number) => void;
  onSelectionChange: (hasSelection: boolean) => void;
}

export default function BelgiumMapLeaflet({
  viewMode = "arrondissements",
  searchRadius,
  onSearchRadiusChange,
  onSelectionChange,
}: BelgiumMapLeafletProps) {
  const [allArrondissements, setAllArrondissements] = useState<FeatureCollection | null>(null);
  const [allProvinces, setAllProvinces] = useState<FeatureCollection | null>(null);
  const [allPostcodes, setAllPostcodes] = useState<FeatureCollection | null>(null);
  const [belgiumFill, setBelgiumFill] = useState<Feature | null>(null);
  const [belgiumOutline, setBelgiumOutline] = useState<Feature | null>(null);
  const [selectedRegions, setSelectedRegions] = useState<FeatureCollection | null>(null);
  const [clickPoint, setClickPoint] = useState<{ lat: number; lng: number } | null>(null);
  const [companyCount, setCompanyCount] = useState<number | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get current regions based on view mode
  const currentRegions = viewMode === "provinces"
    ? allProvinces
    : viewMode === "postcodes"
      ? allPostcodes
      : allArrondissements;

  // Detect mobile for initial zoom level - more zoomed out on mobile to show all of Belgium
  const [initialZoom, setInitialZoom] = useState<number | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize map after a small delay to ensure DOM is ready
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setInitialZoom(isMobile ? 6.3 : 7);

    // Delay map render to avoid Strict Mode race conditions
    const timer = setTimeout(() => {
      setIsMapReady(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Load GeoJSON on mount - using pre-computed files for performance
  useEffect(() => {
    const abortController = new AbortController();

    // Load all GeoJSON files in parallel for faster loading
    Promise.all([
      fetch("/belgium-arrondissements.geojson", { signal: abortController.signal }).then((res) => res.json()),
      fetch("/belgium-provinces.geojson", { signal: abortController.signal }).then((res) => res.json()),
      fetch("/belgium-postcodes.geojson", { signal: abortController.signal }).then((res) => res.json()),
      fetch("/belgium-outline.geojson", { signal: abortController.signal }).then((res) => res.json()),
      fetch("/belgium-fill.geojson", { signal: abortController.signal }).then((res) => res.json()),
    ])
      .then(([arrondissements, provinces, postcodes, outline, fill]) => {
        if (!abortController.signal.aborted) {
          setAllArrondissements(arrondissements);
          setAllProvinces(provinces);
          setAllPostcodes(postcodes);
          setBelgiumOutline(outline);
          setBelgiumFill(fill);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error("Failed to load GeoJSON:", err);
          setIsLoading(false);
        }
      });

    return () => abortController.abort();
  }, []);

  // Reset selection when view mode changes
  useEffect(() => {
    setSelectedRegions(null);
    setClickPoint(null);
    setCompanyCount(null);
    onSelectionChange(false);
  }, [viewMode, onSelectionChange]);

  // Notify parent when selection changes
  useEffect(() => {
    onSelectionChange(clickPoint !== null);
  }, [clickPoint, onSelectionChange]);

  // Recalculate selection when radius changes
  useEffect(() => {
    if (!clickPoint || !currentRegions) return;

    const centerPoint = turf.point([clickPoint.lng, clickPoint.lat]);
    const searchCircle = turf.circle(centerPoint, searchRadius, { units: "kilometers" });

    const intersecting: Feature[] = [];
    for (const feature of currentRegions.features) {
      try {
        if (turf.booleanIntersects(searchCircle, feature)) {
          intersecting.push(feature);
        }
      } catch (e) {
        // Skip problematic features
      }
    }

    if (intersecting.length > 0) {
      setSelectedRegions({
        type: "FeatureCollection",
        features: intersecting,
      });
      let totalCompanies = 0;
      for (const feature of intersecting) {
        const centroid = turf.centroid(feature);
        const [cLng, cLat] = centroid.geometry.coordinates;
        // Calculate area in km² and multiply by density per km²
        const areaM2 = turf.area(feature);
        const areaKm2 = areaM2 / 1_000_000;
        const densityPerKm2 = getCompanyDensityPerKm2(cLat, cLng);
        totalCompanies += Math.floor(areaKm2 * densityPerKm2);
      }
      setCompanyCount(totalCompanies);
    } else {
      setSelectedRegions(null);
      setCompanyCount(null);
    }
  }, [searchRadius, clickPoint, currentRegions, viewMode]);

  // Handle map click - find regions within radius
  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (!currentRegions) return;

      setClickPoint({ lat, lng });

      // Create a circle polygon for intersection testing
      const centerPoint = turf.point([lng, lat]);
      const searchCircle = turf.circle(centerPoint, searchRadius, { units: "kilometers" });

      // Find all regions that intersect with the search circle
      const intersecting: Feature[] = [];

      for (const feature of currentRegions.features) {
        try {
          if (turf.booleanIntersects(searchCircle, feature)) {
            intersecting.push(feature);
          }
        } catch (e) {
          // Skip problematic features
        }
      }

      if (intersecting.length > 0) {
        setSelectedRegions({
          type: "FeatureCollection",
          features: intersecting,
        });
        // Calculate company count based on area and location density
        let totalCompanies = 0;
        for (const feature of intersecting) {
          const centroid = turf.centroid(feature);
          const [cLng, cLat] = centroid.geometry.coordinates;
          // Calculate area in km² and multiply by density per km²
          const areaM2 = turf.area(feature);
          const areaKm2 = areaM2 / 1_000_000;
          const densityPerKm2 = getCompanyDensityPerKm2(cLat, cLng);
          totalCompanies += Math.floor(areaKm2 * densityPerKm2);
        }
        setCompanyCount(totalCompanies);
      } else {
        setSelectedRegions(null);
        setCompanyCount(null);
      }
    },
    [currentRegions, viewMode, searchRadius]
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
      {isMapReady && initialZoom && (
      <MapContainer
        center={[50.5, 4.5]}
        zoom={initialZoom}
        className="w-full h-full"
        zoomControl={false}
        attributionControl={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
      >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />

      {/* Belgium fill overlay - no stroke to avoid internal lines */}
      {belgiumFill && (
        <GeoJSON
          data={belgiumFill}
          interactive={false}
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
          interactive={false}
          style={{
            fill: false,
            color: "#0ea5e9",
            weight: 2.5,
            opacity: 0.9,
          }}
        />
      )}

      {/* Selected regions with individual colors and tooltips */}
      {selectedRegions && (
        <GeoJSON
          key={`selected-${viewMode}-${clickPoint?.lat}-${clickPoint?.lng}-${searchRadius}-${selectedRegions.features.length}`}
          data={selectedRegions}
          style={(feature) => {
            const index = selectedRegions.features.indexOf(feature as Feature);
            const color = REGION_COLORS[index % REGION_COLORS.length];
            return {
              fillColor: color,
              fillOpacity: 0.45,
              color: color,
              weight: 2.5,
              opacity: 1,
            };
          }}
          onEachFeature={(feature, layer) => {
            const name = feature.properties?.postcode ||
                        feature.properties?.name_nl ||
                        feature.properties?.name_fr ||
                        feature.properties?.name ||
                        feature.properties?.NAME_1 ||
                        (viewMode === "provinces" ? "Provincie" : viewMode === "postcodes" ? "Postcode" : "Arrondissement");
            layer.bindTooltip(name, {
              permanent: false,
              direction: "center",
              className: "arrondissement-tooltip",
            });
          }}
        />
      )}

      {/* Search radius circle - no fill, just border outline on top of polygons */}
      {clickPoint && (
        <Circle
          center={[clickPoint.lat, clickPoint.lng]}
          radius={searchRadius * 1000} // Convert to meters
          pathOptions={{
            color: "#2563eb",
            weight: 3,
            fillOpacity: 0,
            dashArray: "10, 6",
            opacity: 1,
          }}
        />
      )}

      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
      )}

      {/* Company count overlay with export button - OUTSIDE MapContainer */}
      {companyCount && (
        <div className="absolute bottom-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-slate-200">
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

      {/* Radius slider - bottom center (desktop only) */}
      {clickPoint && (
        <div className="hidden md:block absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/70">Radius</span>
            <input
              type="range"
              min={MIN_RADIUS_KM}
              max={MAX_RADIUS_KM}
              value={searchRadius}
              onChange={(e) => onSearchRadiusChange(Number(e.target.value))}
              className="w-32 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <span className="text-[10px] font-semibold text-white min-w-[40px]">{searchRadius} km</span>
          </div>
        </div>
      )}

      {/* Click hint - OUTSIDE MapContainer */}
      {!clickPoint && (
        <div className="absolute bottom-3 right-3 z-[1000] bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-[10px] text-white">
            <span className="md:hidden">Klik om bedrijven te selecteren</span>
            <span className="hidden md:inline">Klik binnen België om bedrijven te selecteren</span>
          </div>
        </div>
      )}
    </div>
  );
}
