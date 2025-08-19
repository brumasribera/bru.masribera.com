import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { loadContributions } from "./utils";
import { Contribution } from "./types";
import { Globe } from "lucide-react";

interface MyContributionsProps {
  onBack: () => void;
  onOpenContribution: (c: Contribution) => void;
  onGoToGlobe: () => void;
}

export function MyContributions({ onBack, onOpenContribution, onGoToGlobe }: MyContributionsProps) {
  const { t } = useTranslation('reserve');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const loadedContributions = loadContributions();
    console.log('Loaded contributions:', loadedContributions);
    setContributions(loadedContributions);
  }, []);

  // Helper function to format large numbers with abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  const totals = useMemo(() => {
    const m2 = contributions.reduce((a, c) => a + (c.m2 || 0), 0);
    const amount = contributions.reduce((a, c) => a + (c.amount || 0), 0);
    const projects = new Set(contributions.map((c) => c.projectId)).size;
    console.log('Calculated totals:', { m2, amount, projects, contributionsCount: contributions.length });
    return { m2, amount, projects };
  }, [contributions]);

  // Add custom CSS animation for progress bar and animate counters
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progressFill {
        from { width: 0%; }
        to { width: ${(totals.m2 / 1000) * 100}%; }
      }
    `;
    document.head.appendChild(style);
    
    // Animate counters from 0 to final values
    const duration = 1000; // 1 second (faster animation)
    const startTime = Date.now();
    
    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const m2Element = document.getElementById('animated-m2');
      const amountElement = document.getElementById('animated-amount');
      const projectsElement = document.getElementById('animated-projects');
      
      if (m2Element) m2Element.textContent = `${formatNumber(Math.round(totals.m2 * progress))} m²`;
      if (amountElement) amountElement.textContent = `€${formatNumber(Math.round(totals.amount * progress))}`;
      if (projectsElement) projectsElement.textContent = Math.round(totals.projects * progress).toString();
      
      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };
    
    animateCounters();
  }, [contributions, totals]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 1,
      zoomControl: false,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 19,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        maxZoom: 19,
        attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community',
      }
    ).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous layers except base
    map.eachLayer((l) => {
      // @ts-ignore
      if (l._url) return; // keep tile layer
      map.removeLayer(l);
    });

    console.log('Adding markers for contributions:', contributions.length);
    contributions.forEach((c) => {
      console.log('Creating marker for:', c.projectName, 'at', c.lat, c.lon);
      const size = Math.max(6, Math.min(18, Math.sqrt(c.m2)));
      const marker = L.circleMarker([c.lat, c.lon], {
        radius: size,
        color: "#4fa3f7", // Softer blue fallback color
        weight: 3, // Thicker border for better visibility
        fillColor: "#4fa3f7",
        fillOpacity: 0.4,
      }).addTo(map);
      
      // Apply custom rainbow gradient styling
      const markerElement = marker.getElement();
      if (markerElement) {
        // Create SVG gradient definitions
        const svg = markerElement.closest('svg');
        if (svg) {
          // Add gradient definitions
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          gradient.setAttribute('id', `reserve-gradient-${c.id}`);
          gradient.setAttribute('gradientUnits', 'objectBoundingBox');
          
          // Rainbow gradient stops - using the same softer color palette as the polygons
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
          
          // Apply gradient to marker with proper typing
          const htmlElement = markerElement as HTMLElement;
          htmlElement.style.stroke = `url(#reserve-gradient-${c.id})`;
          htmlElement.style.strokeWidth = '3px';
          htmlElement.style.fill = `url(#reserve-gradient-${c.id})`;
          htmlElement.style.fillOpacity = '0.4';
        }
      }
      
      marker.bindPopup(
        `<div style="min-width:180px">
          <div style="font-weight:600;margin-bottom:4px">${t(`projects.${c.projectId}`)}</div>
          <div style="font-size:12px;color:#065f46">${formatNumber(c.m2)} m² • €${formatNumber(c.amount)}</div>
        </div>`
      );

      // Open detail page when marker is clicked
      marker.on('click', () => onOpenContribution(c));
    });

    // Fit map to show all markers with padding
    if (contributions.length > 0) {
      const bounds = L.latLngBounds(contributions.map(c => [c.lat, c.lon]));
      map.fitBounds(bounds, { 
        padding: [20, 20],
        maxZoom: 8,
        animate: true
      });
    }
  }, [contributions, t, onOpenContribution]);

  return (
    <div className="h-full min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 overflow-y-auto">
      <div className="relative h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-6 lg:px-8">
          <div className="text-white">
            <div className="text-sm md:text-base opacity-90">{t('garden.myContributions')}</div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{t('garden.protectedAreas')}</h1>
          </div>
          <button
            onClick={onGoToGlobe}
            className="w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 absolute top-4 right-4 z-[9999]"
          >
            <Globe className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-white/20 blur-2xl rounded-full" />
      </div>

      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8 pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-2xl shadow-sm border border-green-100 flex flex-col justify-between">
            <div className="text-xs md:text-sm text-green-700 leading-tight min-h-[2.5rem] flex items-center justify-center">{t('garden.totalProtected')}</div>
            <div className="text-lg md:text-xl font-bold text-green-700 whitespace-nowrap" id="animated-m2">0 m²</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-2xl shadow-sm border border-green-100 flex flex-col justify-between">
            <div className="text-xs md:text-sm text-emerald-700 leading-tight min-h-[2.5rem] flex items-center justify-center">{t('garden.contributed')}</div>
            <div className="text-lg md:text-xl font-bold text-emerald-700 whitespace-nowrap" id="animated-amount">€0</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-2xl shadow-sm border border-green-100 flex flex-col justify-between">
            <div className="text-xs md:text-sm text-teal-700 leading-tight min-h-[2.5rem] flex items-center justify-center">{t('garden.projects')}</div>
            <div className="text-lg md:text-xl font-bold text-teal-700 whitespace-nowrap" id="animated-projects">0</div>
          </div>
        </div>

        <div className="relative h-48 md:h-60 lg:h-72 rounded-2xl overflow-hidden shadow-lg border border-green-100">
          <div ref={mapRef} className="w-full h-full" />
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs md:text-sm text-gray-700 shadow">
            {t('garden.satelliteView')}
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">{t('garden.yourAreas')}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {contributions.length === 0 && (
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-dashed border-gray-300 text-center text-gray-600">
                <div className="text-sm md:text-base">{t('garden.startProtecting')}</div>
              </div>
            )}
            {contributions.map((c) => (
              <div
                key={c.id}
                className="flex gap-3 md:gap-4 p-3 md:p-4 lg:p-6 bg-white rounded-2xl shadow-sm border border-green-100 cursor-pointer hover:bg-emerald-50 transition-colors"
                onClick={() => onOpenContribution(c)}
              >
                <img src={c.image} alt={t(`projects.${c.projectId}`)} className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-cover rounded-xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm md:text-base lg:text-lg">{t(`projects.${c.projectId}`)}</div>
                  <div className="text-xs md:text-sm text-gray-500">{t(`countries.${c.projectCountry}`)} • {new Date(c.createdAt).toLocaleDateString()}</div>
                  <div className="mt-1 text-sm md:text-base text-green-700 font-medium">{formatNumber(c.m2)} m² • €{formatNumber(c.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom spacing to ensure all content is visible in phone mockup */}
      <div className="h-32"></div>
    </div>
  );
}
