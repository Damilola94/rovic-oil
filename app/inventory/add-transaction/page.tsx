"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { SelectInput } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { SearchableSelectInput } from "@/components/ui/searchable-selectInput"
import useGetQuery from "@/hooks/useGetQuery"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import handleFetch from "@/services/api/handleFetch"
import { parseNumber } from "@/lib/utils"
import { paymentTypes, paymentTypeKeyMap, repaymentDurations, repaymentDurationsKeyMap } from "@/app/constant/data"

export default function AddTransactionPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    typeOfUser: "",
    customer: "",
    customerVal: "",
    quantity: "",
    pricePerLiter: "",
    paymentType: "",
    amountPaid: "",
    repaymentDuration: "",
  })
  const { data: companiesData, isLoading } = useGetQuery({
    endpoint: "customers",
    queryKey: ["customers"],
    auth: true,
  })
  const companies =
    companiesData?.items
      ?.filter((customer: any) => customer.type === formData.typeOfUser)
      .map((customer: any) => ({
        label: customer.name,
        value: customer.id,
      })) || []

  const { data: customerData, isLoading: isCustomerLoading } = useGetQuery({
    endpoint: `customers/${formData.customer}`,
    queryKey: ["customer", formData.customer],
    auth: true,
    enabled: !!formData.customer,
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const totalAmount =
    formData.quantity && formData.pricePerLiter
      ? (parseNumber(formData.quantity) * parseNumber(formData.pricePerLiter)).toLocaleString()
      : "0"
  const currentBalance = customerData?.balance?.toLocaleString() || "0"

  const credit = formData.amountPaid ? parseNumber(formData.amountPaid).toLocaleString() : "0"
  const debit = formData.amountPaid ? (parseNumber(formData.amountPaid) * 0.433).toFixed(3) : "0"

  const addTransactionMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Transaction added successfully")
      setSubmitted(true)
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to add transaction. Please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const computedAmountPaid =
      formData.paymentType === "Full Payment"
        ? parseNumber(totalAmount)
        : parseNumber(formData.amountPaid)
    console.log(formData.typeOfUser, formData.customer, formData.quantity, formData.pricePerLiter, formData.paymentType);

    if (
      // !formData.typeOfUser ||
      !formData.customer ||
      !formData.quantity ||
      !formData.pricePerLiter ||
      !formData.paymentType ||
      computedAmountPaid === 0
    ) {
      toast.error("Please fill in all required fields.")
      return
    }
    const paymentTypeKey = paymentTypeKeyMap[formData.paymentType]

    const repaymentDurationKey =
      repaymentDurationsKeyMap[formData.repaymentDuration]

    const body = {
      type: formData.typeOfUser,
      customerId: formData.customer,
      salesQuantityLitres: parseNumber(formData.quantity),
      pricePerLitre: parseNumber(formData.pricePerLiter),
      paymentType: paymentTypeKey,
      amountPaid: computedAmountPaid,
      repaymentDuration: formData.paymentType !== "Full Payment" ? repaymentDurationKey : undefined,
    }

    addTransactionMutation.mutate({
      endpoint: "transactions",
      method: "POST",
      body,
      auth: true,
    })
  }


  if (submitted) {
    return (
      <DashboardLayout pageTitle="Add Transaction">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Transaction added successfully</h1>
            <Link
              href="/inventory"
              className="text-red-500 hover:text-red-600 font-medium inline-flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Inventory
            </Link>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Add Transaction">
      <Button onClick={() => router.back()} variant="ghost" size="sm" className="gap-2 mb-4">
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
              <Image src="/svg/transaction-minus.svg" alt="Add Transaction" width={30} height={30} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Add New Transaction</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
          <SelectInput
            label="Type of User"
            value={formData.typeOfUser}
            onChange={(e) => handleInputChange("typeOfUser", e)}
            options={[
              { label: "Individual", value: "Individual" },
              { label: "Organization", value: "Organization" },
            ]}
            placeholder="Select type of customer"
          />

          <SearchableSelectInput
            label="Select Customer"
            value={formData.customerVal}
            onChange={(v) => handleInputChange("customer", v)}
            onChangeVal={(v) => handleInputChange("customerVal", v)}
            options={companies}
            placeholder={isLoading ? "Loading customers..." : "Search or select a customer"}
          />

          <Input
            label="Sales Quantity (Liters)"
            type="money"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => handleInputChange("quantity", e.target.value)}
          />

          <Input
            label="Price per Liter (₦)"
            type="money"
            placeholder="Enter price per liter"
            value={formData.pricePerLiter}
            onChange={(e) => handleInputChange("pricePerLiter", e.target.value)}
          />

          <Input label="Total Amount (₦)" value={totalAmount} disabled />

          <SelectInput
            label="Payment Type"
            value={formData.paymentType}
            onChange={(e) => handleInputChange("paymentType", e)}
            options={paymentTypes.map((p) => ({ label: p, value: p }))}
            placeholder="Select payment type"
          />

          {formData.paymentType == "Part Payment" && (
            <div className="space-y-6">
              <Input
                label="Amount Paid (₦)"
                type="money"
                placeholder="₦120,000"
                value={formData.amountPaid}
                onChange={(e) => handleInputChange("amountPaid", e.target.value)}
              />
              <SelectInput
                label="Repayment Duration"
                value={formData.repaymentDuration}
                onChange={(e) => handleInputChange("repaymentDuration", e)}
                options={repaymentDurations.map((d) => ({ label: d, value: d }))}
                placeholder="Select repayment duration"
              />
            </div>
          )}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3 border border-gray-200">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Debit (Amount owed)</span>
              <span className="font-medium text-gray-900">{debit}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Credit (Amount paid)</span>
              <span className="font-medium text-gray-900">{credit}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-300 pt-3">
              <span className="text-gray-600">Current Balance</span>
              <span className="font-medium text-gray-900">    {isCustomerLoading ? "Loading..." : currentBalance}
              </span>
            </div>
          </div>

          <Button
            className="gap-2 bg-accent hover:bg-accent w-full"
            size="lg"
            disabled={addTransactionMutation.isLoading}
          >
            {addTransactionMutation.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
