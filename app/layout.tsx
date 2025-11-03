import type { Metadata } from "next";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "제주여행 - AI 맞춤 제주도 여행 추천",
  description:
    "AI가 추천하는 맞춤 제주도 여행 일정. 당신의 취향과 예산에 맞는 완벽한 제주 여행을 계획해보세요.",
  keywords: "제주도 여행, AI 추천, 맞춤 여행, 제주 관광, 여행 일정",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Remix Icon */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css"
          rel="stylesheet"
        />

        {/* Font Awesome */}
        <script
          src="https://kit.fontawesome.com/your-kit-id.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>

        {/* Readdy Agent Widget */}
        <script
          src="https://readdy.ai/api/public/assistant/widget?projectId=e4b88001-8ae8-4b9d-bc73-4a0b36fdd50e"
          mode-hybrid="true"
          voice-show-transcript="true"
          theme-light="true"
          size-compact="true"
          accent-color="#14B8A6"
          button-base-color="#2563EB"
          button-accent-color="#FFFFFF"
          main-label="여행 상담"
          start-button-text="상담 시작"
          end-button-text="상담 종료"
          defer
        ></script>
      </body>
    </html>
  );
}
