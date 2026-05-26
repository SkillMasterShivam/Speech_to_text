const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export async function uploadAudioForTranscription(audioFile) {
  const formData = new FormData()
  formData.append('audio', audioFile)

  const response = await fetch(`${API_BASE_URL}/uploads/audio`, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    throw new Error(errorData?.message || 'Unable to upload audio file.')
  }

  return response.json()
}

export async function checkApiHealth() {
  const response = await fetch(`${API_BASE_URL}/health`)

  if (!response.ok) {
    throw new Error('Backend is not responding.')
  }

  return response.json()
}
