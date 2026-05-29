import React from 'react';

const TranscriptionDisplay = ({ transcription, isProcessing }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Transcription Result</h3>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${transcription ? 'bg-green-50 text-green-700' : 'bg-indigo-50 text-indigo-700'}`}>
          {transcription ? 'Completed' : 'Ready'}
        </span>
      </div>
      
      <div className="flex-1 p-6 bg-slate-50 rounded-lg border border-slate-100 min-h-[300px] relative">
        {isProcessing && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 rounded-lg backdrop-blur-sm z-10">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
            <p className="text-indigo-600 font-medium animate-pulse">Analyzing audio and generating text...</p>
          </div>
        )}

        {transcription ? (
          <p className="text-slate-800 leading-relaxed text-lg whitespace-pre-wrap">
            {transcription}
          </p>
        ) : (
          <p className={`text-slate-700 leading-relaxed text-lg h-full flex items-center justify-center text-center opacity-50 italic ${isProcessing ? 'invisible' : ''}`}>
            Your transcription will appear here once the audio is processed.
          </p>
        )}
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button 
          disabled={!transcription || isProcessing}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
        >
          Copy Text
        </button>
        <button 
          disabled={!transcription || isProcessing}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          Download TXT
        </button>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
