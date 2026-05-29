import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onProcess, isProcessing }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioUrl(null);
      setAudioBlob(null);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Microphone access is required to record audio.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSubmit = () => {
    if (audioBlob) {
      onProcess(audioBlob, `recording_${Date.now()}.wav`);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="group relative bg-white/80 p-8 rounded-2xl shadow-sm border border-slate-200/80 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-t-2xl"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 ring-1 ring-emerald-100 inset-ring">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold tracking-tight text-slate-800">Record Audio</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:border-slate-300">
        <div className={`text-5xl font-bold tracking-tighter mb-8 font-mono transition-colors duration-300 ${isRecording ? 'text-red-500' : 'text-slate-700'}`}>
          {formatTime(recordingTime)}
        </div>
        
        <div className="flex space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isProcessing}
              className="flex items-center px-8 py-3.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center px-8 py-3.5 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600 transition-all duration-300 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 active:scale-95"
            >
              <div className="w-3 h-3 bg-white rounded-sm mr-3"></div>
              Stop Recording
            </button>
          )}
        </div>

        {isRecording && (
          <p className="mt-6 text-sm text-red-500 font-medium tracking-wide uppercase animate-pulse">
            Recording in progress...
          </p>
        )}

        {audioUrl && !isRecording && (
          <div className="mt-8 w-full max-w-md flex flex-col space-y-4 animate-fadeIn">
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
              <audio src={audioUrl} controls className="w-full h-10" />
            </div>
            <button 
              onClick={handleSubmit} 
              disabled={isProcessing}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg shadow-emerald-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex justify-center items-center gap-2"
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
                  Transcribe Recording
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
