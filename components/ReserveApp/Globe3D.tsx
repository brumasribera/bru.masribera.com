import { useMemo, useEffect, useState } from "react";
import { Home } from "lucide-react";
import GlobeGL from "react-globe.gl";
import { PROJECTS } from "./data";
import { Project } from "./types";

interface Globe3DProps {
  onPick: (project: Project) => void;
  onShowContributions: () => void;
}

export function Globe3D({ onPick, onShowContributions }: Globe3DProps) {
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
      
      {/* Header overlay removed per design */}

      {/* Home Button - positioned top right */}
      <button
        onClick={() => {
          console.log('Home button clicked, going to My Contributions');
          onShowContributions();
        }}
        className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-gray-100/95 text-gray-700 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 z-[9999]"
      >
        <Home className="h-5 w-5" />
      </button>

      {/* Globe container - Takes remaining height and centers the globe */}
      <div className="flex-1 relative flex items-center justify-center">
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
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
