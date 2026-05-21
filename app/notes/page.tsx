export default function NotesPage() {
  const savedNotes = [
    {
      title: "Biology Notes",
      description: "Summary of cell processes, photosynthesis, and key terminology.",
      updated: "2 hours ago",
    },
    {
      title: "Chemistry Chapter 5",
      description: "Core reactions, periodic trends, and practice questions.",
      updated: "Yesterday",
    },
    {
      title: "World History",
      description: "Timeline of modern civics, revolutions, and study prompts.",
      updated: "3 days ago",
    },
  ]

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Saved notes</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Your study library</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse all uploaded summaries and saved note collections in one clean workspace.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {savedNotes.map((note) => (
          <article key={note.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">{note.title}</h2>
                <p className="mt-3 text-sm text-slate-600">{note.description}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-600">
                {note.updated}
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
