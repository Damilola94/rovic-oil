"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatCard } from "@/components/stat-card"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlphabetFilter } from "@/components/ui/alphabet-filter"
import { InventoryTable } from "@/components/tables/inventory-table"
import { RefillStockModal } from "@/components/modals/refill-stock-modal"

export default function InventoryPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [isRefillModalOpen, setIsRefillModalOpen] = useState(false)

  const handleRefillStock = (amount: string) => {
    console.log("Stock refilled with amount:", amount)
    setIsRefillModalOpen(false)
  }

  return (
    <DashboardLayout pageTitle="Inventory">
      <div className="space-y-6">
        <div className="flex items-center justify-end">
          <Link
            href="/inventory/add-transaction"
          >
            <Button className="gap-2 bg-accent hover:bg-accent/90" size="lg">
              <Plus size={20} />
              Add New Transaction
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon="/svg/people.svg"
            label="Diesel Quantity Remaining (Litres)"
            value="240,450"
            badgeDown="Restock Soon"
            badgeColor="text-red-600"
            onClick={() => setIsRefillModalOpen(!isRefillModalOpen)}
          />
          <StatCard icon="/svg/truck.svg" label="Total Diesel Sold (Litres)" value="5,042" badge="This Month" />
          <StatCard icon="/svg/money-receive.svg" label="Total Revenue (₦)" value="2,400,000" badge="This Month" />
        </div>
        <div className="flex mt-10">
          <AlphabetFilter onSelect={setSelectedLetter} className="mt-28" />
          <InventoryTable selectedLetter={selectedLetter} />
        </div>
        <RefillStockModal
          isOpen={isRefillModalOpen}
          onClose={() => setIsRefillModalOpen(!isRefillModalOpen)}
          onConfirm={handleRefillStock}
        />
      </div>
    </DashboardLayout>
  )
}
