"use client"

import { Card } from "@/components/ui/card"
import { MoreVertical, Send, Loader2, RefreshCw } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal"
import { Pagination } from "../ui/pagination"
import { useMemo, useState } from "react"
import moment from "moment-timezone"
import { useRouter } from "next/navigation"
import { SendReminderModal } from "../modals/send-reminder-modal"
import Image from "next/image"

interface FinanceDebtorsTableProps {
    data: any[]
    isLoading: boolean
    selectedLetter: string | null
    currentPage: number
    onPageChange: (page: number) => void
}

export function FinanceDebtorsTable({
    data,
    isLoading,
    selectedLetter,
    currentPage,
    onPageChange,
}: FinanceDebtorsTableProps) {
    const [reminderModalOpen, setReminderModalOpen] = useState(false)
    const [sending, setSending] = useState(false)
    const [selectedDebtor, setSelectedDebtor] = useState<any>(null)
    const router = useRouter()

    const itemsPerPage = 20

    const filteredDebtors = useMemo(() => {
        if (!selectedLetter) return data
        return data.filter((c) =>
            c.name.toLowerCase().startsWith(selectedLetter.toLowerCase())
        )
    }, [selectedLetter, data])
    const totalPages = Math.ceil(data?.length / itemsPerPage)

    const paginatedDebtors = filteredDebtors?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const handleSendReminder = async () => {
        setSending(true)
        try {
            console.log("Sending reminder to:")
            setReminderModalOpen(false)
        } catch (error) {
            console.error(error)
        } finally {
            setSending(false)
        }
    }


    return (
        <>
            <Card className="p-0 rounded-4xl pb-10 w-full">
                <div className="flex-1 overflow-x-auto rounded-t-4xl bg-card">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-40">
                            <Loader2 className="animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <table className="w-full font-light text-sm">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="px-6 py-3 text-left text-sm font-semibold">No</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Affiliation</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Location</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Current Balance</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Due Date</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedDebtors?.map((debtor, index) => (
                                    <tr
                                        key={debtor.customerId}
                                        className="border-b border-border hover:bg-muted/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {debtor.customerName}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground">{debtor.affiliation ?? "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-foreground max-w-[150px] truncate">{debtor.address}</td>
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
                                        <td className="px-6 py-4 text-sm text-foreground">
                                            {moment(debtor.oldestDueDate).format("MM/DD/YYYY") || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="inline-flex h-8 w-8 items-center justify-center rounded hover:bg-muted">
                                                        <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        className="gap-2 cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedDebtor(debtor)
                                                            setReminderModalOpen(true)
                                                        }}
                                                    >
                                                        <Image
                                                            src="/svg/reminder-icon.svg"
                                                            alt="Send Reminder Icon"
                                                            width={17}
                                                            height={17}
                                                        />
                                                        Send Reminder
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => router.push(`/finance/update-transaction/${debtor.customerId}?customerName=${debtor.customerName}&currentBalance=${debtor.currentBalance}`)}
                                                        className="gap-2 cursor-pointer"
                                                    >
                                                        <Image
                                                            src="/svg/update-icon.svg"
                                                            alt="Send Reminder Icon"
                                                            width={15}
                                                            height={15}
                                                        />
                                                        Update  Balance
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}

                                {!isLoading && (!paginatedDebtors || paginatedDebtors.length === 0) && (
                                    <tr>
                                        <td
                                            colSpan={7}
                                            className="py-8 text-center text-sm text-muted-foreground"
                                        >
                                            No debtors found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            </Card>

            <SendReminderModal
                isOpen={reminderModalOpen}
                onClose={() => setReminderModalOpen(false)}
                onConfirm={handleSendReminder}
                isLoading={sending}
                debtorName={selectedDebtor?.customerName}

            />

        </>
    )
}
