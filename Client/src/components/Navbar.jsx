function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-bold text-slate-950">SpeechFlow</h1>
          <p className="text-sm text-slate-500">Audio transcription workspace</p>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
