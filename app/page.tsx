"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import type { PopularSpot } from "@/types";

export default function Home() {
  const { isLoggedIn } = useAuth();

  const recentRecommendations = [
    {
      id: 1,
      date: "2024-01-15",
      title: "성산일출봉 & 우도 여행",
      companion: "연인",
      duration: "2박 3일",
    },
    {
      id: 2,
      date: "2024-01-10",
      title: "한라산 트레킹 코스",
      companion: "친구들",
      duration: "1박 2일",
    },
  ];

  const popularSpots: PopularSpot[] = [
    {
      id: "1",
      name: "성산일출봉",
      category: "관광지",
      location: "서귀포시 성산읍",
      recommendCount: 1250,
      favoriteCount: 890,
      totalScore: 2140,
      image:
        "https://readdy.ai/api/search-image?query=Beautiful%20sunrise%20at%20Seongsan%20Ilchulbong%20peak%20in%20Jeju%20Island%20Korea%20with%20dramatic%20volcanic%20crater%20formation%20and%20ocean%20view%2C%20golden%20morning%20light%2C%20natural%20landscape%20photography&width=300&height=200&seq=1&orientation=landscape",
      description: "제주도의 대표적인 일출 명소로 유네스코 세계자연유산",
      averageRating: 4.8,
    },
    {
      id: "2",
      name: "한라산 국립공원",
      category: "자연",
      location: "제주시 해안동",
      recommendCount: 980,
      favoriteCount: 720,
      totalScore: 1700,
      image:
        "https://readdy.ai/api/search-image?query=Majestic%20Hallasan%20mountain%20in%20Jeju%20Island%20with%20hiking%20trails%2C%20lush%20green%20forest%2C%20mountain%20peak%2C%20natural%20hiking%20destination%2C%20clear%20mountain%20air%2C%20volcanic%20landscape&width=300&height=200&seq=2&orientation=landscape",
      description: "제주도의 최고봉으로 다양한 등산 코스 제공",
      averageRating: 4.7,
    },
    {
      id: "3",
      name: "제주 흑돼지 맛집",
      category: "맛집",
      location: "제주시 연동",
      recommendCount: 850,
      favoriteCount: 650,
      totalScore: 1500,
      image:
        "https://readdy.ai/api/search-image?query=Delicious%20Jeju%20black%20pork%20barbecue%20grilled%20meat%20Korean%20cuisine%2C%20traditional%20restaurant%20setting%2C%20appetizing%20food%20photography%2C%20warm%20lighting%2C%20local%20specialty&width=300&height=200&seq=3&orientation=landscape",
      description: "제주도 대표 특산품인 흑돼지 구이 전문점",
      averageRating: 4.6,
    },
    {
      id: "4",
      name: "우도",
      category: "관광지",
      location: "제주시 우도면",
      recommendCount: 780,
      favoriteCount: 560,
      totalScore: 1340,
      image:
        "https://readdy.ai/api/search-image?query=Scenic%20Udo%20island%20near%20Jeju%20with%20pristine%20turquoise%20beaches%2C%20coastal%20cliffs%2C%20peaceful%20island%20atmosphere%2C%20clear%20blue%20water%2C%20natural%20beauty&width=300&height=200&seq=4&orientation=landscape",
      description: "에메랄드빛 바다와 아름다운 해안선을 자랑하는 섬",
      averageRating: 4.5,
    },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <Header />

        {/* 히어로 섹션 */}
        <section
          className="relative h-96 flex items-center justify-center text-center text-white"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=Beautiful%20Jeju%20Island%20landscape%20with%20volcanic%20mountains%2C%20ocean%20coastline%2C%20dramatic%20cliffs%2C%20pristine%20nature%2C%20Korean%20travel%20destination%2C%20scenic%20panoramic%20view%2C%20natural%20beauty&width=1200&height=400&seq=5&orientation=landscape')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              AI가 추천하는
              <br />
              맞춤 제주도 여행
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              당신만의 완벽한 제주 여행 일정을 만들어보세요
            </p>
            <Link
              href="/recommend"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              지금 시작하기
            </Link>
          </div>
        </section>

        {/* 인기 여행지 순위 */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                인기 여행지 순위
              </h3>
              <p className="text-gray-600">
                많은 여행자들이 선택한 제주도 명소들
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-gray-200">
                {popularSpots.map((spot, index) => (
                  <div
                    key={spot.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      {/* 순위 */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : index === 2
                              ? "bg-orange-500"
                              : "bg-blue-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>

                      {/* 이미지 */}
                      <div className="flex-shrink-0">
                        <img
                          src={spot.image}
                          alt={spot.name}
                          className="w-24 h-24 rounded-lg object-cover object-top"
                        />
                      </div>

                      {/* 정보 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-1">
                              {spot.name}
                            </h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                {spot.category}
                              </span>
                              <span className="flex items-center">
                                <i className="ri-map-pin-line mr-1"></i>
                                {spot.location}
                              </span>
                              <span className="flex items-center">
                                <i className="ri-star-fill text-yellow-500 mr-1"></i>
                                {spot.averageRating}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {spot.description}
                            </p>
                          </div>
                        </div>

                        {/* 통계 */}
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="flex items-center text-green-600">
                            <i className="ri-thumb-up-line mr-1"></i>
                            추천 {spot.recommendCount.toLocaleString()}회
                          </div>
                          <div className="flex items-center text-red-600">
                            <i className="ri-heart-line mr-1"></i>
                            즐겨찾기 {spot.favoriteCount.toLocaleString()}회
                          </div>
                          <div className="flex items-center text-blue-600">
                            <i className="ri-trophy-line mr-1"></i>
                            총점 {spot.totalScore.toLocaleString()}점
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex-shrink-0">
                        <button className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer">
                          <i className="ri-heart-line text-xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 더보기 버튼 */}
              <div className="p-6 bg-gray-50 text-center">
                <Link
                  href="/statistics"
                  className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                >
                  전체 순위 보기 →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold mb-4">
              나만의 제주 여행을 계획해보세요
            </h3>
            <p className="text-xl mb-8 opacity-90">
              AI가 당신의 취향과 예산에 맞는 완벽한 여행 일정을 추천해드립니다
            </p>
            <Link
              href="/recommend"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              무료로 시작하기
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 추천 요청 카드 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">
              새로운 제주 여행을 계획해보세요
            </h2>
            <p className="text-blue-100 mb-6">
              AI가 당신의 취향에 맞는 완벽한 여행 일정을 추천해드립니다
            </p>
            <Link
              href="/recommend"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap inline-block"
            >
              여행 추천 받기
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 최근 추천 기록 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  최근 추천 기록
                </h3>
                <Link
                  href="/history"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
                >
                  전체보기
                </Link>
              </div>

              {recentRecommendations.length > 0 ? (
                <div className="space-y-4">
                  {recentRecommendations.map((rec) => (
                    <div
                      key={rec.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {rec.title}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{rec.date}</span>
                            <span>{rec.companion}</span>
                            <span>{rec.duration}</span>
                          </div>
                        </div>
                        <i className="ri-arrow-right-line text-gray-400"></i>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="ri-map-line text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">아직 추천받은 여행이 없습니다</p>
                  <Link
                    href="/recommend"
                    className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
                  >
                    첫 여행 추천받기
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 저장된 일정 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                저장된 일정
              </h3>
              <div className="text-center py-4">
                <i className="ri-calendar-line text-3xl text-gray-300 mb-2"></i>
                <p className="text-gray-500 text-sm">저장된 일정이 없습니다</p>
              </div>
            </div>

            {/* 인기 여행지 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                인기 여행지
              </h3>
              <div className="space-y-3">
                {popularSpots.slice(0, 3).map((spot) => (
                  <div
                    key={spot.id}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                  >
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-12 h-12 rounded-lg object-cover object-top"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {spot.name}
                      </h4>
                      <p className="text-xs text-gray-500">{spot.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
