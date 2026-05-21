export default function UploadPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Document upload</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950">Upload your study notes</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Drop PDFs directly into the workspace to generate summaries, quizzes, and smart note cards.
          </p>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.45fr_0.85fr]">
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm transition hover:border-slate-400">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-4xl">📄</div>
          <h2 className="mt-8 text-2xl font-semibold text-slate-950">Drag & drop your PDFs</h2>
          <p className="mt-3 text-slate-600">
            Upload textbooks, lecture slides, or study notes and let the assistant prepare summaries and quizzes.
          </p>
          <button className="mt-8 inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
            Choose files
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Upload tips</p>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li className="rounded-3xl bg-slate-50 p-4">Upload clear PDF notes for better AI parsing.</li>
            <li className="rounded-3xl bg-slate-50 p-4">Use individual documents per subject for faster search.</li>
            <li className="rounded-3xl bg-slate-50 p-4">Process one file at a time for best extraction accuracy.</li>
          </ul>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-950">Uploaded files</h2>
            <p className="mt-2 text-sm text-slate-500">Your latest documents are ready to review.</p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-600">4 files</span>
        </div>

        <div className="mt-8 space-y-4">
          {[
            { name: "Biology Notes.pdf", status: "Processed" },
            { name: "Chemistry Chapter 5.pdf", status: "Ready" },
            { name: "World History.pdf", status: "Processing" },
          ].map((file) => (
            <div key={file.name} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
              <div>
                <p className="font-semibold text-slate-950">{file.name}</p>
                <p className="text-sm text-slate-500">PDF · 2.1 MB</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                file.status === "Processed"
                  ? "bg-emerald-100 text-emerald-700"
                  : file.status === "Ready"
                  ? "bg-slate-100 text-slate-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {file.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
