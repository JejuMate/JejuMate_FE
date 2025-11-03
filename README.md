# JejuMate_FE


<br>
<br>

AI 기반 제주도 여행 추천 서비스
<br>
<br>
**JejuMate**의 프론트엔드 레포지토리입니다.

<br>

## 목차

- [주요 기능](#-주요-기능)
- [기술 스택 및 선정 이유](#-기술-스택-및-선정-이유)
- [아키텍처 및 폴더 구조](#-아키텍처-및-폴더-구조)
- [협업 규칙](#-협업-규칙)
- [AI 활용 방식](#-ai-활용-방식)

<br>

## 주요 기능

1. **AI 맞춤 여행 추천**: 사용자의 취향과 예산에 맞는 제주도 여행 일정 추천
2. **AI 챗봇**: 실시간으로 여행 일정 수정 가능
3. **추천 기록**: 과거 추천 받은 여행 일정 관리
4. **인기 여행지 통계**: 카테고리별 인기 여행지 확인
5. **회원가입/로그인**: Context API 기반 인증 시스템


<br>

## 🛠 기술 스택 및 선정 이유

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)

- `Next.js (App Router)`: SSR/SSG 등 다양한 렌더링 전략 지원, 성능·SEO 우수. Layout, Route Groups 활용으로 페이지 구조 직관적 관리
- `TypeScript`: 정적 타입으로 안정성 확보, 잠재적 버그 사전 방지, 유지보수성 향상
- `Tailwind CSS`: 유틸리티 우선 접근 방식으로 빠르고 일관된 UI 개발, 커스텀 디자인 시스템 구축 용이


### 개발 환경

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white)

- `ESLint & Prettier`: 코드 스타일 표준화, 오류 예방, 가독성 향상


<br>

## 아키텍처 및 폴더 구조

유지보수성과 확장성을 고려한 **기능 단위(Feature-based) 구조** 채택

```
src
├── 📁 app/                      # Next.js App Router
│   ├── 📁 auth/                 # 인증 관련 페이지
│   │   ├── 📁 login/
│   │   │   └── page.tsx         # 로그인 페이지
│   │   └── 📁 signup/
│   │       └── page.tsx         # 회원가입 페이지
│   ├── 📁 history/
│   │   └── page.tsx             # 추천 기록 페이지
│   ├── 📁 recommend/
│   │   ├── page.tsx             # 여행 추천 페이지
│   │   └── 📁 result/
│   │       ├── page.tsx         # 추천 결과 페이지
│   │       └── 📁 [id]/
│   │           └── page.tsx     # 동적 추천 결과 페이지
│   ├── 📁 statistics/
│   │   └── page.tsx             # 인기 여행지 통계 페이지
│   ├── 📁 fonts/                 # 폰트 파일
│   │   └── PretendardVariable.woff2  # Pretendard 폰트
│   ├── layout.tsx               # 루트 레이아웃 (AuthProvider)
│   ├── page.tsx                 # 홈 페이지
│   └── not-found.tsx            # 404 페이지
│
├── 📁 components/               # 재사용 가능한 UI 컴포넌트
│   ├── Badge.tsx                # 뱃지 컴포넌트
│   ├── Button.tsx               # 버튼 컴포넌트
│   ├── Card.tsx                 # 카드 컴포넌트
│   ├── ChatBot.tsx              # AI 챗봇 컴포넌트
│   ├── Footer.tsx               # 푸터 컴포넌트
│   ├── Header.tsx               # 헤더 컴포넌트 (인증 상태 통합)
│   ├── Input.tsx                # 입력 필드 컴포넌트
│   └── Loading.tsx              # 로딩 컴포넌트
│
├── 📁 constants/                # 상수 정의
│   └── index.ts                 # 앱 전역 상수 (카테고리, 옵션 등)
│
├── 📁 contexts/                 # React Context
│   └── AuthContext.tsx          # 인증 Context (로그인/로그아웃/회원가입)
│
├── 📁 features/                 # 기능별 모듈 (미래 확장용)
│
├── 📁 hooks/                    # Custom React Hooks (Mutations)
│   ├── useLogin.ts              # 로그인 mutation
│   ├── useSignup.ts             # 회원가입 mutation
│   ├── useRecommendation.ts     # 추천 생성 mutation
│   └── useSchedule.ts           # 일정 저장 mutation
│
├── 📁 lib/                      # 라이브러리 및 API
│   ├── api.ts                   # API 호출 함수들
│   └── i18n.ts                  # 국제화 설정
│
├── 📁 services/                 # 비즈니스 로직 서비스 (미래 확장용)
│
├── 📁 store/                    # 전역 상태 관리 (미래 확장용)
│
├── 📁 styles/                   # 스타일 파일
│   └── globals.css              # 전역 CSS (Tailwind directives)
│
├── 📁 types/                    # TypeScript 타입 정의
│   └── index.ts                 # 공통 타입 정의 (Schedule, Form, History 등)
│
└── 📁 utils/                    # 유틸리티 함수
    └── helpers.ts               # 헬퍼 함수들 (format, calculate 등)
```

<br>

## 협업 규칙

- `Git Flow`: main → develop → feature/기능명 브랜치 전략
- `Commit Convention`: Conventional Commits 규칙 (feat:, fix:, refactor:, chore: 등)
- `Pull Request`: feature → develop로 PR, 최소 1명 이상 승인 후 머지

<br>

## AI 활용 방식

