import { useEffect, useState } from 'react'
import FileUploadCard from '../components/FileUploadCard'
import HistoryList from '../components/HistoryList'
import TranscriptionResult from '../components/TranscriptionResult'
import {
  checkApiHealth,
  getTranscriptionHistory,
  uploadAudioForTranscription,
} from '../services/transcriptionService'

function mapTranscriptionToHistoryItem(transcription) {
  return {
    id: transcription._id || transcription.id,
    fileName: transcription.originalFileName,
    createdAt: new Date(transcription.createdAt).toLocaleString(),
    preview: transcription.transcriptionText,
  }
}

function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadResult, setUploadResult] = useState(null)
  const [history, setHistory] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [apiOnline, setApiOnline] = useState(false)

  useEffect(() => {
    checkApiHealth()
      .then(async () => {
        setApiOnline(true)
        const historyResponse = await getTranscriptionHistory()
        setHistory(historyResponse.data.map(mapTranscriptionToHistoryItem))
      })
      .catch(() => setApiOnline(false))
  }, [])

  const handleFileChange = (file) => {
    setSelectedFile(file)
    setUploadResult(null)
    setError('')
    setStatus(file ? 'ready' : 'idle')
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please choose an audio file first.')
      return
    }

    try {
      setStatus('uploading')
      setError('')
      const response = await uploadAudioForTranscription(selectedFile)
      const uploadedItem = mapTranscriptionToHistoryItem(response.data)

      setUploadResult(response.data)
      setHistory((currentHistory) => [uploadedItem, ...currentHistory])
      setStatus('uploaded')
    } catch (uploadError) {
      setStatus('error')
      setError(uploadError.message)
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
            Speech to text
          </span>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              apiOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
            }`}
          >
            {apiOnline ? 'Backend connected' : 'Start backend server'}
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          Upload audio and prepare it for fast, accurate transcription.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          A clean workspace for uploading audio files, validating formats, and saving them securely before transcription.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <FileUploadCard
          error={error}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          selectedFile={selectedFile}
          status={status}
        />
        <TranscriptionResult result={uploadResult} status={status} />
      </div>

      <div className="mt-6">
        <HistoryList items={history} />
      </div>
    </main>
  )
}

export default Home
