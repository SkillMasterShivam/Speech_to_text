import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="relative min-h-screen bg-[#07070f] noise">
      {/* Gradient background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/10 blur-[128px]" />
        <div className="absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/[0.08] blur-[128px]" />
        <div className="absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-purple-700/[0.08] blur-[128px]" />
      </div>

      {/* Page content */}
      <Outlet />
    </div>
  );
}
