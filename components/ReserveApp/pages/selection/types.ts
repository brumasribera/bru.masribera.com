import L from 'leaflet';

export interface ProtectedArea {
  id: string;
  bounds: L.LatLngBounds;
  area: number; // in m²
  protectedBy: string;
  protectedDate: string;
}

export interface SelectedArea {
  id: string;
  bounds: L.LatLngBounds;
  area: number; // in m²
}

export interface AreaSelectionPageProps {
  project: any; // Project type from parent
  onBack: () => void;
  onContinue: (selectedArea: number) => void;
}
