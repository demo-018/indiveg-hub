import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { authenticateUser, getUserById } from '@/data/demoData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (mobile: string, password?: string, otp?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      const storedUser = getUserById(storedUserId);
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, []);

  const login = async (mobile: string, password?: string, otp?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const authenticatedUser = authenticateUser(mobile, password, otp);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        localStorage.setItem('userId', authenticatedUser.id);
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('cart');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};