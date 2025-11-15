"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Link from "next/link"
import moment from "moment"
import { Pagination } from "../ui/pagination"

interface InventoryTableProps {
  selectedLetter: string | null
  data: any[]
  isLoading: boolean
}

export function InventoryTable({ selectedLetter, data, isLoading }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredTransactions = useMemo(() => {
    if (!selectedLetter) return data
    return data.filter((t) =>
      t.customerName?.toLowerCase()?.startsWith(selectedLetter?.toLowerCase())
    )
  }, [selectedLetter, data])

  const totalPages = Math.ceil(filteredTransactions?.length / itemsPerPage)
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredTransactions.slice(start, start + itemsPerPage)
  }, [filteredTransactions, currentPage])

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
      <Card className="p-0 rounded-4xl pb-10 w-full">
        <div className="flex-1 overflow-x-auto rounded-t-4xl bg-white">
          {isLoading ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Loading transactions...
            </div>
          ) : (
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
                {paginatedTransactions.map((transaction: any) => (
                  <tr
                    key={transaction?.id}
                    className="border-b hover:bg-slate-50 transition-colors text-foreground cursor-pointer"
                  >
                    <td className="px-4 py-4">
                        {moment(transaction.createdAtUtc).format("MM/DD/YYYY") || "—"}
                    </td>
                    <td className="px-4 py-4">
                      <Link
                        href={`/customer/${transaction?.stockId}`}
                        className="hover:underline"
                      >
                        {transaction?.customerName}
                      </Link>
                    </td>
                    <td className="px-4 py-4 max-w-[150px] truncate">{transaction?.customerAddress || "—"}</td>
                    <td className="px-4 py-4">
                      {transaction?.salesQuantityLitres?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      {transaction?.pricePerLitre?.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      {transaction?.totalAmount?.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-4 font-semibold ${
                        transaction?.balanceAfterTransaction < 0
                          ? "text-red-500"
                          : transaction?.balanceAfterTransaction === null
                          ? "text-slate-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction?.balanceAfterTransaction !== null
                        ? transaction?.balanceAfterTransaction?.toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}

                {paginatedTransactions?.length === 0 && !isLoading && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-sm text-muted-foreground"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

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
