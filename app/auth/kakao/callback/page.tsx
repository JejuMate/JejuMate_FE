"use client";

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import {kakaoLogin} from '@/lib/api';

export default function KakaoCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {login} = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleKakaoCallback = async () => {
            const code = searchParams.get('code');
            const errorParam = searchParams.get('error');
            const errorDescription = searchParams.get('error_description');

            if (errorParam) {
                setError(errorDescription || '카카오 로그인이 취소되었습니다.');
                return;
            }

            if (!code) {
                setError('인가 코드가 없습니다.');
                return;
            }

            try {
                const response = await kakaoLogin(code);

                login(response);

                const redirectPath = sessionStorage.getItem('redirectAfterLogin');
                sessionStorage.removeItem('redirectAfterLogin');

                if (response.isNewMember) {
                    router.push('/profile/setup');
                } else {
                    router.push(redirectPath || '/');
                }

            } catch (err) {
                console.error('카카오 로그인 실패:', err);
                setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
            }
        };

        handleKakaoCallback();
    }, [searchParams, login, router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i className="ri-error-warning-line text-3xl text-red-600"></i>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">로그인 실패</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <div className="space-y-3">
                        <button
                            onClick={() => router.push('/')}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            홈으로 돌아가기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div
                    className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">로그인 중...</h1>
                <p className="text-gray-600">카카오 계정으로 로그인하고 있습니다.</p>
            </div>
        </div>
    );
}