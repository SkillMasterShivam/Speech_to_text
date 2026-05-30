import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const userName = currentUser?.name || 'User';
  const userEmail = currentUser?.email || 'No email';
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <main className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Profile Header ── */}
      <div className="flex flex-col items-center mb-10 animate-fadeIn">
        {/* Avatar */}
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center mb-5 shadow-lg shadow-violet-500/20 ring-4 ring-white/[0.06]">
          <span className="text-4xl font-bold text-white select-none">{userInitial}</span>
        </div>

        {/* Name & email */}
        <h1 className="text-2xl font-bold text-white mb-1">{userName}</h1>
        <p className="text-sm text-slate-400">{userEmail}</p>
      </div>

      {/* ── User Details Card ── */}
      <div className="glass-card rounded-2xl overflow-hidden mb-6 animate-slideUp">
        <div className="px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Account Details
          </h2>
        </div>

        {/* Name row */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Name</p>
            <p className="text-sm font-medium text-white mt-0.5">{userName}</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        {/* Email row */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Email</p>
            <p className="text-sm font-medium text-white mt-0.5">{userEmail}</p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        {/* Member since row */}
        <div className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
          <div>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Member Since
            </p>
            <p className="text-sm font-medium text-white mt-0.5">
              {currentUser?.createdAt
                ? new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Logout Button ── */}
      <div className="animate-slideUp-delay-1">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 active:scale-[0.98] transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default ProfilePage;
