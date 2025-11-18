// Companion Options
export const COMPANIONS = [
  { id: "family", label: "가족", icon: "ri-group-line" },
  { id: "couple", label: "연인", icon: "ri-heart-line" },
  { id: "friends", label: "친구", icon: "ri-team-line" },
  { id: "solo", label: "혼자", icon: "ri-user-line" },
] as const;

// Age Group Options
export const AGE_GROUPS = [
  { id: "teens", label: "10대", icon: "ri-user-smile-line" },
  { id: "twenties", label: "20대", icon: "ri-user-2-line" },
  { id: "thirties", label: "30대", icon: "ri-user-3-line" },
  { id: "forties", label: "40대", icon: "ri-user-4-line" },
  { id: "fifties", label: "50대 이상", icon: "ri-user-5-line" },
] as const;

// Travel Categories
export const TRAVEL_CATEGORIES = [
  {
    id: "hiking",
    label: "등산 및 오름",
    icon: "ri-landscape-line",
    color: "bg-green-50 text-green-600 border-green-200",
  },
  {
    id: "activity",
    label: "액티비티",
    icon: "ri-run-line",
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    id: "culture",
    label: "문화 & 역사",
    icon: "ri-building-line",
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
  {
    id: "theme-park",
    label: "테마파크",
    icon: "ri-flashlight-line",
    color: "bg-pink-50 text-pink-600 border-pink-200",
  },
  {
    id: "beach",
    label: "해수욕장",
    icon: "ri-sun-line",
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    id: "drive",
    label: "산책 및 드라이브",
    icon: "ri-car-line",
    color: "bg-indigo-50 text-indigo-600 border-indigo-200",
  },
  {
    id: "experience",
    label: "체험 및 실내 관광",
    icon: "ri-home-smile-line",
    color: "bg-yellow-50 text-yellow-600 border-yellow-200",
  },
] as const;

// Signup Travel Styles
export const TRAVEL_STYLES = [
  { id: "relaxed", label: "여유로운 여행" },
  { id: "active", label: "액티브한 여행" },
  { id: "cultural", label: "문화 탐방" },
  { id: "nature", label: "자연 힐링" },
] as const;

// Signup Companion Options
export const SIGNUP_COMPANIONS = [
  { id: "solo", label: "혼자" },
  { id: "couple", label: "연인/부부" },
  { id: "family", label: "가족" },
  { id: "friends", label: "친구들" },
] as const;

// Preference Categories
export const PREFERENCE_CATEGORIES = [
  { id: "restaurant", label: "맛집" },
  { id: "tourist", label: "관광지" },
  { id: "activity", label: "액티비티" },
  { id: "cafe", label: "카페" },
  { id: "shopping", label: "쇼핑" },
  { id: "nature", label: "자연" },
] as const;

// Statistics Categories
export const STATISTICS_CATEGORIES = [
  { id: "all", label: "전체", icon: "ri-apps-line" },
  { id: "restaurant", label: "맛집", icon: "ri-restaurant-line" },
  { id: "tourist", label: "관광지", icon: "ri-camera-line" },
  { id: "activity", label: "액티비티", icon: "ri-run-line" },
  { id: "cafe", label: "카페", icon: "ri-cup-line" },
  { id: "shopping", label: "쇼핑", icon: "ri-shopping-bag-line" },
  { id: "nature", label: "자연", icon: "ri-leaf-line" },
] as const;
