import { useState, useCallback } from 'react';

// Map scale calculation utility for Leaflet maps
// This provides consistent scale bars across all maps in the app

export interface MapScale {
  distance: string;
  width: number;
}

// Calculate scale based on zoom level with perfect Leaflet synchronization
export const calculateMapScale = (zoom: number): MapScale => {
  // Leaflet uses 256px tiles, so at zoom 0: 1px = 156543.03392804097 meters
  // This gives us the exact scale at any zoom level
  const metersPerPixel = 156543.03392804097 / Math.pow(2, zoom);
  
  // Target scale bar width (48px = optimal size)
  const targetWidth = 48;
  const targetDistance = metersPerPixel * targetWidth;
  
  // Find the best rounded distance that fits within reasonable bounds
  let bestDistance: number;
  let bestWidth: number;
  
  if (targetDistance >= 1000) {
    // For km values, find the closest nice round number
    const kmValue = targetDistance / 1000;
    if (kmValue >= 10) {
      bestDistance = Math.round(kmValue) * 1000; // 10km, 20km, 50km, etc.
    } else if (kmValue >= 2) {
      bestDistance = Math.round(kmValue) * 1000; // 2km, 3km, 5km, etc.
    } else {
      bestDistance = 1000; // 1km
    }
  } else {
    // For meter values, use nice round numbers
    if (targetDistance >= 500) {
      bestDistance = 500; // 500m
    } else if (targetDistance >= 200) {
      bestDistance = 200; // 200m
    } else if (targetDistance >= 100) {
      bestDistance = 100; // 100m
    } else if (targetDistance >= 50) {
      bestDistance = 50; // 50m
    } else {
      bestDistance = 25; // 25m
    }
  }
  
  // Calculate the actual width needed for this distance
  bestWidth = Math.round(bestDistance / metersPerPixel);
  
  // Format the distance label
  let formattedDistance: string;
  if (bestDistance >= 1000) {
    formattedDistance = `${bestDistance / 1000}km`;
  } else {
    formattedDistance = `${bestDistance}m`;
  }
  
  return { distance: formattedDistance, width: bestWidth };
};

// React hook for managing map scale state
export const useMapScale = () => {
  const [scale, setScale] = useState<MapScale>({ distance: '1km', width: 48 });
  
  const updateScale = useCallback((zoom: number) => {
    const newScale = calculateMapScale(zoom);
    setScale(newScale);
  }, []);
  
  return { scale, updateScale };
};

// Scale bar component for consistent styling across all maps
export const MapScaleBar: React.FC<{ scale: MapScale; position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' }> = ({ 
  scale, 
  position = 'bottom-left' 
}) => {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded px-2 py-1 shadow-lg border border-gray-200/50">
      <div className="flex items-center space-x-2">
        <div 
          className="h-1 bg-gray-800 rounded-full" 
          style={{ width: `${scale.width}px` }}
        ></div>
        <span className="text-xs font-medium text-gray-700">{scale.distance}</span>
      </div>
    </div>
  );
};
