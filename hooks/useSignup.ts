'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface SignupData {
  email: string;
  password: string;
  name: string;
  travelStyle?: string;
  companion?: string;
  budget?: string;
  categories?: string[];
}

export function useSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      await signup(userData);
      router.push('/');
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    handleSignup,
    isLoading,
    error,
  };
}


