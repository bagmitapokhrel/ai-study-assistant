"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"

const initialMessages = [
  {
    sender: "assistant",
    text: "Ask me anything about your uploaded notes. I can summarize, explain, and quiz you.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSend = () => {
    if (!inputValue.trim()) return

    setMessages((current) => [
      ...current,
      { sender: "user", text: inputValue.trim() },
      { sender: "assistant", text: "I’m reviewing your notes and will answer with a concise summary shortly." },
    ])
    setInputValue("")
  }

  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Chat with notes</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Ask your study material</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Get instant answers from your uploaded notes and keep the conversation going.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
            <Sparkles className="h-4 w-4" />
            Note-aware AI
          </div>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={`${message.sender}-${index}`}
                className={`rounded-3xl px-5 py-4 ${
                  message.sender === "user"
                    ? "self-end bg-slate-950 text-white"
                    : "bg-slate-50 text-slate-700"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  {message.sender === "user" ? "You" : "Assistant"}
                </p>
                <p className="mt-2 leading-7">{message.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <textarea
              rows={3}
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="min-h-[120px] resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-950 focus:border-slate-900 focus:outline-none"
              placeholder="Ask something about your latest notes..."
            />
            <button
              type="button"
              onClick={handleSend}
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Send message
            </button>
          </div>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Notes context</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Recent uploads</h2>
          <p className="mt-4 text-slate-600">
            Your uploaded documents are ready to be queried. Ask for summaries, quizzes, or topic explanations.
          </p>

          <div className="mt-6 space-y-3">
            {[
              "Biology Notes.pdf",
              "Chemistry Chapter 5.pdf",
              "World History.pdf",
            ].map((file) => (
              <div key={file} className="rounded-3xl bg-slate-50 px-4 py-3 text-slate-700">
                {file}
              </div>
            ))}
          </div>
        </aside>
      </section>
    </div>
  )
}
