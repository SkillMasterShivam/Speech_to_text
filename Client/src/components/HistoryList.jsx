function HistoryList({ items }) {
  const truncate = (text, max = 100) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  };

  return (
    <section className="animate-slideUp-delay-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Recent Transcriptions</h2>
        {items.length > 0 && (
          <button className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-200">
            View All History →
          </button>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col gap-4 animate-fadeIn"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="h-9 w-9 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <svg className="h-4 w-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 10v4M6 6v12M10 3v18M14 8v8M18 5v14M22 10v4" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-white truncate">{item.fileName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.createdAt}</p>
                  </div>
                </div>
                <button className="text-slate-600 hover:text-slate-400 transition-colors shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01" />
                  </svg>
                </button>
              </div>

              {/* Transcript Preview */}
              <p className="text-xs leading-relaxed text-slate-500 line-clamp-3">
                {truncate(item.preview, 120)}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                <button className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.08] transition-all duration-200">
                  View
                </button>
                <button className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl py-16 text-center">
          <div className="animate-float inline-block">
            <div className="h-16 w-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
          </div>
          <p className="text-sm font-semibold text-slate-500 mt-2">No transcriptions yet</p>
          <p className="text-xs text-slate-600 mt-1">Upload or record an audio file to get started.</p>
        </div>
      )}
    </section>
  );
}

export default HistoryList;
