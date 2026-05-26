import { sampleTranscriptions } from '../constants/sampleTranscriptions'

function HistoryList() {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">History</p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Recent transcriptions</h2>
        </div>
        <p className="text-sm text-slate-500">MongoDB data will appear here.</p>
      </div>

      <div className="space-y-3">
        {sampleTranscriptions.map((item) => (
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
    </section>
  )
}

export default HistoryList
