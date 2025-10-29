"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChevronDown } from "lucide-react"
import { dashboardmetrics } from "@/app/constant/data"

interface SalesTrendChartProps {
  trendType: "sales" | "revenue"
  setTrendType: (type: "sales" | "revenue") => void
}

export function SalesTrendChart({ trendType, setTrendType }: SalesTrendChartProps) {
  const [timeframe, setTimeframe] = useState("weekly")
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-4 w-full relative">
        <div className="flex gap-4 border-b border-slate-200 pb-2 w-full">
          <button
            onClick={() => setTrendType("sales")}
            className={`pb-2 border-b-2 font-medium text-base -mb-2 cursor-pointer transition-colors ${trendType === "sales"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-slate-300 hover:text-slate-700"
              }`}
          >
            Sales Trend
          </button>
          <button
            onClick={() => setTrendType("revenue")}
            className={`pb-2 border-b-2 -mb-2 font-medium text-base cursor-pointer transition-colors ${trendType === "revenue"
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
          <div className="flex justify-between items-center">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-2xl hover:bg-slate-50 transition-colors text-sm"
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
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${tf === "weekly" ? "first:rounded-t-lg" : ""
                        } ${tf === "annual" ? "last:rounded-b-lg" : ""}`}
                    >
                      {tf.charAt(0).toUpperCase() + tf.slice(1)} Sales
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500">Last 90 days (7/15/2025 - 10/12/2025)</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardmetrics}>
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
        </Card>
      </Card>
    </div>
  )
}
