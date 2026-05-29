import React, { useState } from 'react';

const FileUpload = ({ onProcess, isProcessing }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onProcess(selectedFile, selectedFile.name);
    }
  };

  return (
    <div className="group relative bg-white/80 p-8 rounded-2xl shadow-sm border border-slate-200/80 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-2xl"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 ring-1 ring-indigo-100 inset-ring">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Upload File</h3>
      </div>
      
      <div className="relative overflow-hidden flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-200/70 rounded-xl bg-indigo-50/30 transition-all duration-300 hover:bg-indigo-50/80 hover:border-indigo-300">
        <div className="flex flex-col items-center space-y-4 relative z-10">
          <div className="p-4 bg-white rounded-full shadow-sm shadow-indigo-100 mb-2 transition-transform duration-300 group-hover:scale-110">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12-3c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM5 10v7" />
            </svg>
          </div>
          <div className="flex flex-col sm:flex-row text-sm text-slate-600 items-center gap-3">
            <label className={`relative cursor-pointer rounded-full bg-white px-5 py-2.5 font-semibold text-indigo-600 shadow-sm border border-slate-200 transition-all duration-300 hover:text-indigo-700 hover:border-indigo-300 hover:shadow-md active:scale-95 ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}>
              <span>Choose a file</span>
              <input type="file" className="sr-only" accept="audio/*" onChange={handleFileChange} disabled={isProcessing} />
            </label>
            <p className="font-medium text-slate-500">or drag and drop</p>
          </div>
          <p className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full mt-2">MP3, WAV, M4A up to 10MB</p>
        </div>
      </div>
      
      {selectedFile && (
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-slate-700 truncate">{selectedFile.name}</span>
            </div>
            <button onClick={handleClear} disabled={isProcessing} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300 disabled:opacity-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button 
            onClick={handleSubmit} 
            disabled={isProcessing}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg shadow-indigo-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                Transcribe File
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
