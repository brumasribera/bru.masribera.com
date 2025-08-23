import { useMemo, useEffect, useState, useRef } from "react";
import { Home } from "lucide-react";
import GlobeGL from "react-globe.gl";
import { PROJECTS } from "../utils/data";
import { Project } from "../types/types";
import { SearchBox } from "./SearchBox";

interface Globe3DProps {
  onPick: (project: Project) => void;
  onShowContributions: () => void;
  onShowAccount?: () => void;
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

export function Globe3D({ onPick, onShowContributions, onShowAccount, user }: Globe3DProps) {
  const [dimensions, setDimensions] = useState({ width: 380, height: 680 });
  const globeRef = useRef<any>(null);
  
  // Generate random starting position on land near the equator
  const randomStartPosition = useMemo(() => {
    // Predefined land-based coordinates near the equator
    const landPositions = [
      { lat: 0, lng: 37, altitude: 2.5 },      // Kenya, Africa
      { lat: 0, lng: 78, altitude: 2.5 },      // Ecuador, South America
      { lat: 0, lng: 120, altitude: 2.5 },     // Indonesia, Asia
      { lat: 0, lng: -79, altitude: 2.5 },     // Colombia, South America
      { lat: 0, lng: -9, altitude: 2.5 },      // Guinea, Africa
      { lat: 0, lng: 15, altitude: 2.5 },      // Cameroon, Africa
      { lat: 0, lng: 100, altitude: 2.5 },     // Thailand, Asia
      { lat: 0, lng: 110, altitude: 2.5 },     // Borneo, Asia
      { lat: 0, lng: -60, altitude: 2.5 },     // Venezuela, South America
      { lat: 0, lng: 30, altitude: 2.5 },      // Uganda, Africa
      { lat: 0, lng: 80, altitude: 2.5 },      // India, Asia
      { lat: 0, lng: -70, altitude: 2.5 },     // Peru, South America
      { lat: 0, lng: 10, altitude: 2.5 },      // Nigeria, Africa
      { lat: 0, lng: 90, altitude: 2.5 },      // Bangladesh, Asia
      { lat: 0, lng: -50, altitude: 2.5 },     // Brazil, South America
    ];
    
    // Add some variation in latitude (±15 degrees from equator)
    const basePosition = landPositions[Math.floor(Math.random() * landPositions.length)];
    return {
      lat: basePosition.lat + (Math.random() - 0.5) * 30,
      lng: basePosition.lng + (Math.random() - 0.5) * 20,
      altitude: 2.5
    };
  }, []);

  // Handle responsive sizing
  useEffect(() => {
    const updateDimensions = () => {
      // Get the container dimensions or fall back to viewport
      const container = document.querySelector('.globe-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      } else {
        // Fallback to viewport dimensions
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    // Use ResizeObserver for more accurate container size changes
    const container = document.querySelector('.globe-container');
    if (container) {
      const resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(container);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', updateDimensions);
        resizeObserver.disconnect();
      };
    }
    
    // Cleanup
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Real 3D globe using Three.js via react-globe.gl with NASA Blue Marble textures
  const markers = useMemo(() => PROJECTS.map(p => ({ lat: p.lat, lng: p.lon, project: p })), []);

  



  // Set initial position when globe is ready
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(randomStartPosition, 0);
    }
  }, [globeRef, randomStartPosition]);

  const makeMarker = (d: any) => {
    const el = document.createElement('div');
    el.style.width = '48px';
    el.style.height = '56px';
    el.style.position = 'relative';
    el.style.cursor = 'pointer';
    el.style.zIndex = '1000';
    el.style.pointerEvents = 'auto';
    el.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
    el.style.touchAction = 'manipulation'; // Optimize for touch
    el.style.userSelect = 'none'; // Prevent text selection on mobile
    el.style.webkitUserSelect = 'none'; // Safari support

    // Create the dialog box container
    const dialogBox = document.createElement('div');
    dialogBox.style.width = '100%';
    dialogBox.style.height = '100%';
    dialogBox.style.position = 'relative';
    dialogBox.style.display = 'flex';
    dialogBox.style.alignItems = 'center';
    dialogBox.style.justifyContent = 'center';

    // Create the main circular white shape
    const circle = document.createElement('div');
    circle.style.width = '40px';
    circle.style.height = '40px';
    circle.style.background = 'white';
    circle.style.borderRadius = '50%';
    circle.style.display = 'flex';
    circle.style.alignItems = 'center';
    circle.style.justifyContent = 'center';
    circle.style.boxShadow = 'none';

    // Create the Reserve logo image inside the circle
    const logo = document.createElement('img');
    logo.src = '/logos/reserve-logo.png';
    logo.style.width = '28px';
    logo.style.height = '28px';
    logo.style.objectFit = 'contain';
    logo.style.filter = 'none';

    // Create the triangle at the bottom or top based on hemisphere
    const triangle = document.createElement('div');
    const isSouthernHemisphere = d.lat < 0;
    
    triangle.style.position = 'absolute';
    triangle.style.left = '50%';
    triangle.style.transform = 'translateX(-50%)';
    triangle.style.width = '0';
    triangle.style.height = '0';
    triangle.style.filter = 'none';
    
    if (isSouthernHemisphere) {
      // Triangle at the top for southern hemisphere
      triangle.style.top = '0';
      triangle.style.borderLeft = '8px solid transparent';
      triangle.style.borderRight = '8px solid transparent';
      triangle.style.borderBottom = '16px solid white';
    } else {
      // Triangle at the bottom for northern hemisphere
      triangle.style.bottom = '0';
      triangle.style.borderLeft = '8px solid transparent';
      triangle.style.borderRight = '8px solid transparent';
      triangle.style.borderTop = '16px solid white';
    }

    // Assemble the marker
    circle.appendChild(logo);
    dialogBox.appendChild(circle);
    dialogBox.appendChild(triangle);
    el.appendChild(dialogBox);

    // Hover effects
    el.onmouseenter = () => { 
      el.style.transform = 'translate(-50%, -50%) scale(1.1)';
      el.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))';
    };
    el.onmouseleave = () => { 
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      el.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
    };
    
    // Use both click and touch events for better mobile compatibility
    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      navigateToProtectedArea(d.project);
    };

    // Add click event
    el.addEventListener('click', handleClick);
    
    // Add touch events for mobile
    el.addEventListener('touchstart', (e) => {
      e.preventDefault();
      el.style.transform = 'translate(-50%, -50%) scale(1.05)';
    });
    
    el.addEventListener('touchend', (e) => {
      e.preventDefault();
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      // Small delay to ensure touch is complete before triggering action
      setTimeout(() => handleClick(e), 100);
    });

    return el;
  };

  const navigateToProtectedArea = (project: Project) => {
    // Navigate to protected area page with project data
    // For now, we'll use the onPick function but you can modify this to navigate to a specific route
    onPick(project);
  };

  return (
    <div className="globe-container w-full h-full flex flex-col relative bg-black">
      {/* Custom CSS for star animations and full viewport */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          
          @keyframes shooting-star-trail {
            0% {
              transform: translateX(0) translateY(0) rotate(45deg) scale(1);
              opacity: 0.8;
            }
            50% {
              opacity: 0.4;
            }
            100% {
              transform: translateX(80px) translateY(-80px) rotate(45deg) scale(0.5);
              opacity: 0;
            }
          }
          
          @keyframes shooting-star-trail-2 {
            0% {
              transform: translateX(0) translateY(0) rotate(-30deg) scale(1);
              opacity: 0.9;
            }
            50% {
              opacity: 0.5;
            }
            100% {
              transform: translateX(-60px) translateY(-60px) rotate(-30deg) scale(0.3);
              opacity: 0;
            }
          }
          
          @keyframes shooting-star-trail-3 {
            0% {
              transform: translateX(0) translateY(0) rotate(60deg) scale(1);
              opacity: 0.7;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              transform: translateX(100px) translateY(-40px) rotate(60deg) scale(0.4);
              opacity: 0;
            }
          }
          
          /* Ensure full viewport coverage */
          .globe-container {
            height: 100% !important;
            width: 100% !important;
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            z-index: 10 !important;
          }
          
          /* Ensure globe takes full container */
          .globe-container > div:last-child {
            height: 100% !important;
            width: 100% !important;
          }
        `
      }} />
      
              {/* Static star field background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 150 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            return (
              <div
                key={`star-${i}`}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  borderRadius: '50%',
                  animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.7 + 0.3
                }}
              />
            );
          })}
          
          
        
        {/* Shooting stars with different trajectories */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`shooting-${i}`} className="absolute">
            {/* Main shooting star */}
            <div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 6}s`
              }}
            />
            
            {/* Trail elements for longer trace */}
            <div
              className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail ${4 + Math.random() * 3}s linear infinite`,
                animationDelay: `${(Math.random() * 6) + 0.1}s`
              }}
            />
          </div>
        ))}
        
        {/* Diagonal shooting stars */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`diagonal-${i}`} className="absolute">
            <div
              className="absolute w-1 h-1 bg-cyan-100 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail-2 ${5 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 8}s`
              }}
            />
            
            <div
              className="absolute w-0.5 h-0.5 bg-cyan-50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail-2 ${5 + Math.random() * 2}s linear infinite`,
                animationDelay: `${(Math.random() * 8) + 0.2}s`
              }}
            />
          </div>
        ))}
        
        {/* Steep angle shooting stars */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={`steep-${i}`} className="absolute">
            <div
              className="absolute w-1 h-1 bg-purple-100 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail-3 ${3 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 7}s`
              }}
            />
            
            <div
              className="absolute w-0.5 h-0.5 bg-purple-50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail-3 ${3 + Math.random() * 2}s linear infinite`,
                animationDelay: `${(Math.random() * 7) + 0.15}s`
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Header with Search and Home Button */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-[40]">
        {/* Search Box - takes left space */}
        <div className="flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <SearchBox 
            projects={PROJECTS} 
            onProjectSelect={onPick}
          />
        </div>
        
        {/* Home Button - positioned right */}
        <button
          onClick={() => {
            onShowContributions();
          }}
          className="ml-4 w-10 h-10 md:w-12 md:h-12 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 flex-shrink-0"
        >
          <Home className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Globe container - Takes full height and centers the globe */}
      <div className="h-full relative flex items-center justify-center">
        <GlobeGL 
          ref={globeRef}
          backgroundColor="#00000000" 
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#60a5fa"
          atmosphereAltitude={0.15}
          htmlElementsData={markers}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlElement={makeMarker}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
