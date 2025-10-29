"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { debtorsData } from "../constant/data"
import Image from "next/image"
import { AlphabetFilter } from "@/components/ui/alphabet-filter"
import { FinanceDebtorsTable } from "@/components/tables/finance-table"

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  
  const filteredDebtors = useMemo(() => {
    let filtered = debtorsData

    if (searchTerm) {
      filtered = filtered.filter(
        (debtor) =>
          debtor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          debtor.affiliation.toLowerCase().includes(searchTerm.toLowerCase()) ||
          debtor.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterType === "affiliation") {
      filtered = filtered.filter((d) => d.affiliation === "Chicken Republic")
    } else if (filterType === "balance") {
      filtered = filtered.sort((a, b) => a.currentBalance - b.currentBalance)
    } else if (filterType === "sales") {
      filtered = filtered.sort((a, b) => Math.abs(b.currentBalance) - Math.abs(a.currentBalance))
    }

    return filtered
  }, [searchTerm, filterType])

  const totalDebit = filteredDebtors.reduce((sum, d) => sum + Math.abs(d.currentBalance), 0)

  return (
    <DashboardLayout pageTitle="Finance">
      <div className="mt-5 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="ml-10 text-xl font-bold text-foreground">Debtors</h2>
              {filterType && (
                <div className="text-sm text-muted-foreground">
                  Total Debit: <span className="font-semibold text-foreground">₦{totalDebit.toLocaleString()}</span>
                </div>
              )}
              {filterType === "affiliation" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-sm text-red-600">
                  <span>Online Debtors</span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                    <Image
                      src="/svg/filter.svg"
                      alt="Rovic Oil & Gas Logo"
                      width={14} height={14}
                    />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterType("affiliation")
                      setCurrentPage(1)
                    }}
                  >
                    By Affiliation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterType("balance")
                      setCurrentPage(1)
                    }}
                  >
                    Debt Balance
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterType("sales")
                      setCurrentPage(1)
                    }}
                  >
                    Annual Sales
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setFilterType(null)
                      setCurrentPage(1)
                    }}
                  >
                    Clear Filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Image
                  src="/svg/export.svg"
                  alt="Rovic Oil & Gas Logo"
                  width={14} height={14}

                />
                Export
              </Button>
            </div>
          </div>
          <div className="flex">
            <AlphabetFilter onSelect={setSelectedLetter} />
            <FinanceDebtorsTable selectedLetter={selectedLetter} />

          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}
