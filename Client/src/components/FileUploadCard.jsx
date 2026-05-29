import { useState, useRef } from 'react'

const acceptedAudioTypes = '.mp3,.wav,.m4a'

function formatFileSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function FileUploadCard({ error, onFileChange, onUpload, selectedFile, status }) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef(null)
  const isUploading = status === 'uploading'
  const canUpload = Boolean(selectedFile) && !isUploading

  const handleChange = (event) => {
    onFileChange(event.target.files?.[0] || null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    const file = e.dataTransfer.files?.[0]
    if (file) {
      onFileChange(file)
    }
  }

  return (
    <section className="group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">
      {/* Top gradient accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Upload Audio
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          Convert speech into text
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Select an audio file and upload it to the secure processing queue.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300
          ${
            dragActive
              ? 'border-indigo-400 bg-indigo-50/60 shadow-inner'
              : 'border-slate-300/80 bg-slate-50/50 hover:border-indigo-300 hover:bg-indigo-50/30'
          }
        `}
      >
        {/* Cloud upload icon */}
        <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${dragActive ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
          </svg>
        </div>

        <p className="text-sm font-medium text-slate-700">
          {dragActive ? (
            <span className="text-indigo-600">Drop your file here</span>
          ) : (
            <>
              <span className="text-indigo-600 underline decoration-indigo-300 underline-offset-2">
                Click to browse
              </span>{' '}
              or drag & drop
            </>
          )}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Supported: MP3, WAV, M4A &bull; Max 25 MB
        </p>

        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept={acceptedAudioTypes}
          onChange={handleChange}
        />
      </div>

      {/* Selected file preview */}
      {selectedFile && (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-indigo-50/60 px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
            <svg className="h-4 w-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-800">{selectedFile.name}</p>
            <p className="text-xs text-slate-500">{formatFileSize(selectedFile.size)}</p>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200/60 bg-red-50 px-4 py-3">
          <svg className="h-4 w-4 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Upload button */}
      <button
        className={`
          mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300
          ${
            canUpload
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-500/25 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98]'
              : 'cursor-not-allowed bg-slate-300 shadow-none'
          }
        `}
        type="button"
        disabled={!canUpload}
        onClick={onUpload}
      >
        {isUploading ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading...
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" x2="12" y1="3" y2="15" />
            </svg>
            Upload Audio
          </>
        )}
      </button>
    </section>
  )
}

export default FileUploadCard
