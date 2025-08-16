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
    
    // Use addEventListener for better compatibility
    el.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Marker clicked:', d.project.name);
      navigateToProtectedArea(d.project);
    });

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
    <div className="w-full h-full relative">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/20 to-transparent p-4">
        <div className="flex items-center gap-2 text-white">
          <Earth className="w-5 h-5"/>
          <h3 className="font-semibold">Explore Projects (3D)</h3>
        </div>
        <p className="text-white/80 text-sm">
          {isGlobeReady ? "Spin, pinch to zoom, and tap a marker to open." : "Loading 3D globe..."}
        </p>
      </div>

      {/* Globe container */}
      <div className="w-full h-full">
        {!isGlobeReady && (
          <div className="w-full h-full flex items-center justify-center bg-white overflow-hidden">
            <div className="text-center flex flex-col items-center justify-center h-full">
              <div className="relative w-32 h-32 mx-auto mb-8">
                <img 
                  src="/logos/reserve-logo.png" 
                  alt="Reserve" 
                  className="w-full h-full object-contain animate-pulse"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
              <p className="text-gray-600 text-2xl font-medium mb-2">Loading 3D Globe...</p>
              <p className="text-gray-500 text-lg">Preparing conservation projects</p>
            </div>
          </div>
        )}
        <GlobeGL
          backgroundColor="#ffffff00"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          showAtmosphere
          atmosphereColor="#60a5fa"
          atmosphereAltitude={0.15}
          htmlElementsData={markers}
          htmlLat={(d: any) => d.lat}
          htmlLng={(d: any) => d.lng}
          htmlElement={makeMarker}
          onGlobeReady={() => {
            console.log('Globe ready, markers created:', markers.length);
            setIsGlobeReady(true);
          }}
          width={380}
          height={730}
        />
      </div>
    </div>
  );
}
