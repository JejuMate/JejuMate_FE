"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  showAuth?: boolean;
}

export default function Header({ showAuth = true }: HeaderProps) {
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            제주여행
          </Link>

          {showAuth && (
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/history"
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    <i className="ri-history-line text-xl"></i>
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    <i className="ri-user-line text-xl"></i>
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-kakao-talk-fill text-xl mr-[4px]" />
                  로그인
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
