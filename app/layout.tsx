import "./globals.css"
import type { Metadata } from "next"
import Sidebar from "@/components/Sidebar"

export const metadata: Metadata = {
  title: "AI Study Assistant",
  description: "Modern AI study assistant for notes, quizzes, chat, and progress tracking.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-slate-50 text-slate-950">
        <div className="flex min-h-screen">
          <Sidebar />

          <main className="flex-1 p-6 sm:p-8 lg:p-10">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
