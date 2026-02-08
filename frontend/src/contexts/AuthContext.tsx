'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { db } from '@/services/indexeddb';

interface User {
  userId: string;
  name: string;
  email: string;
  userGroup: string;
  financialScore: number;
  language: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token
    const token = localStorage.getItem('authToken');
    if (token) {
      loadUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const profile = await apiService.getProfile();
      setUser(profile);
      
      // Cache user in IndexedDB
      await db.users.put(profile);
    } catch (error) {
      console.error('Failed to load user:', error);
      localStorage.removeItem('authToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const result = await apiService.login(email, password);
    localStorage.setItem('authToken', result.token);
    setUser(result.user);
    
    // Cache user in IndexedDB
    await db.users.put(result.user);
  };

  const register = async (data: any) => {
    const result = await apiService.register(data);
    localStorage.setItem('authToken', result.token);
    setUser(result.user);
    
    // Cache user in IndexedDB
    await db.users.put(result.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
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
