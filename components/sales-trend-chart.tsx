"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronDown } from "lucide-react"

const data = [
  { day: "Mon", value: 250 },
  { day: "Tue", value: 100 },
  { day: "Wed", value: 450 },
  { day: "Thu", value: 380 },
  { day: "Fri", value: 200 },
  { day: "Sat", value: 50 },
  { day: "Sun", value: 320 },
]

interface SalesTrendChartProps {
  trendType: "sales" | "revenue"
  setTrendType: (type: "sales" | "revenue") => void
}

export function SalesTrendChart({ trendType, setTrendType }: SalesTrendChartProps) {
  const [timeframe, setTimeframe] = useState("weekly")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <Card className="p-6 rounded-2xl border border-slate-200 shadow-sm bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4">
          <button
            onClick={() => setTrendType("sales")}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              trendType === "sales"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Sales Trend
          </button>
          <button
            onClick={() => setTrendType("revenue")}
            className={`pb-2 border-b-2 font-medium transition-colors ${
              trendType === "revenue"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Revenue Trend
          </button>
        </div>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            {timeframe === "weekly" && "Weekly Sales"}
            {timeframe === "monthly" && "Monthly Sales"}
            {timeframe === "annual" && "Annual Sales"}
            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-10">
              {["weekly", "monthly", "annual"].map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setTimeframe(tf)
                    setShowDropdown(false)
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${
                    tf === "weekly" ? "first:rounded-t-lg" : ""
                  } ${tf === "annual" ? "last:rounded-b-lg" : ""}`}
                >
                  {tf.charAt(0).toUpperCase() + tf.slice(1)} Sales
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-4">Last 90 days (7/15/2025 - 10/12/2025)</p>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
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
          <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
