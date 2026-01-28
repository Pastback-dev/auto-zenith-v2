export interface Car {
  id: string;
  name: string;
  brand: string;
  type: 'suv' | 'sedan' | 'electric' | 'hybrid' | 'sport' | 'luxury';
  price: number;
  image: string;
  rating: number;
  pros: string[];
  cons: string[];
  costOfOwnership: {
    annual: number;
    maintenance: string;
    fuel: string;
  };
  specs: {
    power: string;
    acceleration: string;
    range: string;
    topSpeed: string;
  };
  tags: string[];
  badge?: 'best-overall' | 'best-value' | 'premium-choice';
}

export const carDatabase: Car[] = [
  {
    id: '1',
    name: 'Model S Plaid',
    brand: 'Tesla',
    type: 'electric',
    price: 89990,
    image: '/car-electric-sedan.jpg',
    rating: 9.5,
    pros: ['Fastest acceleration in class', 'Zero emissions', 'Autopilot included', 'Minimal maintenance'],
    cons: ['Charging infrastructure dependent', 'Premium price point'],
    costOfOwnership: {
      annual: 2400,
      maintenance: 'Very Low',
      fuel: 'Electric',
    },
    specs: {
      power: '1,020 hp',
      acceleration: '1.99s 0-60',
      range: '396 miles',
      topSpeed: '200 mph',
    },
    tags: ['electric', 'performance', 'luxury', 'tech'],
    badge: 'best-overall',
  },
  {
    id: '2',
    name: 'X5 xDrive50e',
    brand: 'BMW',
    type: 'hybrid',
    price: 72800,
    image: '/car-suv.jpg',
    rating: 9.0,
    pros: ['Versatile hybrid system', 'Premium interior', 'Strong resale value', 'Excellent handling'],
    cons: ['Complex maintenance', 'Smaller electric range'],
    costOfOwnership: {
      annual: 3800,
      maintenance: 'Medium',
      fuel: 'Hybrid',
    },
    specs: {
      power: '483 hp',
      acceleration: '4.6s 0-60',
      range: '30 mi electric',
      topSpeed: '155 mph',
    },
    tags: ['suv', 'hybrid', 'luxury', 'family'],
    badge: 'best-value',
  },
  {
    id: '3',
    name: '911 Carrera S',
    brand: 'Porsche',
    type: 'sport',
    price: 124200,
    image: '/car-sport.jpg',
    rating: 9.8,
    pros: ['Iconic design', 'Track-ready performance', 'Exceptional build quality', 'Timeless appeal'],
    cons: ['Limited practicality', 'High insurance costs'],
    costOfOwnership: {
      annual: 5200,
      maintenance: 'High',
      fuel: 'Premium Gas',
    },
    specs: {
      power: '443 hp',
      acceleration: '3.3s 0-60',
      range: '340 miles',
      topSpeed: '191 mph',
    },
    tags: ['sport', 'luxury', 'performance'],
    badge: 'premium-choice',
  },
  {
    id: '4',
    name: 'S-Class S580',
    brand: 'Mercedes-Benz',
    type: 'luxury',
    price: 118500,
    image: '/car-luxury-sedan.jpg',
    rating: 9.4,
    pros: ['Ultimate comfort', 'Cutting-edge technology', 'Prestigious status', 'Whisper quiet'],
    cons: ['Expensive options', 'Complex systems'],
    costOfOwnership: {
      annual: 4800,
      maintenance: 'High',
      fuel: 'Premium Gas',
    },
    specs: {
      power: '496 hp',
      acceleration: '4.4s 0-60',
      range: '450 miles',
      topSpeed: '130 mph',
    },
    tags: ['luxury', 'sedan', 'business', 'comfort'],
  },
  {
    id: '5',
    name: 'Model Y Long Range',
    brand: 'Tesla',
    type: 'electric',
    price: 52990,
    image: '/car-suv.jpg',
    rating: 8.8,
    pros: ['Great value', 'Spacious interior', 'Low running costs', 'OTA updates'],
    cons: ['Build quality varies', 'Minimalist interior'],
    costOfOwnership: {
      annual: 1800,
      maintenance: 'Very Low',
      fuel: 'Electric',
    },
    specs: {
      power: '384 hp',
      acceleration: '4.8s 0-60',
      range: '330 miles',
      topSpeed: '135 mph',
    },
    tags: ['electric', 'suv', 'family', 'value'],
  },
];

export interface UserPreferences {
  budget: [number, number];
  carType: string[];
  usage: string[];
  fuelPreference: string;
  maintenancePriority: string;
}

export function getRecommendations(preferences: UserPreferences): Car[] {
  let recommendations = carDatabase.filter(car => {
    // Budget filter
    if (car.price < preferences.budget[0] || car.price > preferences.budget[1]) {
      return false;
    }
    
    // Car type filter
    if (preferences.carType.length > 0 && !preferences.carType.includes(car.type)) {
      return false;
    }
    
    // Fuel preference filter
    if (preferences.fuelPreference && preferences.fuelPreference !== 'any') {
      if (preferences.fuelPreference === 'electric' && car.type !== 'electric') return false;
      if (preferences.fuelPreference === 'hybrid' && car.type !== 'hybrid') return false;
      if (preferences.fuelPreference === 'gas' && (car.type === 'electric' || car.type === 'hybrid')) return false;
    }
    
    return true;
  });

  // Sort by rating
  recommendations.sort((a, b) => b.rating - a.rating);
  
  // Assign badges to top picks
  if (recommendations.length > 0) {
    recommendations[0] = { ...recommendations[0], badge: 'best-overall' };
  }
  if (recommendations.length > 1) {
    // Find best value (highest rating per dollar)
    const bestValue = [...recommendations].sort((a, b) => (b.rating / b.price) - (a.rating / a.price))[0];
    const idx = recommendations.findIndex(c => c.id === bestValue.id);
    if (idx > 0) {
      recommendations[idx] = { ...recommendations[idx], badge: 'best-value' };
    }
  }
  if (recommendations.length > 2) {
    // Premium choice - highest price
    const premium = [...recommendations].sort((a, b) => b.price - a.price)[0];
    const idx = recommendations.findIndex(c => c.id === premium.id);
    if (idx > 0 && !recommendations[idx].badge) {
      recommendations[idx] = { ...recommendations[idx], badge: 'premium-choice' };
    }
  }
  
  return recommendations.slice(0, 5);
}
