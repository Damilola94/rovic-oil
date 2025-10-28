"use client"

import { useState, useMemo } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, Download, MoreVertical, Send } from "lucide-react"

interface Debtor {
  id: number
  name: string
  affiliation: string
  location: string
  currentBalance: number
  dueDate: string
}

const debtorsData: Debtor[] = [
  {
    id: 1,
    name: "David Abiola",
    affiliation: "Wema Bank",
    location: "Abuja",
    currentBalance: -100000,
    dueDate: "2025-10-12",
  },
  {
    id: 2,
    name: "Bokku Mart",
    affiliation: "Dangote",
    location: "Lagos",
    currentBalance: -90000,
    dueDate: "2025-10-13",
  },
  {
    id: 3,
    name: "Gadget Hub",
    affiliation: "Dangote",
    location: "Kaduna",
    currentBalance: -80000,
    dueDate: "2025-10-14",
  },
  {
    id: 4,
    name: "Crafted Creations",
    affiliation: "MTN Nigeria",
    location: "Ibadan",
    currentBalance: -70000,
    dueDate: "2025-10-17",
  },
  {
    id: 5,
    name: "Urban Threads",
    affiliation: "Chicken Republic",
    location: "Onitsha",
    currentBalance: -60000,
    dueDate: "2025-10-18",
  },
  {
    id: 6,
    name: "Techno Corner",
    affiliation: "SLOT",
    location: "Port Harcourt",
    currentBalance: -30000,
    dueDate: "2025-10-18",
  },
  {
    id: 7,
    name: "Green Leaf Grocer",
    affiliation: "SLOT",
    location: "Calabar",
    currentBalance: -20000,
    dueDate: "2025-10-18",
  },
  {
    id: 8,
    name: "Pet Paradise",
    affiliation: "MTN Nigeria",
    location: "Calabar",
    currentBalance: -10000,
    dueDate: "2025-10-18",
  },
  {
    id: 9,
    name: "Book Haven",
    affiliation: "Chicken Republic",
    location: "Calabar",
    currentBalance: -100000,
    dueDate: "2025-10-18",
  },
  {
    id: 10,
    name: "The Coffee Spot",
    affiliation: "MTN Nigeria",
    location: "Calabar",
    currentBalance: -100000,
    dueDate: "2025-10-18",
  },
  {
    id: 11,
    name: "Chic Boutique",
    affiliation: "Chicken Republic",
    location: "Calabar",
    currentBalance: -150000,
    dueDate: "2025-10-18",
  },
  {
    id: 12,
    name: "Sporting Goods Central",
    affiliation: "MTN Nigeria",
    location: "Calabar",
    currentBalance: -100000,
    dueDate: "2025-10-18",
  },
  {
    id: 13,
    name: "Home Essentials",
    affiliation: "SLOT",
    location: "Calabar",
    currentBalance: -48000,
    dueDate: "2025-10-18",
  },
  {
    id: 14,
    name: "Beauty Bar",
    affiliation: "Chicken Republic",
    location: "Calabar",
    currentBalance: -100000,
    dueDate: "2025-10-18",
  },
  {
    id: 15,
    name: "2025-10-12",
    affiliation: "SLOT",
    location: "Calabar",
    currentBalance: -100000,
    dueDate: "2025-10-18",
  },
]

export default function FinancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

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

  const totalPages = Math.ceil(filteredDebtors.length / itemsPerPage)
  const paginatedDebtors = filteredDebtors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalDebit = filteredDebtors.reduce((sum, d) => sum + Math.abs(d.currentBalance), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Finance</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
          </div>
        </div>

        {/* Debtors Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-foreground">Debtors</h2>
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
                    <Filter className="h-4 w-4" />
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
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Affiliation</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Location</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Current Balance</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Due Date</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedDebtors.map((debtor, index) => (
                  <tr key={debtor.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm text-foreground">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{debtor.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{debtor.affiliation}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{debtor.location}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{debtor.currentBalance.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{debtor.dueDate}</td>
                    <td className="px-6 py-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted">
                            <MoreVertical className="h-4 w-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <Send className="h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {paginatedDebtors.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredDebtors.length)} of {filteredDebtors.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              {totalPages > 5 && <span className="text-sm text-muted-foreground">...</span>}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
