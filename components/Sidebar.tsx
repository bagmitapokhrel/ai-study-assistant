"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Upload,
  ClipboardList,
  MessageCircle,
  FileText,
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Upload", icon: Upload },
  { href: "/quiz", label: "Quiz", icon: ClipboardList },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/notes", label: "Notes", icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="lg:flex lg:min-h-screen lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white lg:px-6 lg:py-8">
        <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-4 lg:hidden">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              AI Study
            </p>
            <p className="text-lg font-semibold text-slate-900">Assistant</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl border px-3 py-2 text-xs font-medium transition ${
                    isActive
                      ? "bg-slate-950 text-white"
                      : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              AI Study
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-950">
              Assistant
            </h1>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-950 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Study workspace</p>
            <p className="mt-2 leading-6">
              Manage uploads, generate quizzes, chat with notes, and track progress in one place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
