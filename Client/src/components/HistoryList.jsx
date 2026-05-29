function HistoryList({ items }) {
  const truncate = (text, max = 100) => {
    if (!text) return ''
    return text.length > max ? text.slice(0, max) + '...' : text
  }

  return (
    <section className="mt-12 animate-slideUp">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200 inset-ring">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Transcription History
            </h2>
          </div>
          <p className="mt-2 text-base text-slate-500 ml-13">Your previously processed audio files.</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-50 group-hover:text-indigo-600 ring-1 ring-slate-200 group-hover:ring-indigo-100 inset-ring">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 10v4" />
                        <path d="M6 6v12" />
                        <path d="M10 3v18" />
                        <path d="M14 8v8" />
                        <path d="M18 5v14" />
                        <path d="M22 10v4" />
                      </svg>
                    </div>
                    <h3 className="truncate text-lg font-bold text-slate-800 transition-colors group-hover:text-indigo-700">
                      {item.fileName}
                    </h3>
                  </div>
                </div>
                
                <p className="mt-5 text-sm leading-relaxed text-slate-600 line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                  {truncate(item.preview, 120)}
                </p>
              </div>
              
              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-400">
                  {item.createdAt}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-600/20 inset-ring">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Completed
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white/50 backdrop-blur-sm px-4 py-20 text-center transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50/30">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 shadow-inner">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">No history yet</h3>
          <p className="mt-2 text-base text-slate-500">
            Transcribe an audio file and it will show up here as a beautiful card.
          </p>
        </div>
      )}
    </section>
  )
}

export default HistoryList
