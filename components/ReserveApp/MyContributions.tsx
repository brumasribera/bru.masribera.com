import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { loadContributions } from "./utils";
import { Contribution } from "./types";
import { Home } from "lucide-react";

interface MyContributionsProps {
  onBack: () => void;
}

export function MyContributions({ onBack }: MyContributionsProps) {
  const { t } = useTranslation('reserve');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    const loadedContributions = loadContributions();
    console.log('Loaded contributions:', loadedContributions);
    setContributions(loadedContributions);
  }, []);

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
      
      if (m2Element) m2Element.textContent = `${Math.round(totals.m2 * progress).toLocaleString()} m²`;
      if (amountElement) amountElement.textContent = `€${Math.round(totals.amount * progress).toFixed(2)}`;
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
      zoom: 2,
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
          <div style="font-size:12px;color:#065f46">${c.m2} m² • €${c.amount.toFixed(
            2
          )}</div>
        </div>`
      );
    });
  }, [contributions, t]);

  return (
    <div className="h-full bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 overflow-y-auto">
      <div className="relative h-40 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="text-white">
            <div className="text-sm opacity-90">{t('garden.myContributions')}</div>
            <h1 className="text-2xl font-bold">{t('garden.protectedAreas')}</h1>
          </div>
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 absolute top-2 right-4 z-50"
          >
            <Home className="h-5 w-5" />
          </button>
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-white/20 blur-2xl rounded-full" />
      </div>

      <div className="p-6 space-y-6 pb-28">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-green-100">
            <div className="text-xs text-green-700">{t('garden.totalProtected')}</div>
            <div className="text-2xl font-bold text-green-700" id="animated-m2">0 m²</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-green-100">
            <div className="text-xs text-emerald-700">{t('garden.contributed')}</div>
            <div className="text-2xl font-bold text-emerald-700" id="animated-amount">€0</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm border border-green-100">
            <div className="text-xs text-teal-700">{t('garden.projects')}</div>
            <div className="text-2xl font-bold text-teal-700" id="animated-projects">0</div>
          </div>
        </div>

        <div className="relative h-60 rounded-2xl overflow-hidden shadow-lg border border-green-100">
          <div ref={mapRef} className="w-full h-full" />
          <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs text-gray-700 shadow">
            {t('garden.satelliteView')}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{t('garden.yourAreas')}</h3>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {contributions.length === 0 && (
              <div className="p-6 bg-white rounded-2xl border border-dashed border-gray-300 text-center text-gray-600">
                {t('garden.startProtecting')}
              </div>
            )}
            {contributions.map((c) => (
              <div key={c.id} className="flex gap-3 p-3 bg-white rounded-2xl shadow-sm border border-green-100">
                <img src={c.image} alt={t(`projects.${c.projectId}`)} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{t(`projects.${c.projectId}`)}</div>
                  <div className="text-xs text-gray-500">{t(`countries.${c.projectCountry}`)} • {new Date(c.createdAt).toLocaleDateString()}</div>
                  <div className="mt-1 text-sm text-green-700 font-medium">{c.m2} m² • €{c.amount.toFixed(2)} • {c.method === 'card' ? t('payment.card') : t('payment.paypal')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
