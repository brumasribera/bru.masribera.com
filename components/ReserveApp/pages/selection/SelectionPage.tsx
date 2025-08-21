import { useState, useRef, useEffect, useCallback } from 'react';
import { Project } from '../../types/types';
import { ArrowLeft, ZoomIn, ZoomOut, Grid, RotateCcw, Check, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Point {
  x: number;
  y: number;
}

interface Polygon {
  id: string;
  points: Point[];
  area: number; // in area units
}

interface AreaSelectionPageProps {
  project: Project;
  onBack: () => void;
  onContinue: (selectedArea: number) => void;
}

export function AreaSelectionPage({ project, onBack, onContinue }: AreaSelectionPageProps) {
  const { t } = useTranslation('reserve');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageScale, setImageScale] = useState(1); // area units per pixel ratio
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Point | null>(null);
  const [polygons, setPolygons] = useState<Polygon[]>([]);
  const [currentPolygon, setCurrentPolygon] = useState<Point[]>([]);
  const [isDrawingPolygon, setIsDrawingPolygon] = useState(false);
  const [gridSize, setGridSize] = useState(10); // area units per grid cell
  const [totalSelectedArea, setTotalSelectedArea] = useState(0);
  const [isPanMode, setIsPanMode] = useState(true);

  // Load satellite image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageLoaded(true);
      // Calculate scale based on project area and image dimensions
      // Assuming the image represents the full project area
      const projectAreaUnits = project.areaHectares * 10000; // convert hectares to m²
      const imageAreaPixels = img.width * img.height;
      const scale = Math.sqrt(projectAreaUnits / imageAreaPixels);
      setImageScale(scale);
    };
    img.src = project.image;
  }, [project]);

  // Calculate grid size based on zoom level
  useEffect(() => {
    if (zoom >= 2) {
      setGridSize(1); // 1 area unit per cell at high zoom
    } else if (zoom >= 1) {
      setGridSize(10); // 10 area units per cell at medium zoom
    } else {
      setGridSize(100); // 100 area units per cell at low zoom
    }
  }, [zoom]);

  // Calculate total selected area
  useEffect(() => {
    const total = polygons.reduce((sum, polygon) => sum + polygon.area, 0);
    setTotalSelectedArea(total);
  }, [polygons]);

  const getGridLabel = () => {
    if (gridSize === 1) return '1 area unit per grid cell';
    if (gridSize === 10) return '10 area units per grid cell';
    return '100 area units per grid cell';
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.5 : prev / 1.5;
      return Math.max(0.1, Math.min(5, newZoom));
    });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;

    if (isPanMode) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else {
      // Polygon drawing mode
      if (!isDrawingPolygon) {
        setIsDrawingPolygon(true);
        setCurrentPolygon([{ x, y }]);
      } else {
        setCurrentPolygon(prev => [...prev, { x, y }]);
      }
    }
  }, [isPanMode, pan, zoom, isDrawingPolygon]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !dragStart) return;

    const newPanX = e.clientX - dragStart.x;
    const newPanY = e.clientY - dragStart.y;
    setPan({ x: newPanX, y: newPanY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragStart(null);
  }, []);

  const handleDoubleClick = useCallback(() => {
    if (isDrawingPolygon && currentPolygon.length >= 3) {
      // Complete polygon
      const area = calculatePolygonArea(currentPolygon);
      const newPolygon: Polygon = {
        id: Date.now().toString(),
        points: [...currentPolygon],
        area: Math.round(area)
      };
      setPolygons(prev => [...prev, newPolygon]);
      setCurrentPolygon([]);
      setIsDrawingPolygon(false);
    }
  }, [isDrawingPolygon, currentPolygon]);

  const calculatePolygonArea = (points: Point[]): number => {
    if (points.length < 3) return 0;
    
    let area = 0;
    for (let i = 0; i < points.length; i++) {
      const j = (i + 1) % points.length;
      area += points[i].x * points[j].y;
      area -= points[j].x * points[i].y;
    }
    
    // Convert to area units using the image scale
    const pixelArea = Math.abs(area) / 2;
    return Math.round(pixelArea * imageScale * imageScale);
  };

  const removePolygon = (polygonId: string) => {
    setPolygons(prev => prev.filter(p => p.id !== polygonId));
  };

  const clearAll = () => {
    setPolygons([]);
    setCurrentPolygon([]);
    setIsDrawingPolygon(false);
  };

  const toggleMode = () => {
    setIsPanMode(!isPanMode);
    if (isDrawingPolygon) {
      setCurrentPolygon([]);
      setIsDrawingPolygon(false);
    }
  };

  // Draw everything on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw satellite image if loaded
    if (imageLoaded) {
      const img = new Image();
      img.src = project.image;
      ctx.drawImage(img, 0, 0, canvas.width / zoom, canvas.height / zoom);
    }

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw existing polygons
    polygons.forEach(polygon => drawPolygon(ctx, polygon.points, '#10b981', '#059669', polygon.area));

    // Draw current polygon being drawn
    if (currentPolygon.length > 0) {
      drawPolygon(ctx, currentPolygon, '#3b82f6', '#2563eb', 0);
    }

    ctx.restore();
  }, [pan, zoom, polygons, currentPolygon, gridSize, imageLoaded, project.image]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Calculate grid spacing based on zoom and desired area units per cell
    const targetAreaPerCell = gridSize;
    const pixelsPerUnit = 1 / imageScale;
    const gridSpacingPixels = Math.sqrt(targetAreaPerCell) * pixelsPerUnit;
    const scaledSpacing = gridSpacingPixels / zoom;

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1 / zoom;
    ctx.setLineDash([5 / zoom, 5 / zoom]);

    // Vertical lines
    for (let x = 0; x <= width / zoom; x += scaledSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height / zoom);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height / zoom; y += scaledSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width / zoom, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);
  };

  const drawPolygon = (ctx: CanvasRenderingContext2D, points: Point[], fillColor: string, strokeColor: string, area: number) => {
    if (points.length < 3) return;

    ctx.fillStyle = fillColor + '80'; // Add transparency
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 / zoom;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw area label
    if (area > 0) {
      const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
      const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
      
      // Draw background for text
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(centerX - 30, centerY - 10, 60, 20);
      
      ctx.fillStyle = '#ffffff';
      ctx.font = `${12 / zoom}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${area} units`, centerX, centerY);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Grid:</span> {getGridLabel()}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Total:</span> {totalSelectedArea} units
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Scale:</span> {imageScale.toFixed(2)} units/pixel
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isPanMode 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isPanMode ? 'Pan Mode' : 'Draw Mode'}
            </button>
            
            <button
              onClick={clearAll}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              title="Clear all selections"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Container */}
      <div className="absolute inset-0 pt-20">
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight - 80}
          className="w-full h-full cursor-crosshair"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        />
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => handleZoom('in')}
          className="w-12 h-12 bg-white/90 hover:bg-white rounded-lg shadow-lg flex items-center justify-center transition-colors"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-12 h-12 bg-white/90 hover:bg-white rounded-lg shadow-lg flex items-center justify-center transition-colors"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-sm">
        <h3 className="font-semibold text-gray-900 mb-2">Instructions</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• <span className="font-medium">Pan Mode:</span> Click and drag to move around</p>
          <p>• <span className="font-medium">Draw Mode:</span> Click to add polygon points</p>
          <p>• <span className="font-medium">Double-click</span> to complete polygon</p>
          <p>• Use zoom controls to adjust grid detail</p>
          <p>• Grid automatically adjusts: 1, 10, or 100 units per cell</p>
        </div>
      </div>

      {/* Continue Button */}
      {totalSelectedArea > 0 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => onContinue(totalSelectedArea)}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            Continue with {totalSelectedArea} units
          </button>
        </div>
      )}
    </div>
  );
}
