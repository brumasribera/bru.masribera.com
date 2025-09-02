import { Project } from "../../types/types";
import { ArrowLeft, CheckCircle, Heart, Share2, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { calculateMapScale, MapScaleBar } from "../../utils/mapScale.tsx";

interface ProjectSuccessProps {
  project: Project;
  selectedArea: number;
  onBack: () => void;
  onHome?: () => void;
}

export function ProjectSuccess({ project, selectedArea, onBack, onHome }: ProjectSuccessProps) {
  const { t } = useTranslation('reserve');
  const [mapScale, setMapScale] = useState({ distance: '1km', width: 48 });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Ensure selectedArea is a number and handle edge cases
  const area = typeof selectedArea === 'number' ? selectedArea : 0;
  const totalAmount = area * (project?.pricePerM2 || 0);
  const formattedAmount = isNaN(totalAmount) ? '0.00' : totalAmount.toFixed(2);
  const formattedArea = area.toLocaleString();

  // Debug logging
  console.log('ProjectSuccess props:', { 
    project, 
    selectedArea, 
    area, 
    totalAmount, 
    formattedAmount, 
    formattedArea,
    projectPrice: project?.pricePerM2,
    projectType: typeof project,
    projectKeys: project ? Object.keys(project) : 'no project'
  });

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || !project) return;

    // Create map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false
    }).setView([project.lat, project.lon], 13);

    // Add satellite tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; Esri'
    }).addTo(map);

    // Create protected area polygon (simulate user's contribution area)
    const centerLat = project.lat;
    const centerLon = project.lon;
    const offset = 0.002; // Small offset for the protected area

    const protectedAreaBounds: [number, number][] = [
      [centerLat - offset, centerLon - offset],
      [centerLat - offset, centerLon + offset],
      [centerLat + offset, centerLon + offset],
      [centerLat + offset, centerLon - offset]
    ];

    // Add protected area with gradient styling (matching other maps)
    const protectedArea = L.polygon(protectedAreaBounds, {
      color: "#4fa3f7", // Softer blue fallback color
      weight: 3, // Thicker border for better visibility
      fillColor: "#4fa3f7",
      fillOpacity: 0.4,
    }).addTo(map);

    // Apply custom rainbow gradient styling - EXACT SAME AS other maps
    const polygonElement = protectedArea.getElement();
    if (polygonElement) {
      // Create SVG gradient definitions
      const svg = polygonElement.closest('svg');
      if (svg) {
        // Add gradient definitions
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', `success-map-gradient-${project.id}`);
        gradient.setAttribute('gradientUnits', 'objectBoundingBox');
        
        // Rainbow gradient stops - using the same softer color palette as other maps
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
        htmlElement.style.stroke = `url(#success-map-gradient-${project.id})`;
        htmlElement.style.strokeWidth = '3px';
        htmlElement.style.fill = `url(#success-map-gradient-${project.id})`;
        htmlElement.style.fillOpacity = '0.4';
      }
    }

    // Add zoom event listener for scale calculation
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      const { distance, width } = calculateMapScale(zoom);
      setMapScale({ distance, width });
    });
    
    // Set initial scale
    const initialZoom = map.getZoom();
    const { distance, width } = calculateMapScale(initialZoom);
    setMapScale({ distance, width });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [project]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={onBack} 
          className="w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Home Button */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={onHome || onBack} 
          className="w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Success Message */}
        <div className="text-center py-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('common.thankYou')}</h1>
          <p className="text-lg text-gray-600">{t('common.contributionProcessed')}</p>
        </div>

        {/* Project Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="relative h-48 bg-gradient-to-br from-green-400 to-emerald-500">
            <img 
              src={project?.image || ''} 
              alt={t(`projects.${project?.id}`)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">{t(`projects.${project?.id}`)}</h2>
              <p className="text-green-100 font-medium">{project?.country || t('common.country')}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-xl font-bold text-green-700">{formattedArea}</div>
                <div className="text-sm text-green-600">{t('common.m2Protected')}</div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-xl">
                <div className="text-xl font-bold text-emerald-700">€{formattedAmount}</div>
                <div className="text-sm text-emerald-600">{t('common.contributed')}</div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {t('common.successfullyProtected', { area: formattedArea, project: t(`projects.${project?.id}`) })}
              </p>
              <div className="flex items-center justify-center text-green-600">
                <Heart className="w-5 h-5 mr-2 fill-current" />
                <span className="text-sm font-medium">{t('common.thankYouContribution')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protected Area Map */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
          <div className="p-4 border-b border-green-100">
            <h3 className="text-lg font-semibold text-gray-800">{t('common.yourProtectedArea')}</h3>
            <p className="text-sm text-gray-600">{t('common.areaProtectedIn', { country: project?.country })}</p>
          </div>
          <div className="relative h-64">
            <div ref={mapRef} className="w-full h-full" />
            
            {/* Area info overlay */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
              <div className="text-xs font-medium text-gray-700">{formattedArea} m²</div>
              <div className="text-xs text-gray-500">{t('common.protected')}</div>
            </div>
            
            {/* Scale Bar - positioned bottom left to avoid overlap with area info */}
            <MapScaleBar scale={mapScale} position="bottom-left" />
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('common.yourImpact')}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">{t('common.biodiversityProtection')}</span>
              <span className="font-semibold text-green-700">+{project?.impact?.biodiversity || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
              <span className="text-gray-700">{t('common.carbonSequestration')}</span>
              <span className="font-semibold text-emerald-700">+{project?.impact?.carbon || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">{t('common.communitySupport')}</span>
              <span className="font-semibold text-blue-700">+{project?.impact?.community || 0}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('common.whatsNext')}</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• {t('common.confirmationEmail')}</p>
            <p>• {t('common.trackImpact')}</p>
            <p>• {t('common.shareContribution')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => window.open(`https://twitter.com/intent/tweet?text=I just protected ${formattedArea}m² of ${project?.name || 'this project'}! Join me in making a difference.`, '_blank')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>{t('common.shareYourImpact')}</span>
          </button>
          
          <button 
            onClick={onBack}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
          >
            {t('successPage.backToProject')}
          </button>
        </div>
      </div>
    </div>
  );
}
