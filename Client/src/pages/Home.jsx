import React from 'react';
import FileUpload from '../components/FileUpload';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionDisplay from '../components/TranscriptionDisplay';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800">Speech2Text App</h1>
          </div>
          <div className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Day 5: Frontend UI
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Transcribe Audio</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Upload an audio file or record directly from your microphone to get an accurate text transcription.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <FileUpload />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 px-3 text-sm text-slate-400 font-medium uppercase tracking-wider">or</span>
              </div>
            </div>

            <AudioRecorder />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <TranscriptionDisplay />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
