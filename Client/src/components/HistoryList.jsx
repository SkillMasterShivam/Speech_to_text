function HistoryList({ items }) {
  const truncate = (text, max = 120) => {
    if (!text) return ''
    return text.length > max ? text.slice(0, max) + '...' : text
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              History
            </p>
            {items.length > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-bold text-indigo-700">
                {items.length}
              </span>
            )}
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Recent transcriptions
          </h2>
        </div>
        <p className="text-sm text-slate-400">Uploaded files from this session</p>
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="group/card rounded-xl border border-slate-200/60 bg-gradient-to-r from-white to-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-200/60 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  {/* Audio waveform icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500 transition-colors group-hover/card:bg-indigo-100 group-hover/card:text-indigo-600">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M2 10v4" />
                      <path d="M6 6v12" />
                      <path d="M10 3v18" />
                      <path d="M14 8v8" />
                      <path d="M18 5v14" />
                      <path d="M22 10v4" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-slate-800 transition-colors group-hover/card:text-indigo-700">
                    {item.fileName}
                  </h3>
                </div>
                <span className="shrink-0 text-xs font-medium text-slate-400">
                  {item.createdAt}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.preview}</p>
              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {item.status}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-4 py-12 text-center">
          {/* Empty state icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-500">
            No transcriptions yet
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Your latest audio files will appear here during this session.
          </p>
        </div>
      )}
    </section>
  )
}

export default HistoryList
