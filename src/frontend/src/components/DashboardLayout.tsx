import { Outlet, useNavigate } from '@tanstack/react-router';
import Sidebar from './Sidebar';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useGetCallerUserProfile';
import ProfileSetupModal from './ProfileSetupModal';
import PropFirmTicker from './PropFirmTicker';

export default function DashboardLayout() {
  const { identity } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a192f] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-teal-500 rounded-2xl">
              <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-100">Welcome to Propfolio</h1>
          <p className="text-gray-400">Please log in to access your dashboard and manage your prop trading portfolio.</p>
          <LoginButton />
          <button
            onClick={() => navigate({ to: '/' })}
            className="text-teal-400 hover:text-teal-300 text-sm transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#0f2137] border-b border-teal-500/20 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <PropFirmTicker />
          <LoginButton />
        </header>
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
      {showProfileSetup && <ProfileSetupModal />}
    </div>
  );
}
