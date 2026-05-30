import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function ProtectedLayout() {
  return (
    <div className="relative min-h-screen bg-[#07070f] noise">
      {/* Gradient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[128px]" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-purple-700/[0.08] blur-[128px]" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/[0.06] pt-8 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg
              className="h-5 w-5 text-violet-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            <span className="gradient-text font-semibold text-sm tracking-wide">
              Speech2Text
            </span>
          </div>
          <p className="text-xs text-slate-500">
            © 2025 Speech2Text. Engineered for Technical Elegance.
          </p>
        </div>
      </footer>
    </div>
  );
}
