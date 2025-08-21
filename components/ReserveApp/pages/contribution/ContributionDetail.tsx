import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Contribution } from "../../types/types";
import { ArrowLeft } from "lucide-react";

interface ContributionDetailProps {
  contribution: Contribution;
  onBack: () => void;
}

export function ContributionDetail({ contribution, onBack }: ContributionDetailProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Convert protected area (m²) to circle radius in meters: r = sqrt(area / π)
  const radiusMeters = Math.max(10, Math.sqrt(contribution.m2 / Math.PI));

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [contribution.lat, contribution.lon],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      }
    ).addTo(map);

    // Exact area circle overlay
    const circle = L.circle([contribution.lat, contribution.lon], {
      radius: radiusMeters,
      color: "#22c55e",
      weight: 2,
      fillColor: "#22c55e",
      fillOpacity: 0.25,
    }).addTo(map);

    // Fit view to circle bounds
    map.fitBounds(circle.getBounds(), { padding: [24, 24] });

    mapInstanceRef.current = map;
    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [contribution.lat, contribution.lon, radiusMeters]);

  const formatEuros = (value: number) => `€${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 overflow-y-auto">
      <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 absolute top-4 left-4 z-[9999]"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <div className="text-white text-center flex-1">
            <div className="text-sm md:text-base opacity-90">My Contribution</div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{contribution.projectName}</h1>
          </div>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-white/20 blur-2xl rounded-full" />
      </div>

      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 pb-28">
        <div className="relative h-72 md:h-96 lg:h-[32rem] rounded-2xl overflow-hidden shadow-lg border border-green-100">
          <div ref={mapRef} className="w-full h-full" />

          {/* Info pill */}
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs md:text-sm text-gray-700 shadow">
            Satellite view
          </div>

          <div className="absolute bottom-3 left-3 right-3 md:left-4 md:right-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="text-xs text-green-700">Exact Area</div>
                <div className="text-lg md:text-xl font-bold text-green-700 whitespace-nowrap">{contribution.m2.toLocaleString()} m²</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="text-xs text-emerald-700">Contributed</div>
                <div className="text-lg md:text-xl font-bold text-emerald-700 whitespace-nowrap">{formatEuros(contribution.amount)}</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm border border-green-100">
                <div className="text-xs text-teal-700">Method</div>
                <div className="text-lg md:text-xl font-bold text-teal-700 whitespace-nowrap">{contribution.method.toUpperCase()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom spacing to ensure all content is visible in phone mockup */}
      <div className="h-32"></div>
    </div>
  );
}


