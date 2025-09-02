import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { ProtectedArea } from '../types';

export function useMapGrid(
	map: L.Map | null,
	showGrid: boolean,
	gridMultiplier: number,
	project: any, // Add project parameter
	protectedAreas: ProtectedArea[]
) {
  const gridGroupRef = useRef<L.LayerGroup | null>(null);

  // Helpers to derive a dynamic grid side length (in meters) based on zoom, then round to a 1-2-5 series
  // Note: getMetersPerPixel is not used currently but kept for potential future features

  const roundSideToNiceSeries = (meters: number) => {
    if (meters <= 0) return 1;
    const multipliers = [1, 2, 5];
    const exponent = Math.floor(Math.log10(meters));
    const base = Math.pow(10, exponent);
    const normalized = meters / base;
    for (const m of multipliers) {
      if (normalized <= m) return m * base;
    }
    // If larger than highest multiplier, move to next power of 10
    return 1 * base * 10;
  };

  const computeGridSideMeters = (map: L.Map) => {
    const zoom = map.getZoom();
    // Grid cells get smaller as zoom increases for precise area selection
    // At zoom 19 (max): ~10m cells, at zoom 13: ~100m cells, at zoom 10: ~500m cells
    const idealMeters = Math.max(10, Math.min(500, 1000 * Math.pow(0.5, zoom - 10)));
    return roundSideToNiceSeries(idealMeters);
  };

  // Add grid overlay to the map
  const addGridOverlay = (map: L.Map) => {
    if (!gridGroupRef.current) {
      gridGroupRef.current = L.layerGroup().addTo(map);
    }
    
    const gridGroup = gridGroupRef.current;
    
    const drawGrid = () => {
      gridGroup.clearLayers();
      
      if (!showGrid) return;

      const bounds = map.getBounds();
      const gridSideMeters = computeGridSideMeters(map);

      // Convert desired side meters to degrees for lat/lng (approximate, adjust lng by cos(lat))
      const centerLat = map.getCenter().lat;
      const metersPerDegreeLat = 110540; // average meters per degree latitude
      const metersPerDegreeLng = 111320 * Math.cos(centerLat * Math.PI / 180);
      const cellSideMeters = gridSideMeters * Math.sqrt(gridMultiplier);
      const gridSpacingLat = cellSideMeters / metersPerDegreeLat;
      const gridSpacingLng = cellSideMeters / metersPerDegreeLng;

      // Generate project polygon for clipping
      const generateProjectPolygon = (projectId: string, centerLat: number, centerLng: number) => {
        let hash = 0;
        for (let i = 0; i < projectId.length; i++) {
          const char = projectId.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        
        const points: [number, number][] = [];
        const numPoints = 8 + (hash % 4);
        const baseRadius = 0.008;
        
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * 2 * Math.PI;
          const radiusVariation = (hash % 6) * 0.0004;
          const baseRadiusWithVariation = baseRadius + radiusVariation;
          const waveVariation = Math.sin(angle * 3) * 0.0004;
          const organicVariation = (hash % 3 - 1) * 0.0002;
          const adjustedRadius = baseRadiusWithVariation + waveVariation + organicVariation;
          
          const lat = centerLat + Math.cos(angle) * adjustedRadius;
          const lng = centerLng + Math.sin(angle) * adjustedRadius;
          points.push([lat, lng]);
        }
        
        return points;
      };

      // Use the project parameter passed to the hook
      const reservePolygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);

      // Point-in-polygon (ray casting) for [lat, lng]
      const isPointInPolygon = (point: [number, number], polygon: [number, number][]) => {
        const [y, x] = point;
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [yi, xi] = polygon[i];
          const [yj, xj] = polygon[j];
          const intersect = ((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi + 0.0) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
      };

      // Draw only grid cells whose centers are inside the reserve polygon and not intersecting protected areas
      const startLat = Math.floor(bounds.getSouth() / gridSpacingLat) * gridSpacingLat;
      const startLng = Math.floor(bounds.getWest() / gridSpacingLng) * gridSpacingLng;

      for (let lat = startLat; lat <= bounds.getNorth(); lat += gridSpacingLat) {
        for (let lng = startLng; lng <= bounds.getEast(); lng += gridSpacingLng) {
          const south = lat;
          const north = lat + gridSpacingLat;
          const west = lng;
          const east = lng + gridSpacingLng;
          const cellBounds = L.latLngBounds([south, west], [north, east]);

          // Check if the entire cell is inside the polygon, not just the center
          const cellCorners: [number, number][] = [
            [south, west], [south, east], [north, west], [north, east]
          ];
          const allCornersInside = cellCorners.every(corner => 
            isPointInPolygon(corner, reservePolygonPoints)
          );
          if (!allCornersInside) continue;

          const overlapsProtected = protectedAreas?.some(pa => cellBounds.intersects(pa.bounds));
          if (overlapsProtected) continue;

          const rect = L.rectangle(cellBounds, {
            color: '#e5e7eb',
            weight: 1,
            opacity: 0.6,
            dashArray: '5,5',
            fillOpacity: 0
          });


          gridGroup.addLayer(rect);
        }
      }
    };

    map.on('moveend', drawGrid);
    map.on('zoomend', drawGrid);
    
    // Initial draw
    drawGrid();
  };

  useEffect(() => {
    if (!map) return;
    
    addGridOverlay(map);
    
    return () => {
      if (gridGroupRef.current) {
        map.removeLayer(gridGroupRef.current);
        gridGroupRef.current = null;
      }
    };
  }, [map, showGrid, gridMultiplier, project, protectedAreas]);

  return {
    computeGridSideMeters: (mapInstance: L.Map) => computeGridSideMeters(mapInstance),
    gridGroupRef
  };
}
