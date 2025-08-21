import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { SelectedArea, ProtectedArea } from '../types';

export function useAreaSelection(
  map: L.Map | null,
  isSelectionMode: boolean,
  protectedAreas: ProtectedArea[],
  computeGridSideMeters: (map: L.Map) => number,
  gridMultiplier: number,
  project: any // Add project parameter to access polygon data
) {
  const selectedAreasLayerRef = useRef<L.LayerGroup | null>(null);

  // Generate project polygon - same as other components
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

  // Add grid cell click-to-toggle selection
  const addGridCellSelection = (map: L.Map) => {
    const onClick = (e: L.LeafletMouseEvent) => {
      if (!isSelectionMode) return;

             const gridSideMeters = computeGridSideMeters(map);
      const centerLat = map.getCenter().lat;
      const metersPerDegreeLat = 110540;
      const metersPerDegreeLng = 111320 * Math.cos(centerLat * Math.PI / 180);
      const cellSideMeters = gridSideMeters * Math.sqrt(gridMultiplier);
      const gridSpacingLat = cellSideMeters / metersPerDegreeLat;
      const gridSpacingLng = cellSideMeters / metersPerDegreeLng;

      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const latIndex = Math.floor(lat / gridSpacingLat);
      const lngIndex = Math.floor(lng / gridSpacingLng);
      const south = latIndex * gridSpacingLat;
      const north = (latIndex + 1) * gridSpacingLat;
      const west = lngIndex * gridSpacingLng;
      const east = (lngIndex + 1) * gridSpacingLng;
      const cellBounds = L.latLngBounds([south, west], [north, east]);

      // Create the original reserve polygon
      const reservePolygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);
      const reservePolygonBounds = L.latLngBounds(reservePolygonPoints);

      // Check if the cell intersects with the reserve polygon
      if (!reservePolygonBounds.intersects(cellBounds)) {
        return;
      }

      // Prevent selecting protected areas
      const overlapsProtected = protectedAreas.some(pa => cellBounds.intersects(pa.bounds));
      if (overlapsProtected) return;

      // Return the cell bounds and area for the parent component to handle
      const area = Math.round(cellSideMeters * cellSideMeters);
      return {
        bounds: cellBounds,
        area,
        id: `${cellSideMeters}-${latIndex}-${lngIndex}`
      };
    };

    map.on('click', onClick);
    
    return () => {
      map.off('click', onClick);
    };
  };

  // Function to ensure SVG gradient definitions exist
  const ensureGradientDefinitions = (map: L.Map, projectId: string) => {
    const mapContainer = map.getContainer();
    const svg = mapContainer.querySelector('svg');
    if (svg) {
      // Check if gradient already exists
      const existingGradient = svg.querySelector(`#project-gradient-${projectId}`);
      if (!existingGradient) {
        // Add gradient definitions
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', `project-gradient-${projectId}`);
        gradient.setAttribute('gradientUnits', 'objectBoundingBox');
        
        // Rainbow gradient stops - using the same softer color palette as ProjectMainView
        const stops = [
          { offset: '0%', color: '#4fa3f7' },   // Softer blue
          { offset: '25%', color: '#d46fb3' },  // Pink
          { offset: '50%', color: '#f57b42' },  // Orange
          { offset: '75%', color: '#f6e86e' },  // Pastel yellow
          { offset: '100%', color: '#7ed957' }  // Green
        ];
        
        stops.forEach(stop => {
          const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
          stopElement.setAttribute('offset', stop.offset);
          stopElement.setAttribute('stop-color', stop.color);
          gradient.appendChild(stopElement);
        });
        
        defs.appendChild(gradient);
        svg.appendChild(defs);
      }
    }
  };

  // Function to render selected areas on the map
  const renderSelectedAreas = (
    map: L.Map,
    selectedAreas: SelectedArea[],
    _projectPricePerM2: number,
    onToggleSelected?: (areaId: string) => void
  ) => {
    if (!selectedAreasLayerRef.current) return;
    
    // Ensure gradient definitions exist
    ensureGradientDefinitions(map, project.id);
    
    // Clear existing selected areas
    selectedAreasLayerRef.current.clearLayers();
    
    // Add new selected areas
    selectedAreas.forEach(area => {
      const rect = L.rectangle(area.bounds, {
        color: "url(#project-gradient-" + project.id + ")",
        weight: 3,
        fillColor: "url(#project-gradient-" + project.id + ")",
        fillOpacity: 0.4
      });

      // Add cursor styling for interactive areas
      rect.on('mouseover', () => {
        const element = rect.getElement();
        if (element) {
          (element as HTMLElement).style.cursor = 'pointer';
        }
      });

      rect.on('mouseout', () => {
        const element = rect.getElement();
        if (element) {
          (element as HTMLElement).style.cursor = '';
        }
      });



      // Clicking an already selected rectangle should toggle (deselect)
      if (onToggleSelected) {
        rect.on('click', (e: L.LeafletMouseEvent) => {
          // Stop propagation so the map click handler doesn't also fire
          if (e.originalEvent) {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();
          }
          // Also stop Leaflet's event propagation
          L.DomEvent.stopPropagation(e);
          onToggleSelected(area.id);
        });
      }

      if (selectedAreasLayerRef.current) {
        selectedAreasLayerRef.current.addLayer(rect);
      }
    });
  };

  useEffect(() => {
    if (!map) return;
    
    // Initialize selected areas layer group
    selectedAreasLayerRef.current = L.layerGroup().addTo(map);
    
    // Add click handler
    const cleanup = addGridCellSelection(map);
    
    return () => {
      cleanup?.();
      if (selectedAreasLayerRef.current) {
        map.removeLayer(selectedAreasLayerRef.current);
        selectedAreasLayerRef.current = null;
      }
    };
  }, [map, isSelectionMode, protectedAreas, computeGridSideMeters, gridMultiplier, project]);

  return {
    selectedAreasLayerRef,
    renderSelectedAreas
  };
}
