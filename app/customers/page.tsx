"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { CustomersTable } from "@/components/customers-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">My Customers</h1>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Plus size={20} />
              Add Prospect
            </Button>
            <Link href="/customers/add">
              <Button className="gap-2 bg-accent hover:bg-accent/90">
                <Plus size={20} />
                Add New Customer
              </Button>
            </Link>
          </div>
        </div>

        {/* Customers Table */}
        <CustomersTable />
      </div>
    </DashboardLayout>
  )
}
