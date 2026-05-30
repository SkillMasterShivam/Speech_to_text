import { Link } from 'react-router-dom';

function HistoryList({ items }) {
  const truncate = (text, max = 120) => {
    if (!text) return '';
    return text.length > max ? text.slice(0, max) + '…' : text;
  };

  return (
    <section className="animate-slideUp-delay-2">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-white">Recent Transcriptions</h2>
        {items.length > 0 && (
          <Link
            to="/history"
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors duration-200"
          >
            View All History →
          </Link>
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
              <div className="flex items-start gap-3">
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

              {/* Transcript Preview */}
              <p className="text-xs leading-relaxed text-slate-500 line-clamp-3">
                {truncate(item.preview, 120)}
              </p>

              {/* Footer — status badge only */}
              <div className="flex items-center pt-1 border-t border-white/[0.05]">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                  {item.status}
                </span>
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
