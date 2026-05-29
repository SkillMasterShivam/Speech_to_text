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

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setAudioUrl(null);
      setAudioBlob(null);
      setRecordingTime(0);
      timerRef.current = setInterval(() => setRecordingTime(p => p + 1), 1000);
    } catch {
      alert('Microphone access is required to record audio.');
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  };

  const handleSubmit = () => {
    if (audioBlob) onProcess(audioBlob, `recording_${Date.now()}.wav`);
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-blue-500/15 flex items-center justify-center border border-blue-500/20">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Record Audio</h3>
          <p className="text-xs text-slate-500">Live recording from your device</p>
        </div>
      </div>

      {/* Visualizer / Timer Area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-[140px] rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
        {isRecording ? (
          <div className="flex items-end justify-center gap-1 h-14">
            {[28, 44, 56, 64, 56, 44, 56, 44, 28].map((h, i) => (
              <div
                key={i}
                className="wave-bar bg-gradient-to-t from-violet-600 to-blue-400"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        ) : audioUrl ? (
          <div className="w-full flex flex-col gap-3">
            <audio src={audioUrl} controls className="w-full h-10 rounded-lg" style={{ colorScheme: 'dark' }} />
          </div>
        ) : (
          <div className="flex items-end justify-center gap-1 h-14 opacity-20">
            {[20, 28, 36, 44, 36, 28, 36, 28, 20].map((h, i) => (
              <div key={i} className="w-[3px] rounded-full bg-slate-500" style={{ height: `${h}px` }} />
            ))}
          </div>
        )}

        {/* Timer */}
        <p className={`mt-4 text-2xl font-bold tabular-nums tracking-widest transition-colors duration-300 ${isRecording ? 'text-red-400' : 'text-slate-600'}`}>
          {fmt(recordingTime)}
        </p>
        {isRecording && (
          <p className="mt-1 text-xs font-semibold text-red-400/80 uppercase tracking-widest animate-pulse">Recording…</p>
        )}
      </div>

      {/* Control Buttons */}
      <div className="mt-4 flex gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            disabled={isProcessing}
            className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 active:scale-[0.98] disabled:opacity-40"
          >
            <div className="h-2.5 w-2.5 rounded-full bg-red-400 animate-pulse" />
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-400 transition-all duration-300 active:scale-[0.98]"
          >
            <div className="h-2.5 w-2.5 rounded-sm bg-red-400" />
            Stop Recording
          </button>
        )}

        {audioUrl && !isRecording && (
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-40 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] text-white"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Processing…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Transcribe
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
