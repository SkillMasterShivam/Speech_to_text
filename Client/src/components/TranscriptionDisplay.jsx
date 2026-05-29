import React from 'react';

const TranscriptionDisplay = ({ transcription, isProcessing }) => {
  const handleCopy = () => {
    if (transcription) navigator.clipboard.writeText(transcription);
  };

  const handleDownload = () => {
    if (!transcription) return;
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcription_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card rounded-2xl flex flex-col" style={{ minHeight: '400px' }}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-sm font-semibold text-white">Transcription Result</h3>
          {transcription && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              Completed
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!transcription}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </button>
          <button
            onClick={handleDownload}
            disabled={!transcription}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          {transcription && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 relative p-6">
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#07070f]/70 backdrop-blur-sm rounded-b-2xl z-10 animate-fadeIn">
            <div className="flex items-end gap-1 h-12 mb-5">
              {[20, 32, 44, 32, 20, 32, 44, 32, 20].map((h, i) => (
                <div key={i} className="wave-bar bg-gradient-to-t from-violet-600 to-blue-400" style={{ height: `${h}px` }} />
              ))}
            </div>
            <p className="text-sm font-semibold text-violet-300 animate-pulse">Generating transcription…</p>
            <p className="text-xs text-slate-500 mt-1">This may take a few seconds</p>
          </div>
        )}

        {transcription ? (
          <div className="animate-fadeIn">
            <p className="text-slate-300 leading-loose text-[15px] whitespace-pre-wrap font-normal">
              {transcription}
            </p>
          </div>
        ) : (
          <div className={`h-full flex flex-col items-center justify-center text-center py-12 ${isProcessing ? 'invisible' : ''}`}>
            <div className="animate-float">
              <svg className="w-12 h-12 text-slate-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              <div className="flex justify-center gap-1 mt-2">
                {[2, 3, 2, 3, 2].map((_, i) => (
                  <div key={i} className="h-1 w-1 rounded-full bg-slate-700" />
                ))}
              </div>
            </div>
            <p className="mt-5 text-sm font-medium text-slate-600">Your transcription will appear here</p>
            <p className="text-xs text-slate-700 mt-1">Once you upload or record, the text will stream in real time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
