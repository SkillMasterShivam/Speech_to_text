import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FileUpload from '../components/FileUpload';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import HistoryList from '../components/HistoryList';
import { transcribeAudio, getTranscriptionHistory } from '../services/api';

/* ── Stats data ─────────────────────────────── */
const STATS = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'Total Transcriptions',
    value: '1,284',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    label: 'Total Audio',
    value: '42.5h',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Avg. Time',
    value: '0:45s',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Success Rate',
    value: '99.8%',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
];

/* ── Feature pills ──────────────────────────── */
const FEATURES = [
  { icon: '⚡', label: 'Fast Processing', desc: 'Transcribe hours of audio in minutes with GPU acceleration.' },
  { icon: '🤖', label: 'AI Powered', desc: 'Advanced LLMs for contextual correction and punctuation.' },
  { icon: '🛡️', label: 'Secure Storage', desc: 'End-to-end encryption for all your sensitive audio data.' },
  { icon: '🎯', label: 'Accurate Results', desc: 'Trained on multi-accent and multi-language datasets.' },
];

/* ════════════════════════════════════════════ */
const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await getTranscriptionHistory();
      setHistory(
        res.data.map(item => ({
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

  const handleAudioProcess = async (audioData, fileName) => {
    setIsProcessing(true);
    setError(null);
    setTranscription(null);
    try {
      const res = await transcribeAudio(audioData, fileName);
      setTranscription(
        res.data?.transcriptionText || res.transcriptionText || res.text || 'Transcription completed.'
      );
      await fetchHistory();
    } catch (err) {
      setError(err.message || 'An error occurred during transcription.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070f] noise">
      {/* ── Background gradient blobs ── */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-700/8 blur-[120px]" />
      </div>

      {/* ── Navbar ── */}
      <Navbar />

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Hero Section ── */}
        <section className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs font-semibold text-violet-300 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            Powered by Deepgram Nova-2 AI
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1] mb-5">
            Transform Speech into{' '}
            <span className="gradient-text">Accurate Text</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Upload audio files or record directly from your microphone and get instant AI-powered
            transcriptions with 99.9% accuracy.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <button className="px-6 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 active:scale-[0.98]">
              Get Started
            </button>
            <button className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200">
              View Demo
            </button>
          </div>
        </section>

        {/* ── Error Banner ── */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center gap-3 animate-fadeIn">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* ── Main Two-Column Input Area ── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6 animate-slideUp-delay-1">
          <FileUpload onProcess={handleAudioProcess} isProcessing={isProcessing} />
          <AudioRecorder onProcess={handleAudioProcess} isProcessing={isProcessing} />
        </section>

        {/* ── Stats Bar ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-slideUp-delay-1">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl px-5 py-4 flex items-center gap-4">
              <div className={`h-9 w-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500 leading-none">{stat.label}</p>
                <p className="text-xl font-bold text-white mt-1 leading-none">{stat.value}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Transcription Result ── */}
        <section className="mb-8 animate-slideUp-delay-2">
          <TranscriptionDisplay transcription={transcription} isProcessing={isProcessing} />
        </section>

        {/* ── History Section ── */}
        <section className="mb-12">
          {isLoadingHistory ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
            </div>
          ) : (
            <HistoryList items={history} />
          )}
        </section>

        {/* ── Feature Pills ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slideUp-delay-3">
          {FEATURES.map((f) => (
            <div key={f.label} className="glass-card glass-card-hover rounded-2xl p-5 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="text-sm font-bold text-white mb-1">{f.label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.06] pt-8 pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.svg" alt="Speech2Text" className="h-7 w-7" />
              <span className="text-sm font-bold gradient-text">Speech2Text</span>
            </div>
            <p className="text-xs text-slate-600">
              © 2025 Speech2Text.{' '}
              <span className="text-slate-500">Engineered for <span className="text-violet-400">Technical Elegance</span>.</span>
            </p>
            <div className="flex items-center gap-4">
              {['Privacy Policy', 'Terms of Service', 'API Docs', 'Support'].map(link => (
                <button key={link} className="text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200">
                  {link}
                </button>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
