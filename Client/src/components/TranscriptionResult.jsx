import { useState } from 'react'

function formatBytes(bytes) {
  if (!bytes) return '0 KB'
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function TranscriptionResult({ result, status }) {
  const isUploading = status === 'uploading'
  const isUploaded = status === 'uploaded' && result
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!result?.transcriptionText) return
    try {
      await navigator.clipboard.writeText(result.transcriptionText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard not available */
    }
  }

  const handleDownload = () => {
    if (!result?.transcriptionText) return
    const blob = new Blob([result.transcriptionText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${result.originalFileName || 'transcription'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Result</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">Transcription output</h2>
      <div className="mt-5 min-h-40 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        {isUploaded ? (
          <div className="space-y-3">
            <p className="font-semibold text-emerald-700">Audio uploaded successfully.</p>
            <dl className="grid gap-3 text-slate-700 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">File</dt>
                <dd className="break-all">{result.originalName}</dd>
              </div>
              <div className="rounded-lg bg-white/80 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Size
                </dt>
                <dd className="mt-0.5 text-sm">{formatBytes(result.size)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase text-slate-500">Next step</dt>
                <dd>Connect the speech API to generate the transcript from this uploaded audio.</dd>
              </div>
            </dl>
          </div>
        )}

        {/* Idle / default state */}
        {!isUploading && !isUploaded && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-300">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" x2="8" y1="13" y2="13" />
                <line x1="16" x2="8" y1="17" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <p className="text-sm text-slate-400">
              Upload an audio file to see its transcription here.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default TranscriptionResult
