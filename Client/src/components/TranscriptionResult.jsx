function formatBytes(bytes) {
  if (!bytes) return '0 KB'
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function TranscriptionResult({ result, status }) {
  const isUploaded = status === 'uploaded' && result

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
                <dd className="break-all">{result.originalFileName}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-slate-500">Size</dt>
                <dd>{formatBytes(result.size)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase text-slate-500">Transcript</dt>
                <dd className="mt-1 whitespace-pre-wrap rounded-md border border-slate-200 bg-white p-3 text-slate-900">
                  {result.transcriptionText}
                </dd>
              </div>
            </dl>
          </div>
        ) : (
          'Upload an audio file to see its processing status here.'
        )}
      </div>
    </section>
  )
}

export default TranscriptionResult
