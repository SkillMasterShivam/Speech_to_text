import React, { useState, useEffect } from 'react';
import { getTranscriptionHistory } from '../services/api';

const AnalyticsPage = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const res = await getTranscriptionHistory({ page: 1, limit: 100 });
      setHistory(res.data || []);
    } catch {
      /* silent fail */
    } finally {
      setIsLoading(false);
    }
  };

  /* ── Compute analytics ── */
  const totalTranscriptions = history.length;
  const totalCharacters = history.reduce(
    (sum, item) => sum + (item.transcriptionText?.length || 0),
    0
  );
  const avgLength = totalTranscriptions > 0 ? Math.round(totalCharacters / totalTranscriptions) : 0;
  const totalFileSize = history.reduce((sum, item) => sum + (item.size || 0), 0);
  const totalFileSizeMB = (totalFileSize / (1024 * 1024)).toFixed(2);

  const recentItems = history.slice(0, 10);

  const stats = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      label: 'Total Transcriptions',
      value: totalTranscriptions.toLocaleString(),
      color: 'text-violet-400',
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/20',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      ),
      label: 'Total Characters',
      value: totalCharacters.toLocaleString(),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      label: 'Average Length',
      value: avgLength.toLocaleString() + ' chars',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      label: 'Total File Size',
      value: totalFileSizeMB + ' MB',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/20',
    },
  ];

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

  /* ── Empty State ── */
  if (history.length === 0) {
    return (
      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-sm text-slate-400">Insights from your transcription activity.</p>
        </div>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No data yet</h3>
            <p className="text-sm text-slate-500">
              Start transcribing audio to see your analytics here.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Header ── */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-sm text-slate-400">Insights from your transcription activity.</p>
      </div>

      {/* ── Stat Cards ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slideUp">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl px-5 py-5 flex flex-col gap-3">
            <div
              className={`h-11 w-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-white mt-1 leading-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Recent Activity ── */}
      <section className="animate-slideUp-delay-1">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="divide-y divide-white/[0.06]">
            {recentItems.map((item, index) => {
              const fileName = item.originalFileName || item.fileName;
              const date = new Date(item.createdAt).toLocaleString();
              const charCount = item.transcriptionText?.length || 0;

              return (
                <div
                  key={item._id || item.id || index}
                  className="px-5 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors duration-150"
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white truncate">{fileName}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{date}</p>
                  </div>

                  {/* Character count badge */}
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-medium text-slate-400">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h7"
                        />
                      </svg>
                      {charCount.toLocaleString()} chars
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnalyticsPage;
