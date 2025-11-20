"use client"

import { useState } from "react"
import { CardStat } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Send } from "lucide-react"
import moment from "moment-timezone"
import { SendReminderModal } from "../modals/send-reminder-modal"
import Image from "next/image"

interface Debtor {
  customerId: string | number
  customerName: string
  currentBalance: number
  oldestDueDate: string
}

interface DebtorsTableProps {
  data: Debtor[]
  isLoading?: boolean
}

export function DebtorsTable({ data, isLoading }: DebtorsTableProps) {
  const [reminderModalOpen, setReminderModalOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [selectedDebtor, setSelectedDebtor] = useState<any>(null)

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading debtors...</p>
  }

  if (!data || data.length === 0) {
    return <div>
      <h2 className="text-base font-medium transition-colors mb-6">Debtors</h2>
      <CardStat className="p-0 h-108 overflow-y-hidden rounded-4xl flex items-center justify-center">
        <p className="text-sm text-slate-500">No debtors found.</p>
      </CardStat>
    </div>
  }

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
    <div>
      <h2 className="text-base font-medium transition-colors mb-4">Debtors</h2>
      <CardStat className="p-0 h-108 overflow-y-hidden rounded-4xl">
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-black">
                <th className="px-3 py-3 text-left text-sm font-semibold text-white">S/N</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Balance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Due Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((debtor, index) => (
                <tr key={debtor.customerId} className="border-b border-border hover:bg-muted/50 cursor-pointer">
                  <td className="px-3 py-4 text-sm text-foreground">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{debtor.customerName}</td>
                  <td className="text-[#FF1515] px-6 py-4 text-sm font-bold">{debtor.currentBalance?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm">
                    {moment(debtor.oldestDueDate).format("MM/DD/YYYY") || "—"}</td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="inline-flex h-8 w-8 items-center cursor-pointer justify-center rounded hover:bg-muted">
                          <MoreVertical className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2 cursor-pointer"
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardStat>
      <SendReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        onConfirm={handleSendReminder}
        isLoading={sending}
        debtorName={selectedDebtor?.customerName}

      />
    </div>
  )
}
