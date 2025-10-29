"use client"

import { Card } from "@/components/ui/card"
import { useState, useMemo } from "react"
import Link from "next/link"
import { MoreVertical, Trash2, Send } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { debtorsData } from "@/app/constant/data"

export function FinanceDebtorsTable({ selectedLetter }: { selectedLetter: string | null }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [selectedDebtorId, setSelectedDebtorId] = useState<number | null>(null)

    const itemsPerPage = 10

    const filteredDebtors = useMemo(() => {
        if (!selectedLetter) return debtorsData
        return debtorsData.filter((d) =>
            d.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        )
    }, [selectedLetter])

    const totalPages = Math.ceil(filteredDebtors.length / itemsPerPage)
    const paginatedDebtors = filteredDebtors.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleDeleteClick = (debtorId: number) => {
        setSelectedDebtorId(debtorId)
        setDeleteModalOpen(true)
    }

    const handleConfirmDelete = () => {
        console.log("Deleting debtor:", selectedDebtorId)
        setDeleteModalOpen(false)
        setSelectedDebtorId(null)
    }

    return (
        <>
            <Card className="p-0 rounded-4xl pb-10 w-full">
                <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
                    <table className="w-full font-light text-sm">
                        <thead>
                            <tr className="bg-[black] text-white">
                                <th className="px-6 py-3 text-left text-sm font-semibold ">No</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold ">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold ">Affiliation</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold ">Location</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold ">Current Balance</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold ">Due Date</th>
                                <th className=" "></th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedDebtors.map((debtor, index) => (
                                <tr
                                    key={debtor.id}
                                    className="border-b border-border hover:bg-muted/50 transition-colors"
                                >
                                    <td className="px-6 py-4 text-sm text-foreground">
                                        {(currentPage - 1) * itemsPerPage + index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-foreground">
                                        <Link href={`/debtors/${debtor.id}`} className="hover:underline">
                                            {debtor.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-foreground">{debtor.affiliation}</td>
                                    <td className="px-6 py-4 text-sm text-foreground">{debtor.location}</td>
                                    <td
                                        className={`px-6 py-4 text-sm font-semibold ${debtor.currentBalance < 0
                                            ? "text-red-500"
                                            : debtor.currentBalance === 0
                                                ? "text-slate-500"
                                                : "text-green-600"
                                            }`}
                                    >
                                        ₦{debtor.currentBalance.toLocaleString()}
                                    </td>
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
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteClick(debtor.id)}
                                                    className="gap-2 text-red-600 focus:text-red-700 cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
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
