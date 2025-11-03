"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useSignup } from "@/hooks/useSignup";
import {
  TRAVEL_STYLES,
  SIGNUP_COMPANIONS,
  PREFERENCE_CATEGORIES,
} from "@/constants";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    verificationCode: "",
    travelStyle: "",
    companion: "",
    budget: "",
    categories: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { handleSignup } = useSignup();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      setIsLoading(true);
      // TODO: 이메일 인증 코드 발송 API 호출
      setTimeout(() => {
        setIsLoading(false);
        setStep(2);
      }, 1000);
    } else if (step === 2) {
      setIsLoading(true);
      // TODO: 인증 코드 확인 API 호출
      setTimeout(() => {
        setIsLoading(false);
        setStep(3);
      }, 1000);
    } else if (step === 3) {
      setIsLoading(true);
      await handleSignup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        travelStyle: formData.travelStyle,
        companion: formData.companion,
        budget: formData.budget,
        categories: formData.categories,
      });
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">제주여행</h1>
            <p className="text-gray-600">회원가입</p>

            {/* 진행 단계 표시 */}
            <div className="flex justify-center mt-6 mb-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= num
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {num}
                  </div>
                  {num < 3 && (
                    <div
                      className={`w-8 h-1 ${
                        step > num ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  label="이메일"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="이메일을 입력하세요"
                />

                <Input
                  type="text"
                  id="name"
                  name="name"
                  label="이름"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="이름을 입력하세요"
                />

                <Input
                  type="password"
                  id="password"
                  name="password"
                  label="비밀번호"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="비밀번호 (최소 6자)"
                />

                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  label="비밀번호 확인"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </>
            )}

            {step === 2 && (
              <div>
                <div className="text-center mb-6">
                  <i className="ri-mail-line text-4xl text-blue-600 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    이메일 인증
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {formData.email}로 발송된
                    <br />
                    6자리 인증번호를 입력하세요
                  </p>
                </div>

                <Input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  label="인증번호"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  required
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  placeholder="000000"
                />

                <p className="text-xs text-gray-500 text-center mt-2">
                  인증번호는 10분간 유효합니다
                </p>
              </div>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    여행 스타일
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {TRAVEL_STYLES.map((style) => (
                      <label key={style.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="travelStyle"
                          value={style.id}
                          checked={formData.travelStyle === style.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-3 rounded-lg border-2 text-center text-sm transition-colors ${
                            formData.travelStyle === style.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {style.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    동반자
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {SIGNUP_COMPANIONS.map((comp) => (
                      <label key={comp.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="companion"
                          value={comp.id}
                          checked={formData.companion === comp.id}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`p-3 rounded-lg border-2 text-center text-sm transition-colors ${
                            formData.companion === comp.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {comp.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    예산 (1인 기준)
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">예산을 선택하세요</option>
                    <option value="low">10만원 이하</option>
                    <option value="medium">10-30만원</option>
                    <option value="high">30-50만원</option>
                    <option value="luxury">50만원 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    선호 카테고리 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {PREFERENCE_CATEGORIES.map((category) => (
                      <label key={category.id} className="cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                          className="sr-only"
                        />
                        <div
                          className={`p-2 rounded-lg border-2 text-center text-xs transition-colors ${
                            formData.categories.includes(category.id)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          {category.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button type="submit" isLoading={isLoading} className="w-full">
              {step === 1
                ? "인증번호 발송"
                : step === 2
                ? "인증 확인"
                : "회원가입 완료"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
