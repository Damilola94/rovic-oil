"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { ChevronDown } from "lucide-react"

interface SalesTrendChartProps {
  trendType: "sales" | "revenue"
  setTrendType: (type: "sales" | "revenue") => void
  trendPeriod: "Weekly" | "Monthly" | "Yearly"
  setTrendPeriod: (period: "Weekly" | "Monthly" | "Yearly") => void
  data?: { day: string; value: number }[]
  isLoading?: boolean
}

export function SalesTrendChart({
  trendType,
  setTrendType,
  trendPeriod,
  setTrendPeriod,
  data = [],
  isLoading = false,
}: SalesTrendChartProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleTimeframeChange = (period: "Weekly" | "Monthly" | "Yearly") => {
    setTrendPeriod(period)
    setShowDropdown(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 w-full relative">
        <div className="flex gap-4 border-b border-slate-200 pb-2 w-full">
          <button
            onClick={() => setTrendType("sales")}
            className={`pb-2 border-b-2 font-medium text-base -mb-2 cursor-pointer transition-colors ${
              trendType === "sales"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-slate-300 hover:text-slate-700"
            }`}
          >
            Sales Trend
          </button>

          <button
            onClick={() => setTrendType("revenue")}
            className={`pb-2 border-b-2 -mb-2 font-medium text-base cursor-pointer transition-colors ${
              trendType === "revenue"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-slate-300 hover:text-slate-700"
            }`}
          >
            Revenue Trend
          </button>
        </div>
      </div>

      <Card className="p-3 rounded-4xl border-0 bg-[#F3F4F6]">
        <Card className="p-4 rounded-4xl border-0 border-slate-200 bg-white">
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-2xl hover:bg-slate-50 transition-colors text-sm"
              >
                {trendPeriod} {trendType === "sales" ? "Sales" : "Revenue"}
                <ChevronDown size={16} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
                  {(["Weekly", "Monthly", "Yearly"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => handleTimeframeChange(period)}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                    >
                      {period} {trendType === "sales" ? "Sales" : "Revenue"}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm text-slate-500">
              {trendPeriod === "Weekly" && "Last 7 days"}
              {trendPeriod === "Monthly" && "Last 30 days"}
              {trendPeriod === "Yearly" && "This Year"}
            </p>
          </div>

          {isLoading ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm">
              Loading {trendType} data...
            </div>
          ) : data.length === 0 ? (
            <div className="h-[300px] flex items-center justify-center text-slate-400 text-sm">
              No {trendType} data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <defs>
                  <linearGradient id="orangeGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#facc15" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="url(#orangeGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </Card>
    </div>
  )
}
