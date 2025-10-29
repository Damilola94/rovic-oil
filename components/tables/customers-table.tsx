"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Link from "next/link"
import { MoreVertical, Edit2, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { customers } from "@/app/constant/data"

export function CustomersTable({ selectedLetter }: { selectedLetter: string | null }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null)

  const itemsPerPage = 10

  const filteredCustomers = useMemo(() => {
    if (!selectedLetter) return customers
    return customers.filter((c) =>
      c.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
    )
  }, [selectedLetter])

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
 const paginatedDebtors = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const handleDeleteClick = (customerId: number) => {
    setSelectedCustomerId(customerId)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    console.log("Deleting customer:", selectedCustomerId)
    setDeleteModalOpen(false)
    setSelectedCustomerId(null)
  }

  return (
    <>
      <Card className="p-0 rounded-4xl pb-10 w-full">
        <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
          <table className="w-full font-light text-sm">
            <thead>
              <tr className="bg-[black] text-white">
                <th className="px-4 py-4 text-left">No</th>
                <th className="px-4 py-4 text-left">Name</th>
                <th className="px-4 py-4 text-left">Type</th>
                <th className="px-4 py-4 text-left">Location</th>
                <th className="px-4 py-4 text-left">Phone Number</th>
                <th className="px-4 py-4 text-left">Current Balance</th>
                <th className="px-4 py-4 text-left">Email Address</th>
                <th className="px-4 py-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedDebtors.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">{customer.id}</td>
                  <td className="px-4 py-4">
                    <Link href={`/customer/${customer.id}`} className="hover:underline">
                      {customer.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{customer.type}</td>
                  <td className="px-4 py-4">{customer.location}</td>
                  <td className="px-4 py-4">{customer.phone}</td>
                  <td
                    className={`px-4 py-4 font-semibold ${customer.balance.includes("-")
                        ? "text-red-500"
                        : customer.balance === "N/A"
                          ? "text-slate-500"
                          : "text-green-500"
                      }`}
                  >
                    {customer.balance}
                  </td>
                  <td className="px-4 py-4 text-slate-600">{customer.email}</td>
                  <td className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                          <MoreVertical size={18} className="text-slate-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem asChild>
                          <Link href={`/customers/${customer.id}/edit`}>
                            <div className="flex items-center gap-2">
                              <Edit2 size={14} /> Edit
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteClick(customer.id)}
                          className="text-red-600 focus:text-red-700"
                        >
                          <Trash2 size={14} /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}

              {paginatedDebtors.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                    No debtors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </Card>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
