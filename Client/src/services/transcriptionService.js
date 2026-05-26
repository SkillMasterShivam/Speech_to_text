const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function uploadAudioForTranscription(audioFile) {
  const formData = new FormData()
  formData.append('audio', audioFile)

  const response = await fetch(`${API_BASE_URL}/transcriptions`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Unable to upload audio file.')
  }

  return response.json()
}

export async function getTranscriptionHistory() {
  const response = await fetch(`${API_BASE_URL}/transcriptions`)

  if (!response.ok) {
    throw new Error('Unable to load transcription history.')
  }

  return response.json()
}
