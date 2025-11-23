'use client';

import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UnauthorizedPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    
    // If no user, redirect to home
    if (!user) {
      router.push('/');
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-xl p-6 sm:p-8 border border-gray-800">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 sm:h-8 sm:w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Access Restricted</h1>
          
          <p className="text-sm sm:text-base text-gray-300 mb-4">
            Only users with <span className="text-yellow-400 font-semibold">@sahyadri.edu.in</span> email addresses can access PeerSpace.
          </p>
          
          <div className="bg-gray-800 rounded p-3 sm:p-4 mb-6">
            <p className="text-xs sm:text-sm text-gray-400 mb-1">Your current email:</p>
            <p className="text-sm sm:text-base text-white font-medium break-all">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-400 mb-6">
            Please sign out and sign in with your Sahyadri college email address.
          </p>
          
          <div className="space-y-3">
            <SignOutButton>
              <button className="w-full bg-yellow-400 text-black font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-yellow-500 transition-colors text-sm sm:text-base">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        </div>
      </div>
    </div>
  );
}
