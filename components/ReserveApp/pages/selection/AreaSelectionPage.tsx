import { useState, useEffect } from 'react';
import { ArrowLeft, Edit3 } from 'lucide-react';
import L from 'leaflet';
import { AreaSelectionPageProps, SelectedArea } from './types';
import { useMapInitialization } from './hooks/useMapInitialization';
import { useMapGrid } from './hooks/useMapGrid';
import { useMapLayers } from './hooks/useMapLayers';
import { useAreaSelection } from './hooks/useAreaSelection';
import { useTranslation } from 'react-i18next';
import { calculateMapScale, MapScaleBar } from '../../utils/mapScale.tsx';


export function AreaSelectionPage({ project, onBack, onContinue }: AreaSelectionPageProps) {
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>([]);
  const [totalSelectedArea, setTotalSelectedArea] = useState(0);
  const [isSelectionMode] = useState(true);
  const [showProtectedAreas] = useState(true);
  const [showGrid] = useState(true);
  const [gridMultiplier] = useState(1);
  const [isPinging, setIsPinging] = useState(false);
  const [mapScale, setMapScale] = useState({ distance: '1km', width: 48 });
  const { t } = useTranslation('reserve');

  // Initialize map
  const { mapRef, mapInstanceRef, mapLoaded, updateScale } = useMapInitialization(project);

  // Add zoom event listener for scale calculation
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    
    const map = mapInstanceRef.current;
    
    const handleZoomEnd = () => {
      const zoom = map.getZoom();
      const newScale = updateScale(zoom);
      setMapScale(newScale);
    };
    
    map.on('zoomend', handleZoomEnd);
    
    // Set initial scale
    const initialZoom = map.getZoom();
    const initialScale = updateScale(initialZoom);
    setMapScale(initialScale);
    
    return () => {
      map.off('zoomend', handleZoomEnd);
    };
  }, [mapLoaded, updateScale]);

  // Ensure SVG gradient definitions are available
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

  // Mock protected areas data - in real app this would come from API
  const [protectedAreas] = useState([
    {
      id: '1',
      bounds: L.latLngBounds(
        [project.lat + 0.001, project.lon - 0.001],
        [project.lat + 0.002, project.lon + 0.001]
      ),
      area: 2500,
      protectedBy: 'John D.',
      protectedDate: '2024-01-15'
    },
    {
      id: '2',
      bounds: L.latLngBounds(
        [project.lat - 0.001, project.lon - 0.002],
        [project.lat, project.lon - 0.001]
      ),
      area: 1800,
      protectedBy: 'Sarah M.',
      protectedDate: '2024-02-20'
    },
    {
      id: '3',
      bounds: L.latLngBounds(
        [project.lat - 0.002, project.lon + 0.001],
        [project.lat - 0.001, project.lon + 0.002]
      ),
      area: 3200,
      protectedBy: 'Mike R.',
      protectedDate: '2024-03-10'
    }
  ]);

  // Setup map grid
  const { computeGridSideMeters } = useMapGrid(
    mapInstanceRef.current,
    showGrid,
    gridMultiplier,
    project,
    protectedAreas
  );

  // Setup map layers
  useMapLayers(
    mapInstanceRef.current,
    project,
    protectedAreas,
    showProtectedAreas
  );

  // Setup area selection
  const { renderSelectedAreas } = useAreaSelection(
    mapInstanceRef.current,
    isSelectionMode,
    protectedAreas,
    computeGridSideMeters,
    gridMultiplier,
    project
  );

  // Ensure gradients are available when map is loaded
  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      ensureGradientDefinitions(mapInstanceRef.current, project.id);
    }
  }, [mapLoaded, project.id]);

  // Handle grid cell clicks for area selection
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;

    const map = mapInstanceRef.current;
    
    // Generate project polygon for boundary checking
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
    
    const handleMapClick = (e: L.LeafletMouseEvent) => {
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

      // Check if the cell center is inside the reserve polygon
      const reservePolygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);
      const isPointInPolygon = (point: [number, number], polygon: [number, number][]) => {
        const [y, x] = point;
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          const [yi, xi] = polygon[i];
          const [yj, xj] = polygon[j];
          const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi + 0.0) + xi);
          if (intersect) inside = !inside;
        }
        return inside;
      };

      const cellCenter: [number, number] = [south + (north - south) / 2, west + (east - west) / 2];
      if (!isPointInPolygon(cellCenter, reservePolygonPoints)) return;

      // Prevent selecting protected areas
      const overlapsProtected = protectedAreas.some(pa => cellBounds.intersects(pa.bounds));
      if (overlapsProtected) return;

      // Toggle selection
      setSelectedAreas(prev => {
        const existingIndex = prev.findIndex(area => area.id === `${cellSideMeters}-${latIndex}-${lngIndex}`);
        
        if (existingIndex >= 0) {
          // Remove if already selected
          const newAreas = [...prev];
          newAreas.splice(existingIndex, 1);
          return newAreas;
        } else {
          // Add new selection
          const newArea: SelectedArea = {
            id: `${cellSideMeters}-${latIndex}-${lngIndex}`,
            bounds: cellBounds,
            area: Math.round(cellSideMeters * cellSideMeters)
          };
          return [...prev, newArea];
        }
      });
    };

    map.on('click', handleMapClick);
    
    return () => {
      map.off('click', handleMapClick);
    };
  }, [mapInstanceRef, mapLoaded, isSelectionMode, computeGridSideMeters, gridMultiplier, protectedAreas, project]);

  // Grid size calculation is handled by the useMapGrid hook

  // Render selected areas when they change
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return;
    
    const map = mapInstanceRef.current;
    renderSelectedAreas(map, selectedAreas, project.pricePerM2, (areaId: string) => {
      setSelectedAreas(prev => prev.filter(a => a.id !== areaId));
    });
  }, [selectedAreas, mapLoaded, project.pricePerM2, renderSelectedAreas]);

  // Calculate total selected area
  useEffect(() => {
    const total = selectedAreas.reduce((sum, area) => sum + area.area, 0);
    setTotalSelectedArea(total);
  }, [selectedAreas]);

  // Note: selected areas can be removed by clicking again on the same grid cell

  const handleConfirmClick = () => {
    setIsPinging(true);
    setTimeout(() => {
      onContinue(totalSelectedArea);
      setIsPinging(false);
    }, 180);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden relative">
      {/* Desktop grid: map left, summary right */}
      <div className="h-full lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="relative w-full h-full lg:col-span-9">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300 z-40"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Map Container */}
          <div className="relative w-full h-full">
            <div
              ref={mapRef}
              className="w-full h-full z-0"
              style={{ cursor: 'default' }}
            />
          </div>

          {/* Scale Bar - top right */}
          <div className="absolute top-4 right-4">
            <MapScaleBar scale={mapScale} position="top-right" />
          </div>

          {/* Confirmation Button - bottom center (mobile only) */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
            {totalSelectedArea > 0 ? (
              <button
                onClick={handleConfirmClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-green-500 hover:border-green-600 flex items-center space-x-2"
              >
                <span className="text-sm font-semibold">{t('common.confirm')}</span>
                <span className="text-xs opacity-90">
                  {totalSelectedArea} m² €{(totalSelectedArea * project.pricePerM2).toFixed(2)}
                </span>
              </button>
            ) : (
              <div className="bg-gray-400 text-white px-6 py-3 rounded-full font-medium shadow-lg border border-gray-300 flex items-center space-x-2 opacity-75">
                <span className="text-sm font-semibold">Select cells to continue</span>
              </div>
            )}
          </div>
        </div>

        {/* Right summary (desktop) */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky top-24 p-4 space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('projectPage.yourSelection') || 'Your selection'}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-green-700">{t('projectPage.selectedArea') || 'Selected area'}</span>
                  <span className="font-semibold text-green-800">{totalSelectedArea} m²</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <span className="text-sm text-blue-700">{t('projectPage.estimatedCost') || 'Estimated cost'}</span>
                  <span className="font-semibold text-blue-800">€{(totalSelectedArea * project.pricePerM2).toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={handleConfirmClick}
                disabled={totalSelectedArea === 0}
                className={`mt-4 w-full py-3 font-semibold rounded-xl shadow-lg transition-all duration-200 ${
                  totalSelectedArea === 0
                    ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                    : 'bg-gradient-to-r from-green-600 to-emerald-700 text-white hover:from-green-700 hover:to-emerald-700'
                }`}
              >
                {t('common.confirm')}
              </button>
            </div>
            <div className="text-xs text-gray-500">
              {t('projectPage.selectionHint') || 'Select grid cells inside the reserve polygon. Protected areas are not selectable.'}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
