import { CardStat } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"

interface StatCardProps {
  icon: LucideIcon | string
  label: string
  value: string | number
  badge?: string
  badgeDown?: string
  badgeColor?: string
  onClick?: () => void;
}

export function StatCard({ icon, label, value, badge, badgeDown, badgeColor, onClick }: StatCardProps) {
  return (
    <CardStat className="relative flex rounded-2xl border border-[#CCCCCC] bg-white px-3 py-4 justify-between">
      {badge && (
        <span className="absolute top-2 right-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-600 cursor-pointer">
          {badge}
        </span>
      )}

      {badgeDown && (
        <span className={`absolute bottom-2 right-2 rounded-md  cursor-pointer   px-2 py-0.5 text-[10px] font-medium  ${badgeColor ? "text-red-400 border border-red-500" : "text-slate-600 border border-slate-200 bg-slate-50"}`}
          onClick={onClick}>
          {badgeDown}
        </span>
      )}

      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
          <Image
            src={icon as string}
            alt={typeof icon === "string" ? "icon" : "Stat icon"}
            width={20}
            height={20}
          />
        </div>
        <div>
          <p className="text-xs text-[#666666]">{label}</p>
          <p className="text-2xl font-semibold text-black">{value}</p>
        </div>
      </div>
    </CardStat>
  )
}
