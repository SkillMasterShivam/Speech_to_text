import React, { useState } from 'react';

const FileUpload = ({ onProcess, isProcessing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleClear = () => setSelectedFile(null);

  const handleSubmit = () => {
    if (selectedFile) onProcess(selectedFile, selectedFile.name);
  };

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-violet-500/15 flex items-center justify-center border border-violet-500/20">
          <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Upload Audio</h3>
          <p className="text-xs text-slate-500">Drag and drop your audio files here</p>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        className={`relative flex-1 flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer min-h-[140px] p-6 ${
          isDragging
            ? 'border-violet-400 bg-violet-500/10'
            : 'border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 bg-white/[0.02]'
        }`}
        onClick={() => document.getElementById('file-input').click()}
      >
        <input
          id="file-input"
          type="file"
          className="sr-only"
          accept="audio/*"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
        <svg className="w-8 h-8 text-slate-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-sm font-medium text-slate-400">
          {isDragging ? 'Drop your file here' : 'Click or drag & drop an audio file'}
        </p>
        <p className="text-xs text-slate-600 mt-1">MP3, WAV, FLAC, M4A — up to 500 MB</p>
      </div>

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mt-4 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-8 w-8 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm12-3c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-300 truncate">{selectedFile.name}</span>
          </div>
          <button onClick={handleClear} disabled={isProcessing} className="ml-3 text-slate-600 hover:text-red-400 transition-colors shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedFile || isProcessing}
        className="mt-4 w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Audio
          </>
        )}
      </button>
    </div>
  );
};

export default FileUpload;
