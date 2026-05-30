import React, { useState, useEffect } from 'react';
import { getTranscriptionHistory } from '../services/api';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await getTranscriptionHistory({ page: 1, limit: 100 });
      setHistory(
        res.data.map((item) => ({
          id: item._id || item.id,
          fileName: item.originalFileName || item.fileName,
          createdAt: new Date(item.createdAt).toLocaleString(),
          transcriptionText: item.transcriptionText || '',
        }))
      );
    } catch {
      /* silent fail */
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHistory = history.filter((item) =>
    item.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.transcriptionText);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* clipboard API may fail in some contexts */
    }
  };

  /* ── Loading State ── */
  if (isLoading) {
    return (
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-center py-24">
          <div className="h-10 w-10 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Header ── */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Transcription History</h1>
        <p className="text-sm text-slate-400">
          Browse and search through all your past transcriptions.
        </p>
      </div>

      {/* ── Search ── */}
      <div className="mb-8 animate-slideUp">
        <div className="relative max-w-md">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by file name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/25 transition-all duration-200"
          />
        </div>
      </div>

      {/* ── Results Grid ── */}
      {filteredHistory.length === 0 ? (
        /* ── Empty State ── */
        <div className="flex justify-center py-16 animate-fadeIn">
          <div className="glass-card rounded-2xl p-10 text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
              <svg
                className="w-8 h-8 text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No transcriptions yet</h3>
            <p className="text-sm text-slate-500">
              {searchTerm
                ? 'No results match your search. Try a different term.'
                : 'Your transcription history will appear here once you start transcribing.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredHistory.map((item, index) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-2xl p-5 flex flex-col animate-fadeIn"
              style={{ animationDelay: `${Math.min(index * 60, 300)}ms`, animationFillMode: 'both' }}
            >
              {/* Card Header */}
              <div className="flex items-start gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-violet-500/15 flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-violet-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white truncate" title={item.fileName}>
                    {item.fileName}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.createdAt}</p>
                </div>
              </div>

              {/* Transcription Preview */}
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 flex-1 mb-4">
                {item.transcriptionText || 'No transcription text available.'}
              </p>

              {/* Copy Button */}
              <button
                onClick={() => handleCopy(item)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                  copiedId === item.id
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:bg-white/[0.08] hover:border-white/[0.15] hover:text-slate-300'
                }`}
              >
                {copiedId === item.id ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy Text
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default HistoryPage;
