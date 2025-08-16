export interface Project {
  id: string;
  name: string;
  country: string;
  pricePerM2: number;
  impact: {
    biodiversity: number;
    carbon: number;
    community: number;
  };
  lat: number;
  lon: number;
  image: string;
}

export interface CartItem {
  project: Project;
  m2: number;
  amount: number;
}
