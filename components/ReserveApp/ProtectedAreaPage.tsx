import { Project } from "./types";
import { ArrowLeft, MapPin, Leaf, Users, TrendingUp, Maximize2, Home, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { saveContribution } from "./utils";
import { useTranslation } from "react-i18next";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

interface ProtectedAreaPageProps {
  project: Project;
  onBack: () => void;
  onShowContributions: () => void;
}

export function ProtectedAreaPage({ project, onBack, onShowContributions }: ProtectedAreaPageProps) {
  const { t, ready } = useTranslation('reserve');
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const fullScreenMapRef = useRef<HTMLDivElement>(null);
  const fullScreenMapInstanceRef = useRef<L.Map | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'main' | 'learn-more' | 'share' | 'contribute' | 'select-area' | 'checkout' | 'success'>('main');
  const [animatedValues, setAnimatedValues] = useState({
    percentage: 0,
    euros: 0,
    m2: 0
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [checkoutM2, setCheckoutM2] = useState(0);
  const [contributionAmount, setContributionAmount] = useState<number>(25);
  const [customAmountInput, setCustomAmountInput] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCvc, setCardCvc] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  


  // Function to update selection summary
  const updateSelectionSummary = () => {
    const selectedCells = document.querySelectorAll('.bg-green-500');
    const selectedCount = selectedCells.length;
    const selectedArea = selectedCount * 10; // Each cell represents 10 square meters
    const totalCost = selectedArea * project.pricePerM2;
    
    // Update the display
    const countElement = document.getElementById('selected-count');
    const areaElement = document.getElementById('selected-area');
    const costElement = document.getElementById('total-cost');
    
    if (countElement) countElement.textContent = selectedCount.toString();
    if (areaElement) areaElement.textContent = selectedArea.toString();
    if (costElement) costElement.textContent = `€${totalCost.toFixed(2)}`;
  };

  const getSelectionSummary = () => {
    const selectedCells = document.querySelectorAll('.bg-green-500');
    const selectedCount = selectedCells.length;
    const selectedArea = selectedCount * 10;
    const totalCost = selectedArea * project.pricePerM2;
    return { selectedCount, selectedArea, totalCost };
  };

  const hectares = 1000 + (project.id.charCodeAt(0) * project.id.charCodeAt(1)) % 5000; // Consistent hectares per project
  
  // Calculate progress metrics for engagement
  const totalArea = hectares;
  const purchasedArea = Math.floor(totalArea * (0.3 + (project.id.charCodeAt(0) % 20) / 100)); // 30-50% purchased
  const totalFunding = totalArea * project.pricePerM2;
  const raisedFunding = Math.floor(totalFunding * (0.4 + (project.id.charCodeAt(1) % 30) / 100)); // 40-70% funded

  // Helper function to format large numbers with abbreviations
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  };

  // Add custom CSS animation for progress bar and animate counters
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes progressFill {
        from { width: 0%; }
        to { width: ${(raisedFunding / totalFunding) * 100}%; }
      }
    `;
    document.head.appendChild(style);
    
    // Animate counters from 0 to final values
    const duration = 1000; // 1 second (faster animation)
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

  // Prefill randomized card data when entering checkout card payment
  useEffect(() => {
    if (currentPage === 'checkout' && paymentMethod === 'card') {
      if (!cardNumber) {
        setCardNumber('4242 4242 4242 4242');
      }
      if (!cardExpiry) {
        const mm = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
        const yy = String(28 + Math.floor(Math.random() * 6));
        setCardExpiry(`${mm}/${yy}`);
      }
      if (!cardCvc) {
        const cvc = String(Math.floor(Math.random() * 900) + 100);
        setCardCvc(cvc);
      }
      if (!cardName) {
        const first = ['Alex', 'Sam', 'Taylor', 'Jordan', 'Casey', 'Jamie'][Math.floor(Math.random() * 6)];
        const last = ['Rivera', 'Morgan', 'Lee', 'Patel', 'Garcia', 'Khan'][Math.floor(Math.random() * 6)];
        setCardName(`${first} ${last}`);
      }
    }
  }, [currentPage, paymentMethod]);

  // Generate georeferenced polygon for each project based on project ID
  const generateProjectPolygon = (projectId: string, centerLat: number, centerLng: number) => {
    // Use project ID to seed a simple hash for consistent polygon generation
    let hash = 0;
    for (let i = 0; i < projectId.length; i++) {
      const char = projectId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate organic, rounded polygon with more points for natural topography
    const points: [number, number][] = [];
    const numPoints = 8 + (hash % 4); // 8-11 points for more organic shape
    
    // Create an organic, blob-like shape that mimics natural terrain boundaries
    // Use smaller base radius for better centering and visibility
    const baseRadius = 0.008; // Reduced from 0.015 for better centering
    
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      
      // Add organic variation to radius for natural terrain-like boundaries
      const radiusVariation = (hash % 6) * 0.0004; // Reduced variation for more centered shapes
      const baseRadiusWithVariation = baseRadius + radiusVariation;
      
      // Add organic, wave-like variation for natural topography adaptation
      const waveVariation = Math.sin(angle * 3) * 0.0004; // Reduced wave variation
      const organicVariation = (hash % 3 - 1) * 0.0002; // Reduced organic variation
      
      // Combine all variations for natural, rounded vertices
      const adjustedRadius = baseRadiusWithVariation + waveVariation + organicVariation;
      
      const lat = centerLat + Math.cos(angle) * adjustedRadius;
      const lng = centerLng + Math.sin(angle) * adjustedRadius;
      
      points.push([lat, lng]);
      hash = (hash * 9301 + 49297) % 233280; // Simple pseudo-random progression
    }
    
    // Add intermediate points between main vertices for smoother, rounded edges
    const smoothedPoints: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      
      // Add main vertex
      smoothedPoints.push(current);
      
      // Add intermediate point for smoother curves (if not the last segment)
      if (i < points.length - 1) {
        const midLat = (current[0] + next[0]) / 2;
        const midLng = (current[1] + next[1]) / 2;
        
                 // Add slight organic variation to mid-points for natural curves
         const midVariation = (hash % 3 - 1) * 0.0001; // Reduced mid-point variation
         
         // Calculate angle for mid-point variation
         const midAngle = (i / points.length) * 2 * Math.PI;
         const adjustedMidLat = midLat + Math.cos(midAngle + Math.PI / 4) * midVariation;
         const adjustedMidLng = midLng + Math.sin(midAngle + Math.PI / 4) * midVariation;
         
         smoothedPoints.push([adjustedMidLat, adjustedMidLng]);
        hash = (hash * 9301 + 49297) % 233280;
      }
    }
    
    return smoothedPoints;
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initializing map for project

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current) {
        // Map ref not available after delay
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

        // Map initialized successfully

        // Add satellite tile layer using a more reliable provider
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        }).addTo(map);

        // Generate and add the project polygon
        const polygonCoords = generateProjectPolygon(project.id, project.lat, project.lon);
        // Generated polygon coordinates
        
        // Create beautiful rainbow gradient polygon
        const polygon = L.polygon(polygonCoords, {
          color: '#4fa3f7', // Softer blue fallback color
          weight: 4, // Thicker border for better visibility
          fillColor: '#4fa3f7',
          fillOpacity: 0.3,
          smoothFactor: 1.5, // Smooth the polygon edges for more rounded appearance
          noClip: false // Allow clipping for better edge rendering
        }).addTo(map);

        // Apply custom rainbow gradient styling
        const polygonElement = polygon.getElement();
        if (polygonElement) {
          // Create SVG gradient definitions
          const svg = polygonElement.closest('svg');
          if (svg) {
            // Add gradient definitions
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `gradient-${project.id}`);
            gradient.setAttribute('gradientUnits', 'objectBoundingBox');
            
            // Rainbow gradient stops - using the new softer color palette
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
            htmlElement.style.stroke = `url(#gradient-${project.id})`;
            htmlElement.style.strokeWidth = '4px';
            htmlElement.style.fill = `url(#gradient-${project.id})`;
            htmlElement.style.fillOpacity = '0.3';
          }
        }

        // Fit map to show the entire polygon
        map.fitBounds(polygon.getBounds(), { 
          padding: [50, 50],
          maxZoom: 13,
          animate: false
        });

                 mapInstanceRef.current = map;

        // Map setup completed successfully
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

  // Handle full-screen map initialization
  useEffect(() => {
    if (!isFullScreen || !fullScreenMapRef.current || fullScreenMapInstanceRef.current) return;

    const timer = setTimeout(() => {
      if (!fullScreenMapRef.current) return;

      try {
        // Initialize full-screen Leaflet map with interactive controls
        const fullScreenMap = L.map(fullScreenMapRef.current, {
          center: [project.lat, project.lon],
          zoom: 12,
          zoomControl: false, // Disable default zoom controls since we have custom ones
          attributionControl: true,
          dragging: true, // Enable dragging for exploration
          touchZoom: true, // Enable touch zoom
          scrollWheelZoom: true, // Enable scroll wheel zoom
          doubleClickZoom: true, // Enable double-click zoom
          boxZoom: true, // Enable box zoom
          keyboard: true // Enable keyboard navigation
        });

        // Add satellite tile layer
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
        }).addTo(fullScreenMap);

        // Generate and add the project polygon
        const polygonCoords = generateProjectPolygon(project.id, project.lat, project.lon);
        
        // Create beautiful rainbow gradient polygon for full-screen view
        const fullScreenPolygon = L.polygon(polygonCoords, {
          color: '#4fa3f7',
          weight: 6, // Thicker border for full-screen visibility
          fillColor: '#4fa3f7',
          fillOpacity: 0.4,
          smoothFactor: 1.5, // Smooth the polygon edges for more rounded appearance
          noClip: false // Allow clipping for better edge rendering
        }).addTo(fullScreenMap);

        // Apply custom rainbow gradient styling
        const polygonElement = fullScreenPolygon.getElement();
        if (polygonElement) {
          const svg = polygonElement.closest('svg');
          if (svg) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
            gradient.setAttribute('id', `fullscreen-gradient-${project.id}`);
            gradient.setAttribute('gradientUnits', 'objectBoundingBox');
            
            // Rainbow gradient stops - using the new softer color palette
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
            
            const htmlElement = polygonElement as HTMLElement;
            htmlElement.style.stroke = `url(#fullscreen-gradient-${project.id})`;
            htmlElement.style.strokeWidth = '6px';
            htmlElement.style.fill = `url(#fullscreen-gradient-${project.id})`;
            htmlElement.style.fillOpacity = '0.4';
          }
        }

        // Fit map to show the entire polygon
        fullScreenMap.fitBounds(fullScreenPolygon.getBounds(), { 
          padding: [50, 50],
          maxZoom: 16,
          animate: true
        });

        fullScreenMapInstanceRef.current = fullScreenMap;
      } catch (error) {
        console.error('Error initializing full-screen map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (fullScreenMapInstanceRef.current) {
        fullScreenMapInstanceRef.current.remove();
        fullScreenMapInstanceRef.current = null;
      }
    };
  }, [isFullScreen, project.id, project.lat, project.lon]);

  // Reset main map when exiting fullscreen
  useEffect(() => {
    if (!isFullScreen && mapRef.current) {
      // Small delay to ensure the DOM is ready
      const timer = setTimeout(() => {
        // Force recreation of the main map
        if (mapRef.current && !mapInstanceRef.current) {
          // Force a re-render by updating the project reference
          setTimeout(() => {
            if (mapRef.current) {
              // Recreate the map manually
              try {
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

                // Add satellite tile layer
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                  maxZoom: 19,
                  attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community'
                }).addTo(map);

                // Generate and add the project polygon
                const polygonCoords = generateProjectPolygon(project.id, project.lat, project.lon);
                
                const polygon = L.polygon(polygonCoords, {
                  color: '#4fa3f7',
                  weight: 4,
                  fillColor: '#4fa3f7',
                  fillOpacity: 0.3,
                  smoothFactor: 1.5,
                  noClip: false
                }).addTo(map);

                // Apply custom rainbow gradient styling
                const polygonElement = polygon.getElement();
                if (polygonElement) {
                  const svg = polygonElement.closest('svg');
                  if (svg) {
                    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    gradient.setAttribute('id', `gradient-${project.id}`);
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
                    htmlElement.style.stroke = `url(#gradient-${project.id})`;
                    htmlElement.style.strokeWidth = '4px';
                    htmlElement.style.fill = `url(#gradient-${project.id})`;
                    htmlElement.style.fillOpacity = '0.3';
                  }
                }

                // Fit map to show the entire polygon
                map.fitBounds(polygon.getBounds(), { 
                  padding: [50, 50],
                  maxZoom: 13,
                  animate: false
                });

                mapInstanceRef.current = map;
              } catch (error) {
                console.error('Error recreating map:', error);
              }
            }
          }, 100);
        }
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [isFullScreen, project.id, project.lat, project.lon]);

   // Initialize selection summary when entering select-area page
   useEffect(() => {
     if (currentPage === 'select-area') {
       // Small delay to ensure DOM is ready
       setTimeout(() => {
         updateSelectionSummary();
       }, 100);
     }
   }, [currentPage]);

  // Show loading state while i18n is not ready
  if (!ready) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm md:text-base">Loading translations...</p>
        </div>
      </div>
    );
  }



  // If in full-screen mode, show the map page
  if (isFullScreen) {
    return (
      <div className="h-full min-h-screen bg-white relative">
        {/* Full-screen map container - Takes full height */}
        <div className="w-full h-full relative">
          <div 
            ref={fullScreenMapRef}
            className="w-full h-full"
          />
          
          {/* Back button - positioned top left */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[99999]"
          >
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    );
  }

  // Learn More Page
  if (currentPage === 'learn-more') {
    return (
      <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto">
        {/* Header */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <button
            onClick={() => setCurrentPage('main')}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-2">{t('learnMorePage.title')}</h1>
                              <p className="text-green-100">About {t(`projects.${project.id}`)}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="space-y-4 text-gray-600">
              <p>This protected area spans {hectares} hectares of critical ecosystem, providing habitat for numerous species and contributing to global biodiversity conservation efforts.</p>
              <p>The project focuses on sustainable land management practices that balance conservation goals with community needs, ensuring long-term environmental and social benefits.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Conservation Impact</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                <Leaf className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">Biodiversity Protection</div>
                  <div className="text-sm text-green-600">Protecting {project.impact.biodiversity}% of local species</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-800">Carbon Sequestration</div>
                  <div className="text-sm text-blue-600">Absorbing {project.impact.carbon}% more CO2 annually</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-semibold text-purple-800">Community Support</div>
                  <div className="text-sm text-purple-600">Supporting {project.impact.community}% of local livelihoods</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Scientific Research</h3>
            <p className="text-gray-600 mb-4">This area serves as a living laboratory for researchers studying climate change adaptation, ecosystem restoration, and sustainable development practices.</p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">Research Areas</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Climate change impact assessment</li>
                <li>• Biodiversity monitoring and conservation</li>
                <li>• Sustainable land use practices</li>
                <li>• Community engagement strategies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Page (Mock)
  if (currentPage === 'checkout') {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
        <div className="relative h-32 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
          <button
            onClick={() => setCurrentPage('main')}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-1">{t('checkoutPage.title')}</h1>
                              <p className="text-green-100">{t('checkoutPage.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
                         <div className="grid grid-cols-2 gap-4">
               <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                 <div className="text-2xl font-bold text-green-700 mb-1">€{formatNumber(checkoutAmount)}</div>
                 <div className="text-xs text-green-600 whitespace-nowrap">Total</div>
               </div>
               <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                 <div className="text-2xl font-bold text-blue-700 mb-1">{formatNumber(checkoutM2)} m²</div>
                 <div className="text-xs text-blue-600 whitespace-nowrap">Protected</div>
               </div>
             </div>
            <div className="mt-4 text-center text-xs text-gray-500">Taxes included if applicable</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Payment Method</h3>
            <div className="grid grid-cols-1 gap-3">
              <button 
                className={`w-full p-4 border-2 rounded-xl flex items-center justify-start gap-4 transition-colors text-gray-800 pl-5 ${paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-400'}`}
                onClick={() => setPaymentMethod('card')}
              >
                <span className="text-2xl leading-none">💳</span>
                <span className="text-base">{t('payment.payWithCard')}</span>
              </button>
              <button 
                className={`w-full p-4 border-2 rounded-xl flex items-center justify-start gap-4 transition-colors text-gray-800 pl-5 ${paymentMethod === 'paypal' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white hover:border-green-400'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="w-8 h-8" focusable="false">
                  <path fill="#003087" d="M16.9 4.1c-.8-.9-2.1-1.1-3.2-1.1H8.8c-.5 0-1 .4-1.1.9L5.2 18.7c-.1.6.3 1.1.9 1.1h3.5l.3-1.8-.1.6c.1-.6.6-.9 1.1-.9h1.9c3.2 0 5.8-1.3 6.6-5.1.3-1.6.1-2.8-.7-3.7-.5-.8-1.3-1.3-2.2-1.5.4-.5.4-1.2.4-1.5z"/>
                  <path fill="#009cde" d="M18.4 7.4c-.8-.9-2.1-1.3-3.8-1.3h-3c-.5 0-1 .4-1.1.9l-1.6 9.4c-.1.6.3 1.1.9 1.1h2.2c.4 0 .8-.3.9-.7l.2-1.2c.1-.4.5-.7.9-.7h.6c2.6 0 4.7-1.1 5.3-4 .3-1.2.1-2.3-.5-3.2z"/>
                </svg>
                <span className="text-base">{t('payment.payWithPayPal')}</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('checkoutPage.cardDetails')}</h3>
              <div className="space-y-3">
                <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white placeholder:text-gray-400 text-gray-900" placeholder={t('payment.cardNumber')} value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white placeholder:text-gray-400 text-gray-900" placeholder={t('payment.expiry')} value={cardExpiry} onChange={(e)=>setCardExpiry(e.target.value)} />
                  <input className="px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white placeholder:text-gray-400 text-gray-900" placeholder={t('payment.cvc')} value={cardCvc} onChange={(e)=>setCardCvc(e.target.value)} />
                </div>
                <input className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-white placeholder:text-gray-400 text-gray-900" placeholder={t('payment.nameOnCard')} value={cardName} onChange={(e)=>setCardName(e.target.value)} />
                <button 
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl disabled:opacity-60"
                  disabled={isProcessing}
                  onClick={() => {
                    setIsProcessing(true);
                    setTimeout(() => {
                      setIsProcessing(false);
                      const c = {
                        id: `${project.id}-${Date.now()}`,
                        projectId: project.id,
                        projectName: t(`projects.${project.id}`),
                        projectCountry: t(`countries.${project.country}`),
                        image: project.image,
                        lat: project.lat,
                        lon: project.lon,
                        m2: checkoutM2,
                        amount: checkoutAmount,
                        method: 'card',
                        createdAt: new Date().toISOString(),
                      } as any;
                      saveContribution(c);
                      setCurrentPage('success');
                    }, 1000);
                  }}
                >
                  {isProcessing ? t('checkoutPage.processing') : t('checkoutPage.pay', { amount: checkoutAmount.toFixed(2) })}
                </button>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('payment.paypal')}</h3>
                              <p className="text-sm text-gray-600 mb-3">{t('checkoutPage.redirectedToPayPal')}</p>
              <button 
                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl disabled:opacity-60"
                disabled={isProcessing}
                onClick={() => {
                  setIsProcessing(true);
                  setTimeout(() => {
                    setIsProcessing(false);
                    const c = {
                      id: `${project.id}-${Date.now()}`,
                      projectId: project.id,
                      projectName: t(`projects.${project.id}`),
                      projectCountry: t(`countries.${project.country}`),
                      image: project.image,
                      lat: project.lat,
                      lon: project.lon,
                      m2: checkoutM2,
                      amount: checkoutAmount,
                      method: 'paypal',
                      createdAt: new Date().toISOString(),
                    } as any;
                    saveContribution(c);
                    setCurrentPage('success');
                  }, 1000);
                }}
              >
                {isProcessing ? t('checkoutPage.connecting') : t('checkoutPage.continueWithPayPal')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Share Project Page
  if (currentPage === 'share') {
    return (
      <div className="h-full bg-gradient-to-br from-purple-50 to-pink-100 overflow-y-auto">
        {/* Header */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={t(`projects.${project.id}`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <button
            onClick={() => setCurrentPage('main')}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-2">{t('sharePage.title')}</h1>
                              <p className="text-purple-100">Help spread the word about {t(`projects.${project.id}`)}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Share Options</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">📘</span>
                Share on Facebook
              </button>
              <button className="w-full p-4 bg-blue-400 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">🐦</span>
                Share on Twitter
              </button>
              <button className="w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">📱</span>
                Share on WhatsApp
              </button>
              <button className="w-full p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">💼</span>
                Share on LinkedIn
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sharePage.projectSummary')}</h3>
            <div className="bg-gray-50 rounded-xl p-4">
                              <h4 className="font-semibold text-gray-900 mb-2">{t(`projects.${project.id}`)}</h4>
                              <p className="text-gray-600 text-sm mb-3">{t(`countries.${project.country}`)} • {hectares} hectares</p>
                              <p className="text-gray-700">{t('sharePage.helpProtect')}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('sharePage.impactPreview')}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <div className="text-lg font-bold text-green-700">{project.impact.biodiversity}%</div>
                <div className="text-xs text-green-600 whitespace-nowrap">{t('impact.biodiversity')}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-xl">
                <div className="text-lg font-bold text-blue-700">{project.impact.carbon}%</div>
                <div className="text-xs text-blue-600 whitespace-nowrap">{t('impact.carbon')}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-xl">
                <div className="text-lg font-bold text-purple-700">{project.impact.community}%</div>
                <div className="text-xs text-purple-600 whitespace-nowrap">{t('impact.community')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success Page
  if (currentPage === 'success') {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-2">{t('successPage.title')}</h1>
                <p className="text-green-100">{t('successPage.subtitle')}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">{t('successPage.receipt')}</h3>
            <div className="space-y-2 text-gray-700">
                              <div className="flex justify-between"><span>{t('checkout.project')}</span><span>{t(`projects.${project.id}`)}</span></div>
                <div className="flex justify-between"><span>{t('checkout.protected')}</span><span>{checkoutM2} m²</span></div>
                <div className="flex justify-between"><span>{t('checkout.totalPaid')}</span><span>€{checkoutAmount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>{t('checkout.method')}</span><span>{paymentMethod === 'card' ? t('payment.card') : paymentMethod === 'paypal' ? t('payment.paypal') : '—'}</span></div>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98]"
            onClick={() => setCurrentPage('main')}
          >
                            {t('successPage.backToProject')}
          </button>
        </div>
      </div>
    );
  }

  // Contribute Page
  if (currentPage === 'contribute') {
    return (
      <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
        {/* Header */}
        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <button
            onClick={() => setCurrentPage('main')}
            className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
                              <h1 className="text-2xl font-bold mb-2">{t('contributePage.title')}</h1>
                              <p className="text-green-100">Support {t(`projects.${project.id}`)} conservation</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-24">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Choose Amount</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button 
                className={`py-4 px-3 bg-green-50 hover:bg-green-100 border-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${contributionAmount===25 ? 'border-green-500 text-green-800' : 'border-green-200 text-green-700 hover:border-green-400'}`}
                onClick={() => setContributionAmount(25)}
              >
                €25
              </button>
              <button 
                className={`py-4 px-3 bg-green-50 hover:bg-green-100 border-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${contributionAmount===50 ? 'border-green-500 text-green-800' : 'border-green-200 text-green-700 hover:border-green-400'}`}
                onClick={() => setContributionAmount(50)}
              >
                €50
              </button>
              <button 
                className={`py-4 px-3 bg-green-50 hover:bg-green-100 border-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${contributionAmount===100 ? 'border-green-500 text-green-800' : 'border-green-200 text-green-700 hover:border-green-400'}`}
                onClick={() => setContributionAmount(100)}
              >
                €100
              </button>
            </div>
            
            <div className="flex gap-3">
              <input 
                type="number" 
                placeholder="Custom amount (€)"
                className="flex-1 px-4 py-3 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                min="1"
                value={customAmountInput}
                onChange={(e) => setCustomAmountInput(e.target.value)}
              />
              <button 
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors"
                onClick={() => {
                  const v = parseFloat(customAmountInput);
                  if (!isNaN(v) && v > 0) {
                    setContributionAmount(v);
                  }
                }}
              >
                Add
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              <button className="w-full p-4 border-2 border-gray-200 hover:border-green-400 rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">💳</span>
                Credit/Debit Card
              </button>
              <button className="w-full p-4 border-2 border-gray-200 hover:border-green-400 rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">🏦</span>
                Bank Transfer
              </button>
              <button className="w-full p-4 border-2 border-gray-200 hover:border-green-400 rounded-xl flex items-center justify-center gap-3 transition-colors">
                <span className="text-lg">📱</span>
                Mobile Payment
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                          <h4 className="text-lg font-semibold text-green-900 mb-3 text-center">{t('checkout.yourImpact')}</h4>
            <div className="text-center">
              <p className="text-sm text-green-800 mb-2">
                <span className="font-semibold">{t('checkout.contributionProtects', { amount: Number(contributionAmount).toFixed(0) })}</span> protects approximately
              </p>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {Math.floor(Number(contributionAmount) / project.pricePerM2)} m²
              </div>
              <p className="text-xs text-green-600">of this protected area</p>
              <p className="text-xs text-green-600 mt-2">
                Cost: €{project.pricePerM2}/m²
              </p>
            </div>
          </div>

          <button 
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98]"
            onClick={() => {
              const amount = Number(contributionAmount) || 0;
              const m2 = Math.floor(amount / project.pricePerM2);
              setCheckoutAmount(amount);
              setCheckoutM2(m2);
              setPaymentMethod(null);
              setCurrentPage('checkout');
            }}
          >
            <Leaf className="w-5 h-5 inline mr-2" />
            Complete Contribution
          </button>
                 </div>
       </div>
     );
   }
 
   // Select Area Page
   if (currentPage === 'select-area') {
     return (
       <div className="h-full bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
         {/* Header */}
         <div className="relative h-48 overflow-hidden flex-shrink-0">
           <img 
             src={project.image} 
             alt={project.name}
             className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
           
           <button
             onClick={() => setCurrentPage('main')}
             className="absolute top-4 left-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-20"
           >
             <ArrowLeft className="h-5 w-5" />
           </button>
           
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-center text-white">
                               <h1 className="text-2xl font-bold mb-2">{t('selectAreaPage.title')}</h1>
                               <p className="text-green-100">{t('selectAreaPage.subtitle')}</p>
             </div>
           </div>
         </div>

         {/* Content */}
         <div className="p-6 space-y-6 pb-24">
           {/* Interactive Map Selection */}
           <div className="bg-white rounded-2xl p-6 shadow-sm">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Protection Zone</h3>
             <p className="text-gray-600 mb-4">Tap on the map to select specific areas you want to protect. Each selection represents a conservation investment.</p>
             
             {/* Map Grid for Selection */}
             <div className="relative bg-gray-100 rounded-xl p-4 border-2 border-dashed border-gray-300">
               <div className="grid grid-cols-8 gap-1 mb-4">
                 {Array.from({ length: 64 }, (_, i) => (
                   <div
                     key={i}
                     className="w-8 h-8 bg-white border border-gray-200 rounded cursor-pointer hover:bg-green-100 hover:border-green-400 transition-all duration-200 hover:scale-110"
                     onClick={() => {
                       // Toggle selection state for this grid cell
                       const element = document.getElementById(`grid-cell-${i}`);
                       if (element) {
                         element.classList.toggle('bg-green-500');
                         element.classList.toggle('bg-white');
                         element.classList.toggle('border-green-600');
                         element.classList.toggle('border-gray-200');
                         
                         // Update text color for better visibility
                         if (element.classList.contains('bg-green-500')) {
                           element.classList.remove('text-gray-400');
                           element.classList.add('text-white', 'font-bold');
                         } else {
                           element.classList.remove('text-white', 'font-bold');
                           element.classList.add('text-gray-400');
                         }
                       }
                       // Update the selection summary
                       updateSelectionSummary();
                     }}
                   >
                     <div
                       id={`grid-cell-${i}`}
                       className="w-full h-full rounded flex items-center justify-center text-xs font-bold text-gray-400 transition-all duration-200"
                     >
                       {i + 1}
                     </div>
                   </div>
                 ))}
               </div>
               
               {/* Selection Legend */}
               <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 bg-white border border-gray-200 rounded"></div>
                   <span>Available</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <div className="w-4 h-4 bg-green-500 border border-green-600 rounded"></div>
                   <span>Selected</span>
                 </div>
               </div>
             </div>
           </div>

           {/* Selection Summary */}
           <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                           <h4 className="text-lg font-semibold text-green-900 mb-3 text-center">{t('checkout.yourSelectionSummary')}</h4>
             
             <div className="grid grid-cols-2 gap-4 mb-4">
               <div className="text-center p-3 bg-white rounded-xl border border-green-200">
                 <div className="text-2xl font-bold text-green-700 mb-1" id="selected-count">0</div>
                 <div className="text-xs text-green-600 whitespace-nowrap">{t('checkout.selectedCount')}</div>
               </div>
               <div className="text-center p-3 bg-white rounded-xl border border-green-200">
                 <div className="text-2xl font-bold text-blue-700 mb-1" id="selected-area">0</div>
                 <div className="text-xs text-blue-600 whitespace-nowrap">{t('checkout.selectedArea')}</div>
               </div>
             </div>
             
             <div className="text-center p-3 bg-white rounded-xl border border-green-200 mb-4">
               <div className="text-lg font-bold text-purple-700 mb-1" id="total-cost">€0</div>
               <div className="text-xs text-purple-600 whitespace-nowrap">{t('checkout.totalCost')}</div>
               <div className="text-xs text-gray-500 whitespace-nowrap">€{project.pricePerM2}/m²</div>
             </div>
           </div>

           {/* Quick Selection Options */}
           <div className="bg-white rounded-2xl p-6 shadow-sm">
             <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('selectAreaPage.quickSelection')}</h4>
             <div className="grid grid-cols-2 gap-3">
               <button 
                 className="py-3 px-4 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-400 rounded-xl text-sm font-medium text-blue-700 transition-all duration-200"
                 onClick={() => {
                   // Select random 25% of cells
                   const cells = Array.from({ length: 64 }, (_, i) => i);
                   const shuffled = cells.sort(() => 0.5 - Math.random());
                   const selected = shuffled.slice(0, 16);
                   
                   // Clear all selections first
                   cells.forEach(i => {
                     const element = document.getElementById(`grid-cell-${i}`);
                     if (element) {
                       element.classList.remove('bg-green-500', 'border-green-600');
                       element.classList.add('bg-white', 'border-gray-200');
                     }
                   });
                   
                   // Select random cells
                   selected.forEach(i => {
                     const element = document.getElementById(`grid-cell-${i}`);
                     if (element) {
                       element.classList.remove('bg-white', 'border-gray-200');
                       element.classList.add('bg-green-500', 'border-green-600');
                     }
                   });
                   
                   updateSelectionSummary();
                 }}
               >
                 {t('selectAreaPage.random25')}
               </button>
               <button 
                 className="py-3 px-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 hover:border-purple-400 rounded-xl text-sm font-medium text-purple-700 transition-all duration-200"
                 onClick={() => {
                   // Select center area (middle 4x4 grid)
                   const centerCells = [18, 19, 20, 21, 26, 27, 28, 29, 34, 35, 36, 37, 42, 43, 44, 45];
                   
                   // Clear all selections first
                   Array.from({ length: 64 }, (_, i) => i).forEach(i => {
                     const element = document.getElementById(`grid-cell-${i}`);
                     if (element) {
                       element.classList.remove('bg-green-500', 'border-green-600');
                       element.classList.add('bg-white', 'border-gray-200');
                     }
                   });
                   
                   // Select center cells
                   centerCells.forEach(i => {
                     const element = document.getElementById(`grid-cell-${i}`);
                     if (element) {
                       element.classList.remove('bg-white', 'border-gray-200');
                       element.classList.add('bg-green-500', 'border-green-600');
                     }
                   });
                   
                   updateSelectionSummary();
                 }}
               >
                 {t('selectAreaPage.centerArea')}
               </button>
             </div>
             
             <div className="mt-3">
               <button 
                 className="w-full py-3 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400 rounded-xl text-sm font-medium text-gray-700 transition-all duration-200"
                 onClick={() => {
                   // Clear all selections
                   Array.from({ length: 64 }, (_, i) => i).forEach(i => {
                     const element = document.getElementById(`grid-cell-${i}`);
                     if (element) {
                       element.classList.remove('bg-green-500', 'border-green-600');
                       element.classList.add('bg-white', 'border-gray-200');
                     }
                   });
                   updateSelectionSummary();
                 }}
               >
                 {t('selectAreaPage.clearAll')}
               </button>
             </div>
           </div>

           {/* Action Buttons */}
           <div className="space-y-3">
             <button 
               className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98]"
               onClick={() => {
                 const { selectedArea, totalCost } = getSelectionSummary();
                 setCheckoutAmount(totalCost);
                 setCheckoutM2(selectedArea);
                 setPaymentMethod(null);
                 setCurrentPage('checkout');
               }}
             >
               <Leaf className="w-5 h-5 inline mr-2" />
                               {t('selectAreaPage.continueToCheckout')}
             </button>
             
             <button 
               className="w-full py-3 border-2 border-green-600 text-green-600 font-medium rounded-2xl hover:bg-green-50 transition-colors text-sm"
               onClick={() => setCurrentPage('main')}
             >
                               ← {t('selectAreaPage.backToProject')}
             </button>
           </div>
         </div>
       </div>
     );
   }
 
   return (
    <div className="h-full min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 overflow-y-auto">
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
          onClick={() => {
            // Back button clicked, calling onBack
            onBack();
          }}
          className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[9999]"
        >
          <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
         
        {/* Home Button - positioned top right */}
        <button
          onClick={() => {
            // Home button clicked, going to My Contributions
            onShowContributions();
          }}
          className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[9999]"
        >
          <Home className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        
        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{t(`projects.${project.id}`)}</h1>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-green-100 text-sm md:text-base">{project.country}</span>
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
              Project Progress
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
                   €{formatNumber(animatedValues.euros)}
                 </div>
                 <div className="text-xs md:text-sm text-green-600 whitespace-nowrap">Raised</div>
                 <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">Goal: €{formatNumber(totalFunding)}</div>
               </div>
               
               <div className="text-center p-3 md:p-4 bg-blue-50 rounded-xl border border-blue-200">
                 <div className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 mb-1">
                   {formatNumber(animatedValues.m2)} m²
                 </div>
                 <div className="text-xs md:text-sm text-blue-600 whitespace-nowrap">Protected</div>
                 <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">Total: {formatNumber(totalArea)} m²</div>
               </div>
             </div>
          </div>
        </div>

        {/* Satellite Map with Reserve Area */}
        <div className="relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg">
          {/* Leaflet Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-full z-0" 
            style={{ minHeight: '192px' }}
          />
          
          {/* Area Label with Hectares - positioned top right */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 text-xs md:text-sm font-medium text-gray-700 shadow-lg border border-gray-200/50 z-[9999]">
            {hectares} ha
          </div>
          
          {/* Full Screen Button - positioned top left */}
          <button
            onClick={() => setIsFullScreen(true)}
            className="absolute top-4 left-4 w-10 h-10 md:w-12 md:h-12 bg-white/95 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[9999]"
          >
            <Maximize2 className="h-5 w-5 md:h-6 md:w-6" />
          </button>
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
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">About This Protected Area</h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
            This conservation project protects vital ecosystems and wildlife habitats. 
            Your contribution helps maintain biodiversity, sequester carbon, and support 
            local communities through sustainable practices.
          </p>
          
          {/* Additional Motivational Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 md:p-4 lg:p-6 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2 text-base md:text-lg">Why This Matters</h4>
            <ul className="text-xs md:text-sm text-blue-800 space-y-1">
              <li>• Protects endangered species and their habitats</li>
              <li>• Absorbs CO2 equivalent to {Math.floor(hectares * 0.8)} cars annually</li>
              <li>• Creates sustainable jobs for local communities</li>
              <li>• Preserves natural water sources and soil quality</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 pb-48">
          {/* Main Contribute Button */}
          <button 
            className="w-full py-3 md:py-4 lg:py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-2xl shadow-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 active:scale-[0.98] text-sm md:text-base lg:text-lg"
            onClick={() => setCurrentPage('select-area')}
          >
            <Leaf className="w-4 h-4 md:w-5 md:h-5 inline mr-2" />
            Contribute to Protection
          </button>
        </div>
      </div>
    </div>
  );
}
