function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-medium text-slate-500">Labmentix Internship Project</p>
          <h1 className="text-xl font-bold text-slate-950">Speech-to-Text App</h1>
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
          Day 1 Setup
        </span>
      </nav>
    </header>
  )
}

export default Navbar
