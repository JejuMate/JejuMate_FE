"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Badge from "@/components/Badge";
import { getCategoryInKorean } from "@/utils/helpers";
import { STATISTICS_CATEGORIES } from "@/constants";
import type { PopularSpot } from "@/types";

export default function Statistics() {
  const [activeTab, setActiveTab] = useState<
    | "all"
    | "restaurant"
    | "tourist"
    | "activity"
    | "cafe"
    | "shopping"
    | "nature"
  >("all");

  const mockPopularSpots: PopularSpot[] = [
    {
      id: "1",
      name: "성산일출봉",
      category: "관광지",
      location: "서귀포시 성산읍",
      recommendCount: 1250,
      favoriteCount: 890,
      totalScore: 2140,
      image:
        "https://i.namu.wiki/i/lCnKdPrZluTYpA_2D3sTjakQxDA1xdFgtGxk5ayQHLRcnd6apreMZuIz6Bt3li7Q7fAUlFoyTqhXnrs8DPa-AqOMOlHbIYUZ6HFHDysGLTyv_AGwtmQVBQ-3M8VDtbI3ghfN_rOVd6n7Xa_FjGJN3Q.webp",
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
        "https://i.namu.wiki/i/VnQkVuWyl4W7r3pj_YQvHTcyGzV-5dpviOISjvKO3JqR57bukI-NJkrOY1vyuLIi2MWork44c545_a5UGNNQ60GZgGUWpxC2bJ6K8CX83p9vRH7DmS8yFNLDUP8NXBHDxezv0E0P79aEKe4zGnmk0Q.webp",
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
      image: "https://cdn.newskr.kr/news/photo/201810/14970_12854_3441.png",
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
        "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQKskTEWYAqiA4-K6AePQMLEoax0lK_zE2MK-So6FMy9FzfR2xA0DyyN0D2-CphzHiJL2prD4po0obgskLAtwxe9Go&s=19",
      description: "에메랄드빛 바다와 아름다운 해안선을 자랑하는 섬",
      averageRating: 4.5,
    },
    {
      id: "5",
      name: "제주 감성 카페",
      category: "카페",
      location: "제주시 애월읍",
      recommendCount: 620,
      favoriteCount: 480,
      totalScore: 1100,
      image:
        "https://dimg04.c-ctrip.com/images/1mj0d12000apy4e1kCF33_Z_640_10000_R5.png_.webp?proc=autoorient&proc=source%2Ftrip",
      description:
        "제주도의 아름다운 바다를 바라보며 커피를 즐길 수 있는 감성 카페",
      averageRating: 4.4,
    },
    {
      id: "6",
      name: "제주 동문시장",
      category: "쇼핑",
      location: "제주시 일도이동",
      recommendCount: 520,
      favoriteCount: 380,
      totalScore: 900,
      image: "https://cdn.jejuwapeople.com/news/photo/202502/5341_5716_520.jpg",
      description: "제주 전통시장에서 특산품과 기념품 쇼핑",
      averageRating: 4.3,
    },
    {
      id: "7",
      name: "제주 패러글라이딩",
      category: "액티비티",
      location: "서귀포시 대정읍",
      recommendCount: 450,
      favoriteCount: 320,
      totalScore: 770,
      image:
        "https://api.cdn.visitjeju.net/photomng/imgpath/202112/03/2aef93ce-55d4-47e2-a296-06b171aed523.jpg",
      description: "제주도의 아름다운 경치를 하늘에서 감상하는 패러글라이딩",
      averageRating: 4.2,
    },
  ];

  const filteredSpots =
    activeTab === "all"
      ? mockPopularSpots
      : mockPopularSpots.filter(
          (spot) => getCategoryInKorean(spot.category) === activeTab
        );

  const totalRecommendations = mockPopularSpots.reduce(
    (sum, spot) => sum + spot.recommendCount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            인기 여행지 통계
          </h1>
          <p className="text-gray-600">
            제주도에서 가장 인기 있는 여행지들을 카테고리별로 확인해보세요
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {STATISTICS_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <i className={`${category.icon} mr-2`}></i>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* 인기 여행지 리스트 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              {activeTab === "all"
                ? "전체 인기 여행지"
                : `${
                    STATISTICS_CATEGORIES.find((c) => c.id === activeTab)?.label
                  } 인기 여행지`}
            </h3>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredSpots.map((spot, index) => (
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
                          <Badge variant="primary" size="sm">
                            {spot.category}
                          </Badge>
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
        </div>

        {/* 차트 섹션 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 카테고리별 분포 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              카테고리별 인기도
            </h3>
            <div className="space-y-4">
              {STATISTICS_CATEGORIES.slice(1).map((category) => {
                const categorySpots = mockPopularSpots.filter(
                  (spot) => getCategoryInKorean(spot.category) === category.id
                );
                const categoryTotal = categorySpots.reduce(
                  (sum, spot) => sum + spot.totalScore,
                  0
                );
                const percentage =
                  totalRecommendations > 0
                    ? (categoryTotal /
                        mockPopularSpots.reduce(
                          (sum, spot) => sum + spot.totalScore,
                          0
                        )) *
                      100
                    : 0;

                return (
                  <div key={category.id}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <i
                          className={`${category.icon} text-blue-600 mr-2`}
                        ></i>
                        <span className="font-medium text-gray-900">
                          {category.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 월별 트렌드 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              월별 추천 트렌드
            </h3>
            <div className="space-y-3">
              {["1월", "2월", "3월", "4월", "5월", "6월"].map((month) => {
                const value = Math.floor(Math.random() * 100) + 50;
                return (
                  <div
                    key={month}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {month}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {value}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
