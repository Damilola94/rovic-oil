"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, MoreVertical } from "lucide-react"

const debtors = [
  { id: 1, name: "David Abiola", balance: -300, dueDate: "30-11-2025" },
  { id: 2, name: "Alexandra Ocasio-Cortez", balance: -100, dueDate: "01-12-2025" },
  { id: 3, name: "Bernie Sanders", balance: -50, dueDate: "02-12-2025" },
  { id: 4, name: "Kamala Harris", balance: -45, dueDate: "03-12-2025" },
  { id: 5, name: "Elizabeth Warren", balance: -425, dueDate: "04-12-2025" },
  { id: 6, name: "Cory Booker", balance: -553, dueDate: "05-12-2025" },
  { id: 7, name: "Bokku Mart", balance: -292, dueDate: "06-12-2025" },
]

export function DebtorsTable() {
  const [activeRow, setActiveRow] = useState<number | null>(null)

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold mb-4">Debtors</h2>

      {/* Table Header */}
      <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-white bg-slate-900 p-3 rounded">
        <div>S/N</div>
        <div>Name</div>
        <div>Balance</div>
        <div>Due Date</div>
      </div>

      {/* Debtor Rows */}
      {debtors.map((debtor) => (
        <div key={debtor.id} className="border-b border-slate-100">
          <div className="grid grid-cols-4 gap-2 text-sm p-3 items-center hover:bg-slate-50 rounded transition-colors relative">
            <div className="font-medium text-slate-900">{debtor.id}</div>
            <div className="text-slate-700">{debtor.name}</div>
            <div className="text-red-500 font-semibold">{debtor.balance}</div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">{debtor.dueDate}</span>
              <button
                onClick={() => setActiveRow(activeRow === debtor.id ? null : debtor.id)}
                className="p-1 hover:bg-slate-200 rounded"
              >
                <MoreVertical size={16} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* CTA appears only when row is active */}
          {activeRow === debtor.id && (
            <div className="p-3 bg-slate-50 flex justify-end">
              <Button className="gap-2 bg-accent hover:bg-accent/90">
                <AlertCircle size={18} />
                Send Reminder
              </Button>
            </div>
          )}
        </div>
      ))}
    </Card>
  )
}
