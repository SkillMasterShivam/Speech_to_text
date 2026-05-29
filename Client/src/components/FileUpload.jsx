import React, { useState } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Upload Audio File</h3>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-indigo-200 rounded-lg bg-indigo-50/50 hover:bg-indigo-50 transition-colors">
        <div className="flex flex-col items-center space-y-4">
          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="flex text-sm text-slate-600 items-center">
            <label className="relative cursor-pointer rounded-md bg-white px-3 py-2 font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 shadow-sm border border-slate-200">
              <span>Choose a file</span>
              <input type="file" className="sr-only" accept="audio/*" onChange={handleFileChange} />
            </label>
            <p className="pl-3 py-2">or drag and drop</p>
          </div>
          <p className="text-xs text-slate-500">MP3, WAV, M4A up to 10MB</p>
        </div>
      </div>
      
      {selectedFile && (
        <div className="mt-4 p-4 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-200">
          <div className="flex items-center space-x-3 truncate">
            <svg className="w-6 h-6 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12-3c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zM5 10v7" />
            </svg>
            <span className="text-sm font-medium text-slate-700 truncate">{selectedFile.name}</span>
          </div>
          <button onClick={handleClear} className="text-slate-400 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
