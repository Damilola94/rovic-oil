"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { SelectInput } from "@/components/ui/select"
import { SearchableSelectInput } from "@/components/ui/searchable-selectInput"
import { useMutation } from "react-query"
import { toast } from "react-toastify";
import handleFetch from "@/services/api/handleFetch";
import useGetQuery from "@/hooks/useGetQuery"

export default function AddCustomerPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    customerType: "",
    name: "",
    location: "",
    phone: "",
    email: "",
    hasParentCompany: "",
    parentCompany: "",
    parentCompanyVal: "",
  })

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addCustomerMutation = useMutation(handleFetch, {
    onSuccess: (res: { message?: string }) => {
      toast.success(res?.message || "Customer added successfully")
      setSubmitted(true)
    },
    onError: (err: { message?: string }) => {
      toast.error(err?.message || "Failed to add customer, please try again.")
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.customerType ||
      !formData.name ||
      !formData.location ||
      !formData.phone ||
      !formData.email
    ) {
      toast.error("Please fill in all required fields.")
      return
    }

    const body = {
      customer: {
        type: formData.customerType,
        name: formData.name,
        address: formData.location,
        phone: formData.phone,
        email: formData.email,
        hasParentCompany: formData.hasParentCompany === "Yes",
        parentCompanyId:
          formData.hasParentCompany === "Yes" ? formData.parentCompany : null,
      },
    }

    addCustomerMutation.mutate({
      endpoint: "customers",
      method: "POST",
      body,
      auth: true,

    })
  }
  const { data: parentCompaniesData, } = useGetQuery({
    endpoint: "customers",
    queryKey: ["customers"],
    auth: true,
  })

  const parentCompanies =
    parentCompaniesData?.items
      ?.filter((customer: any) => customer.type === "Organization")
      .map((org: any) => ({
        label: org.name,
        value: org.id,
      })) || []

  if (submitted) {
    return (
      <DashboardLayout pageTitle="Add Customer">
        <div className="flex flex-col items-center justify-center min-h-[600px] space-y-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-accent/10">
            <CheckCircle2 size={64} className="text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Customer added successfully
          </h2>
          <button
            onClick={() => router.push("/customers")}
            className="text-accent hover:text-accent/80 font-medium cursor-pointer"
          >
            ← Back to my customers
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout pageTitle="Add Customer">
      <Button
        onClick={() => router.back()}
        variant="ghost" size="sm" className="gap-2">
        <ChevronLeft className="w-5 h-5" />
        Back
      </Button>

      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8 space-y-6">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <Image src="/svg/user-add.svg" alt="Add" width={30} height={30} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Add New Customer
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectInput
            label="Type of Customer"
            value={formData.customerType}
            onChange={(v) => handleInputChange("customerType", v)}
            options={[
              { label: "Individual", value: "Individual" },
              { label: "Organization", value: "Organization" },
            ]}
            placeholder="Select type of customer"
          />

          <Input
            label="Name"
            placeholder="Customer’s Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />

          <Input
            label="Location"
            placeholder="Enter Address"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />

          <Input
            label="Phone Number"
            placeholder="000 000 0000"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />

          <Input
            label="Email Address"
            placeholder="Customer’s Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />

          <SelectInput
            label="Is there a parent company?"
            value={formData.hasParentCompany}
            onChange={(v) => handleInputChange("hasParentCompany", v)}
            options={[
              { label: "Yes", value: "Yes" },
              { label: "No", value: "No" },
            ]}
            placeholder="Select option"
          />

          {formData.hasParentCompany === "Yes" && (
            <SearchableSelectInput
              label="Select parent company affiliation"
              value={formData.parentCompanyVal}
              onChange={(v) => handleInputChange("parentCompany", v)}
              onChangeVal={(v) => handleInputChange("parentCompanyVal", v)}
              options={parentCompanies}
              placeholder="Search or select a company"
              required
            />
          )}

          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-5 rounded-lg mt-8"
            disabled={addCustomerMutation.isLoading}
          >
            {addCustomerMutation.isLoading ? "Adding Customer..." : "Add Customer"}
          </Button>
        </form>
      </div>
    </DashboardLayout>
  )
}
