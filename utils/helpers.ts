// Get status badge component props
export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return { className: 'bg-green-100 text-green-800', label: '완료' };
    case 'saved':
      return { className: 'bg-blue-100 text-blue-800', label: '저장됨' };
    case 'draft':
      return { className: 'bg-gray-100 text-gray-800', label: '임시저장' };
    default:
      return null;
  }
};

// Get companion icon
export const getCompanionIcon = (companion: string): string => {
  switch (companion) {
    case '혼자':
      return 'ri-user-line';
    case '연인':
      return 'ri-heart-line';
    case '가족':
      return 'ri-group-line';
    case '친구들':
      return 'ri-team-line';
    default:
      return 'ri-user-line';
  }
};

// Get category in Korean
export const getCategoryInKorean = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    '관광지': 'tourist',
    '자연': 'nature',
    '맛집': 'restaurant',
    '카페': 'cafe',
    '쇼핑': 'shopping',
    '액티비티': 'activity'
  };
  return categoryMap[category] || 'all';
};

// Format date to Korean locale
export const formatDateKorean = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR');
};

// Calculate total cost from schedules
export const calculateTotalCost = (schedules: Array<{ items: Array<{ cost: string }> }>): number => {
  return schedules.reduce((total, day) => 
    total + day.items.reduce((dayTotal, item) => 
      dayTotal + (item.cost === '무료' ? 0 : parseInt(item.cost.replace(/[^0-9]/g, ''))), 0), 0
  );
};


