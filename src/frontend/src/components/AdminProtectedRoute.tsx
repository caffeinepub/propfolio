import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from '@tanstack/react-router';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
  children: ReactNode;
}

interface AdminSession {
  username: string;
  token: string;
  timestamp: number;
}

export default function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const sessionData = localStorage.getItem('adminSession');
        if (sessionData) {
          const session: AdminSession = JSON.parse(sessionData);
          // Check if session exists and has a valid token
          if (session.token && session.username) {
            setIsAuthenticated(true);
            return;
          }
        }
      } catch (error) {
        console.error('Error checking admin authentication:', error);
      }
      setIsAuthenticated(false);
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
