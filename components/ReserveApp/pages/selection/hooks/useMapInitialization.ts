import { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

export function useMapInitialization(project: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create map instance
    const map = L.map(mapRef.current, {
      center: [project.lat, project.lon],
      zoom: 16,
      zoomControl: false,
      attributionControl: false
    });

    // Add satellite tile layer - same as other map viewers in the project
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      maxZoom: 19
    });

    // Add satellite layer to map
    satelliteLayer.addTo(map);

    mapInstanceRef.current = map;

    // Add default Leaflet scale control
    const scaleControl = L.control.scale({
      position: 'topright',
      metric: true,
      imperial: false
    });
    
    scaleControl.addTo(map);

    // Set map as loaded
    setMapLoaded(true);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [project]);

  return {
    mapRef,
    mapInstanceRef,
    mapLoaded
  };
}
