import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { loadContributions } from "../utils/utils";
import { Contribution } from "../types/types";
import { Globe, TrendingUp, Award, Heart, Leaf, Maximize2, Minimize2, Compass } from "lucide-react";
import { ImageModal } from "../components/ImageModal";
import { Globe3D } from "../components/Globe3D";

interface HomePageProps {
  onGoToGlobe: () => void;
  onShowProjectsList: () => void;
  onShowSettings: () => void;
  onOpenProject: (projectId: string) => void;
  user?: {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatar: string;
    memberSince: string;
    verified: boolean;
  };
}

export function HomePage({ onGoToGlobe, onShowProjectsList, onShowSettings, onOpenProject, user }: HomePageProps) {
  const { t } = useTranslation('reserve');
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const fullScreenMapRef = useRef<HTMLDivElement>(null);
  const fullScreenMapInstanceRef = useRef<L.Map | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const loadedContributions = loadContributions();
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
    return { m2, amount, projects };
  }, [contributions]);

  // Stats for impact display
  const impactStats = [
    {
      icon: Leaf,
      label: t('home.totalProtected'),
      value: `${formatNumber(totals.m2)} m²`,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200'
    },
    {
      icon: Heart,
      label: t('home.contributed'),
      value: `€${formatNumber(totals.amount)}`,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50',
      borderColor: 'border-pink-200'
    },
    {
      icon: Award,
      label: t('home.activeProjects'),
      value: totals.projects.toString(),
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200'
    },
    {
      icon: TrendingUp,
      label: t('home.currentStreak'),
      value: '8 days',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200'
    }
  ];

  // Add counter animation
  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    
    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const m2Element = document.getElementById('home-m2');
      const amountElement = document.getElementById('home-amount');
      const projectsElement = document.getElementById('home-projects');
      
      if (m2Element) m2Element.textContent = `${formatNumber(Math.round(totals.m2 * progress))} m²`;
      if (amountElement) amountElement.textContent = `€${formatNumber(Math.round(totals.amount * progress))}`;
      if (projectsElement) projectsElement.textContent = Math.round(totals.projects * progress).toString();
      
      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      }
    };
    
    animateCounters();
  }, [contributions, totals]);

  // Initialize map
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

  // Initialize fullscreen map
  useEffect(() => {
    if (!fullScreenMapRef.current || fullScreenMapInstanceRef.current || !isFullScreen) return;

    const map = L.map(fullScreenMapRef.current, {
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

    // Add markers to fullscreen map
    contributions.forEach((c) => {
      const size = Math.max(6, Math.min(18, Math.sqrt(c.m2)));
      const marker = L.circleMarker([c.lat, c.lon], {
        radius: size,
        color: "#4fa3f7",
        weight: 3,
        fillColor: "#4fa3f7",
        fillOpacity: 0.4,
      }).addTo(map);
      
      marker.bindPopup(
        `<div style="min-width:180px">
          <div style="font-weight:600;margin-bottom:4px">${t(`projects.${c.projectId}`)}</div>
          <div style="font-size:12px;color:#065f46">${formatNumber(c.m2)} m² • €${formatNumber(c.amount)}</div>
        </div>`
      );

      marker.on('click', () => onOpenProject(c.projectId));
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

    fullScreenMapInstanceRef.current = map;

    return () => {
      map.remove();
      fullScreenMapInstanceRef.current = null;
    };
  }, [isFullScreen, contributions, t, onOpenProject, formatNumber]);

  // Add markers to map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear previous layers except base
    map.eachLayer((l) => {
      // @ts-ignore
      if (l._url) return; // keep tile layer
      map.removeLayer(l);
    });

    contributions.forEach((c) => {
      const size = Math.max(6, Math.min(18, Math.sqrt(c.m2)));
      const marker = L.circleMarker([c.lat, c.lon], {
        radius: size,
        color: "#4fa3f7",
        weight: 3,
        fillColor: "#4fa3f7",
        fillOpacity: 0.4,
      }).addTo(map);
      
      marker.bindPopup(
        `<div style="min-width:180px">
          <div style="font-weight:600;margin-bottom:4px">${t(`projects.${c.projectId}`)}</div>
          <div style="font-size:12px;color:#065f46">${formatNumber(c.m2)} m² • €${formatNumber(c.amount)}</div>
        </div>`
      );

      marker.on('click', () => onOpenProject(c.projectId));
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
  }, [contributions, t, onOpenProject]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 overflow-y-auto">
      {/* Header */}
      <div className="relative h-32 overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600" />
        
        {/* Navigation */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          {/* Globe Button */}
                     <button
             onClick={onGoToGlobe}
             className="w-10 h-10 bg-white/90 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50"
           >
             <Globe className="h-5 w-5" />
           </button>
          
          {/* Profile Picture (Settings) */}
          <div className="flex items-center">
            {user?.avatar && (
              <button
                onClick={onShowSettings}
                onDoubleClick={() => setIsImageModalOpen(true)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                title="Click to open settings, double-click to view image"
              >
                <img 
                  src={user.avatar} 
                  alt={user.name || 'Profile'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </button>
            )}
          </div>
        </div>
        
        {/* Welcome Message */}
        <div className="absolute inset-0 flex items-center justify-center text-white px-6">
          <div className="text-center">
                         <h1 className="text-xl font-bold mb-1 flex items-center justify-center gap-2">
               <span className="text-2xl">👋</span>
               {t('home.welcomeBack')}
             </h1>
            <p className="text-green-100 text-sm">{t('home.yourImpactSummary')}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 pb-8">
        {/* Impact Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {impactStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-4 border ${stat.borderColor} relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-2`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-lg font-bold text-gray-900" id={`home-${index === 0 ? 'm2' : index === 1 ? 'amount' : index === 2 ? 'projects' : 'streak'}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 leading-tight">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

                         {/* Quick Action - Explore Projects */}
        <button 
          onClick={onShowProjectsList}
          className="w-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-4 text-white hover:from-emerald-600 hover:to-green-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
                       <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="font-semibold text-sm mb-1">{t('home.exploreProjects')}</h3>
                <p className="text-emerald-100 text-xs">View all conservation projects</p>
              </div>
                             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                 <Compass className="w-5 h-5" />
               </div>
            </div>
         </button>

        {/* Contributions Map */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('home.yourContributions')}</h3>
          
          <div className="relative h-48 rounded-xl overflow-hidden shadow-sm border border-gray-200">
            <div ref={mapRef} className="w-full h-full pointer-events-none" />
            <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-full text-xs text-gray-700 shadow">
              {t('home.satelliteView')}
            </div>
            {/* Expand Button */}
            <button
              onClick={() => setIsFullScreen(true)}
              className="absolute top-2 right-2 w-8 h-8 bg-white/95 hover:bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
              aria-label="Expand map"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
            
            {/* Globe Action Button */}
            <button
              onClick={onGoToGlobe}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>Explore globe</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Contributions */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-900">{t('home.recentContributions')}</h3>
            {contributions.length > 3 && (
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                {t('home.viewAll')}
              </button>
            )}
          </div>
          
          <div className="space-y-3">
            {contributions.length === 0 && (
              <div className="p-6 border border-dashed border-gray-300 rounded-xl text-center text-gray-600">
                <div className="text-sm">{t('home.noContributionsYet')}</div>
                <button 
                  onClick={onGoToGlobe}
                  className="mt-2 text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  {t('home.startProtecting')}
                </button>
              </div>
            )}
            {contributions.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="flex gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors"
                onClick={() => onOpenProject(c.projectId)}
              >
                <img src={c.image} alt={t(`projects.${c.projectId}`)} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{t(`projects.${c.projectId}`)}</div>
                  <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</div>
                  <div className="text-sm text-green-700 font-medium">{formatNumber(c.m2)} m² • €{formatNumber(c.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conservation Tips Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Conservation Tips</h3>
          <div className="space-y-3">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
              <h4 className="font-medium text-emerald-900 text-sm mb-1">🌱 Plant Native Species</h4>
              <p className="text-xs text-emerald-700">Support local biodiversity by choosing native plants for your garden.</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-medium text-blue-900 text-sm mb-1">💧 Conserve Water</h4>
              <p className="text-xs text-blue-700">Use water-efficient fixtures and collect rainwater for your plants.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl border border-purple-200">
              <h4 className="font-medium text-purple-900 text-sm mb-1">♻️ Reduce Waste</h4>
              <p className="text-xs text-purple-700">Compost organic waste and choose products with minimal packaging.</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact Calculator */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Environmental Impact</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-lg font-bold text-green-700">12.5</div>
              <div className="text-xs text-green-600">CO2 kg saved</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-lg font-bold text-blue-700">8.2</div>
              <div className="text-xs text-blue-600">Trees equivalent</div>
            </div>
          </div>
          <p className="text-xs text-gray-600 text-center">Based on your conservation contributions</p>
        </div>

        {/* Community Section */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Join the Community</h3>
          <div className="space-y-3">
            <button className="w-full p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200">
              🌍 Share Your Story
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl text-white text-sm font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-200">
              👥 Invite Friends
            </button>
            <button className="w-full p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl text-white text-sm font-medium hover:from-purple-600 hover:to-violet-700 transition-all duration-200">
              📱 Follow Updates
            </button>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="text-xs text-yellow-700 font-medium">First Step</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-xs text-green-700 font-medium">Goal Setter</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">⚡</span>
              </div>
              <div className="text-xs text-blue-700 font-medium">Active</div>
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Monthly Progress</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">January</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-xs text-gray-500">75%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">February</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-xs text-gray-500">90%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">March</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-xs text-gray-500">60%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Impact Stats */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Global Impact</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="w-8 h-8 text-green-600 mx-auto mb-2">👥</div>
              <div className="text-lg font-bold text-green-700">2.4M</div>
              <div className="text-xs text-green-600">Active Users</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div className="w-8 h-8 text-blue-600 mx-auto mb-2">🌿</div>
              <div className="text-lg font-bold text-blue-700">15.7M</div>
              <div className="text-xs text-blue-600">m² Protected</div>
            </div>
          </div>
        </div>




      </div>

      {/* Fullscreen Map Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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
        </div>
      )}

      {/* Image Modal */}
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageSrc={user?.avatar || ""}
        altText={user?.name || 'Profile'}
      />
    </div>
  );
}
