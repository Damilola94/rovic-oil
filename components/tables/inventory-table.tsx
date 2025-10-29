"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Link from "next/link"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { transactions } from "@/app/constant/data"

export function InventoryTable({ selectedLetter }: { selectedLetter: string | null }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null)

  const itemsPerPage = 10
  const totalPages = Math.ceil(transactions.length / itemsPerPage)

  const filteredCustomers = useMemo(() => {
      if (!selectedLetter) return transactions
      return transactions.filter((c) =>
        c.customerName.toLowerCase().startsWith(selectedLetter.toLowerCase())
      )
    }, [selectedLetter])

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredCustomers.slice(start, start + itemsPerPage)
  }, [filteredCustomers, currentPage])

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
      <Card className="p-0 rounded-4xl pb-10 w-full">
        <div className="flex-1 overflow-x-auto rounded-t-4xl bg-white">
          <table className="w-full font-light text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="px-4 py-4 text-left">Date Added</th>
                <th className="px-4 py-4 text-left">Customer’s Name</th>
                <th className="px-4 py-4 text-left">Location</th>
                <th className="px-4 py-4 text-left">Quantity (Litres)</th>
                <th className="px-4 py-4 text-left">Price / Ltr</th>
                <th className="px-4 py-4 text-left">Total Amount</th>
                <th className="px-4 py-4 text-left">Current Balance</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <td className="px-4 py-4">{transaction.dateAdded}</td>
                  <td className="px-4 py-4">
                    <Link href={`/customer/${transaction.id}`} className="hover:underline">
                      {transaction.customerName}
                    </Link>
                  </td>
                  <td className="px-4 py-4">{transaction.location}</td>
                  <td className="px-4 py-4">{transaction.quantity}</td>
                  <td className="px-4 py-4">{transaction.pricePerLiter}</td>
                  <td className="px-4 py-4">{transaction.totalAmount.toLocaleString()}</td>
                  <td
                    className={`px-4 py-4 font-semibold ${transaction.currentBalance.includes("-")
                        ? "text-red-500"
                        : transaction.currentBalance === "N/A"
                          ? "text-slate-500"
                          : "text-green-500"
                      }`}
                  >
                    {transaction.currentBalance}
                  </td>
                 
                </tr>
              ))}

               {paginatedTransactions.length === 0 && (
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
    </div>
  )
}
