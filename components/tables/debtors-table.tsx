"use client"

import { useState } from "react"
import { Card, CardStat } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Send } from "lucide-react"

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
    <div>

      <h2 className="text-base font-medium transition-colors mb-4">Debtors</h2>
      <CardStat className="p-0 h-108 overflow-y-hidden rounded-4xl" >
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-black ">
                <th className="px-3 py-3 text-left text-sm font-semibold  text-white ">S/N</th>
                <th className="px-6 py-3 text-left text-sm font-semibold  text-white ">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold  text-white ">Balance</th>
                <th className="px-6 py-3 text-left text-sm font-semibold  text-white ">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {debtors.map((debtor) => (
                <tr key={debtor.id} className="border-b border-border hover:bg-muted/50 cursor-pointer">
                  <td className="px-3 py-4 text-sm text-foreground">{debtor.id}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{debtor.name}</td>
                  <td className="text-[#FF1515]  px-6 py-4 text-sm">{debtor.balance}</td>
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
      </CardStat>
    </div>

  )
}
