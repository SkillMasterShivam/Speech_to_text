function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/[0.06]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Speech2Text logo" className="h-10 w-10" />
          <div>
            <span className="gradient-text text-xl font-bold tracking-tight">Speech2Text</span>
            <p className="text-[11px] font-medium text-slate-500 leading-none mt-0.5">AI Transcription Platform</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {['Workspace', 'History', 'Analytics'].map((item) => (
            <button
              key={item}
              className="px-4 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block px-4 py-2 text-sm font-semibold text-violet-300 border border-violet-500/30 rounded-lg hover:bg-violet-500/10 hover:border-violet-400/50 transition-all duration-200">
            Upgrade Plan
          </button>
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-violet-500/25">
            U
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
