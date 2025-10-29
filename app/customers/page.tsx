"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CustomersTable } from "@/components/tables/customers-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AlphabetFilter } from "@/components/ui/alphabet-filter"

import { ProspectsTable } from "@/components/tables/prospects-table"

export default function CustomersPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"customers" | "prospects">("customers")

  return (
    <DashboardLayout pageTitle="Customers">
      <div className="space-y-6 ">
        <div className="flex gap-2 justify-end flex-1">
          <Link href="/customers/add-prospect">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent text-accent border-accent"
            >
              <Plus size={20} />
              Add Prospect
            </Button>
          </Link>
          <Link href="/customers/add">
            <Button className="gap-2 bg-accent hover:bg-accent/90" size="lg">
              <Plus size={20} />
              Add New Customer
            </Button>
          </Link>
        </div>
        <div className="flex bg-white border rounded-lg overflow-hidden p-1 space-x-2 w-fit">
          <Button
            onClick={() => setActiveTab("customers")}
            className={`px-5 py-2 text-sm font-medium rounded-lg bg-transparent transition-colors ${activeTab === "customers"
              ? "bg-accent text-white"
              : "text-slate-700 hover:bg-slate-100"
              }`} >
            All Customers
          </Button>
          <Button
            onClick={() => setActiveTab("prospects")} className={`px-5 py-2 text-sm font-medium rounded-lg bg-transparent transition-colors ${activeTab === "prospects"
              ? "bg-accent text-white"
              : "text-slate-700 hover:bg-slate-100"
              }`} >
            Prospects
          </Button>
        </div>

        <div className="flex">
          <AlphabetFilter onSelect={setSelectedLetter} />
          {activeTab === "customers" ? (
            <CustomersTable selectedLetter={selectedLetter} />
          ) : (
            <ProspectsTable selectedLetter={selectedLetter} />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
