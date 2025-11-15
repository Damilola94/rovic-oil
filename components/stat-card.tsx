"use client"

import { CardStat } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon | string
  label: string
  value: number | undefined | string | React.ReactNode
  badge?: string
  badgeDown?: string
  badgeOptions?: string[]
  badgeColor?: string
  onClick?: () => void
  onBadgeChange?: (selected: string) => void
}

export function StatCard({
  icon,
  label,
  value,
  badge,
  badgeDown,
  onClick,
  badgeOptions = ["This Week", "This Month", "This Year"],
  badgeColor,
  onBadgeChange,
}: StatCardProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedBadge, setSelectedBadge] = useState(badge || badgeOptions[0])

  const handleSelect = (option: string) => {
    setSelectedBadge(option)
    setShowDropdown(false)
    onBadgeChange?.(option)
  }

  return (
    <CardStat className="relative flex rounded-2xl border border-[#CCCCCC] bg-white px-3 py-4 justify-between">
      {badge && <div className="absolute right-2">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`flex items-center gap-1 px-1 py-0.5 rounded-md text-[10px] font-medium cursor-pointer border ${badgeColor ? "text-red-400 border-red-500" : "text-slate-600 border-slate-200 bg-slate-50"
            }`}
        >
          {selectedBadge}
          <ChevronDown size={12} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
            {badgeOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-2 text-xs cursor-pointer hover:bg-slate-50"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>}
      {badgeDown && (<span className={`absolute bottom-2 right-2 rounded-md cursor-pointer px-1 py-0.5 text-[8px] font-medium ${badgeColor ? "text-red-400 border border-red-500" : "text-slate-600 border border-slate-200 bg-slate-50"}`} onClick={onClick}> {badgeDown} </span>)}
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
