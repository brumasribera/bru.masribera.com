import { useRef, useEffect } from 'react';
import L from 'leaflet';
import { ProtectedArea } from '../types';

export function useMapLayers(
  map: L.Map | null,
  project: any,
  protectedAreas: ProtectedArea[],
  showProtectedAreas: boolean
) {
  const protectedGroupRef = useRef<L.LayerGroup | null>(null);
  const projectBoundaryRef = useRef<L.Polygon | null>(null);

  // Generate project polygon - same as ProjectMainView
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

  // Add protected areas to the map
  const addProtectedAreas = (map: L.Map) => {
    if (!protectedGroupRef.current) {
      protectedGroupRef.current = L.layerGroup();
    }
    
    const protectedGroup = protectedGroupRef.current;
    protectedGroup.clearLayers();
    
    protectedAreas.forEach(area => {
      const rect = L.rectangle(area.bounds, {
        color: 'transparent',
        weight: 0,
        fillColor: "url(#project-gradient-" + project.id + ")",
        fillOpacity: 0.8
      });

      // Add popup with area info
      rect.bindPopup(`
        <div class="text-center">
          <div class="font-semibold text-red-700">Protected Area</div>
          <div class="text-sm text-gray-600">${area.area} m²</div>
          <div class="text-xs text-gray-500">Protected by ${area.protectedBy}</div>
          <div class="text-xs text-gray-500">${new Date(area.protectedDate).toLocaleDateString()}</div>
        </div>
      `);

      protectedGroup.addLayer(rect);
    });

    if (showProtectedAreas) {
      protectedGroup.addTo(map);
    }
  };

  // Add project boundary using the organic polygon
  const addProjectBoundary = (map: L.Map) => {
    // Remove existing boundary if it exists
    if (projectBoundaryRef.current) {
      map.removeLayer(projectBoundaryRef.current);
    }

    // Generate the organic project polygon
    const polygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);
    
    // Create the project boundary polygon with the same styling as ProjectMainView
    const boundary = L.polygon(polygonPoints, {
      color: "#4fa3f7",
      weight: 3,
      fillColor: "#4fa3f7",
      fillOpacity: 0.4,
    });

    boundary.addTo(map);
    projectBoundaryRef.current = boundary;
    
    // Apply custom rainbow gradient styling - EXACT SAME AS ProjectMainView
    const polygonElement = boundary.getElement();
    if (polygonElement) {
      // Create SVG gradient definitions
      const svg = polygonElement.closest('svg');
      if (svg) {
        // Add gradient definitions
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', `project-gradient-${project.id}`);
        gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
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
        
        // Apply gradient to polygon with proper typing
        const htmlElement = polygonElement as HTMLElement;
        htmlElement.style.stroke = `url(#project-gradient-${project.id})`;
        htmlElement.style.strokeWidth = '3px';
        htmlElement.style.fill = `url(#project-gradient-${project.id})`;
        htmlElement.style.fillOpacity = '0.4';
      }
    }
    
    // Fit map to show the entire project boundary
    const bounds = L.latLngBounds(polygonPoints);
    map.fitBounds(bounds, { padding: [20, 20] });
  };

  useEffect(() => {
    if (!map) return;
    
    addProjectBoundary(map);
    addProtectedAreas(map);
    
    return () => {
      if (protectedGroupRef.current) {
        map.removeLayer(protectedGroupRef.current);
        protectedGroupRef.current = null;
      }
      if (projectBoundaryRef.current) {
        map.removeLayer(projectBoundaryRef.current);
        projectBoundaryRef.current = null;
      }
    };
  }, [map, project, protectedAreas, showProtectedAreas]);

  return {
    protectedGroupRef,
    projectBoundaryRef
  };
}
