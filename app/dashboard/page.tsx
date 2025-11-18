"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { SalesTrendChart } from "@/components/sales-trend-chart"
import { DebtorsTable } from "@/components/tables/debtors-table"
import useGetQuery from "@/hooks/useGetQuery"
import { Loader2 } from "lucide-react"
import { formatAmount } from "@/lib/utils"
interface TrendItem {
  label: string
  litresSold: number
  revenue: number
}

export default function DashboardPage() {
  const [trendType, setTrendType] = useState<"sales" | "revenue">("sales")
  const [metricsPeriod, setMetricsPeriod] = useState<"ThisWeek" | "ThisMonth" | "ThisYear">("ThisYear")
  const [trendPeriod, setTrendPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Yearly")

  const {
    data: metricsData,
    status: metricsStatus,
  } = useGetQuery({
    endpoint: "dashboard",
    extra: "metrics",
    pQuery: { period: metricsPeriod },
    queryKey: ["dashboard-metrics", metricsPeriod],
    auth: true,
  })

  const {
    data: salesTrendData,
    status: salesTrendStatus,
  } = useGetQuery({
    endpoint: "dashboard/sales-trend",
    pQuery: { period: trendPeriod },
    queryKey: ["sales-trend", trendPeriod],
    auth: true,
  })

  const {
    data: revenueTrendData,
    status: revenueTrendStatus,
  } = useGetQuery({
    endpoint: "dashboard/revenue-trend",
    pQuery: { period: trendPeriod },
    queryKey: ["revenue-trend", trendPeriod],
    auth: true,
  })

  const {
    data: debtorsData,
    status: debtorsStatus,
  } = useGetQuery({
    endpoint: "transactions/debtors",
    pQuery: { pageNumber: 1, pageSize: 10, sortDescendin: false, groupByParent: false },
    queryKey: ["debtors"],
    auth: true,
  })

  const isLoading =
    metricsStatus === "loading" ||
    salesTrendStatus === "loading" ||
    revenueTrendStatus === "loading"

  const metrics = metricsData || {
    totalCustomersRegistered: 0,
    totalLitresSold: 0,
    totalRevenue: 0,
  }

  const convertedSalesData = Array.isArray(salesTrendData)
    ? (salesTrendData as TrendItem[]).map(item => ({
      day: item.label,
      value: item.litresSold
    }))
    : Object.values(salesTrendData || [])
      .filter((x): x is TrendItem => typeof x === "object" && x !== null)
      .map(item => ({
        day: item.label,
        value: item.litresSold
      })) || []

  const convertedRevenueData = Array.isArray(revenueTrendData)
    ? (revenueTrendData as TrendItem[]).map(item => ({
      day: item.label,
      value: item.revenue
    }))
    : Object.values(revenueTrendData || [])
      .filter((x): x is TrendItem => typeof x === "object" && x !== null)
      .map(item => ({
        day: item.label,
        value: item.revenue
      })) || []

console.log(convertedRevenueData, "convertedRevenueData",revenueTrendData);


  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon="/svg/people.svg"
            label="Total Customers Registered"
            value={
              isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : metrics.totalCustomersRegistered || "0"
            }
          />
          <StatCard
            icon="/svg/group.svg"
            label="Total Diesel Sold (Ltr.)"
            value={
              isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : formatAmount(metrics.totalLitresSold, "") || "0"
            }
            badge={metricsPeriod === "ThisWeek" ? "This Week" : metricsPeriod === "ThisMonth" ? "This Month" : "This Year"}
            badgeOptions={["This Week", "This Month", "This Year"]}
            onBadgeChange={(selected) => {
              const period = selected.replace(" ", "") as "ThisWeek" | "ThisMonth" | "ThisYear"
              setMetricsPeriod(period)
            }}
          />
          <StatCard
            icon="/svg/money-receive.svg"
            label="Total Revenue (₦)"
            value={
              isLoading
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : formatAmount(metrics.totalRevenue)
            }
            badge={metricsPeriod === "ThisWeek" ? "This Week" : metricsPeriod === "ThisMonth" ? "This Month" : "This Year"}
            badgeOptions={["This Week", "This Month", "This Year"]}
            onBadgeChange={(selected) => {
              const period = selected.replace(" ", "") as "ThisWeek" | "ThisMonth" | "ThisYear"
              setMetricsPeriod(period)
            }}
          />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <SalesTrendChart
              trendType={trendType}
              setTrendType={setTrendType}
              trendPeriod={trendPeriod}
              setTrendPeriod={setTrendPeriod}
              data={
                trendType === "sales"
                  ? convertedSalesData || []
                  : convertedRevenueData || []
              }
              isLoading={
                trendType === "sales"
                  ? salesTrendStatus === "loading"
                  : revenueTrendStatus === "loading"
              }
            />
          </div>

          <div className="lg:col-span-2">
            <DebtorsTable data={debtorsData?.items || []} isLoading={debtorsStatus === "loading"} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
