// Schedule Types
export interface ScheduleItem {
  id: string;
  time: string;
  name: string;
  category: string;
  description: string;
  location: string;
  image: string;
  duration: string;
  cost: string;
  latitude?: number;
  longitude?: number;
}

export interface DaySchedule {
  day: number;
  date: string;
  items: ScheduleItem[];
}

// Popular Spot Types
export interface PopularSpot {
  id: string;
  name: string;
  category: string;
  location: string;
  recommendCount: number;
  favoriteCount: number;
  totalScore: number;
  image: string;
  description: string;
  averageRating: number;
}

// Recommendation History Types
export interface RecommendationHistory {
  id: string;
  title: string;
  date: string;
  companion: string;
  duration: string;
  budget: string;
  categories: string[];
  thumbnail: string;
  status: 'completed' | 'saved' | 'draft';
}

// Form Types
export interface RecommendFormData {
  companion: string;
  ageGroup: string;
  categories: string[];
  additionalRequests: string;
}

export interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  verificationCode: string;
  travelStyle: string;
  companion: string;
  budget: string;
  categories: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
}


