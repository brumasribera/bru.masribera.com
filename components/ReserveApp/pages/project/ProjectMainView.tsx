import { Project } from "../../types/types";
import { ArrowLeft, MapPin, Leaf, Users, TrendingUp, Maximize2, Minimize2, Home } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";
import { calculateMapScale, MapScaleBar } from "../../utils/mapScale.tsx";

interface ProjectMainViewProps {
  project: Project;
  onBack: () => void;
  onShowContributions: () => void;
  onLearnMore: () => void;
  onShare: () => void;
  onContribute: () => void;
  onSelectArea: () => void;
}

export function ProjectMainView({ 
  project, 
  onBack, 
  onShowContributions, 
  onLearnMore, 
  onShare, 
  onContribute, 
  onSelectArea 
}: ProjectMainViewProps) {
  const { t } = useTranslation('reserve');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const fullScreenMapRef = useRef<HTMLDivElement>(null);
  const fullScreenMapInstanceRef = useRef<L.Map | null>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mainMapScale, setMainMapScale] = useState({ distance: "1km", width: 48 });
  const [fullscreenMapScale, setFullscreenMapScale] = useState({ distance: "1km", width: 48 });
  const [animatedValues, setAnimatedValues] = useState({
    percentage: 0,
    euros: 0,
    m2: 0
  });

  const hectares = project.areaHectares || 1000;
  const totalArea = hectares;
  const purchasedArea = Math.floor(totalArea * (0.3 + (project.id.charCodeAt(0) % 20) / 100));
  const totalFunding = totalArea * project.pricePerM2;
  const raisedFunding = Math.floor(totalFunding * (0.4 + (project.id.charCodeAt(1) % 30) / 100));

  // Use shared scale calculation utility

  // Helper function to format large numbers with abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return Math.round(num).toString();
  };

  // Add custom CSS animation for progress bar and animate counters
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progressFill {
        from { width: 0%; }
        to { width: ${(raisedFunding / totalFunding) * 100}%; }
      }
      
      /* Override Leaflet cursor for minimized map only */
      .project-main-map .leaflet-container {
        cursor: default !important;
      }
      .project-main-map .leaflet-container .leaflet-interactive {
        cursor: default !important;
      }
      .project-main-map .leaflet-container svg {
        cursor: default !important;
      }
      .project-main-map .leaflet-container svg * {
        cursor: default !important;
      }
    `;
    document.head.appendChild(style);
    
    // Animate counters from 0 to final values
    const duration = 1000;
    const startTime = Date.now();
    
    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimatedValues({
        percentage: Math.round((raisedFunding / totalFunding) * 100 * progress),
        euros: Math.round(raisedFunding * progress),
        m2: Math.round(purchasedArea * progress)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };
    
    animateCounters();
    
    return () => {
      document.head.removeChild(style);
    };
  }, [raisedFunding, totalFunding, purchasedArea]);

    // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false
      }).setView([project.lat, project.lon], 13);
      
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
      }).addTo(map);

      // Generate project polygon
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

      const polygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);
      
      // Create the main polygon with MyContributions blue color
      const polygon = L.polygon(polygonPoints, {
        color: "#4fa3f7", // Softer blue fallback color
        weight: 3, // Thicker border for better visibility
        fillColor: "#4fa3f7",
        fillOpacity: 0.4,
      }).addTo(map);
      
      // Apply custom rainbow gradient styling - EXACT SAME AS MyContributions
      const polygonElement = polygon.getElement();
      if (polygonElement) {
        // Create SVG gradient definitions
        const svg = polygonElement.closest('svg');
        if (svg) {
          // Add gradient definitions
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          gradient.setAttribute('id', `project-gradient-${project.id}`);
          gradient.setAttribute('gradientUnits', 'objectBoundingBox');
          
          // Rainbow gradient stops - using the same softer color palette as MyContributions
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

         mapInstanceRef.current = map;
      
      // Add zoom event listener for scale calculation
      map.on('zoomend', () => {
        const zoom = map.getZoom();
        const { distance, width } = calculateMapScale(zoom);
        setMainMapScale({ distance, width });
      });
      
      // Set initial scale for main map
      const initialZoom = map.getZoom();
      const { distance, width } = calculateMapScale(initialZoom);
      setMainMapScale({ distance, width });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [project]);

  // Initialize fullscreen map when needed
  useEffect(() => {
    if (isFullScreen && fullScreenMapRef.current && !fullScreenMapInstanceRef.current) {
      const fullScreenMap = L.map(fullScreenMapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true
      }).setView([project.lat, project.lon], 13);
      
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: ''
      }).addTo(fullScreenMap);

      // Generate project polygon for fullscreen map
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

      const polygonPoints = generateProjectPolygon(project.id, project.lat, project.lon);
      
      // Create the main polygon with MyContributions blue color
      const polygon = L.polygon(polygonPoints, {
        color: "#4fa3f7", // Softer blue fallback color
        weight: 3, // Thicker border for better visibility
        fillColor: "#4fa3f7",
        fillOpacity: 0.4,
      }).addTo(fullScreenMap);
      
      // Apply custom rainbow gradient styling - EXACT SAME AS MyContributions
      const polygonElement = polygon.getElement();
      if (polygonElement) {
        // Create SVG gradient definitions
        const svg = polygonElement.closest('svg');
        if (svg) {
          // Add gradient definitions
          const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
          const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
          gradient.setAttribute('id', `project-fullscreen-gradient-${project.id}`);
          gradient.setAttribute('gradientUnits', 'objectBoundingBox');
          
          // Rainbow gradient stops - using the same softer color palette as MyContributions
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
       htmlElement.style.stroke = `url(#project-fullscreen-gradient-${project.id})`;
       htmlElement.style.strokeWidth = '3px';
       htmlElement.style.fill = `url(#project-fullscreen-gradient-${project.id})`;
       htmlElement.style.fillOpacity = '0.4';
     }
   }
   
      fullScreenMapInstanceRef.current = fullScreenMap;
      
      // Add zoom event listener for scale calculation in fullscreen
      fullScreenMap.on('zoomend', () => {
        const zoom = fullScreenMap.getZoom();
        const { distance, width } = calculateMapScale(zoom);
        setFullscreenMapScale({ distance, width });
      });
      
      // Set initial scale for fullscreen map
      const initialZoom = fullScreenMap.getZoom();
      const { distance, width } = calculateMapScale(initialZoom);
      setFullscreenMapScale({ distance, width });
    }

    return () => {
      if (fullScreenMapInstanceRef.current) {
        fullScreenMapInstanceRef.current.remove();
        fullScreenMapInstanceRef.current = null;
      }
    };
  }, [isFullScreen, project]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto" style={{ maxHeight: '700px', maxWidth: '380px' }}>
      {/* Header */}
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden flex-shrink-0">
        {/* Background Image */}
        <img 
          src={project.image} 
          alt={project.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[40]"
        >
          <ArrowLeft className="h-5 w-5 md:w-6 md:h-6" />
        </button>
         
        {/* Home Button - positioned top right */}
        <button
          onClick={onShowContributions}
          className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[40]"
        >
          <Home className="h-5 w-5 md:w-6 md:h-6" />
        </button>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{t(`projects.${project.id}`)}</h1>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-green-100 text-sm md:text-base">{project.country || t('common.country')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Allow vertical scrolling */}
      <div className="p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
        {/* Progress Section - Investment Motivation */}
        <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm border border-green-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900">
              {t('projectPage.projectProgress')}
            </h3>
            <span className="text-lg md:text-xl lg:text-2xl font-bold text-green-600">{animatedValues.percentage}%</span>
          </div>
          
          {/* Unified Progress Bar */}
          <div className="mb-4">
            {/* Main Progress Bar */}
            <div className="relative w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 h-4 rounded-full transition-all duration-1000 ease-out relative"
                style={{ 
                  width: `${(raisedFunding / totalFunding) * 100}%`,
                  animation: 'progressFill 1s ease-out forwards'
                }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            {/* Progress Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-4">
              <div className="text-center p-3 md:p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700 mb-1">
                  <span className="text-sm md:text-base lg:text-lg">€</span>{formatNumber(animatedValues.euros)}
                </div>
                <div className="text-xs md:text-sm text-green-600 whitespace-nowrap">{t('projectPage.raised')}</div>
                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{t('projectPage.goal')}: <span className="text-xs">€</span>{formatNumber(totalFunding)}</div>
              </div>
            
              <div className="text-center p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-1">
                  {formatNumber(animatedValues.m2)}<span className="text-sm md:text-base lg:text-lg"> m²</span>
                </div>
                <div className="text-xs md:text-sm text-blue-600 whitespace-nowrap">{t('projectPage.protected')}</div>
                <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">{t('projectPage.total')}: {formatNumber(totalArea)}<span className="text-xs"> m²</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Satellite Map with Reserve Area */}
        <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg project-main-map">
          {/* Leaflet Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-full z-0" 
            style={{ minHeight: '192px', cursor: 'default' }}
          />
          
          {/* Area Label with Square Meters - positioned top right */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-[10px] font-medium text-gray-700 shadow-lg border border-gray-200/50">
            {formatNumber(Math.round(hectares * 10000))} m²
          </div>
          
          {/* Full Screen Button - positioned top left */}
          <button
            onClick={() => setIsFullScreen(true)}
            className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50"
          >
            <Maximize2 className="h-5 w-5 md:w-6 md:h-6" />
          </button>
          
          {/* Scale Bar - positioned bottom left */}
          <MapScaleBar scale={mainMapScale} position="bottom-left" />
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-xl shadow-sm">
            <Leaf className="w-6 h-6 md:w-8 md:h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-green-700">{project.impact.biodiversity}%</div>
            <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{t('impact.biodiversity')}</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-xl shadow-sm">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-700">{project.impact.carbon}%</div>
            <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{t('impact.carbon')}</div>
          </div>
          <div className="text-center p-3 md:p-4 lg:p-6 bg-white rounded-xl shadow-sm">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-700">{project.impact.community}%</div>
            <div className="text-xs md:text-sm text-gray-600 whitespace-nowrap">{t('impact.community')}</div>
          </div>
        </div>

        {/* Enhanced Description with Motivation */}
        <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8 shadow-sm">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{t('projectPage.aboutThisProtectedArea')}</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
            {t('projectPage.conservationDescription')}
          </p>
          
          {/* Additional Motivational Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 md:p-4 lg:p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2 text-base md:text-lg">{t('projectPage.whyThisMatters')}</h4>
            <ul className="text-xs md:text-sm text-blue-800 space-y-1 list-disc pl-5">
              <li>{t('projectPage.protectsEndangeredSpecies')}</li>
              <li>{t('projectPage.absorbsCO2', { cars: Math.floor(hectares * 0.8) })}</li>
              <li>{t('projectPage.createsSustainableJobs')}</li>
              <li>{t('projectPage.preservesNaturalSources')}</li>
            </ul>
          </div>
        </div>

        {/* Reduced bottom spacing for phone mockup */}
        <div className="h-20"></div>
      </div>

      {/* Floating Contribute Button - Sticky to Bottom */}
      <div className="absolute w-full bottom-0 z-30 p-4 md:p-6 lg:p-8 pr-6 md:pr-8 lg:pr-10">
        <div className="w-full">
          <button 
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98] text-base flex items-center justify-center"
            onClick={onSelectArea}
          >
            <Leaf className="w-5 h-5 mr-2" />
            {t('projectPage.contributeToProtection')}
          </button>
        </div>
      </div>

             {/* Fullscreen Map Modal - Inside Mockup */}
       {isFullScreen && (
         <div className="absolute inset-0 bg-black z-40 flex items-center justify-center rounded-2xl overflow-hidden">
                      {/* Fullscreen Map Container */}
           <div 
             ref={fullScreenMapRef} 
             className="w-full h-full relative z-0" 
           />
           
           {/* Minimize Button */}
           <button
             onClick={() => setIsFullScreen(false)}
             className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50 z-10"
             aria-label="Exit fullscreen"
           >
             <Minimize2 className="h-5 w-5 md:w-6 md:h-6" />
           </button>
           
           {/* Scale Bar - positioned bottom left */}
           <MapScaleBar scale={fullscreenMapScale} position="bottom-left" />
         </div>
       )}
    </div>
  );
}
