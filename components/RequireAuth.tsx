"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getKakaoAuthUrl } from '@/lib/api';
import Header from '@/components/Header';
import Loading from '@/components/Loading';

interface RequireAuthProps {
    children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
    const router = useRouter();
    const { isLoggedIn, isLoading } = useAuth();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!isLoading && !isLoggedIn) {
            setShowModal(true);
        }
    }, [isLoggedIn, isLoading]);

    const handleKakaoLogin = () => {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = getKakaoAuthUrl();
    };

    const handleGoHome = () => {
        setShowModal(false);
        router.push('/');
    };

    if (isLoading) {
        return <Loading message="로딩 중..." />;
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />

                {/* 배경 (흐리게) */}
                <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 64px)' }}>
                    <div className="text-center text-gray-400">
                        <i className="ri-lock-line text-6xl mb-4"></i>
                        <p>로그인이 필요한 페이지입니다</p>
                    </div>
                </div>

                {/* 로그인 팝업 */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-xl">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="ri-lock-line text-3xl text-blue-600"></i>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                로그인이 필요합니다
                            </h3>

                            <p className="text-gray-600 mb-6">
                                이 서비스를 이용하려면 로그인이 필요합니다.
                                <br />
                                로그인 하시겠습니까?
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleKakaoLogin}
                                    className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                                >
                                    <i className="ri-kakao-talk-fill text-xl"></i>
                                    카카오로 로그인
                                </button>

                                <button
                                    onClick={handleGoHome}
                                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    홈으로 돌아가기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return <>{children}</>;
}