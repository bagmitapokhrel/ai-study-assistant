import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  detail: string
  icon: LucideIcon
}

export function MetricCard({ title, value, detail, icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-500">{detail}</p>
    </div>
  )
}
