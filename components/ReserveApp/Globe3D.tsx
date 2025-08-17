import { useMemo, useEffect, useState } from "react";
import { Earth } from "lucide-react";
import GlobeGL from "react-globe.gl";
import { PROJECTS } from "./data";
import { Project } from "./types";

interface Globe3DProps {
  onPick: (project: Project) => void;
}

export function Globe3D({ onPick }: Globe3DProps) {
  const [isGlobeReady, setIsGlobeReady] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 380, height: 680 });

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
      console.log('Marker clicked:', d.project.name);
      navigateToProtectedArea(d.project);
    };

    // Add click event
    el.addEventListener('click', handleClick);
    
    // Add touch events for mobile
    el.addEventListener('touchstart', (e) => {
      console.log('Touch start on marker:', d.project.name);
      e.preventDefault();
      el.style.transform = 'translate(-50%, -50%) scale(1.05)';
    });
    
    el.addEventListener('touchend', (e) => {
      console.log('Touch end on marker:', d.project.name);
      e.preventDefault();
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      // Small delay to ensure touch is complete before triggering action
      setTimeout(() => handleClick(e), 100);
    });

    console.log('Marker created for:', d.project.name, 'with events attached');
    return el;
  };

  const navigateToProtectedArea = (project: Project) => {
    // Navigate to protected area page with project data
    // For now, we'll use the onPick function but you can modify this to navigate to a specific route
    onPick(project);
  };

  useEffect(() => {
    // Give the globe some time to initialize
    const timer = setTimeout(() => {
      setIsGlobeReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="globe-container w-full h-full flex flex-col relative bg-black">
      {/* Custom CSS for shooting star animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
      
      {/* Shooting stars background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute">
            {/* Main shooting star */}
            <div
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
            
            {/* Additional trail elements for longer trace */}
            <div
              className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `shooting-star-trail ${3 + Math.random() * 4}s linear infinite`,
                animationDelay: `${(Math.random() * 5) + 0.1}s`
              }}
            />
          </div>
        ))}
      </div>
      
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/40 to-transparent p-4 flex-shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Earth className="w-5 h-5"/>
          <h3 className="font-semibold">Explore Projects</h3>
        </div>
        <p className="text-white/80 text-sm">
          {isGlobeReady ? "Spin, pinch to zoom, and tap a marker to open." : "Loading 3D globe..."}
        </p>
      </div>

      {/* Globe container - Takes remaining height and centers the globe */}
      <div className="flex-1 relative flex items-center justify-center">
        {!isGlobeReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="text-center relative">
              <div className="relative">
                {/* Reserve Logo */}
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto relative z-20">
                    <img src="/logos/reserve-logo.png" alt="Reserve" className="w-16 h-16 object-contain" />
                  </div>
                  
                  {/* Particles that get absorbed by the logo */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={`particle-${i}`}
                      className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 15,
                        animationDelay: `${i * 0.6}s`,
                        animationDuration: '3s',
                        animation: isGlobeReady ? 'none' : `particle-absorb-${i} 6s ease-out forwards`
                      }}
                    />
                  ))}
                </div>
                
                {/* Loading Bar */}
                <div className="w-64 h-3 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: isGlobeReady ? '100%' : '0%',
                      animation: isGlobeReady ? 'none' : 'loading-grow 6s ease-out forwards'
                    }}
                  />
                </div>
                
                {/* Loading Text */}
                <p className="text-white text-2xl font-bold mb-3">Connecting to Earth</p>
                <p className="text-emerald-400 text-lg font-medium">
                  {isGlobeReady ? "Ready to explore!" : "Loading conservation projects..."}
                </p>
              </div>
            </div>
            
            {/* Custom CSS for particle absorption and loading bar */}
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes loading-grow {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
                
                ${Array.from({ length: 8 }).map((_, i) => `
                  @keyframes particle-absorb-${i} {
                    0% {
                      transform: translate(-50%, -50%) translate(${Math.random() * 120 - 60}px, ${Math.random() * 120 - 60}px);
                      opacity: 1;
                      scale: 1;
                    }
                    ${Math.max(15, i * 10)}% {
                      transform: translate(-50%, -50%) translate(${Math.random() * 120 - 60}px, ${Math.random() * 120 - 60}px);
                      opacity: 1;
                      scale: 1;
                    }
                    ${Math.max(40, i * 10 + 30)}% {
                      transform: translate(-50%, -50%) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px);
                      opacity: 0.8;
                      scale: 0.8;
                    }
                    ${Math.max(65, i * 10 + 55)}% {
                      transform: translate(-50%, -50%) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
                      opacity: 0.6;
                      scale: 0.6;
                    }
                    ${Math.max(85, i * 10 + 75)}% {
                      transform: translate(-50%, -50%) translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
                      opacity: 0.3;
                      scale: 0.3;
                    }
                    100% {
                      transform: translate(-50%, -50%) translate(0px, 0px);
                      opacity: 0;
                      scale: 0.1;
                    }
                  }
                `).join('')}
              `
            }} />
          </div>
        )}
        <GlobeGL 
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
          onGlobeReady={() => setIsGlobeReady(true)}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
