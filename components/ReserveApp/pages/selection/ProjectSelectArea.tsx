import { Project } from "../../types/types";
import { ArrowLeft, Leaf, MapPin, Pointer, Ruler, Edit3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";
import { AreaSelectionPage } from "./AreaSelectionPage";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ProjectSelectAreaProps {
  project: Project;
  onBack: () => void;
  onContinue: (area: number) => void;
}

export function ProjectSelectArea({ project, onBack, onContinue }: ProjectSelectAreaProps) {
  const { t } = useTranslation('reserve');
  const [inputMode, setInputMode] = useState<'area' | 'price' | 'manual'>('area'); // 'area' for m², 'price' for €, 'manual' for drawing
  const [selectedArea, setSelectedArea] = useState(100); // Default 100 m²
  const [customPrice, setCustomPrice] = useState(60); // Default €60
  const [totalPrice, setTotalPrice] = useState(0);
  const [showManualSelection, setShowManualSelection] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<any[]>([]); // Store selected areas from manual selection
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Debug logging for state changes
  useEffect(() => {
    console.log('ProjectSelectArea state changed:', { inputMode, selectedArea, totalPrice, showManualSelection });
  }, [inputMode, selectedArea, totalPrice, showManualSelection]);

  // Calculate values based on input mode
  useEffect(() => {
    if (inputMode === 'area') {
      setTotalPrice(selectedArea * project.pricePerM2);
      setCustomPrice(selectedArea * project.pricePerM2);
    } else if (inputMode === 'price') {
      setTotalPrice(customPrice);
      setSelectedArea(Math.round(customPrice / project.pricePerM2));
    }
    // Manual mode doesn't need calculation here as it's handled in the AreaSelectionPage
  }, [selectedArea, customPrice, inputMode, project.pricePerM2]);

  // Initialize map for showing selected areas
  useEffect(() => {
    if (!mapRef.current || inputMode !== 'manual' || selectedAreas.length === 0) return;

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

    // Add selected areas to map
    selectedAreas.forEach((area, index) => {
      const bounds = area.bounds;
      if (bounds && bounds._southWest && bounds._northEast) {
        const polygon = L.rectangle(bounds, {
          color: "#4fa3f7",
          weight: 3,
          fillColor: "#4fa3f7",
          fillOpacity: 0.4,
        }).addTo(map);

        // Apply rainbow gradient styling
        const polygonElement = polygon.getElement();
        if (polygonElement) {
          const svg = polygonElement.closest('svg');
          if (svg) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `selection-map-gradient-${project.id}-${index}`);
            gradient.setAttribute('gradientUnits', 'objectBoundingBox');
            
            const stops = [
              { offset: '0%', color: '#4fa3f7' },
              { offset: '25%', color: '#d46fb3' },
              { offset: '50%', color: '#f57b42' },
              { offset: '75%', color: '#f6e86e' },
              { offset: '100%', color: '#7ed957' }
            ];
            
            stops.forEach(stop => {
              const stopElement = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
              stopElement.setAttribute('offset', stop.offset);
              stopElement.setAttribute('stop-color', stop.color);
              gradient.appendChild(stopElement);
            });
            
            defs.appendChild(gradient);
            svg.appendChild(defs);
            
            const htmlElement = polygonElement as HTMLElement;
            htmlElement.style.stroke = `url(#selection-map-gradient-${project.id}-${index})`;
            htmlElement.style.strokeWidth = '3px';
            htmlElement.style.fill = `url(#selection-map-gradient-${project.id}-${index})`;
            htmlElement.style.fillOpacity = '0.4';
          }
        }
      }
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [inputMode, selectedAreas, project]);

  // Handle manual area selection result
  const handleManualAreaSelected = (manualArea: number) => {
    console.log('handleManualAreaSelected called with:', manualArea);
    setSelectedArea(manualArea);
    setTotalPrice(manualArea * project.pricePerM2);
    // For now, we'll create a mock selected areas array based on the area
    // In a real implementation, this would come from the AreaSelectionPage
    const mockAreas = [{
      id: 'mock-area',
      bounds: L.latLngBounds(
        [project.lat - 0.001, project.lon - 0.001],
        [project.lat + 0.001, project.lon + 0.001]
      ),
      area: manualArea
    }];
    setSelectedAreas(mockAreas);
    setShowManualSelection(false);
    setInputMode('manual');
    console.log('State updated - selectedArea:', manualArea, 'totalPrice:', manualArea * project.pricePerM2);
  };

  // Handle manual mode selection - automatically open map selector
  const handleManualModeSelect = () => {
    setInputMode('manual');
    setShowManualSelection(true);
  };

  // Helper function to format large numbers with abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return Math.round(num).toString();
  };

  // If manual selection is active, show the AreaSelectionPage
  if (showManualSelection) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-hidden">
        <AreaSelectionPage
          project={project}
          onBack={() => setShowManualSelection(false)}
          onContinue={handleManualAreaSelected}
        />
      </div>
    );
  }

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
          className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[9999]"
        >
          <ArrowLeft className="h-5 w-5 md:w-6 md:h-6" />
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

      {/* Content */}
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
                 {/* Area Selection Section */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
           <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6 text-center">
             {t('projectPage.selectArea')}
           </h2>
           
           {/* Input Mode Toggle */}
           <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
             <button
               onClick={() => setInputMode('area')}
               className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                 inputMode === 'area'
                   ? 'bg-white text-green-600 shadow-sm'
                   : 'text-gray-600 hover:text-gray-800'
               }`}
             >
               <Ruler className="w-3 h-3 inline mr-1" />
               By area
             </button>
             <button
               onClick={() => setInputMode('price')}
               className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                 inputMode === 'price'
                   ? 'bg-white text-green-600 shadow-sm'
                   : 'text-gray-600 hover:text-gray-800'
               }`}
             >
               <Leaf className="w-3 h-3 inline mr-1" />
               By price
             </button>
                                                       <button
                 onClick={handleManualModeSelect}
                 className={`flex-1 py-2 px-3 rounded-md text-xs font-medium transition-all ${
                   inputMode === 'manual'
                     ? 'bg-white text-green-600 shadow-sm'
                     : 'text-gray-600 hover:text-gray-800'
                 }`}
               >
                                   <Pointer className="w-3 h-3 inline mr-1 transform rotate-45" />
                  Manual
               </button>
           </div>
           
                       {/* Manual Selection Mode - Show map when areas are selected */}
            {inputMode === 'manual' && selectedAreas.length > 0 ? (
              <div className="mb-6">
                {/* Map with selected areas */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="relative h-48">
                    <div ref={mapRef} className="w-full h-full" />
                    
                    {/* Edit button - top right corner */}
                    <button
                      onClick={() => setShowManualSelection(true)}
                      className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200 hover:border-gray-300 z-10"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    
                    {/* Area info overlay */}
                    <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200">
                      <div className="text-xs font-medium text-gray-700">{formatNumber(selectedArea)} m²</div>
                      <div className="text-xs text-gray-500">{t('common.selected')}</div>
                    </div>
                  </div>
                </div>
               
               {selectedArea > 0 && (
                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200 mt-3">
                   <div className="flex items-center justify-between">
                     <div className="text-sm text-green-700">
                       <span className="font-medium">{formatNumber(selectedArea)} m²</span>
                     </div>
                     <div className="text-lg font-bold text-green-700">
                       €{formatNumber(totalPrice)}
                     </div>
                   </div>
                 </div>
               )}
             </div>
            ) : inputMode === 'manual' ? (
              <div className="mb-6 text-center">
                                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                   <Pointer className="w-6 h-6 text-blue-600 mx-auto mb-2 transform rotate-45" />
                   <h3 className="text-base font-semibold text-blue-900 mb-2">Interactive Selection</h3>
                  <p className="text-xs text-blue-700 mb-3">Select areas on satellite view with grid overlay</p>
                  <button
                    onClick={() => setShowManualSelection(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 mx-auto text-sm"
                  >
                    <MapPin className="w-3 h-3" />
                    Open Map
                  </button>
                </div>
              </div>
            ) : null}

           {/* Area Input Mode */}
            {inputMode === 'area' && (
              <div className="mb-8">
                <div className="relative mb-4">
                   <input
                     type="number"
                     min="10"
                     max="1000"
                     step="10"
                     value={selectedArea}
                     onChange={(e) => setSelectedArea(Number(e.target.value))}
                     className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-semibold bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                     placeholder="Enter area"
                   />
                   <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">m²</span>
                 </div>
                 
                 {/* Preset Buttons */}
                 <div className="grid grid-cols-3 gap-2 mb-4">
                   <button
                     onClick={() => setSelectedArea(100)}
                     className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                   >
                     100 m²
                   </button>
                   <button
                     onClick={() => setSelectedArea(250)}
                     className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                   >
                     250 m²
                   </button>
                   <button
                     onClick={() => setSelectedArea(500)}
                     className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                   >
                     500 m²
                   </button>
                 </div>
              </div>
            )}
           
                       {/* Price Input Mode */}
            {inputMode === 'price' && (
              <div className="mb-8">
                <div className="relative mb-4">
                   <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                   <input
                     type="number"
                     min="6"
                     max="600"
                     step="1"
                     value={customPrice}
                     onChange={(e) => setCustomPrice(Number(e.target.value))}
                     className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-lg font-semibold bg-white text-gray-900 placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                     placeholder="Enter amount"
                   />
                 </div>
                 
                                   {/* Preset Buttons */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <button
                      onClick={() => setCustomPrice(50)}
                      className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      €50
                    </button>
                    <button
                      onClick={() => setCustomPrice(100)}
                      className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      €100
                    </button>
                    <button
                      onClick={() => setCustomPrice(200)}
                      className="py-2 px-3 text-xs font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      €200
                    </button>
                  </div>
               
               <div className="flex justify-between text-xs text-gray-500 mt-2">
                 <span>€6 (10 m²)</span>
                 <span>€600 (1000 m²)</span>
               </div>
             </div>
           )}


        </div>

        {/* Impact Preview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
          <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-4 text-center">
            {t('projectPage.yourImpact') || 'Your Impact'}
          </h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="text-sm text-blue-800">Protected Area</span>
              </div>
              <span className="font-semibold text-blue-900">{formatNumber(selectedArea)} m²</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-600 rounded-full"></div>
                <span className="text-sm text-green-800">CO₂ Absorption</span>
              </div>
              <span className="font-semibold text-green-900">
                {Math.round(selectedArea * 0.8)} cars/year
              </span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            console.log('Continue button clicked with selectedArea:', selectedArea);
            onContinue(selectedArea);
          }}
          disabled={inputMode === 'manual' && selectedArea === 0}
          className={`w-full py-4 md:py-5 font-semibold rounded-2xl shadow-lg transition-all duration-200 active:scale-[0.98] text-lg ${
            inputMode === 'manual' && selectedArea === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-600 to-emerald-700 text-white'
          }`}
        >
          <Leaf className="w-5 h-5 inline mr-2" />
          {inputMode === 'manual' && selectedArea === 0 
            ? 'Select Area First' 
            : (t('projectPage.continueToCheckout') || 'Continue to Checkout')
          }
        </button>
      </div>
    </div>
  );
}
