import React from 'react';

const TranscriptionDisplay = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800">Transcription Result</h3>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
          Preview Mode
        </span>
      </div>
      
      <div className="flex-1 p-6 bg-slate-50 rounded-lg border border-slate-100 min-h-[300px]">
        {/* Placeholder for future backend integration */}
        <p className="text-slate-700 leading-relaxed text-lg">
          <span className="opacity-50 italic">
            "This is a placeholder for the transcribed text. Once the backend integration is complete in the upcoming days, the speech-to-text results will be displayed here dynamically. The layout is prepared and ready to receive API data."
          </span>
        </p>
      </div>
      
      <div className="mt-4 flex justify-end space-x-3">
        <button className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50">
          Copy Text
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50">
          Download TXT
        </button>
      </div>
    </div>
  );
};

export default TranscriptionDisplay;
