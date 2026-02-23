import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  adminUsername: string | null;
  adminToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    const storedToken = sessionStorage.getItem('adminToken');
    const storedUsername = sessionStorage.getItem('adminUsername');
    
    if (storedToken && storedUsername) {
      setAdminToken(storedToken);
      setAdminUsername(storedUsername);
      setIsAdminAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      // TODO: Replace with actual backend call once admin authentication is implemented
      // const response = await actor.adminLogin(username, password);
      
      // Temporary mock implementation for frontend development
      // This will be replaced with actual backend integration
      if (username === 'admin' && password === 'admin123') {
        const mockToken = `mock-token-${Date.now()}`;
        
        sessionStorage.setItem('adminToken', mockToken);
        sessionStorage.setItem('adminUsername', username);
        
        setAdminToken(mockToken);
        setAdminUsername(username);
        setIsAdminAuthenticated(true);
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUsername');
    
    setAdminToken(null);
    setAdminUsername(null);
    setIsAdminAuthenticated(false);
    setError(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminAuthenticated,
        adminUsername,
        adminToken,
        login,
        logout,
        isLoading,
        error,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
}
