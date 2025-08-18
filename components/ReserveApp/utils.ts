export function classNames(...s: (string | boolean | undefined)[]): string { 
  return s.filter(Boolean).join(" "); 
}

export const CONTRIBUTIONS_KEY = 'reserve_contributions_v1';

export function loadContributions() {
  try {
    const raw = localStorage.getItem(CONTRIBUTIONS_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    
    // Default contributions spanning the globe
    return [
      {
        id: 'default-1',
        projectId: 'ar-wetlands',
        projectName: 'Argentine Wetlands',
        projectCountry: 'Argentina',
        image: '/reserve/project-images/ar-wetlands.jpg',
        lat: -34.6118,
        lon: -58.3960,
        m2: 45,
        amount: 45,
        method: 'card',
        createdAt: '2024-01-15T10:00:00.000Z'
      },
      {
        id: 'default-2',
        projectId: 'jp-sea',
        projectName: 'Japanese Sea Forest',
        projectCountry: 'Japan',
        image: '/reserve/project-images/jp-sea.jpg',
        lat: 35.6762,
        lon: 139.6503,
        m2: 52,
        amount: 52,
        method: 'card',
        createdAt: '2024-02-20T14:30:00.000Z'
      },
      {
        id: 'default-3',
        projectId: 'ke-savanna',
        projectName: 'Kenyan Savanna',
        projectCountry: 'Kenya',
        image: '/reserve/project-images/ke-savanna.jpg',
        lat: -1.2921,
        lon: 36.8219,
        m2: 38,
        amount: 38,
        method: 'paypal',
        createdAt: '2024-03-10T09:15:00.000Z'
      },
      {
        id: 'default-4',
        projectId: 'us-cal-giants',
        projectName: 'California Redwoods',
        projectCountry: 'USA',
        image: '/reserve/project-images/us-cal-giants.jpg',
        lat: 37.7749,
        lon: -122.4194,
        m2: 65,
        amount: 65,
        method: 'card',
        createdAt: '2024-04-05T16:45:00.000Z'
      },
      {
        id: 'default-5',
        projectId: 'au-reef',
        projectName: 'Great Barrier Reef',
        projectCountry: 'Australia',
        image: '/reserve/project-images/au-reef.jpg',
        lat: -16.9203,
        lon: 145.7707,
        m2: 45,
        amount: 45,
        method: 'paypal',
        createdAt: '2024-05-12T11:20:00.000Z'
      }
    ];
  } catch {
    return [];
  }
}

export function saveContribution(contribution: any) {
  const list = loadContributions();
  list.push(contribution);
  localStorage.setItem(CONTRIBUTIONS_KEY, JSON.stringify(list));
}

export function clearContributions() {
  localStorage.removeItem(CONTRIBUTIONS_KEY);
}