function TranscriptionResult() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Result</p>
      <h2 className="mt-2 text-2xl font-bold text-slate-950">Transcription output</h2>
      <div className="mt-5 min-h-40 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        Your converted text will appear here after the backend and speech-to-text API are connected.
      </div>
    </section>
  )
}

export default TranscriptionResult
