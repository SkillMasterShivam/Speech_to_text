function HistoryList({ items }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">History</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Recent transcriptions</h2>
        </div>
        <p className="text-sm text-slate-500">Uploaded files from this session</p>
      </div>

      {items.length > 0 ? (
        <div className="space-y-3">
          {items.map((item) => (
            <article key={item.id} className="rounded-md border border-slate-200 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-semibold text-slate-900">{item.fileName}</h3>
                <span className="text-sm text-slate-500">{item.createdAt}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.preview}</p>
              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {item.status}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
          No uploads yet. Your latest audio files will appear here during this session.
        </div>
      )}
    </section>
  )
}

export default HistoryList
