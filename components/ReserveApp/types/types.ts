export interface Project {
  id: string;
  name: string;
  country: string;
  pricePerM2: number;
  areaHectares: number;
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

export interface Contribution {
  id: string; // unique id for the contribution
  projectId: string;
  projectName: string;
  projectCountry: string;
  image: string;
  lat: number;
  lon: number;
  m2: number;
  amount: number;
  method: 'card' | 'paypal';
  createdAt: string; // ISO date
}