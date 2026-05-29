import React from 'react';

const TranscriptionDisplay = ({ transcription, isProcessing }) => {
  return (
    <div className="group bg-white/80 p-8 rounded-2xl shadow-sm border border-slate-200/80 h-full flex flex-col backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600 ring-1 ring-purple-100 inset-ring">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-800">Transcription Result</h3>
        </div>
        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full transition-colors duration-300 ${transcription ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 inset-ring' : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200 inset-ring'}`}>
          {transcription ? 'Completed' : 'Waiting'}
        </span>
      </div>
      
      <div className="flex-1 p-8 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 min-h-[400px] relative shadow-inner overflow-hidden">
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 rounded-xl backdrop-blur-md z-10 transition-all duration-500 animate-fadeIn">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
            </div>
            <p className="mt-6 text-indigo-700 font-semibold tracking-wide animate-pulse">Generating text using AI...</p>
          </div>
        )}

        {transcription ? (
          <div className="prose prose-slate max-w-none animate-fadeIn">
            <p className="text-slate-800 leading-loose text-lg whitespace-pre-wrap font-medium">
              {transcription}
            </p>
          </div>
        ) : (
          <div className={`h-full flex flex-col items-center justify-center text-center opacity-60 transition-opacity duration-300 ${isProcessing ? 'invisible' : ''}`}>
            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-slate-500 text-lg">
              Your generated text will appear here.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-6 flex justify-end space-x-4">
        <button 
          disabled={!transcription || isProcessing}
          className="px-6 py-2.5 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-slate-400 hover:text-slate-900 transition-all duration-300 shadow-sm active:scale-95 disabled:opacity-50 disabled:active:scale-100"
        >
          Copy Text
        </button>
        <button 
          disabled={!transcription || isProcessing}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all duration-300 shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2"
        >
          Download TXT
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
