export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h4 className="text-xl font-bold mb-4">제주여행</h4>
          <p className="text-gray-400 mb-4">
            AI 기반 맞춤 제주도 여행 추천 서비스
          </p>
          <p className="text-sm text-gray-500">
            © 2025 JejuMate. All rights reserved. |
            <a
              href="https://cs.mju.ac.kr/sites/cs/index.do"
              className="hover:text-white ml-1 cursor-pointer"
            >
              Powered by MJU CS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
