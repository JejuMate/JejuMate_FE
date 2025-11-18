"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { useRecommendation } from "@/hooks/useRecommendation";
import { COMPANIONS, AGE_GROUPS, TRAVEL_CATEGORIES } from "@/constants";
import type { RecommendFormData } from "@/types";

export default function Recommend() {
  const [formData, setFormData] = useState<RecommendFormData>({
    companion: "",
    ageGroup: "",
    categories: [],
    additionalRequests: "",
  });

  const { handleCreateRecommendation, isLoading } = useRecommendation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.companion || !formData.ageGroup) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    if (formData.categories.length === 0) {
      alert("여행 스타일을 최소 1개 이상 선택해주세요.");
      return;
    }

    await handleCreateRecommendation(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = formData.categories.includes(categoryId)
      ? formData.categories.filter((id) => id !== categoryId)
      : [...formData.categories, categoryId];

    setFormData({
      ...formData,
      categories: newCategories,
    });
  };

  const handleCompanionToggle = (companionId: string) => {
    setFormData({
      ...formData,
      companion: formData.companion === companionId ? "" : companionId,
    });
  };

  const handleAgeGroupToggle = (ageGroupId: string) => {
    setFormData({
      ...formData,
      ageGroup: formData.ageGroup === ageGroupId ? "" : ageGroupId,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            AI 맞춤 여행 추천
          </h1>
          <p className="text-gray-600">
            당신의 취향에 맞는 완벽한 제주도 여행 일정을 만들어드립니다
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 동반자 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-group-line text-blue-600 mr-2"></i>
                동반자
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {COMPANIONS.map((comp) => (
                  <label
                    key={comp.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCompanionToggle(comp.id);
                    }}
                  >
                    <div
                      className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                        formData.companion === comp.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <i className={`${comp.icon} text-2xl mb-2`}></i>
                      <p className="font-medium text-sm">{comp.label}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 연령대 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-user-line text-blue-600 mr-2"></i>
                연령대
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {AGE_GROUPS.map((age) => (
                  <label
                    key={age.id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAgeGroupToggle(age.id);
                    }}
                  >
                    <div
                      className={`p-4 rounded-xl border-2 text-center transition-all hover:shadow-md ${
                        formData.ageGroup === age.id
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <i className={`${age.icon} text-2xl mb-2`}></i>
                      <p className="font-medium text-sm">{age.label}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 여행 스타일 (선호 카테고리) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-heart-line text-blue-600 mr-2"></i>
                여행 스타일 (복수 선택 가능)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TRAVEL_CATEGORIES.map((category) => (
                  <label key={category.id} className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category.id)}
                      onChange={() => handleCategoryToggle(category.id)}
                      className="sr-only"
                    />
                    <div
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                        formData.categories.includes(category.id)
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <i
                          className={`${category.icon} text-2xl mr-4 ${
                            formData.categories.includes(category.id)
                              ? "text-blue-700"
                              : ""
                          }`}
                        ></i>
                        <p className="font-medium text-sm">{category.label}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* 추가 요청사항 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-chat-3-line text-blue-600 mr-2"></i>
                추가 요청사항 (선택)
              </h3>
              <textarea
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleChange}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                placeholder="특별한 요청이나 선호사항이 있다면 자유롭게 적어주세요. (예: 인스타 감성 스팟 위주로, 아이와 함께 가기 좋은 곳으로 등)"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.additionalRequests.length}/500자
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-6">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg py-4"
              >
                {isLoading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    AI가 맞춤 일정을 생성하고 있습니다...
                  </>
                ) : (
                  <>
                    <i className="ri-magic-line mr-2"></i>
                    맞춤 여행 추천 받기
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* 안내 메시지 */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <div className="flex items-start">
            <i className="ri-information-line text-blue-600 text-xl mr-3 mt-1"></i>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">
                AI 추천 시스템 안내
              </h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• 입력하신 정보를 바탕으로 개인 맞춤 일정을 생성합니다</li>
                <li>• 추천 결과는 챗봇을 통해 실시간으로 수정 가능합니다</li>
                <li>
                  • 날씨, 교통, 운영시간 등을 고려한 최적 일정을 제공합니다
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
