'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  travelStyle?: string;
  companion?: string;
  budget?: string;
  categories?: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  travelStyle?: string;
  companion?: string;
  budget?: string;
  categories?: string[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로드 시 localStorage에서 사용자 정보 확인
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // const response = await loginAPI(email, password);
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email,
        name: '사용자',
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    try {
      // TODO: 실제 API 호출로 대체
      // const response = await signupAPI(userData);
      
      // Mock user data
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        travelStyle: userData.travelStyle,
        companion: userData.companion,
        budget: userData.budget,
        categories: userData.categories,
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    signup,
    updateUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


