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
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="animate-fadeIn mb-10">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-indigo-100">
            Speech to text
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium ring-1 ${
              apiOnline
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-100'
                : 'bg-amber-50 text-amber-700 ring-amber-100'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                apiOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            {apiOnline ? 'Backend connected' : 'Start backend server'}
          </span>
        </div>

        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
            Upload audio and prepare it for
          </span>{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            fast, accurate transcription.
          </span>
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
          A clean workspace for uploading audio files, validating formats, and
          saving them securely before transcription.
        </p>
      </section>

      {/* Upload + Result Grid */}
      <div className="animate-slideUp-delay-1 grid gap-6 lg:grid-cols-2">
        <FileUploadCard
          error={error}
          onFileChange={handleFileChange}
          onUpload={handleUpload}
          selectedFile={selectedFile}
          status={status}
        />
        <TranscriptionResult result={uploadResult} status={status} />
      </div>

      {/* History Section */}
      <div className="animate-slideUp-delay-2 mt-8">
        <HistoryList items={history} />
      </div>
    </main>
  )
}

export default Home
