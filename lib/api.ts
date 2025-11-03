import type { DaySchedule, RecommendFormData, PopularSpot, RecommendationHistory } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Auth API
export async function loginAPI(email: string, password: string) {
  // TODO: 실제 API 엔드포인트로 교체
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function signupAPI(userData: {
  email: string;
  password: string;
  name: string;
  travelStyle?: string;
  companion?: string;
  budget?: string;
  categories?: string[];
}) {
  // TODO: 실제 API 엔드포인트로 교체
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
}

export async function logoutAPI() {
  // TODO: 실제 API 엔드포인트로 교체
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
}

// Recommendation API
export async function createRecommendation(formData: RecommendFormData): Promise<DaySchedule[]> {
  // TODO: 실제 API 엔드포인트로 교체
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data
      const mockSchedules: DaySchedule[] = [
        {
          day: 1,
          date: '2024-02-15',
          items: [
            {
              id: '1-1',
              time: '09:00',
              name: '성산일출봉',
              category: '관광지',
              description: '제주도의 대표적인 일출 명소로 유네스코 세계자연유산',
              location: '서귀포시 성산읍',
              image: 'https://readdy.ai/api/search-image?query=Beautiful%20sunrise%20at%20Seongsan%20Ilchulbong%20peak&width=400&height=250&seq=1&orientation=landscape',
              duration: '2시간',
              cost: '5,000원'
            }
          ]
        }
      ];
      resolve(mockSchedules);
    }, 2000);
  });
}

export async function getRecommendation(id: string): Promise<DaySchedule[]> {
  // TODO: 실제 API 엔드포인트로 교체
  const response = await fetch(`${API_BASE_URL}/recommendations/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch recommendation');
  }

  return response.json();
}

export async function getRecommendationHistory(): Promise<RecommendationHistory[]> {
  // TODO: 실제 API 엔드포인트로 교체
  const response = await fetch(`${API_BASE_URL}/recommendations/history`);

  if (!response.ok) {
    throw new Error('Failed to fetch recommendation history');
  }

  return response.json();
}

// Schedule API
export async function saveSchedule(schedules: DaySchedule[]): Promise<void> {
  // TODO: 실제 API 엔드포인트로 교체
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Schedule saved:', schedules);
      resolve();
    }, 1000);
  });
}

// Statistics API
export async function getPopularSpots(category?: string): Promise<PopularSpot[]> {
  // TODO: 실제 API 엔드포인트로 교체
  const url = category 
    ? `${API_BASE_URL}/statistics/popular-spots?category=${category}`
    : `${API_BASE_URL}/statistics/popular-spots`;
    
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch popular spots');
  }

  return response.json();
}

// Verification API
export async function sendVerificationCode(email: string): Promise<void> {
  // TODO: 실제 API 엔드포인트로 교체
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Verification code sent to:', email);
      resolve();
    }, 1000);
  });
}

export async function verifyCode(email: string, code: string): Promise<boolean> {
  // TODO: 실제 API 엔드포인트로 교체
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Verifying code:', code, 'for email:', email);
      resolve(true);
    }, 1000);
  });
}


