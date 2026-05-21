import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-sm">
              Modern study workspace
            </div>
            <div className="space-y-6">
              <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                AI Study Assistant for smarter learning.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Upload notes, generate quizzes, chat with your content, and track study progress in a polished SaaS experience.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/upload"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-4 text-sm font-semibold text-slate-950 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Upload notes
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3 text-slate-700">
              <Zap className="h-5 w-5 text-slate-900" />
              <p className="text-sm font-semibold uppercase tracking-[0.3em]">Study features</p>
            </div>
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Upload PDFs</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">Smart note extraction with AI metadata</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Generate quizzes</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">Interactive MCQs based on your course material</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Chat with notes</p>
                <p className="mt-3 text-lg font-semibold text-slate-950">Ask questions, summarize topics, and review concepts instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
