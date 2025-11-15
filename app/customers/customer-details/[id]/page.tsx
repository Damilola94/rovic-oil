"use client"

import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { TransactionHistoryTable } from "@/components/tables/customer-transaction-history-table"
import useGetQuery from "@/hooks/useGetQuery"

export default function CustomerProfilePage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const customerId = params.id

  const { data: customer, isLoading: loadingCustomer } = useGetQuery({
    endpoint: `customers/${customerId}`,
    queryKey: ["customer-details", customerId],
    auth: true,
  })

  const { data: transactionsData, isLoading: loadingTransactions } = useGetQuery({
    endpoint: `transactions/${customerId}`,
    queryKey: ["customer-transactions", customerId],
    auth: true,
  })

  if (loadingCustomer || loadingTransactions) {
    return (
      <DashboardLayout pageTitle="Customer Profile">
        <div className="flex items-center justify-center min-h-[500px]">
          <p className="text-slate-500">Loading customer data...</p>
        </div>
      </DashboardLayout>
    )
  }

  const transactions = transactionsData?.items || []

  return (
    <DashboardLayout pageTitle="Customer Profile">
      <div className="space-y-6">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              Customer Profile
            </h2>

            <div className="space-y-2">
              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Name</p>
                <p className="text-slate-900 font-medium text-sm">{customer?.name}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Location</p>
                <p className="text-slate-900 font-medium text-sm">{customer?.address}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Contact</p>
                <p className="text-slate-900 font-medium text-sm">{customer?.phone}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Email</p>
                <p className="text-slate-900 font-medium wrap-break-word text-sm">{customer?.email}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Current Balance</p>
                <p className="text-slate-900 font-medium text-sm">{customer?.balance || "Nil"}</p>
              </div>

              <div className="border border-slate-200 rounded-xl p-3">
                <p className="text-sm text-slate-500 mb-1">Company Affiliation</p>
                <p className="text-slate-900 font-medium">{customer?.parentCompanyName || "-"}</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 bg-transparent shadow-none border-0 p-0 rounded-none">
            <h2 className="text-xl font-bold mt-5">Transaction History</h2>
            <TransactionHistoryTable transactions={transactions} />
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
