const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Sends an audio file (File or Blob) to the Express backend for transcription.
 */
export const transcribeAudio = async (audioData, fileName = 'recording.wav') => {
  const formData = new FormData();
  formData.append('audio', audioData, fileName);

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/uploads/audio`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    throw new Error("Network error. Please check your internet connection and server status.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Server error: ${response.statusText || response.status}`);
  }

  return response.json();
};

/**
 * Fetches the transcription history from the database.
 */
export const getTranscriptionHistory = async () => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/uploads/history`);
  } catch (error) {
    throw new Error("Network error while fetching transcription history.");
  }
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to fetch transcription history.');
  }

  return response.json();
};
