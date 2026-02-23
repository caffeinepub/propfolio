import { Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import Sidebar from './Sidebar';
import LoginButton from './LoginButton';
import ProfileSetupModal from './ProfileSetupModal';
import PropFirmTicker from './PropFirmTicker';

export default function DashboardLayout() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-secondary/5 p-6">
        <div className="max-w-md w-full space-y-8 animate-scale-in">
          <div className="text-center space-y-4">
            <img 
              src="/assets/generated/propfolio-logo-compact.dim_64x64.png" 
              alt="Propfolio" 
              className="h-16 w-16 mx-auto animate-bounce-subtle"
            />
            <h2 className="text-3xl font-bold text-foreground">Welcome to Propfolio</h2>
            <p className="text-muted-foreground">
              Please log in to access your trading dashboard
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-8 shadow-elevated hover:shadow-premium transition-all duration-300">
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <PropFirmTicker />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
