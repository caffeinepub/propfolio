import { Outlet } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import ProfileSetupModal from './ProfileSetupModal';
import LoginButton from './LoginButton';
import { Button } from './ui/button';
import { useNavigate } from '@tanstack/react-router';

export default function DashboardLayout() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-6 max-w-md">
          <img 
            src="/assets/generated/propfolio-logo.dim_200x60.png" 
            alt="Propfolio" 
            className="h-12 mx-auto"
          />
          <h1 className="text-3xl font-bold">Welcome to Propfolio</h1>
          <p className="text-muted-foreground">
            Please log in to access your trading dashboard
          </p>
          <LoginButton />
          <Button 
            variant="outline" 
            onClick={() => navigate({ to: '/' })}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}
