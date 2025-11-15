"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CustomersTable } from "@/components/tables/customers-table"
import { ProspectsTable } from "@/components/tables/prospects-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AlphabetFilter } from "@/components/ui/alphabet-filter"
import useGetQuery from "@/hooks/useGetQuery"
import { Loader2 } from "lucide-react"

export default function CustomersPage() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"customers" | "prospects">("customers")
  const [queryParams, setQueryParams] = useState({
    name: "",
    phone: "",
    phoneNumber: "",
    email: "",
    isActive: null,
    type: null,
    startsWith: selectedLetter || "",
    pageNumber: 1,
    pageSize: 20,
  })

  useEffect(() => {
    setQueryParams((prev) => ({
      ...prev,
      startsWith: selectedLetter || "",
    }))
  }, [activeTab, selectedLetter])

  const { data, status, } = useGetQuery({
    endpoint: "customers",
    pQuery: queryParams,
    queryKey: ["customers", queryParams],
    auth: true,
  })

  const { data: dataProspect, status: prospectiveStatus, } = useGetQuery({
    endpoint: "prospects",
    pQuery: queryParams,
    queryKey: ["prospects", queryParams],
    auth: true,
  })

  const isLoading = status === "loading" || prospectiveStatus === "loading"

  return (
    <DashboardLayout pageTitle="Customers">
      <div className="space-y-6">
        <div className="flex gap-2 justify-end flex-1">
          <Link href="/customers/add-prospect">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 bg-transparent text-accent border-accent"
            >
              <Plus size={20} /> Add Prospect
            </Button>
          </Link>
          <Link href="/customers/add-customer">
            <Button className="gap-2 bg-accent hover:bg-accent/90" size="lg">
              <Plus size={20} /> Add New Customer
            </Button>
          </Link>
        </div>

        <div className="flex bg-white border rounded-lg overflow-hidden p-1 space-x-2 w-fit">
          <Button
            onClick={() => setActiveTab("customers")}
            className={`px-5 py-2 text-sm font-medium rounded-lg     bg-transparent *:transition-colors ${activeTab === "customers"
              ? "bg-accent text-white"
              : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            All Customers
          </Button>
          <Button
            onClick={() => setActiveTab("prospects")}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors     bg-transparent ${activeTab === "prospects"
              ? "bg-accent text-white"
              : "text-slate-700 hover:bg-slate-100"
              }`}
          >
            Prospects
          </Button>
        </div>

        <div className="flex">
          <AlphabetFilter onSelect={setSelectedLetter} />
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-64 text-slate-400">
              <Loader2 className="animate-spin mr-2" /> Loading...
            </div>
          ) : activeTab === "customers" ? (
            <CustomersTable data={data?.items || []} selectedLetter={selectedLetter} />
          ) : (
            <ProspectsTable data={dataProspect?.items || []} selectedLetter={selectedLetter} />
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
