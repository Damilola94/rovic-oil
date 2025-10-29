"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CustomerProfilePage() {
  return (
    <DashboardLayout pageTitle="Customer Profile">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/customers">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={20} />
              Back
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 p-6">
            <h2 className="text-xl font-bold mb-6">Customer Profile</h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Name</p>
                <p className="font-semibold">Chicken Republic - Maitama</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Location</p>
                <p className="font-semibold">Abuja</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-semibold">0812 345 6789</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold text-sm">Davidabiola@gmail.com</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Current Balance</p>
                <p className="font-semibold">₦0</p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Company Affiliation</p>
                <p className="font-semibold">Chicken Republic</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 p-6">
            <h2 className="text-xl font-bold mb-6">Transaction History</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Quantity (L)</th>
                    <th className="px-4 py-3 text-left">Price (₦)</th>
                    <th className="px-4 py-3 text-left">Total Amount</th>
                    <th className="px-4 py-3 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { date: "2025-10-2", qty: 300, price: 300, total: 300, balance: "-" },
                    { date: "2025-10-2", qty: 600, price: 100, total: 600, balance: 100 },
                    { date: "2025-10-2", qty: 200, price: 50, total: 200, balance: 50 },
                    { date: "2025-10-2", qty: 45, price: 45, total: 45, balance: 45 },
                    { date: "2025-10-2", qty: 425, price: 425, total: 425, balance: 425 },
                    { date: "2025-10-2", qty: 333, price: 333, total: 333, balance: 333 },
                    { date: "2025-10-2", qty: 292, price: 292, total: 292, balance: 292 },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50">
                      <td className="px-4 py-3">{row.date}</td>
                      <td className="px-4 py-3">{row.qty}</td>
                      <td className="px-4 py-3">{row.price}</td>
                      <td className="px-4 py-3">{row.total}</td>
                      <td className="px-4 py-3">{row.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between mt-6">
              <span className="text-sm text-slate-500">Page 1 of 10</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 10, "Next"].map((page) => (
                  <button key={page} className="px-3 py-1 rounded border border-slate-200 hover:bg-slate-50 text-sm">
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
