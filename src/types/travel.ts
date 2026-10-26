export interface TourGuide {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  languages: string[];
  toursLed: number;
}

export interface TourItineraryStop {
  time: string;
  title: string;
  description: string;
  sights: string[];
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  region: string;
  country: string;
  lat: number;
  lng: number;
  duration: string;
  groupSize: string;
  difficulty: 'Easy' | 'Moderate' | 'Active';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  highlights: string[];
  itinerary: TourItineraryStop[];
  inclusions: string[];
  exclusions: string[];
  meetingPoint: string;
  meetingAddress: string;
  meetingCoords: [number, number];
  coverImage: string;
  category: 'Culinary & Wine' | 'Historic Alleys' | 'Coastal & Nature' | 'Artisans & Craft' | 'Wilderness';
  nextDates: string[];
  guide: TourGuide;
}

export interface GuideSpot {
  name: string;
  category: string;
  description: string;
  coords: [number, number];
  localTip: string;
}

export interface LocalGuide {
  id: string;
  slug: string;
  title: string;
  destination: string;
  country: string;
  category: string;
  readTime: string;
  excerpt: string;
  bestTimeToVisit: string;
  intro: string;
  centerCoords: [number, number];
  zoomLevel: number;
  districts: {
    name: string;
    vibe: string;
    description: string;
    insiderTips: string[];
  }[];
  topSpots: GuideSpot[];
  dayPlan: {
    period: 'Morning' | 'Afternoon' | 'Evening';
    title: string;
    activity: string;
    recommendedVenue: string;
  }[];
  localEtiquette: string[];
  coverImage: string;
  relatedTourId: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  coverImage: string;
  paragraphs: string[];
  quote?: {
    text: string;
    source: string;
  };
  keyTakeaways: string[];
  relatedTourId?: string;
  comments: {
    id: string;
    author: string;
    date: string;
    text: string;
  }[];
}

export interface Review {
  id: string;
  tourId: string;
  author: {
    name: string;
    country: string;
    travelerType: 'Solo' | 'Couple' | 'Family' | 'Small Group';
  };
  date: string;
  rating: number;
  title: string;
  comment: string;
  breakdown: {
    knowledge: number;
    pacing: number;
    sights: number;
    value: number;
  };
  helpfulCount: number;
  verified: boolean;
}

export interface MapPOI {
  id: string;
  name: string;
  category: 'Heritage' | 'Culinary' | 'Nature' | 'Viewpoint' | 'Tour Meeting Point' | 'Artisan';
  destination: string;
  lat: number;
  lng: number;
  description: string;
  localTip: string;
  relatedTourId?: string;
  image: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  tourId: string;
  tourTitle: string;
  destination: string;
  date: string;
  timeSlot: string;
  guests: {
    adults: number;
    children: number;
  };
  totalPrice: number;
  leadTraveler: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    dietaryNotes?: string;
  };
  status: 'confirmed' | 'cancelled';
  bookedAt: string;
  qrCodeId: string;
}
