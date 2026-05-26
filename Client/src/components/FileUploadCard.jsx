function FileUploadCard() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Upload Audio</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Convert speech into text</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This form is ready for backend integration. On Day 2, it will send audio to the Express API using Multer.
        </p>
      </div>

      <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <input
          className="mx-auto block w-full max-w-sm cursor-pointer rounded-md border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:border-0 file:bg-blue-700 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
          type="file"
          accept="audio/*"
          disabled
        />
        <p className="mt-3 text-xs text-slate-500">Supported later: mp3, wav, m4a, webm</p>
      </div>

      <button
        className="mt-5 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white opacity-60"
        type="button"
        disabled
      >
        Transcribe Audio
      </button>
    </section>
  )
}

export default FileUploadCard
