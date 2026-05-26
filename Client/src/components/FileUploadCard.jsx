const acceptedAudioTypes = '.mp3,.wav,.m4a'

function FileUploadCard({ error, onFileChange, onUpload, selectedFile, status }) {
  const isUploading = status === 'uploading'
  const canUpload = Boolean(selectedFile) && !isUploading

  const handleChange = (event) => {
    onFileChange(event.target.files?.[0] || null)
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Upload Audio</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Convert speech into text</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Select an audio file and upload it to the secure processing queue.
        </p>
      </div>

      <label className="block rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-blue-300 hover:bg-blue-50/40">
        <input
          className="mx-auto block w-full max-w-sm cursor-pointer rounded-md border border-slate-300 bg-white text-sm text-slate-700 file:mr-4 file:border-0 file:bg-blue-700 file:px-4 file:py-3 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-800"
          type="file"
          accept={acceptedAudioTypes}
          onChange={handleChange}
        />
        <p className="mt-3 text-xs text-slate-500">Supported formats: mp3, wav, m4a. Maximum size: 25MB.</p>
        {selectedFile ? (
          <p className="mt-3 break-all text-sm font-medium text-slate-800">{selectedFile.name}</p>
        ) : null}
      </label>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        className="mt-5 w-full rounded-md bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        type="button"
        disabled={!canUpload}
        onClick={onUpload}
      >
        {isUploading ? 'Uploading...' : 'Upload Audio'}
      </button>
    </section>
  )
}

export default FileUploadCard
