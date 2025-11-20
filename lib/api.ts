import type {DaySchedule, RecommendFormData, PopularSpot, RecommendationHistory} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const isMockMode = !API_BASE_URL || API_BASE_URL === '/api';

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({message: 'API 요청 실패'}));
        throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
}

// 인증 필요한 API 요청 fetch 래퍼
export async function fetchWithAuth<T>(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
): Promise<T> {
    return fetchApi<T>(endpoint, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export interface AuthLoginResponse {
    accessToken: string;
    refreshToken: string;
    userId: number;
    nickname: string;
    isNewMember: boolean;
}

export interface TokenRefreshResponse {
    accessToken: string;
    refreshToken: string;
}

export function getKakaoAuthUrl(): string {
    const kakaoClientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

    if (!kakaoClientId || !redirectUri) {
        throw new Error('카카오 설정이 올바르지 않습니다.');
    }

    const params = new URLSearchParams({
        client_id: kakaoClientId,
        redirect_uri: redirectUri,
        response_type: 'code',
    });
    console.log("mock mode: ", isMockMode);
    return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
}

export async function kakaoLogin(authorizationCode: string): Promise<AuthLoginResponse> {
    if (isMockMode) {
        console.log('Mock 카카오 로그인 - 인가코드:', authorizationCode);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    accessToken: 'mock_access_token_kakao_1',
                    refreshToken: 'mock_refresh_token_kakao_1',
                    userId: 1,
                    nickname: '테스트1',
                    isNewMember: false,
                });
            }, 1000);
        });
    }

    return fetchApi<AuthLoginResponse>(`/auth/kakao/login?code=${encodeURIComponent(authorizationCode)}`);
}

export async function refreshTokens(refreshToken: string): Promise<TokenRefreshResponse> {
    if (isMockMode) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    accessToken: 'mock_new_access_token_' + Date.now(),
                    refreshToken: 'mock_new_refresh_token_' + Date.now(),
                });
            }, 500);
        });
    }

    return fetchApi<TokenRefreshResponse>('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({refreshToken}),
    });
}

export async function createDevToken(userId: number): Promise<AuthLoginResponse> { //백엔드 컨트롤러에 있어서 혹시 몰라서 구현
    if (isMockMode) {
        console.log('Mock 개발용 토큰 발급 - userId:', userId);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    accessToken: 'mock_dev_access_token_' + Date.now(),
                    refreshToken: 'mock_dev_refresh_token_' + Date.now(),
                    userId: userId,
                    nickname: `테스트유저${userId}`,
                    isNewMember: false,
                });
            }, 500);
        });
    }

    return fetchApi<AuthLoginResponse>('/auth/dev-token', {
        method: 'POST',
        body: JSON.stringify({userId}),
    });
}

export async function logoutAPI(refreshToken: string): Promise<void> {
    if (isMockMode) {
        console.log('Mock 로그아웃');
        return;
    }
    console.log("mock mode: ", isMockMode);
    // TODO: 백엔드에 로그아웃 API 추가 후 활성화
    // await fetchApi('/auth/logout', {
    //     method: 'POST',
    //     body: JSON.stringify({ refreshToken }),
    // });
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


