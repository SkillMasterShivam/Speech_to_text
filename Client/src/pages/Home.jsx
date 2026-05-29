import React, { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionDisplay from '../components/TranscriptionDisplay';
import HistoryList from '../components/HistoryList';
import { transcribeAudio, getTranscriptionHistory } from '../services/api';

const Home = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState(null);
  const [error, setError] = useState(null);
  
  // Day 7: History state
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await getTranscriptionHistory();
      // Map backend response to match HistoryList expected props
      const formattedHistory = response.data.map(item => ({
        id: item._id || item.id,
        fileName: item.originalFileName || item.fileName,
        createdAt: new Date(item.createdAt).toLocaleString(),
        preview: item.transcriptionText,
        status: 'Completed'
      }));
      setHistory(formattedHistory);
    } catch (err) {
      console.error("Failed to load history:", err);
      // We don't want to show a global error if just history fails, but we can log it.
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleAudioProcess = async (audioData, fileName) => {
    setIsProcessing(true);
    setError(null);
    setTranscription(null);

    try {
      const response = await transcribeAudio(audioData, fileName);
      const text = response.data?.transcriptionText || response.transcriptionText || response.text || "Transcription completed successfully.";
      setTranscription(text);
      
      // Day 7: Refresh history after successful upload
      await fetchHistory();
    } catch (err) {
      console.error("Transcription error:", err);
      setError(err.message || "An error occurred during transcription.");
    } finally {
      setIsProcessing(false);
    }
  };

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center">
            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <FileUpload onProcess={handleAudioProcess} isProcessing={isProcessing} />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-slate-50 px-3 text-sm text-slate-400 font-medium uppercase tracking-wider">or</span>
              </div>
            </div>

            <AudioRecorder onProcess={handleAudioProcess} isProcessing={isProcessing} />
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-7">
            <TranscriptionDisplay transcription={transcription} isProcessing={isProcessing} />
          </div>
        </div>

        {/* Day 7: History Section */}
        <div className="animate-slideUp-delay-2">
          {isLoadingHistory ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <HistoryList items={history} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
