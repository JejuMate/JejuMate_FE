"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { handleLogin, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(formData.email, formData.password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-bold text-gray-900 mb-2"
            >
              제주여행
            </h1>
            <p className="text-gray-600">AI가 추천하는 맞춤 제주도 여행</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              type="password"
              id="password"
              name="password"
              label="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              placeholder="비밀번호를 입력하세요 (최소 6자)"
            />

            <Button type="submit" isLoading={isLoading} className="w-full">
              로그인
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
