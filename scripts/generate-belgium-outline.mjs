import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import * as turf from '@turf/turf';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Loading arrondissements GeoJSON...');
const arrondissementsPath = join(__dirname, '../public/belgium-arrondissements.geojson');
const arrondissements = JSON.parse(readFileSync(arrondissementsPath, 'utf-8'));

console.log(`Found ${arrondissements.features.length} arrondissements`);

console.log('Computing union of all arrondissements...');
let combined = null;

for (let i = 0; i < arrondissements.features.length; i++) {
  const feature = arrondissements.features[i];

  if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
    if (combined === null) {
      combined = feature;
    } else {
      try {
        combined = turf.union(turf.featureCollection([combined, feature]));
      } catch (e) {
        console.warn(`Skipping problematic polygon at index ${i}`);
      }
    }
  }

  if ((i + 1) % 10 === 0) {
    console.log(`  Processed ${i + 1}/${arrondissements.features.length} arrondissements`);
  }
}

console.log('Union complete!');

if (!combined) {
  console.error('Failed to create union');
  process.exit(1);
}

// Extract the outer ring only (for the outline)
let outline;

if (combined.geometry.type === 'Polygon') {
  // Single polygon: take only the outer ring
  outline = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [combined.geometry.coordinates[0]]
    }
  };
} else if (combined.geometry.type === 'MultiPolygon') {
  // MultiPolygon: find the largest polygon (main Belgium)
  let largestArea = 0;
  let largestPoly = null;

  for (const poly of combined.geometry.coordinates) {
    const area = turf.area(turf.polygon(poly));
    if (area > largestArea) {
      largestArea = area;
      largestPoly = poly;
    }
  }

  if (largestPoly) {
    outline = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [largestPoly[0]] // Only outer ring of largest polygon
      }
    };
  }
}

// Also save the full fill (for the fill layer)
const fill = {
  type: 'Feature',
  properties: {},
  geometry: combined.geometry
};

// Save outline
const outlinePath = join(__dirname, '../public/belgium-outline.geojson');
writeFileSync(outlinePath, JSON.stringify(outline, null, 2));
console.log(`Saved outline to ${outlinePath}`);

// Save fill
const fillPath = join(__dirname, '../public/belgium-fill.geojson');
writeFileSync(fillPath, JSON.stringify(fill, null, 2));
console.log(`Saved fill to ${fillPath}`);

// Log file sizes
const outlineSize = (readFileSync(outlinePath).length / 1024).toFixed(1);
const fillSize = (readFileSync(fillPath).length / 1024).toFixed(1);
console.log(`\nFile sizes:`);
console.log(`  belgium-outline.geojson: ${outlineSize} KB`);
console.log(`  belgium-fill.geojson: ${fillSize} KB`);
console.log('\nDone!');
