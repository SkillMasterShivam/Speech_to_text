import FileUploadCard from '../components/FileUploadCard'
import HistoryList from '../components/HistoryList'
import TranscriptionResult from '../components/TranscriptionResult'

function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Core Feature Flow</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-950">
          Upload audio, convert it into readable text, and keep a saved transcription history.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
          Day 1 focuses on a clean React and Tailwind foundation. The backend, database, and real API call will be added step by step.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <FileUploadCard />
        <TranscriptionResult />
      </div>

      <div className="mt-6">
        <HistoryList />
      </div>
    </main>
  )
}

export default Home
