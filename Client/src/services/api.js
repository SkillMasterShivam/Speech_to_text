const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Sends an audio file (File or Blob) to the Express backend for transcription.
 */
export const transcribeAudio = async (audioData, fileName = 'recording.wav') => {
  const formData = new FormData();
  
  formData.append('audio', audioData, fileName);

  const response = await fetch(`${API_BASE_URL}/uploads/audio`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to transcribe audio.');
  }

  return response.json();
};

/**
 * Fetches the transcription history from the database.
 */
export const getTranscriptionHistory = async () => {
  const response = await fetch(`${API_BASE_URL}/uploads/history`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to fetch transcription history.');
  }

  return response.json();
};
