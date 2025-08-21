import { SelectedArea } from '../types';

interface SelectedAreasListProps {
  selectedAreas: SelectedArea[];
  onRemoveArea: (areaId: string) => void;
  pricePerM2: number;
}

export function SelectedAreasList({ 
  selectedAreas, 
  onRemoveArea, 
  pricePerM2 
}: SelectedAreasListProps) {
  if (selectedAreas.length === 0) return null;

  return (
    <div className="absolute top-20 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 max-w-xs z-[9999]">
      <h3 className="font-semibold text-gray-900 mb-2">Selected Areas</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {selectedAreas.map(area => (
          <div key={area.id} className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
            <div className="text-sm">
              <div className="font-medium text-green-700">{area.area} m²</div>
              <div className="text-xs text-green-600">€{(area.area * pricePerM2).toFixed(2)}</div>
            </div>
            <button
              onClick={() => onRemoveArea(area.id)}
              className="text-red-500 hover:text-red-700 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
