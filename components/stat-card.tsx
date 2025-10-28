import { Card } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string
  badge?: string
  badgeColor?: "red" | "green" | "blue" | "yellow"
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 mb-2">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className="p-3 bg-slate-100 rounded-lg">
          <Icon size={24} className="text-slate-600" />
        </div>
      </div>
    </Card>
  )
}
