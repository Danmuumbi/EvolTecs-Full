import React, { createContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { AuthContextType, User, RegisterData, LoginResponse } from './types';
import { apiClient } from '../../api/client';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Helper function to normalize user data - safely handles adminType
  const normalizeUser = (userData: any): User => {
    return {
      id: userData.id || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role ? userData.role.toLowerCase() : 'visitor',
      adminType: userData.adminType || 'support', // ✅ Add this safely
      phone: userData.phone || '',
      company: userData.company || '',
      emailVerified: userData.emailVerified || false,
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: userData.updatedAt || new Date().toISOString(),
    };
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('auth_token');
      console.log('🔑 Initial auth check - Token:', token ? 'Exists' : 'Not found');
      
      if (token) {
        try {
          console.log('🔄 Verifying token...');
          const response = await apiClient.get('/auth/me');
          console.log('✅ User verified:', response.data);
          const normalizedUser = normalizeUser(response.data.user);
          setUser(normalizedUser);
          console.log('👤 Normalized role from init:', normalizedUser.role);
          console.log('👤 Admin type from init:', normalizedUser.adminType);
        } catch (error) {
          console.error('❌ Token verification failed:', error);
          localStorage.removeItem('auth_token');
          setUser(null);
        }
      }
      setIsLoading(false);
      console.log('🏁 Auth init complete');
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('🔐 Attempting login for:', email);
      
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      
      console.log('✅ Login response received:', response.data);
      
      const { user: userData, token } = response.data;
      
      // Normalize user data (ensure role is lowercase)
      const normalizedUser = normalizeUser(userData);
      console.log('👤 Normalized user after login:', normalizedUser);
      console.log('👤 User role after login:', normalizedUser.role);
      console.log('👤 Admin type after login:', normalizedUser.adminType);
      
      // Store token
      localStorage.setItem('auth_token', token);
      console.log('💾 Token saved to localStorage');
      
      // Set user state
      setUser(normalizedUser);
      console.log('👤 User state set with role:', normalizedUser.role);
      
      toast.success(`Welcome back, ${normalizedUser.firstName}!`);
      
      return;
    } catch (error: any) {
      console.error('❌ Login error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Login failed';
      
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      console.log('📝 Registering user:', data.email);
      
      const response = await apiClient.post<LoginResponse>('/auth/register', data);
      
      console.log('✅ Registration response:', response.data);
      
      const { user: userData, token } = response.data;
      
      const normalizedUser = normalizeUser(userData);
      
      localStorage.setItem('auth_token', token);
      setUser(normalizedUser);
      
      toast.success('Account created successfully! Welcome to EvolTech.');
    } catch (error: any) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      // Ignore logout errors
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
      toast.success('Logged out successfully');
    }
  };

  const updateUser = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await apiClient.put<User>('/auth/update', data);
      const normalizedUser = normalizeUser(response.data);
      setUser(normalizedUser);
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};