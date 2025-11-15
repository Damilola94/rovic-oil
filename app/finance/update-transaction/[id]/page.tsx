"use client"

import { useState } from "react"
import { useRouter, useSearchParams, useParams } from "next/navigation"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import handleFetch from "@/services/api/handleFetch"
import { toast } from "react-toastify"
import { useMutation } from "react-query"
import { formatAmount } from "@/lib/utils"

export default function UpdateTransactionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  const customerId = params.id
  const customerName = searchParams.get("customerName")
  const currentBalance = searchParams.get("currentBalance")

  const [amountPaid, setAmountPaid] = useState("")

  const repayMutation = useMutation(handleFetch, {
    onSuccess: (res: any) => {
      toast.success(res?.message || "Repayment updated successfully")
      router.push("/finance")
    },
    onError: (err: any) => {
      toast.error(err?.message || "Failed to update repayment.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amountPaid) {
      toast.error("Please enter the amount paid")
      return
    }

    const body = {
      customerId,
      amountPaid: Number(amountPaid.replace(/,/g, "")),
    }

    repayMutation.mutate({
      endpoint: "transactions/repayment",
      method: "POST",
      auth: true,
      body,
    })
  }

  return (
    <DashboardLayout pageTitle="Update Transaction">
      <Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2 mb-4">
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Image src="/svg/update.svg" alt="Update Balance" width={30} height={30} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Update Balance</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <label className="text-sm font-medium">Customer Name</label>
            <div className="p-3 bg-gray-100 rounded-md">{customerName}</div>
          </div>

          <Input
            label="Amount Paid (₦)"
            type="money"
            placeholder="₦50,000"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />

          <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Debit (Amount owed)</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Credit (Amount paid)</span>
              <span className="font-medium text-gray-900">0</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-medium text-gray-900">     {formatAmount(Number(currentBalance), "₦")}
              </span>
            </div>
          </div>
          <Button
            className="gap-2 bg-accent hover:bg-accent w-full"
            size="lg"
            disabled={repayMutation.isLoading}
          >
            {repayMutation.isLoading ? "Submitting..." : "Submit Repayment"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
