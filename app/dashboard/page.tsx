"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { SalesTrendChart } from "@/components/sales-trend-chart"
import { DebtorsTable } from "@/components/tables/debtors-table"

export default function DashboardPage() {
  const [trendType, setTrendType] = useState<"sales" | "revenue">("sales")

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard icon="/svg/people.svg" label="Total Customers Registered" value="24" />
          <StatCard icon="/svg/group.svg" label="Total Diesel Sold (Litres)" value="5,042" badge="This Month" />
          <StatCard icon="/svg/money-receive.svg" label="Total Revenue (₦)" value="2,400,000" badge="This Month" />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SalesTrendChart trendType={trendType} setTrendType={setTrendType} />
          </div>
          <div className="lg:col-span-2">
            <DebtorsTable />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
