const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/* ──────────────────────────────────────────────
 * Token helpers
 * ────────────────────────────────────────────── */

const TOKEN_KEY = 'speechflow_token';

/**
 * Returns an object with the Authorization header if a token exists.
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handle 401 responses globally — clear stored credentials.
 */
const handleUnauthorized = (response) => {
  if (response.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('speechflow_user');
  }
};

/* ──────────────────────────────────────────────
 * Auth API
 * ────────────────────────────────────────────── */

/**
 * POST /api/auth/register
 */
export const registerUser = async (name, email, password) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
  } catch (error) {
    throw new Error("Network error. Please check your connection.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Registration failed.');
  }

  return data;
};

/**
 * POST /api/auth/login
 */
export const loginUser = async (email, password) => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    throw new Error("Network error. Please check your connection.");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'Login failed.');
  }

  return data;
};

/**
 * GET /api/auth/me — validate stored token and get current user.
 */
export const getMe = async () => {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
  } catch (error) {
    throw new Error("Network error while verifying session.");
  }

  if (!response.ok) {
    handleUnauthorized(response);
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'Session verification failed.');
  }

  return response.json();
};

/* ──────────────────────────────────────────────
 * Transcription API (protected)
 * ────────────────────────────────────────────── */

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
      headers: { ...getAuthHeaders() },
      body: formData,
    });
  } catch (error) {
    throw new Error("Network error. Please check your internet connection and server status.");
  }

  if (!response.ok) {
    handleUnauthorized(response);
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Server error: ${response.statusText || response.status}`);
  }

  return response.json();
};

/**
 * Fetches the transcription history from the database.
 * @param {Object} options
 * @param {number} [options.page=1]
 * @param {number} [options.limit=20]
 */
export const getTranscriptionHistory = async ({ page = 1, limit = 20 } = {}) => {
  const params = new URLSearchParams({ page, limit });
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/uploads/history?${params}`, {
      headers: { ...getAuthHeaders() },
    });
  } catch (error) {
    throw new Error("Network error while fetching transcription history.");
  }
  
  if (!response.ok) {
    handleUnauthorized(response);
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Failed to fetch transcription history.');
  }

  return response.json();
};
