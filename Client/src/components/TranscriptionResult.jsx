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
    } catch (err) {
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
    <section className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Result
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Transcription output
          </h2>
        </div>

        {/* Action buttons */}
        {isUploaded && (
          <div className="flex gap-2">
            {/* Copy button */}
            <div className="relative">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md active:scale-95"
                title="Copy to clipboard"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                Copy
              </button>
              {/* Copied tooltip */}
              {copied && (
                <span className="animate-fadeIn absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white shadow-lg">
                  Copied!
                </span>
              )}
            </div>

            {/* Download button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition-all hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md active:scale-95"
              title="Download as .txt"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              .txt
            </button>
          </div>
        )}
      </div>

      <div className="mt-5 min-h-40 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 p-5 text-sm leading-6 text-slate-600">
        {/* Uploading / transcribing state */}
        {isUploading && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="h-12 w-12 rounded-full border-4 border-indigo-100" />
              <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-indigo-600" />
            </div>
            <p className="mt-4 text-sm font-medium text-indigo-600 animate-pulse">
              Transcribing your audio...
            </p>
            <p className="mt-1 text-xs text-slate-400">
              This may take a moment
            </p>
          </div>
        )}

        {/* Uploaded result */}
        {isUploaded && (
          <div className="animate-fadeIn space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-emerald-700">
                Audio uploaded successfully
              </p>
            </div>

            <dl className="grid gap-4 text-slate-700 sm:grid-cols-2">
              <div className="rounded-lg bg-white/80 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  File
                </dt>
                <dd className="mt-0.5 break-all text-sm">{result.originalFileName}</dd>
              </div>
              <div className="rounded-lg bg-white/80 px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Size
                </dt>
                <dd className="mt-0.5 text-sm">{formatBytes(result.size)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Transcript
                </dt>
                <dd className="mt-2 whitespace-pre-wrap rounded-lg border border-slate-200/60 bg-white p-4 text-sm leading-relaxed text-slate-800 shadow-sm">
                  {result.transcriptionText}
                </dd>
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
