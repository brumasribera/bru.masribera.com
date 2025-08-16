import { Project } from "./types";
import { ArrowLeft, MapPin, DollarSign, Leaf, Users, TrendingUp } from "lucide-react";
import { useEffect, useRef } from "react";
import L from "leaflet";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

interface ProtectedAreaPageProps {
  project: Project;
  onBack: () => void;
}

export function ProtectedAreaPage({ project, onBack }: ProtectedAreaPageProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Generate georeferenced polygon for each project based on project ID
  const generateProjectPolygon = (projectId: string, centerLat: number, centerLng: number) => {
    // Use project ID to seed a simple hash for consistent polygon generation
    let hash = 0;
    for (let i = 0; i < projectId.length; i++) {
      const char = projectId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate simple, non-crossing polygon based on hash
    const points: [number, number][] = [];
    const numPoints = 6 + (hash % 3); // 6-8 points for simplicity
    
    // Create a simple star-like or blob shape that won't cross itself
    // Use smaller radius to ensure polygon fits well within the map view
    const baseRadius = 0.015; // Smaller base radius for better centering
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const radius = baseRadius + (hash % 10) * 0.001; // Vary radius between 0.015-0.025 degrees
      
      // Add some controlled variation for natural look
      const variation = (hash % 6 - 3) * 0.001; // Smaller variation
      const adjustedRadius = radius + variation;
      
      const lat = centerLat + Math.cos(angle) * adjustedRadius;
      const lng = centerLng + Math.sin(angle) * adjustedRadius;
      
      points.push([lat, lng]);
      hash = (hash * 9301 + 49297) % 233280; // Simple pseudo-random progression
    }
    
    return points;
  };

  const hectares = 1000 + (project.id.charCodeAt(0) * project.id.charCodeAt(1)) % 5000; // Consistent hectares per project

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    console.log('Initializing map for project:', project.name, 'at coordinates:', project.lat, project.lon);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current) {
        console.log('Map ref not available after delay');
        return;
      }

      try {
        // Initialize Leaflet map
        const map = L.map(mapRef.current, {
          center: [project.lat, project.lon],
          zoom: 12,
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          touchZoom: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false
        });

        console.log('Map initialized successfully');

        // Add satellite tile layer using a more reliable provider
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        }).addTo(map);

        // Generate and add the project polygon
        const polygonCoords = generateProjectPolygon(project.id, project.lat, project.lon);
        console.log('Generated polygon coordinates:', polygonCoords);
        
        const polygon = L.polygon(polygonCoords, {
          color: '#3b82f6',
          weight: 3,
          fillColor: '#3b82f6',
          fillOpacity: 0.4
        }).addTo(map);

        // Fit map to show the entire polygon
        map.fitBounds(polygon.getBounds(), { padding: [20, 20] });

        mapInstanceRef.current = map;
        console.log('Map setup completed');
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [project.id, project.lat, project.lon]);

  return (
    <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-48 overflow-hidden">
        {/* Background Image */}
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back to Globe Button */}
        <button
          onClick={() => {
            console.log('Back button clicked, calling onBack');
            onBack();
          }}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-green-100">{project.country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Satellite Map with Reserve Area */}
        <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
          {/* Leaflet Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-full z-0" 
            style={{ minHeight: '192px' }}
          />
          
          {/* Reserve Area Info Overlay */}
          <div className="absolute bottom-4 left-4 text-white z-10">
            <div className="text-2xl font-bold">${project.pricePerM2}/m²</div>
            <div className="text-sm text-green-200">Price per square meter</div>
          </div>
          
          {/* Area Label with Hectares - positioned top right */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-gray-700 shadow-lg border border-gray-200/50 z-10">
            {hectares} ha
          </div>
          
          {/* Invest Button - positioned in center */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20 backdrop-blur-sm">
              Buy m²
            </button>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-700">{project.impact.biodiversity}%</div>
            <div className="text-sm text-gray-600">Biodiversity</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-700">{project.impact.carbon}%</div>
            <div className="text-sm text-gray-600">Carbon</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-700">{project.impact.community}%</div>
            <div className="text-sm text-gray-600">Community</div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About This Protected Area</h3>
          <p className="text-gray-600 leading-relaxed">
            This conservation project protects vital ecosystems and wildlife habitats. 
            Your contribution helps maintain biodiversity, sequester carbon, and support 
            local communities through sustainable practices.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98]">
            <DollarSign className="w-5 h-5 inline mr-2" />
            Contribute to Protection
          </button>
          <button className="w-full py-3 border-2 border-green-600 text-green-600 font-medium rounded-2xl hover:bg-green-50 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
