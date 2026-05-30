import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import HistoryList from '../components/HistoryList';
import { transcribeAudio, getTranscriptionHistory } from '../services/api';

/* ════════════════════════════════════════════ */
const DashboardPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  /* ── Fetch history ── */
  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await getTranscriptionHistory({ page: 1, limit: 100 });
      setHistory(
        res.data.map((item) => ({
          id: item._id || item.id,
          fileName: item.originalFileName || item.fileName,
          createdAt: new Date(item.createdAt).toLocaleString(),
          preview: item.transcriptionText,
          status: 'Completed',
        }))
      );
    } catch {
      /* silent fail — history is non-critical */
    } finally {
      setIsLoadingHistory(false);
    }
  };

  /* ── Handle transcription ── */
  const handleAudioProcess = async (audioData, fileName) => {
    setError(null);
    setTranscription(null);

    if (!audioData) {
      setError('Please provide an audio file to transcribe.');
      return;
    }
    if (audioData.size === 0) {
      setError('The provided audio file is empty. Please try a different file.');
      return;
    }

    setIsProcessing(true);

    try {
      const res = await transcribeAudio(audioData, fileName);
      setTranscription(
        res.data?.transcriptionText || res.transcriptionText || res.text || 'Transcription completed.'
      );
      await fetchHistory();
    } catch (err) {
      setError(err.message || 'An error occurred during transcription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  /* ── Clear transcription ── */
  const handleClearTranscription = () => {
    setTranscription(null);
    setError(null);
  };

  /* ── Compute stats from real history ── */
  const totalTranscriptions = history.length;
  const totalFiles = history.length;
  const avgLength =
    history.length > 0
      ? Math.round(
          history.reduce((sum, item) => sum + (item.preview?.length || 0), 0) / history.length
        )
      : 0;
  const latestDate = history.length > 0 ? history[0].createdAt : '—';

  const stats = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      label: 'Total Files',
      value: totalFiles.toLocaleString(),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      ),
      label: 'Avg. Length',
      value: avgLength.toLocaleString(),
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: 'Latest',
      value: latestDate,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ];

  return (
    <div>
      {/* ── Error Banner ── */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 animate-fadeIn">
          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm font-medium">{error}</span>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-500 hover:text-red-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      {/* ── Main Two-Column Input Area ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6 animate-slideUp">
        <FileUpload onProcess={handleAudioProcess} isProcessing={isProcessing} onError={setError} />
        <AudioRecorder onProcess={handleAudioProcess} isProcessing={isProcessing} onError={setError} />
      </section>

      {/* ── Stats Bar ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slideUp-delay-1">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4">
            <div
              className={`h-9 w-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}
            >
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-slate-500 leading-none">{stat.label}</p>
              <p className="text-xl font-bold text-white mt-1 leading-none truncate">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Transcription Result ── */}
      <section className="mb-8 animate-slideUp-delay-2">
        <TranscriptionDisplay
          transcription={transcription}
          isProcessing={isProcessing}
          onClear={handleClearTranscription}
        />
      </section>

      {/* ── Recent History (first 5) ── */}
      <section className="mb-6 animate-slideUp-delay-3">
        {isLoadingHistory ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          </div>
        ) : (
          <>
            <HistoryList items={history.slice(0, 5)} />
            {history.length > 5 && (
              <div className="mt-4 text-center">
                <Link
                  to="/history"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-violet-400 border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/30 transition-all duration-300"
                >
                  View All History
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
