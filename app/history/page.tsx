'use client';

import {useState} from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Badge from '@/components/Badge';
import {getCompanionIcon, formatDateKorean} from '@/utils/helpers';
import type {RecommendationHistory} from '@/types';
import RequireAuth from "@/components/RequireAuth";

export default function History() {
    const [filter, setFilter] = useState<'all' | 'completed' | 'saved' | 'draft'>('all');

    const mockHistory: RecommendationHistory[] = [
        {
            id: '1',
            title: '성산일출봉 & 우도 여행',
            date: '2024-01-15',
            companion: '연인',
            duration: '2박 3일',
            budget: '30만원',
            categories: ['관광지', '맛집', '카페'],
            thumbnail: 'https://readdy.ai/api/search-image?query=Beautiful%20sunrise%20at%20Seongsan%20Ilchulbong%20peak%20in%20Jeju%20Island%20Korea%20with%20dramatic%20volcanic%20crater%20formation%20and%20ocean%20view%2C%20golden%20morning%20light&width=300&height=200&seq=1&orientation=landscape',
            status: 'completed'
        },
        {
            id: '2',
            title: '한라산 트레킹 코스',
            date: '2024-01-10',
            companion: '친구들',
            duration: '1박 2일',
            budget: '20만원',
            categories: ['자연', '액티비티'],
            thumbnail: 'https://readdy.ai/api/search-image?query=Majestic%20Hallasan%20mountain%20in%20Jeju%20Island%20with%20hiking%20trails%2C%20lush%20green%20forest%2C%20mountain%20peak%2C%20natural%20hiking%20destination&width=300&height=200&seq=2&orientation=landscape',
            status: 'saved'
        },
        {
            id: '3',
            title: '제주 맛집 투어',
            date: '2024-01-05',
            companion: '가족',
            duration: '3박 4일',
            budget: '50만원',
            categories: ['맛집', '쇼핑'],
            thumbnail: 'https://readdy.ai/api/search-image?query=Delicious%20Jeju%20black%20pork%20barbecue%20grilled%20meat%20Korean%20cuisine%2C%20traditional%20restaurant%20setting%2C%20appetizing%20food%20photography&width=300&height=200&seq=3&orientation=landscape',
            status: 'draft'
        },
        {
            id: '4',
            title: '제주 카페 & 감성 여행',
            date: '2024-01-01',
            companion: '혼자',
            duration: '2박 3일',
            budget: '25만원',
            categories: ['카페', '관광지', '자연'],
            thumbnail: 'https://readdy.ai/api/search-image?query=Cozy%20seaside%20cafe%20in%20Jeju%20Island%20with%20ocean%20view%2C%20aesthetic%20interior%20design%2C%20coffee%20and%20desserts%2C%20peaceful%20atmosphere&width=300&height=200&seq=4&orientation=landscape',
            status: 'completed'
        }
    ];

    const filteredHistory = filter === 'all'
        ? mockHistory
        : mockHistory.filter(item => item.status === filter);

    const getStatusVariant = (status: string): 'success' | 'primary' | 'info' => {
        if (status === 'completed') return 'success';
        if (status === 'saved') return 'primary';
        return 'info';
    };

    const getStatusLabel = (status: string): string => {
        if (status === 'completed') return '완료';
        if (status === 'saved') return '저장됨';
        return '임시저장';
    };

    return (
        <RequireAuth>
            <div className="min-h-screen bg-gray-50">
                <Header/>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* 페이지 헤더 */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">추천 기록</h1>
                        <p className="text-gray-600">지금까지 받은 여행 추천 기록을 확인하고 관리하세요</p>
                    </div>

                    {/* 필터 탭 */}
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                            {[
                                {key: 'all', label: '전체'},
                                {key: 'completed', label: '완료'},
                                {key: 'saved', label: '저장됨'},
                                {key: 'draft', label: '임시저장'}
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setFilter(tab.key as any)}
                                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                                        filter === tab.key
                                            ? 'bg-white text-blue-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 추천 기록 리스트 */}
                    {filteredHistory.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredHistory.map((item) => (
                                <div key={item.id}
                                     className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="relative">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-48 object-cover object-top"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge variant={getStatusVariant(item.status)}>
                                                {getStatusLabel(item.status)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold text-gray-900 text-lg">{item.title}</h3>
                                            <button
                                                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                                                <i className="ri-heart-line"></i>
                                            </button>
                                        </div>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <i className="ri-calendar-line mr-2"></i>
                                                {formatDateKorean(item.date)}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <i className={`${getCompanionIcon(item.companion)} mr-2`}></i>
                                                {item.companion} • {item.duration}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <i className="ri-wallet-line mr-2"></i>
                                                예산: {item.budget}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {item.categories.map((category) => (
                                                <Badge key={category} variant="primary" size="sm">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex space-x-2">
                                            <Link
                                                href={`/recommend/result/${item.id}`}
                                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap text-center"
                                            >
                                                상세보기
                                            </Link>
                                            <button
                                                className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                                                <i className="ri-more-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                            <i className="ri-history-line text-6xl text-gray-300 mb-4"></i>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">추천 기록이 없습니다</h3>
                            <p className="text-gray-600 mb-6">
                                {filter === 'all'
                                    ? '아직 여행 추천을 받지 않으셨네요. 첫 번째 맞춤 여행을 계획해보세요!'
                                    : `${filter === 'completed' ? '완료된' : filter === 'saved' ? '저장된' : '임시저장된'} 추천이 없습니다.`
                                }
                            </p>
                            <Link
                                href="/recommend"
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap inline-block"
                            >
                                여행 추천 받기
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </RequireAuth>
    );
}
