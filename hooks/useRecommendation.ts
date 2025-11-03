'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRecommendation } from '@/lib/api';
import type { RecommendFormData } from '@/types';

export function useRecommendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateRecommendation = async (formData: RecommendFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createRecommendation(formData);
      router.push('/recommend/result');
      return result;
    } catch (err) {
      setError('추천 생성에 실패했습니다. 다시 시도해주세요.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleCreateRecommendation,
    isLoading,
    error,
  };
}


