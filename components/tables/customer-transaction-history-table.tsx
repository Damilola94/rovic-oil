"use client"

import { useState } from "react"
import { Card } from "../ui/card"
import { Pagination } from "../ui/pagination"

interface Transaction {
    date: string
    qty: number
    price: number
    total: number
    balance: number | string
}

interface TransactionHistoryTableProps {
    transactions: Transaction[]
}

export function TransactionHistoryTable({ transactions }: TransactionHistoryTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const totalPages = Math.ceil(transactions.length / itemsPerPage)

    return (
        <Card className="p-0 rounded-4xl w-full overflow-hidden pb-10">
            <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
                <table className="w-full font-light text-sm border-collapse">
                    <thead>
                        <tr className="bg-black text-white">
                            <th className="px-4 py-4 text-left rounded-tl-2xl">Date</th>
                            <th className="px-4 py-4 text-left">Quantity (L)</th>
                            <th className="px-4 py-4 text-left">Price (₦)</th>
                            <th className="px-4 py-4 text-left">Total Amount</th>
                            <th className="px-4 py-4 text-left rounded-tr-2xl">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.length > 0 ? (
                            transactions.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className="border-b border-border hover:bg-muted/50 cursor-pointer transition-colors"
                                >
                                    <td className="px-4 py-4">{row.date}</td>
                                    <td className="px-4 py-4">{row.qty}</td>
                                    <td className="px-4 py-4">{row.price}</td>
                                    <td className="px-4 py-4">{row.total}</td>
                                    <td className="px-4 py-4">{row.balance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-slate-500">
                                    No transactions found.
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
    )
}
