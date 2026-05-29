import React, { useState, useRef } from 'react';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
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
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioUrl(null);
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Record Audio</h3>
      
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-lg border border-slate-100">
        <div className="text-3xl font-mono text-slate-700 mb-6 font-medium">
          {formatTime(recordingTime)}
        </div>
        
        <div className="flex space-x-4">
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full mr-3 animate-pulse"></div>
              Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-full font-medium hover:bg-red-200 transition-colors"
            >
              <div className="w-3 h-3 bg-red-600 rounded-sm mr-3"></div>
              Stop Recording
            </button>
          )}
        </div>

        {isRecording && (
          <p className="mt-4 text-sm text-indigo-600 animate-pulse font-medium">
            Recording in progress...
          </p>
        )}

        {audioUrl && !isRecording && (
          <div className="mt-6 w-full max-w-md">
            <audio src={audioUrl} controls className="w-full h-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
