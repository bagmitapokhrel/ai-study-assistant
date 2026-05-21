import { Activity, BarChart3, BookOpen, Clock3 } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"

const metrics = [
  {
    title: "Notes Uploaded",
    value: "18",
    detail: "Total study sets uploaded this week.",
    icon: BookOpen,
  },
  {
    title: "Quiz Score",
    value: "92%",
    detail: "Average accuracy across AI-generated quizzes.",
    icon: BarChart3,
  },
  {
    title: "Study Hours",
    value: "26h",
    detail: "Time logged across study sessions.",
    icon: Clock3,
  },
]

const recentActivity = [
  {
    title: "Uploaded Biology Notes.pdf",
    subtitle: "Processed summary and generated flashcards",
    time: "2 hours ago",
  },
  {
    title: "Completed AI chemistry quiz",
    subtitle: "Scored 92% on 8 questions",
    time: "Yesterday",
  },
  {
    title: "Saved lecture note summary",
    subtitle: "Added notes to the study library",
    time: "3 days ago",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-950">Your study dashboard</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Track uploads, quiz progress, and recent activity in one modern workspace.
            </p>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Recent Activity</h2>
              <p className="mt-2 text-sm text-slate-500">Review your latest study actions and note events.</p>
            </div>
            <Activity className="h-6 w-6 text-slate-400" />
          </div>

          <div className="mt-8 space-y-5">
            {recentActivity.map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-3 text-slate-950">
                  <p className="font-semibold">{item.title}</p>
                  <span className="text-sm text-slate-500">{item.time}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Today’s focus</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">Ready to review?</h3>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Study streak</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">7 days</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Notes waiting to review</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">4</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
