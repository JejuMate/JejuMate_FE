"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { refreshTokens, logoutAPI, type AuthLoginResponse } from '@/lib/api';

const accessTokenKey = 'jejumate_access_token';
const refreshTokenKey = 'jejumate_refresh_token';
const userKey = 'jejumate_user';

interface User {
    id: number;
    nickname: string;
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    login: (response: AuthLoginResponse) => void;
    logout: () => void;
    getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function isJWT(token: string) : boolean{
    return token.includes('.') && token.split('.').length === 3;
}

function isTokenExpired(token: string): boolean {
    try {
        if(!isJWT(token)) {
            return false;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        return Date.now() >= exp;
    } catch {
        return true;
    }
}

function isTokenExpiringSoon(token: string, thresholdMs: number = 5 * 60 * 1000): boolean {
    try {
        if(!isJWT(token)) {
            return false;
        }

        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        return Date.now() >= exp - thresholdMs;
    } catch {
        return true;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const clearAuthData = useCallback(() => {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
        localStorage.removeItem(userKey);
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedAccessToken = localStorage.getItem(accessTokenKey);
                const storedRefreshToken = localStorage.getItem(refreshTokenKey);
                const storedUser = localStorage.getItem(userKey);

                if (storedAccessToken && storedRefreshToken && storedUser) {
                    const parsedUser = JSON.parse(storedUser) as User;

                    // Access Token이 만료되었으면 갱신 시도
                    if (isTokenExpired(storedAccessToken)) {
                        if (storedRefreshToken && !isTokenExpired(storedRefreshToken)) {
                            const response = await refreshTokens(storedRefreshToken);

                            setAccessToken(response.accessToken);
                            setRefreshToken(response.refreshToken);
                            setUser(parsedUser);
                            setIsLoggedIn(true);

                            localStorage.setItem(accessTokenKey, response.accessToken);
                            localStorage.setItem(refreshTokenKey, response.refreshToken);
                        } else {
                            clearAuthData(); // refresh Token도 만료됨 -> 로그아웃
                        }
                    } else {
                        // access Token 유효
                        setAccessToken(storedAccessToken);
                        setRefreshToken(storedRefreshToken);
                        setUser(parsedUser);
                        setIsLoggedIn(true);
                    }
                }
            } catch (error) {
                console.error('인증 초기화 실패:', error);
                clearAuthData();
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, [clearAuthData]);

    const login = useCallback((response: AuthLoginResponse) => {
        const userData: User = {
            id: response.userId,
            nickname: response.nickname,
        };

        setAccessToken(response.accessToken);
        setRefreshToken(response.refreshToken);
        setUser(userData);
        setIsLoggedIn(true);

        // localStorage에 저장
        localStorage.setItem(accessTokenKey, response.accessToken);
        localStorage.setItem(refreshTokenKey, response.refreshToken);
        localStorage.setItem(userKey, JSON.stringify(userData));
    }, []);

    const logout = useCallback(async () => {
        try {
            if (refreshToken) {
                await logoutAPI(refreshToken);
            }
        } catch (error) {
            console.error('서버 로그아웃 실패:', error);
        } finally {
            clearAuthData();
        }
    }, [refreshToken, clearAuthData]);

    const getAccessToken = useCallback(async (): Promise<string | null> => {
        if (!accessToken || !refreshToken) {
            return null;
        }

        if (isTokenExpiringSoon(accessToken)) {
            try {
                const response = await refreshTokens(refreshToken);

                setAccessToken(response.accessToken);
                setRefreshToken(response.refreshToken);

                localStorage.setItem(accessTokenKey, response.accessToken);
                localStorage.setItem(refreshTokenKey, response.refreshToken);

                return response.accessToken;
            } catch (error) {
                console.error('토큰 갱신 실패:', error);
                logout();
                return null;
            }
        }

        return accessToken;
    }, [accessToken, refreshToken, logout]);

    const value: AuthContextType = {
        isLoggedIn,
        user,
        accessToken,
        isLoading,
        login,
        logout,
        getAccessToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}