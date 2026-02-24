import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <div className="hover:scale-105 active:scale-95 transition-transform duration-300">
      <Button
        onClick={handleAuth}
        disabled={disabled}
        variant={isAuthenticated ? "outline" : "default"}
        className={`w-full transition-all duration-300 ${
          isAuthenticated 
            ? 'hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50' 
            : 'bg-gradient-to-r from-primary via-secondary to-accent hover:shadow-glow'
        }`}
      >
        {loginStatus === 'logging-in' ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Logging in...
          </>
        ) : isAuthenticated ? (
          <>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </>
        )}
      </Button>
    </div>
  );
}
