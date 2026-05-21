"use client"

import { useState } from "react"
import { CheckCircle2, Sparkles, Trophy } from "lucide-react"

const questions = [
  {
    id: "q1",
    prompt: "What is the main purpose of photosynthesis?",
    options: [
      { label: "Convert sunlight into chemical energy", correct: true },
      { label: "Break down nutrients for respiration", correct: false },
      { label: "Store oxygen in plant roots", correct: false },
    ],
  },
  {
    id: "q2",
    prompt: "Which element is essential for strong bones?",
    options: [
      { label: "Calcium", correct: true },
      { label: "Sodium", correct: false },
      { label: "Chlorine", correct: false },
    ],
  },
]

export default function QuizPage() {
  const [selected, setSelected] = useState<Record<string, string>>({})

  const score = questions.reduce((count, question) => {
    const answer = selected[question.id]
    return count + (question.options.find((option) => option.label === answer)?.correct ? 1 : 0)
  }, 0)

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">AI Quiz</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Interactive study quiz</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Test your comprehension with generated multiple-choice questions from your study materials.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-50 px-5 py-4 text-slate-950 shadow-sm">
            <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-slate-500">
              <Sparkles className="h-4 w-4" />
              Current score
            </div>
            <p className="mt-3 text-3xl font-semibold">{score}/{questions.length}</p>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        {questions.map((question, index) => (
          <div key={question.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Question {index + 1}</p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">{question.prompt}</h2>
              </div>
              {selected[question.id] ? (
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-2 text-sm font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Answered
                </div>
              ) : null}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {question.options.map((option) => {
                const isSelected = selected[question.id] === option.label
                const highlight = isSelected ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white text-slate-700"

                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelected((current) => ({ ...current, [question.id]: option.label }))}
                    className={`rounded-3xl border px-4 py-4 text-left transition ${highlight} hover:border-slate-900 hover:bg-slate-100`}
                  >
                    <p className="font-medium">{option.label}</p>
                    {isSelected ? (
                      <p className="mt-2 text-sm text-slate-200">
                        {option.correct ? "Correct answer" : "Try another option"}
                      </p>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </section>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4 text-slate-700">
          <Trophy className="h-5 w-5 text-amber-500" />
          <p className="text-sm">Keep going—answer more questions to boost your study momentum.</p>
        </div>
      </div>
    </div>
  )
}
