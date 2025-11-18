"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlphabetFilter } from "@/components/ui/alphabet-filter"
import { InventoryTable } from "@/components/tables/inventory-table"
import { RefillStockModal } from "@/components/modals/refill-stock-modal"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation, useQueryClient } from "react-query"
import handleFetch from "@/services/api/handleFetch"
import { toast } from "react-toastify"
import { formatAmount } from "@/lib/utils"

export default function InventoryPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false)
  const [metricsPeriod, setMetricsPeriod] = useState<"ThisWeek" | "ThisMonth" | "ThisYear">("ThisWeek")
  const queryClient = useQueryClient()

  const { data: stockData, status: stockStatus } = useGetQuery({
    endpoint: "stock",
    extra: "current",
    pQuery: { period: metricsPeriod },
    queryKey: ["stock-metrics", metricsPeriod],
    auth: true,
  })

  const { data: inventoryData, status: inventoryStatus } = useGetQuery({
    endpoint: "transactions",
    pQuery: {
      startsWith: selectedLetter || "",
      pageNumber: 1,
      pageSize: 20,
    },
    queryKey: ["inventory", selectedLetter],
    auth: true,
  })

  const dieselRemaining = stockData?.currentQuantityLitres ?? "0"
  const dieselSold = stockData?.totalSoldLitres ?? "0"
  const totalAddedLitres = stockData?.totalAddedLitres ?? "0"

  const refillStockMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Stock refilled successfully")
      setIsRefillModalOpen(false)
      queryClient.invalidateQueries(["stock-metrics", metricsPeriod])
      queryClient.invalidateQueries(["inventory", selectedLetter])
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to refill stock, please try again.")
    },
  })

  const handleRefillStock = (amount: string) => {
    const convtQuantity = parseFloat(amount.replace(/,/g, ""));
    const quantity = Number(convtQuantity)

    if (!quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity")
      return
    }

    refillStockMutation.mutate({
      endpoint: "stock",
      extra: "add",
      method: "POST",
      body: {
        quantityLitres: quantity,
        notes: "Stock refilled",
      },
      auth: true,
    })
  }

  return (
    <DashboardLayout pageTitle="Inventory">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Link href="/inventory/add-transaction">
            <Button className="gap-2 bg-accent hover:bg-accent/90" size="lg">
              <Plus size={20} />
              Add New Transaction
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon="/svg/people.svg"
            label="Total Diesel Quantity Added (Ltr.)"
            value={
              stockStatus === "loading"
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : formatAmount(totalAddedLitres, "") || "0"
            }
            badgeDown="Restock Soon"
            badgeColor="text-red-600"
            onClick={() => setIsRefillModalOpen(true)}
          />
          <StatCard
            icon="/svg/truck.svg"
            label="Total Diesel Sold (Ltr.)"
            value={
              stockStatus === "loading"
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : dieselSold || "0"
            }
            badge={
              metricsPeriod === "ThisWeek"
                ? "This Week"
                : metricsPeriod === "ThisMonth"
                  ? "This Month"
                  : "This Year"
            }
            badgeOptions={["This Week", "This Month", "This Year"]}
            onBadgeChange={(selected) => {
              const period = selected.replace(" ", "") as
                | "ThisWeek"
                | "ThisMonth"
                | "ThisYear"
              setMetricsPeriod(period)
            }}
          />
          <StatCard
            icon="/svg/money-receive.svg"
            label="Total Diesel Left (Ltr.)"
            value={
              stockStatus === "loading"
                ? <Loader2 className="h-5 w-5 animate-spin" />
                : formatAmount(dieselRemaining, "") || "0"
            }
            badge={
              metricsPeriod === "ThisWeek"
                ? "This Week"
                : metricsPeriod === "ThisMonth"
                  ? "This Month"
                  : "This Year"
            }
            badgeOptions={["This Week", "This Month", "This Year"]}
            onBadgeChange={(selected) => {
              const period = selected.replace(" ", "") as
                | "ThisWeek"
                | "ThisMonth"
                | "ThisYear"
              setMetricsPeriod(period)
            }}
          />
        </div>

        <div className="flex mt-10">
          <AlphabetFilter
            onSelect={setSelectedLetter}
            className="mt-28"
          />
          <InventoryTable
            selectedLetter={selectedLetter}
            data={inventoryData?.items ?? []}
            isLoading={inventoryStatus === "loading"}
          />
        </div>

        <RefillStockModal
          isOpen={isRefillModalOpen}
          onClose={() => setIsRefillModalOpen(false)}
          onConfirm={handleRefillStock}
          isLoading={refillStockMutation.isLoading}
        />
      </div>
    </DashboardLayout>
  )
}
