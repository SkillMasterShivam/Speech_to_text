import { Link } from 'react-router-dom';

const features = [
  {
    icon: '⚡',
    label: 'Fast Processing',
    desc: 'Lightning-fast transcription powered by cutting-edge infrastructure for real-time results.',
  },
  {
    icon: '🤖',
    label: 'AI Powered',
    desc: 'Leveraging Deepgram Nova-2 for industry-leading speech recognition accuracy.',
  },
  {
    icon: '🛡️',
    label: 'Secure Storage',
    desc: 'Enterprise-grade encryption ensures your audio and transcriptions stay private.',
  },
  {
    icon: '🎯',
    label: 'Accurate Results',
    desc: 'Best-in-class word error rate with intelligent punctuation and formatting.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Inline Header / Nav ─── */}
      <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <span className="gradient-text text-xl font-bold tracking-tight">
            Speech2Text
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/25"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <section className="animate-fadeIn max-w-3xl mx-auto pt-12 pb-20">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-medium text-slate-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            Powered by Deepgram Nova-2 AI
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Transform Speech into{' '}
            <span className="gradient-text">Accurate Text</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Harness the power of next-generation AI to convert audio into
            perfectly formatted text — fast, secure, and effortlessly accurate.
          </p>

          {/* CTA */}
          <div className="mt-10">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:opacity-90 transition-opacity shadow-xl shadow-violet-500/30"
            >
              Get Started
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* ─── Feature Pills Grid ─── */}
        <section className="animate-slideUp-delay-3 w-full max-w-6xl mx-auto pb-24 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.label}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col items-start gap-3 group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </span>
                <h3 className="text-white font-semibold text-base">
                  {f.label}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="py-8 text-center text-sm text-slate-500">
        © 2025 Speech2Text. Engineered for Technical Elegance.
      </footer>
    </div>
  );
}
