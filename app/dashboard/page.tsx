"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { SalesTrendChart } from "@/components/sales-trend-chart"
import { DebtorsTable } from "@/components/debtors-table"
import { Users, Fuel, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const [trendType, setTrendType] = useState<"sales" | "revenue">("sales")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon={Users} label="Total Customers Registered" value="24" />
          <StatCard icon={Fuel} label="Total Diesel Sold (Litres)" value="5,042" />
          <StatCard icon={TrendingUp} label="Total Revenue (₦)" value="2,400,000" />
        </div>

        {/* Charts and Debtors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales/Revenue Trend Chart */}
          <div className="lg:col-span-2">
            <SalesTrendChart trendType={trendType} setTrendType={setTrendType} />
          </div>

          {/* Debtors Table */}
          <div className="lg:col-span-1">
            <DebtorsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
