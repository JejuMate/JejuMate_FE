"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ChatBot from "@/components/ChatBot";
import type { DaySchedule } from "@/types";

export default function RecommendResultById({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [schedules, setSchedules] = useState<DaySchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock 추천 결과 데이터
  const mockSchedules: DaySchedule[] = [
    {
      day: 1,
      date: "2024-02-15",
      items: [
        {
          id: "1-1",
          time: "09:00",
          name: "성산일출봉",
          category: "관광지",
          description: "제주도의 대표적인 일출 명소로 유네스코 세계자연유산",
          location: "서귀포시 성산읍",
          image:
            "https://readdy.ai/api/search-image?query=Beautiful%20sunrise%20at%20Seongsan%20Ilchulbong%20peak%20in%20Jeju%20Island%20Korea%20with%20dramatic%20volcanic%20crater%20formation%20and%20ocean%20view%2C%20golden%20morning%20light%2C%20natural%20landscape%20photography&width=400&height=250&seq=1&orientation=landscape",
          duration: "2시간",
          cost: "5,000원",
        },
        {
          id: "1-2",
          time: "12:00",
          name: "성산포 맛집거리",
          category: "맛집",
          description: "신선한 해산물과 제주 향토음식을 맛볼 수 있는 곳",
          location: "서귀포시 성산읍",
          image:
            "https://readdy.ai/api/search-image?query=Fresh%20seafood%20restaurant%20in%20Seongsan-po%20Jeju%20Island%20with%20traditional%20Korean%20dishes%2C%20grilled%20fish%2C%20local%20cuisine%2C%20cozy%20dining%20atmosphere&width=400&height=250&seq=2&orientation=landscape",
          duration: "1시간",
          cost: "25,000원",
        },
        {
          id: "1-3",
          time: "15:00",
          name: "우도",
          category: "관광지",
          description: "에메랄드빛 바다와 아름다운 해안선을 자랑하는 섬",
          location: "제주시 우도면",
          image:
            "https://readdy.ai/api/search-image?query=Scenic%20Udo%20island%20near%20Jeju%20with%20pristine%20turquoise%20beaches%2C%20coastal%20cliffs%2C%20peaceful%20island%20atmosphere%2C%20clear%20blue%20water%2C%20natural%20beauty&width=400&height=250&seq=3&orientation=landscape",
          duration: "3시간",
          cost: "15,000원",
        },
      ],
    },
    {
      day: 2,
      date: "2024-02-16",
      items: [
        {
          id: "2-1",
          time: "10:00",
          name: "한라산 국립공원",
          category: "자연",
          description: "제주도의 최고봉으로 다양한 등산 코스 제공",
          location: "제주시 해안동",
          image:
            "https://readdy.ai/api/search-image?query=Majestic%20Hallasan%20mountain%20in%20Jeju%20Island%20with%20hiking%20trails%2C%20lush%20green%20forest%2C%20mountain%20peak%2C%20natural%20hiking%20destination%2C%20clear%20mountain%20air%2C%20volcanic%20landscape&width=400&height=250&seq=4&orientation=landscape",
          duration: "4시간",
          cost: "무료",
        },
        {
          id: "2-2",
          time: "16:00",
          name: "제주 흑돼지 맛집",
          category: "맛집",
          description: "제주도 대표 특산품인 흑돼지 구이 전문점",
          location: "제주시 연동",
          image:
            "https://readdy.ai/api/search-image?query=Delicious%20Jeju%20black%20pork%20barbecue%20grilled%20meat%20Korean%20cuisine%2C%20traditional%20restaurant%20setting%2C%20appetizing%20food%20photography%2C%20warm%20lighting%2C%20local%20specialty&width=400&height=250&seq=5&orientation=landscape",
          duration: "1.5시간",
          cost: "35,000원",
        },
        {
          id: "2-3",
          time: "19:00",
          name: "제주 동문시장",
          category: "쇼핑",
          description: "제주 전통시장에서 특산품과 기념품 쇼핑",
          location: "제주시 일도이동",
          image:
            "https://readdy.ai/api/search-image?query=Bustling%20Dongmun%20traditional%20market%20in%20Jeju%20Island%20with%20local%20vendors%2C%20fresh%20produce%2C%20souvenirs%2C%20vibrant%20market%20atmosphere%2C%20Korean%20street%20food&width=400&height=250&seq=6&orientation=landscape",
          duration: "2시간",
          cost: "20,000원",
        },
      ],
    },
  ];

  useEffect(() => {
    // 실제로는 API에서 추천 결과를 받아옴 (ID 사용)
    console.log("Loading schedule with ID:", resolvedParams.id);
    setTimeout(() => {
      setSchedules(mockSchedules);
      setIsLoading(false);
      setIsChatOpen(true); // 결과 로딩 후 챗봇 자동 열기
    }, 1500);
  }, [resolvedParams.id]);

  const updateSchedule = (newSchedules: DaySchedule[]) => {
    setSchedules(newSchedules);
  };

  if (isLoading) {
    return <Loading message="일정을 불러오고 있습니다" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 결과 헤더 */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-4">맞춤 제주도 여행 일정</h1>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <i className="ri-calendar-line mr-2"></i>
                  {schedules.length}일 여행
                </div>
                <div className="flex items-center">
                  <i className="ri-map-pin-line mr-2"></i>
                  {schedules.reduce(
                    (total, day) => total + day.items.length,
                    0
                  )}
                  개 장소
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 일정 카드들 */}
        <div className="space-y-8">
          {schedules.map((daySchedule) => (
            <div
              key={daySchedule.day}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4">
                <h2 className="text-xl font-bold text-white">
                  Day {daySchedule.day}
                </h2>
                <p className="text-gray-300">{daySchedule.date}</p>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  {daySchedule.items.map((item, index) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-xs">
                            {item.time}
                          </span>
                        </div>
                        {index < daySchedule.items.length - 1 && (
                          <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                        )}
                      </div>

                      <div className="flex-1 bg-gray-50 rounded-xl p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                          <span>{item.duration}</span>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <i className="ri-map-pin-line mr-1"></i>
                          {item.location}
                        </div>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 rounded-lg object-cover object-top"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 액션 버튼들 */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link
            href="/recommend"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            새로운 추천 받기
          </Link>
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            일정 수정하기
          </button>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <i className="ri-lightbulb-line text-blue-600 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                AI 챗봇으로 일정 수정하기
              </h4>
              <p className="text-blue-800 text-sm">
                "Day 2 오전에 카페 추가해줘", "성산일출봉 대신 다른 관광지로
                바꿔줘" 등 자연스러운 대화로 일정을 수정할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 챗봇 컴포넌트 */}
      <ChatBot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        schedules={schedules}
        onUpdateSchedule={updateSchedule}
      />
    </div>
  );
}
